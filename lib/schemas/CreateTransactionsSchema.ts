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
export const stage1Schema = z.object({
  creator_fullname: z.string().min(1),
  creator_email: z.string().email(),
  creator_no: z.string(),
  creator_address: z.string().min(2),
  creator_role: z.enum(["SELLER", "BUYER"]),
});

export type IStage1Schema = z.infer<typeof stage1Schema>;

const stage2Schema = z.object({
  amount: z.number(),
  transaction_description: z.string(),
  pay_escrow_fee: z.enum(["SELLER", "BUYER", "BOTH"]),
  pay_shipping_cost: z.enum(["SELLER", "BUYER", "BOTH"]),
});

// Stage 3: Receiver info
const stage3Schema = z.object({
  receiver_fullname: z.string(),
  reciever_email: z.string().email(),
  receiver_no: z.string(),
  receiver_address: z.string(),
  reciever_role: z.enum(["SELLER", "BUYER"]),
});

// Stage 4: Final terms and settings
const stage4Schema = z.object({
  additional_agreement: z.string(),
  terms: z.string(),
  transactionType: z.enum(["PHYSICAL_PRODUCT", "DIGITAL_PRODUCT", "SERVICE"]),
  inspection_duration: z.number(),
  expiresAt: z.number(),
});
