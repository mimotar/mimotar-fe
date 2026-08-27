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
  currency: z.enum(["NGN", "USD"]),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),

  files: z.array(attachmentSchema).min(1, "Please upload at least one file"),

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

  deadline: z.coerce.date(),
  expiresAt: z.number().positive("Amount must be greater than 0"),
  transactionType: z.enum([
    "PHYSICAL_PRODUCT",
    "ONLINE_PRODUCT",
    "SERVICE",
    "RENTAL",
    "MILESTONE_BASED_PROJECT",
  ]),

  inspection_duration: z.number().positive("Amount must be greater than 0"),
});

// export type StepOneForm = z.infer<typeof stepOneSchema>;
export type StepOneForm = z.input<typeof stepOneSchema>;
// export type StepOneFormInput = z.input<typeof stepOneSchema>;
// export type StepOneFormOutput = z.output<typeof stepOneSchema>;

// flow 2(milestone)
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

const milestonePersistFinalAttachmentSchema = z.union([
  z.instanceof(File),
  milestoneAttachmentSchema,
]);
export const MilestonesSchema = z.object({
  milestones: z
    .array(
      z.object({
        name: z.string().min(5),
        deadline: z.string().min(5),
        amount: z.coerce.number().min(1),
        files: milestonePersistFinalAttachmentSchema,
      }),
    )
    .optional(),
});

export type IMilestones = z.infer<typeof MilestonesSchema>;

// flow 3
export const stepThreeSchema = z.object({
  counterpartyRole: z.enum(["CLIENT", "FREELANCER", "BUYER", "SELLER"]),

  counterpartyName: z
    .string()
    .trim()
    .min(1, "Counterparty Legal Name is required")
    .max(255, "Counterparty Legal Name cannot exceed 255 characters"),

  counterpartyEmail: z
    .string()
    .trim()
    .min(1, "Counterparty Email Address is required")
    .email("Please enter a valid counterparty email (e.g., name@email.com)"),

  counterpartyPhone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^[+]?[0-9\s()-]{7,20}$/.test(value), {
      message: "Please enter a valid phone number",
    }),

  counterpartyAddress: z
    .string()
    .trim()
    .min(1, "Creator Address is required")
    .max(400, "Creator Address cannot exceed 400 characters"),

  //creator
  creator_no: z
    .string()
    .trim()
    .refine((value) => !value || /^[+]?[0-9\s()-]{7,20}$/.test(value), {
      message: "Please enter a valid phone number",
    }),

  creator_address: z
    .string()
    .trim()
    .min(1, "Creator Address is required")
    .max(400, "Creator Address cannot exceed 400 characters"),
});

export type StepThreeForm = z.infer<typeof stepThreeSchema>;

// flow 4
export const creatorSchema = z.object({
  creator_address: z
    .string()
    .trim()
    .min(1, "Creator wallet address is required")
    .optional(),

  creator_email: z
    .string()
    .trim()
    .min(1, "Creator email is required")
    .email("Please enter a valid email address"),

  creator_fullname: z
    .string()
    .trim()
    .min(1, "Creator full name is required")
    .max(255, "Creator full name cannot exceed 255 characters"),

  creator_no: z
    .string()
    .trim()
    .min(1, "Creator phone number is required")
    .refine((value) => /^[+]?[0-9\s()-]{7,20}$/.test(value), {
      message: "Please enter a valid phone number",
    })
    .optional(),

  creator_role: z.enum(["CLIENT", "FREELANCER"]),
});

export type CreatorForm = z.infer<typeof creatorSchema>;

export const createTransactionSchema = stepOneSchema
  .merge(MilestonesSchema)
  .merge(stepThreeSchema)
  .merge(creatorSchema);

export type CreateTransactionInput = z.input<typeof createTransactionSchema>;

export type CreateTransaction = z.infer<typeof createTransactionSchema>;
