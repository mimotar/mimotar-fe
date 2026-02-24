export type TransactionStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

export type UserRole = "BUYER" | "SELLER";

export type TransactionType = "ONLINE_PRODUCT" | "SERVICE" | "PHYSICAL_PRODUCT";

export type FeePayer = "BUYER" | "SELLER";

export type Currency = "NGN" | "USD" | "EUR";

export interface Transaction {
  id: number;
  amount: number;
  user_id: number;

  additional_agreement: string;

  creator_fullname: string;
  creator_email: string;
  creator_no: string;
  creator_address: string;
  creator_role: UserRole;

  receiver_fullname: string;
  receiver_no: string;
  receiver_address: string;
  reciever_email: string; // backend typo preserved
  reciever_role: UserRole;

  transactionType: TransactionType;
  transaction_description: string;
  terms: string;

  pay_escrow_fee: FeePayer;
  pay_shipping_cost: FeePayer;

  status: TransactionStatus;
  currency: Currency;

  link_expires: boolean;
  txn_link: string;

  inspection_duration: number;

  approveStatus: boolean;

  otp: string;
  otp_created_at: string;

  transactionToken: string;

  created_at: string;
  expiresAt: string;

  files: unknown[] | null;
  payment_id: number | null;
}

export interface ApproveTransactionResponse {
  message: string;
  data: Transaction;
}
