import z from "zod";
import { countries } from "../data/countries";

export const KycVerificationSchema = z.object({
  //   country: z
  //     .string()
  //     .min(1, "Country is required")
  //     .refine(
  //       (country) =>
  //         countries.some((availableCountry) => availableCountry.key === country),
  //       "Please select a valid country",
  //     ),

  country: z.enum([
    "NG",
    "GH",
    "KE",
    "ZA",
    "US",
    "UK",
    "CA",
    "AU",
    "DE",
    "FR",
    "AU",
    "IN",
  ]),

  document: z.enum(["bvn", "nin", "passport"], {
    required_error: "Document selection is required",
  }),
  reference: z
    .string()
    .trim()
    .min(1, "Reference number is required")
    .regex(/^[A-Za-z0-9]+$/, "Reference number must be alphanumeric"),
});

export type KycVerificationFormValues = z.infer<typeof KycVerificationSchema>;
