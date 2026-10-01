import { z } from "zod";

export const makeChangesSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  amount: z.number({ invalid_type_error: "Amount is required." }).positive("Amount must be greater than zero."),
  transaction_description: z
    .string()
    .trim()
    .min(1, "Project description is required."),
  terms: z.string().trim().min(1, "Terms are required."),
  additional_agreement: z.string().trim(),
  deadline: z.string().min(1, "Deadline is required."),
  inspection_duration: z
    .number({ invalid_type_error: "Inspection duration is required." })
    .int("Inspection duration must be a whole number.")
    .min(0, "Inspection duration cannot be negative."),
  pay_escrow_fee: z.enum(["CLIENT", "FREELANCER", "BOTH"]),
  pay_shipping_cost: z.enum(["CLIENT", "FREELANCER", "BOTH"]),
  files: z.array(z.instanceof(File)).default([]),
});

export type MakeChangesFormValues = z.infer<typeof makeChangesSchema>;

export type MakeChangesPayload = Omit<MakeChangesFormValues, "deadline"> & {
  deadline: string;
};
