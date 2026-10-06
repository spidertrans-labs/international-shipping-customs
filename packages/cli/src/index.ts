#!/usr/bin/env node
import { realpathSync } from "node:fs";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";
import {
  countries,
  getCountry,
  searchItems
} from "@spidertrans/data";
import {
  CategorySchema,
  CountryCodeSchema,
  type Category,
  type CountryCode,
  type CustomsItem,
  type RestrictionStatus
} from "@spidertrans/schema";

const REGISTER_URL =
  "https://spidertrans.cn/register-shipping?utm_source=github&utm_medium=referral&utm_campaign=international_shipping_customs&utm_content=cli";

const STATUS_LABELS: Record<RestrictionStatus, { zh: string; en: string }> = {
  allowed: { zh: "通常允许", en: "Allowed" },
  conditional: { zh: "条件允许", en: "Conditional" },
  restricted: { zh: "限制/需许可", en: "Restricted" },
  prohibited: { zh: "禁止", en: "Prohibited" }
};

export interface CliIO {
  out: (message: string) => void;
  err: (message: string) => void;
}

const defaultIO: CliIO = {
  out: (message) => console.log(message),
  err: (message) => console.error(message)
};

function json(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function formatItem(item: CustomsItem): string {
  const status = STATUS_LABELS[item.status];
  return [
    `${item.id} · ${item.itemZh} / ${item.itemEn}`,
    `${item.country} · ${item.category} · ${status.zh} / ${status.en}`,
    `ZH: ${item.conditionsZh}`,
    `EN: ${item.conditionsEn}`,
    `Declaration ZH: ${item.declarationNotesZh}`,
    `Declaration EN: ${item.declarationNotesEn}`,
    `Source: ${item.sourceUrl}`,
    `Verified: ${item.verifiedAt}`
  ].join("\n");
}

function formatCountry(code: CountryCode): string {
  const { country, items } = getCountry(code);
  return [
    `${country.code} · ${country.nameZh} / ${country.nameEn}`,
    `Currency: ${country.currency}`,
    `Authority: ${country.authority}`,
    `Duty ZH: ${country.dutyThresholdZh}`,
    `Duty EN: ${country.dutyThresholdEn}`,
    `Tax ZH: ${country.taxNotesZh}`,
    `Tax EN: ${country.taxNotesEn}`,
    `Declaration ZH: ${country.declarationNotesZh}`,
    `Declaration EN: ${country.declarationNotesEn}`,
    `Records: ${items.length}`,
    `Verified: ${country.lastVerifiedAt}`,
    `Sources: ${country.sourceUrls.join(", ")}`
  ].join("\n");
}

function helpText(): string {
  return [
    "International Shipping Customs",
    "",
    "Usage:",
    "  customs countries [--json]",
    "  customs search <query> [--country AU|US|CA|UK] [--category <category>] [--json]",
    "  customs check --country AU|US|CA|UK --item <query> [--json]",
    "  customs help",
    "",
    "Examples:",
    "  customs check --country AU --item battery",
    "  customs search \"protein powder\" --country CA",
    "",
    `Register: ${REGISTER_URL}`
  ].join("\n");
}

function parseCountry(value: string | undefined): CountryCode {
  const parsed = CountryCodeSchema.safeParse(value?.toUpperCase());
  if (!parsed.success) {
    throw new Error("Country must be one of AU, US, CA, or UK.");
  }
  return parsed.data;
}

function parseCategory(value: string | undefined): Category | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = CategorySchema.safeParse(value);
  if (!parsed.success) {
    throw new Error(
      `Category must be one of: ${CategorySchema.options.join(", ")}.`
    );
  }
  return parsed.data;
}

function printResults(
  results: CustomsItem[],
  jsonOutput: boolean,
  io: CliIO
): number {
  if (jsonOutput) {
    io.out(json(results));
    return 0;
  }

  if (results.length === 0) {
    io.out("No matching records. Confirm the spelling or try a broader query.");
    return 0;
  }

  io.out(results.map(formatItem).join("\n\n---\n\n"));
  return 0;
}

export function execute(
  argv: string[],
  io: CliIO = defaultIO
): number {
  const [command, ...args] = argv;

  try {
    if (!command || command === "help" || command === "--help" || command === "-h") {
      io.out(helpText());
      return 0;
    }

    if (command === "countries") {
      const { values } = parseArgs({
        args,
        options: { json: { type: "boolean", short: "j" } },
        allowPositionals: false
      });
      if (values.json) {
        io.out(json(countries.map(({ country }) => country)));
      } else {
        for (const { country, items } of countries) {
          io.out(
            `${country.code}  ${country.nameZh} / ${country.nameEn}  ${items.length} records`
          );
        }
      }
      return 0;
    }

    if (command === "search") {
      const { values, positionals } = parseArgs({
        args,
        options: {
          country: { type: "string" },
          category: { type: "string" },
          json: { type: "boolean", short: "j" }
        },
        allowPositionals: true
      });
      const query = positionals.join(" ").trim();
      if (!query) {
        throw new Error("search requires a query.");
      }
      const results = searchItems(query, {
        country: values.country ? parseCountry(values.country) : undefined,
        category: parseCategory(values.category)
      });
      return printResults(results, Boolean(values.json), io);
    }

    if (command === "check") {
      const { values, positionals } = parseArgs({
        args,
        options: {
          country: { type: "string" },
          item: { type: "string" },
          json: { type: "boolean", short: "j" }
        },
        allowPositionals: true
      });
      const country = parseCountry(values.country);
      const query = values.item ?? positionals.join(" ").trim();
      if (!query) {
        throw new Error("check requires --item <query>.");
      }
      const results = searchItems(query, { country });
      return printResults(results, Boolean(values.json), io);
    }

    throw new Error(`Unknown command: ${command}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    io.err(`Error: ${message}\n\n${helpText()}`);
    return 1;
  }
}

const entryPath = process.argv[1]
  ? pathToFileURL(realpathSync(process.argv[1])).href
  : undefined;

if (entryPath === import.meta.url) {
  process.exitCode = execute(process.argv.slice(2));
}
