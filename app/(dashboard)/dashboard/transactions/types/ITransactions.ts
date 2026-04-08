export type TransactionStatus =
  | "CREATED"
  | "APPROVED"
  | "REJECTED"
  | "ONGOING"
  | "COMPLETED"
  | "DISPUTE"
  | "PENDING_CLOSURE"; // ✅ added

export type DisputeStatus = "ongoing" | "resolved" | "closed"; // flexible

export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED" | string;
export type PaymentMethod = "USSD" | "CARD" | "TRANSFER" | string;
export type ROLE = "BUYER" | "SELLER" | "BOTH";
export type TransactionType = "PHYSICAL_PRODUCT" | "ONLINE_PRODUCT" | "SERVICE";

export type ResolutionOption =
  | "FULL_REFUND"
  | "PARTIAL_REPAYMENT"
  | "NO_REFUND";

export interface IDispute {
  id: number;
  transactionId: number;
  status: DisputeStatus;
  createdAt: string;
  elapsesAt: string;
  chatId: number | null;
  description: string;
  reason: string;
  resolutionOption: ResolutionOption;
  evidenceUrl: string[];
  evidenceId: number[];
  buyerId: number;
  sellerId: number;
  creatorId: number;
}

export interface Payment {
  id: number;
  transaction_id: number;
  transaction_reference: string;
  amount: number;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  title: string;
}

export interface ITransaction {
  id: number;
  receiver_fullname: string;
  reciever_email: string;
  creator_email: string;
  created_at: string;
  transactionToken: string;
  txn_link: string;
  amount: number;
  transaction_description: string;
  files: string | null;
  status: TransactionStatus;
  inspection_duration: number;
  creator_address: string;
  creator_fullname: string;
  currency: string;
  reciever_role: ROLE;
  terms: string;
  transactionType: TransactionType;
  pay_escrow_fee: ROLE;
  creator_role: "BUYER" | "SELLER";
  receiver_address: string;
  receiver_no: string;
  earnings: any | null;
  // ✅ new nested object
  dispute: IDispute | null;
  payment: Payment | null;
  link_expires: boolean;
  expiresAt: string;
}

export interface TransactionsResponse {
  message: string;
  data: ITransaction[];
}
