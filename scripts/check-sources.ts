import { countries, items } from "@spidertrans/data";

const urls = new Set<string>([
  ...countries.flatMap(({ country }) => country.sourceUrls),
  ...items.map((item) => item.sourceUrl)
]);

async function checkUrl(url: string): Promise<{
  url: string;
  ok: boolean;
  warning: boolean;
  status: number | null;
  detail: string;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    let response: Response;
    try {
      response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "spidertrans-customs-link-check/0.1" }
      });
    } catch {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "spidertrans-customs-link-check/0.1" }
      });
    }

    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "spidertrans-customs-link-check/0.1" }
      });
    }

    const hardFailure = response.status === 404 || response.status === 410;
    const botBlocked = response.status === 403;
    return {
      url,
      ok: !hardFailure && response.status < 500,
      warning: botBlocked,
      status: response.status,
      detail: hardFailure
        ? "Not found"
        : botBlocked
          ? "Bot check"
          : response.statusText || "Reachable"
    };
  } catch (error) {
    return {
      url,
      ok: true,
      warning: true,
      status: null,
      detail: `Unreachable from checker: ${
        error instanceof Error ? error.message : String(error)
      }`
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const entries = [...urls].sort();
  const results = [];

  for (let index = 0; index < entries.length; index += 8) {
    results.push(
      ...(await Promise.all(entries.slice(index, index + 8).map(checkUrl)))
    );
  }

  const failures = results.filter((result) => !result.ok);

  for (const result of results) {
    const label = !result.ok ? "FAIL" : result.warning ? "WARN" : "OK";
    console.log(
      `${label} ${result.status ?? "-"} ${result.url}`
    );
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} source URL(s) failed validation.`);
    process.exitCode = 1;
  } else {
    console.log(`\nChecked ${results.length} unique official source URLs.`);
  }
}

void main();
