export type TransactionStatus =
  | "CREATED"
  | "APPROVED"
  | "REJECTED"
  | "ONGOING"
  | "COMPLETED"
  | "DISPUTE"
  | "EXPIRED"
  | "PENDING_CLOSURE";

export type DisputeStatus = "ongoing" | "resolved" | "closed";

export type Currency = "NGN" | "USD";

export type UserRole = "CLIENT" | "FREELANCER";

export type TransactionType =
  | "MILESTONE_BASED_PROJECT"
  | "PHYSICAL_PRODUCT"
  | "ONLINE_PRODUCT"
  | "SERVICE";

export type EscrowFeePayer = "BOTH";

// got this from previous type

export type PaymentMethod = "USSD" | "CARD" | "TRANSFER" | string;

export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED" | string;

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

export interface TransactionFile {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileId: string;
}

export interface TransactionHistory {
  transaction_created_at: string;
  agreement_accepted_at: string | null;
  payment_sent_to_escrow_at: string | null;
  inspection_started_at: string | null;
  inspection_completed_at: string | null;
  transaction_completed_at: string | null;
}

export interface Milestone {
  id: number;
  transaction_id: number;
  sequence: number;
  name: string;
  amount: number;
  deadline: string;
  files: TransactionFile[];
  status: TransactionStatus;
  activatedAt: string | null;
  completedAt: string | null;
  releasedAt: string | null;
  images: unknown[];
  deadlineExtensions: unknown[];
}

export interface Transaction {
  id: number;
  title: string;
  receiver_fullname: string;
  reciever_email: string; // Backend uses this spelling
  creator_email: string;
  created_at: string;

  transactionToken: string;
  txn_link: string;

  amount: number;
  transaction_description: string;

  files: TransactionFile[] | null;

  status: TransactionStatus;

  creator_address: string;
  creator_fullname: string;

  currency: Currency;

  dispute: DisputeStatus[];
  payment: Payment | null; //got from old type. subject to change
  earnings: unknown[];

  inspection_duration: number;

  reciever_role: UserRole;
  creator_role: UserRole;

  terms: unknown | null;

  transactionType: TransactionType;

  pay_escrow_fee: EscrowFeePayer;
  pay_shipping_cost: unknown | null;

  receiver_address: string;
  receiver_no: string;

  expiresAt: string;
  link_expires: boolean;
  deadline: string;

  deadlineExtensions: unknown[];

  milestones: Milestone[];

  history: TransactionHistory;
}

export type ITransactionsResponseData = Transaction[];
export type ITransactionsResponse = {
  message: string;
  data: ITransactionsResponseData;
};
