import { z } from "zod";

// export interface IPersistedAttachment {
//   id: string;
//   name: string;
//   type: string;
//   size: number;
//   lastModified: number;
//   base64Url: string;
// }

export const persistedAttachmentSchema = z.object({
  id: z.string().min(1, "id is required"),
  name: z.string().min(1, "File name is required"),

  type: z.string().min(1, "File type is required"),

  size: z.number().positive("Invalid file size"),

  lastModified: z.number(),

  base64Url: z.string().min(1, "Invalid file"),
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

  close_deadline: z.coerce.date(),
});

export type StepOneForm = z.infer<typeof stepOneSchema>;
// export type StepOneFormInput = z.input<typeof stepOneSchema>;
// export type StepOneFormOutput = z.output<typeof stepOneSchema>;

// step 2(milestone)
// attachment
const milestoneAttachmentSchema = z
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
  )
  .optional();

const milestonePersistSchema = z.union([
  z.instanceof(File),
  milestoneAttachmentSchema,
]);
export const MilestonesSchema = z
  .object({
    milestones: z.array(
      z.object({
        name: z.string().min(5),
        deadline: z.string().min(5),
        amount: z.coerce.number().min(1),
        files: milestonePersistSchema,
      }),
    ),
  })
  .optional();

export type IMilestones = z.infer<typeof MilestonesSchema>;
