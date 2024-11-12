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
