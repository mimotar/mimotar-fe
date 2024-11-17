import { z } from "zod";

const TransactionDetailSchema = z.object({
  amount: z.string().min(1, "Amount is required."),

  transaction_description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description must be at most 500 characters."),

  transaction_type: z.enum(["physical product", "online product", "service"], {
    errorMap: () => ({ message: "Transaction type is required." }),
  }),
});

export type TransactionDetailSchemaType = z.infer<
  typeof TransactionDetailSchema
>;
export default TransactionDetailSchema;

// Term And Agreement Schema
export const TermAndAgreementSchema = z.object({
  escrowFeePayer: z.enum(
    ["Buyer (100%)", "Seller (100%)", "Both (50% - 50%)"],
    {
      required_error: "You must select who will pay the escrow fee.",
    }
  ),
  inspection_period: z
    .string()
    .regex(/^\d+$/, "Inspection period must be a number.")
    .refine((value) => {
      const number = parseInt(value, 10);
      return number >= 1 && number <= 30;
    }, "Inspection period must be between 1 and 30 days."),
  shipping_cost_payer: z
    .enum(["Buyer (100%)", "Seller (100%)", "Both (50% - 50%)"])
    .optional(),
  additional_agreement: z
    .string()
    .max(500, "Additional agreement must be less than 500 characters.")
    .optional(),
});

export type TermAndAgreementSchemaType = z.infer<typeof TermAndAgreementSchema>;

// Second Transactor Info Schema
export const SecondTransactorInfoSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .regex(/^[a-zA-Z\s]+$/, "Full name must only contain alphabets and spaces"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")), // Allow empty string as optional
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+\d{1,3}\s?\d{4,14}$/, "Invalid phone number format"),
  address: z.string().optional().or(z.literal("")), // Optional field
  countryCode: z.object({
    // code: z.string().optional(),
    flag: z
      .string()
      .url("Flag must be a valid URL")
      .min(1, "Flag URL is required"),
  }),
  optionThatDesPerson: z
    .enum(["Buyer (100%)", "Seller (100%)"])
    .refine((value) => !!value, { message: "Selection is required" }),
});

export type SecondTransactorInfoSchemaType = z.infer<
  typeof SecondTransactorInfoSchema
>;
