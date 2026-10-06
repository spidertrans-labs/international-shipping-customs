import {
  CategorySchema,
  CountryCodeSchema
} from "@spidertrans/schema";
import { countries, items } from "@spidertrans/data";

const officialHosts = [
  "abf.gov.au",
  "agriculture.gov.au",
  "tga.gov.au",
  "cbp.gov",
  "fda.gov",
  "aphis.usda.gov",
  "fcc.gov",
  "cbsa-asfc.gc.ca",
  "inspection.canada.ca",
  "canada.ca",
  "gov.uk"
];

const errors: string[] = [];
const expectedCountries = CountryCodeSchema.options;
const expectedCategories = new Set<string>(CategorySchema.options);

if (countries.length !== expectedCountries.length) {
  errors.push(`Expected 4 country datasets, received ${countries.length}.`);
}

for (const code of expectedCountries) {
  const dataset = countries.find((entry) => entry.country.code === code);
  if (!dataset) {
    errors.push(`Missing country dataset: ${code}.`);
    continue;
  }

  if (dataset.items.length !== 10) {
    errors.push(
      `${code} must contain 10 launch records, received ${dataset.items.length}.`
    );
  }

  const categories = new Set(dataset.items.map((item) => item.category));
  for (const category of expectedCategories) {
    if (!categories.has(category as never)) {
      errors.push(`${code} is missing category: ${category}.`);
    }
  }
}

const ids = new Set<string>();
for (const item of items) {
  if (ids.has(item.id)) {
    errors.push(`Duplicate item id: ${item.id}.`);
  }
  ids.add(item.id);

  try {
    const url = new URL(item.sourceUrl);
    const allowed = officialHosts.some(
      (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)
    );
    if (!allowed) {
      errors.push(`${item.id} uses a non-official host: ${url.hostname}.`);
    }
  } catch {
    errors.push(`${item.id} has an invalid source URL.`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${countries.length} countries, ${items.length} records, and ${ids.size} unique IDs.`
  );
}
