// export interface IDispute {
//   date: string;
//   id: string;
//   transaction_id: string;
//   recipient: string;
//   status: "CREATED" | "ONGOING" | "REJECTED" | "APPROVED";
//   amount: string;
// }

export type IDisputeStatus =
  | "ongoing"
  | "resolved"
  | "cancelled"
  | "review"
  | "negotiation";

export interface IDispute {
  id: number;
  transactionId: number;
  status: IDisputeStatus; // extend if needed
  createdAt: string; // ISO date
  elapsesAt: string; // ISO date
  chatId: number | null;
  description: string;
  reason: string;
  resolutionOption: "FULL_REPAYMENT" | "PARTIAL_REPAYMENT" | string;
  evidenceUrl: string[];
  evidenceId: number[];
  buyerId: number;
  sellerId: number;
  creatorId: number;
  transaction: Transaction;
}

export interface Transaction {
  id: number;
  amount: number;
  user_id: number;
  additional_agreement: string;
  creator_fullname: string;
  creator_email: string;
  creator_no: string;
  creator_address: string;
  receiver_fullname: string;
  receiver_no: string;
  receiver_address: string;
  link_expires: boolean;
  txn_link: string;
  created_at: string; // ISO date
  inspection_duration: number;
  reciever_role: "BUYER" | "SELLER" | string;
  terms: string;
  transactionType: "ONLINE_PRODUCT" | string;
  transaction_description: string;
  pay_escrow_fee: "BOTH" | "BUYER" | "SELLER" | string;
  pay_shipping_cost: "BUYER" | "SELLER" | string;
  creator_role: "BUYER" | "SELLER" | string;
  status: string;
  currency: string;
  expiresAt: string; // ISO date
  transactionToken: string;
  reciever_email: string;
  approveStatus: boolean;
  otp: string;
  otp_created_at: string; // ISO date
  files: string[] | null;
  payment_id: string | null;
}

export interface IGetDisputesResponse {
  message: string;
  status: "success" | "error";
  data: IDispute[];
}
