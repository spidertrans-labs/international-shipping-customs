import {
  CountryDatasetSchema,
  type Category,
  type CountryCode,
  type CountryDataset,
  type CustomsItem
} from "@spidertrans/schema";
import { datasets } from "./datasets";

export const countries: CountryDataset[] = datasets.map((dataset) =>
  CountryDatasetSchema.parse(dataset)
);

export const items: CustomsItem[] = countries.flatMap(
  (dataset) => dataset.items
);

export function getCountry(code: CountryCode): CountryDataset {
  const dataset = countries.find((entry) => entry.country.code === code);
  if (!dataset) {
    throw new Error(`Unsupported country: ${code}`);
  }
  return dataset;
}

export function searchItems(
  query: string,
  options: { country?: CountryCode; category?: Category } = {}
): CustomsItem[] {
  const normalized = query.trim().toLocaleLowerCase();
  return items.filter((item) => {
    if (options.country && item.country !== options.country) {
      return false;
    }
    if (options.category && item.category !== options.category) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    const haystack = [
      item.itemZh,
      item.itemEn,
      ...item.aliasesZh,
      ...item.aliasesEn,
      item.category,
      item.conditionsZh,
      item.conditionsEn
    ]
      .join(" ")
      .toLocaleLowerCase();
    return haystack.includes(normalized);
  });
}

export { datasets };
