import { z } from "zod";

export interface IPersistedAttachment {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  dataUrl: string;
}

export const persistedAttachmentSchema = z.object({
  name: z.string().min(1, "File name is required"),

  type: z.string().min(1, "File type is required"),

  size: z.number().positive("Invalid file size"),

  lastModified: z.number(),

  dataUrl: z.string().min(1, "Invalid file"),
});

export const uploadAttachmentSchema = z
  .instanceof(File, {
    message: "Please select a file",
  })
  .refine((file) => file.size <= 10 * 1024 * 1024, {
    message: "File size must not exceed 10MB",
  })
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
    {
      message: "Only JPG, PNG and PDF files are allowed",
    },
  );

const attachmentSchema = z.union([
  z.instanceof(File),
  persistedAttachmentSchema,
]);

// flow one
export const stepOneSchema = z.object({
  currency: z.string().trim().min(1, "Currency is required"),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),

  attachment: z
    .array(attachmentSchema)
    .min(1, "Please upload at least one file"),

  pay_escrow_fee: z
    .enum(["CLIENT", "FREELANCER", "BOTH"])
    .nullable()
    .refine((value) => value !== null, {
      message: "Please select who pays the escrow fee",
    }),

  transaction_description: z
    .string()
    .trim()
    .min(1, "Transaction description is required"),

  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  close_deadline: z.string().min(1, "Close deadline is required"),
});

export type StepOneForm = z.infer<typeof stepOneSchema>;
