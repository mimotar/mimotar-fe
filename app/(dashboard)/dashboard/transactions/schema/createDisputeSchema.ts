import z from "zod";
import { reasons } from "../data/reasons";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

const MAX_FILES = 5;
export const disputeSchema = z.object({
  reason: z
    .string()
    .min(1, "Please select a reason for dispute")
    .refine((value) => reasons.includes(value), "Please select a valid reason"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  resolutionOption: z
    .enum([
      "REFUND_ONLY",
      "REPLACEMENT_ONLY",
      "REFUND_OR_REPLACEMENT",
      "PARTIAL_REPAYMENT",
      "RESEND_PRODUCT",
      "CANCEL_TRANSACTION",
      "REPEAT_SERVICE",
      "OTHERS",
    ])
    .optional(),

  evidence: z
    .array(z.instanceof(File))
    .max(MAX_FILES, `You can upload up to ${MAX_FILES} files`)
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      "Each file must be 5MB or less",
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_FILE_TYPES.includes(file.type)),
      "Only JPG, PNG, GIF, or PDF files are allowed",
    )
    .default([]),
});

export type IDisputeFormValues = z.infer<typeof disputeSchema>;
