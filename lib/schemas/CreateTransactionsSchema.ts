import { GrAttachment } from "react-icons/gr";
import { z } from "zod";

// const transactionSchema = z.object({
//   amount: z.number(),
//   transaction_description: z.string(),
//   pay_escrow_fee: z.enum(["SELLER", "BUYER", "BOTH"]),
//   additional_agreement: z.string(),
//   pay_shipping_cost: z.enum(["SELLER", "BUYER", "BOTH"]),
//   creator_fullname: z.string(),
//   creator_email: z.string().email(),
//   creator_no: z.string(),
//   creator_address: z.string(),
//   creator_role: z.enum(["SELLER", "BUYER"]),
//   receiver_fullname: z.string(),
//   reciever_email: z.string().email(), // Consider correcting to receiver_email if needed
//   receiver_no: z.string(),
//   receiver_address: z.string(),
//   reciever_role: z.enum(["SELLER", "BUYER"]), // Consider correcting to receiver_role if needed
//   terms: z.string(),
//   transactionType: z.enum(["PHYSICAL_PRODUCT", "DIGITAL_PRODUCT", "SERVICE"]),
//   inspection_duration: z.number(),
//   expiresAt: z.number(),
// });

// export type ITransactionSchema = z.infer<typeof transactionSchema>;

// Stage 1: Basic transaction details

// Stage 2: Creator info

export const stage1TicketSchema = z.object({
  creator_fullname: z.string().min(1),
  creator_email: z.string().email(),
  creator_no: z.string(),
  creator_address: z.string().min(2),
  creator_role: z.enum(["SELLER", "BUYER"]),
});

export type IStage1TicketSchema = z.infer<typeof stage1TicketSchema>;

export const stage2TicketSchema = z.object({
  amount: z.number().min(1),
  transaction_description: z.string().min(1),
  attachment: z.array(z.any()).min(1),
  // .any()
  // .refine((files) => files instanceof FileList, {
  //   message: "Attachment must be a FileList or an array of files.",
  // })
  // .refine((files) => files instanceof FileList && files.length > 0, {
  //   message: "Please upload at least one file.",
  // })
  // .refine(
  //   (files) =>
  //     Array.from(files as FileList).every(
  //       (file) => (file as File).size < 5 * 1024 * 1024
  //     ),
  //   {
  //     message: "Each file must be less than 5MB.",
  //   }
  // ),
  transactionType: z.enum(["PHYSICAL_PRODUCT", "ONLINE_PRODUCT", "SERVICE"]),
});

export type IStage2TicketSchema = z.infer<typeof stage2TicketSchema>;

// Stage 3: Receiver info
export const stage3TicketSchema = z.object({
  pay_escrow_fee: z.enum(["SELLER", "BUYER", "BOTH"]),
  inspection_duration: z.number().min(1).max(30),
  expiresAt: z.number().min(1),
  pay_shipping_cost: z.enum(["SELLER", "BUYER", "BOTH"]),
  additional_agreement: z.string(),
  terms: z.string().min(10).max(100),
});

export type IStage3TicketSchema = z.infer<typeof stage3TicketSchema>;

// Stage 4: Final terms and settings
export const stage4TicketSchema = z.object({
  receiver_fullname: z.string().min(1),
  reciever_email: z.string().email(),
  receiver_no: z.string().min(8),
  receiver_address: z.string().min(10),
  reciever_role: z.enum(["SELLER", "BUYER"]),
});

export type IStage4TicketSchema = z.infer<typeof stage4TicketSchema>;

// Merged Schema: All Stages Combined
export const mergedTicketSchema = stage1TicketSchema
  .merge(stage2TicketSchema)
  .merge(stage3TicketSchema)
  .merge(stage4TicketSchema);

export type IMergedTicketSchema = z.infer<typeof mergedTicketSchema>;
