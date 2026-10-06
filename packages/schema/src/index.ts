import { z } from "zod";

export const CountryCodeSchema = z.enum(["AU", "US", "CA", "UK"]);
export const CategorySchema = z.enum([
  "snacks",
  "meat-dairy",
  "medicine",
  "supplements",
  "cosmetics",
  "batteries",
  "electronics",
  "alcohol-tobacco",
  "seeds-plants",
  "liquids-aerosols"
]);
export const RestrictionStatusSchema = z.enum([
  "allowed",
  "conditional",
  "restricted",
  "prohibited"
]);

export const CustomsItemSchema = z.object({
  id: z.string().regex(/^(AU|US|CA|UK)-\d{2}$/),
  country: CountryCodeSchema,
  category: CategorySchema,
  itemZh: z.string().min(2),
  itemEn: z.string().min(2),
  aliasesZh: z.array(z.string()).default([]),
  aliasesEn: z.array(z.string()).default([]),
  status: RestrictionStatusSchema,
  conditionsZh: z.string().min(2),
  conditionsEn: z.string().min(2),
  declarationNotesZh: z.string().min(2),
  declarationNotesEn: z.string().min(2),
  sourceUrl: z.string().url(),
  verifiedAt: z.string().date()
});

export const CountryDatasetSchema = z.object({
  country: z.object({
    code: CountryCodeSchema,
    nameZh: z.string().min(2),
    nameEn: z.string().min(2),
    currency: z.string().min(2),
    authority: z.string().min(2),
    dutyThresholdZh: z.string().min(2),
    dutyThresholdEn: z.string().min(2),
    taxNotesZh: z.string().min(2),
    taxNotesEn: z.string().min(2),
    declarationNotesZh: z.string().min(2),
    declarationNotesEn: z.string().min(2),
    sourceUrls: z.array(z.string().url()).min(1),
    lastVerifiedAt: z.string().date(),
    disclaimerZh: z.string().min(2),
    disclaimerEn: z.string().min(2)
  }),
  items: z.array(CustomsItemSchema).min(1)
});

export type CountryCode = z.infer<typeof CountryCodeSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type RestrictionStatus = z.infer<typeof RestrictionStatusSchema>;
export type CustomsItem = z.infer<typeof CustomsItemSchema>;
export type CountryDataset = z.infer<typeof CountryDatasetSchema>;
