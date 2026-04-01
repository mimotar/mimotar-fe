export type TransactionStatus =
  | "CREATED"
  | "APPROVED"
  | "REJECTED"
  | "ONGOING"
  | "COMPLETED"
  | "DISPUTE"; // ✅ added

export type DisputeStatus = "ongoing" | "resolved" | "closed"; // flexible

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

  creator_address: string;
  creator_fullname: string;
  currency: string;

  // ✅ new nested object
  dispute: IDispute | null;
}

export interface TransactionsResponse {
  message: string;
  data: ITransaction[];
}
