type TransactionTimelineHistory = {
  transaction_created_at: string;
  agreement_accepted_at: string | null;
  payment_sent_to_escrow_at: string | null;
  inspection_started_at: string | null;
  inspection_completed_at: string | null;
  transaction_completed_at: string | null;
};

export type AttachmentFile = {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileId: string;
};

export type TransactionStatus =
  | "CREATED"
  | "APPROVED"
  | "REJECTED"
  | "ONGOING"
  | "COMPLETED"
  | "DISPUTE"
  | "EXPIRED"
  | "PENDING_CLOSURE"; // ✅ added

export type ITicket = {
  id: string;
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
  created_at: string; // ISO date string
  inspection_duration: number;
  reciever_role: "BUYER" | "SELLER"; // assuming fixed roles
  terms: string;
  transactionType: "PHYSICAL_PRODUCT" | "ONLINE_PRODUCT" | "SERVICE";
  transaction_description: string;
  pay_escrow_fee: "SELLER" | "BUYER" | "BOTH"; // assuming these are the only options
  pay_shipping_cost: "SELLER" | "BUYER" | "BOTH"; // assuming these are the only options
  creator_role: "BUYER" | "SELLER"; // same assumption
  status: TransactionStatus;
  // extend with other status values as needed
  currency: string;
  expiresAt: string; // ISO date string
  transactionToken: string;
  reciever_email: string;
  approveStatus: boolean;
  files: AttachmentFile | null; // adjust type if files are structured
  payment_id: number | null;
  rejection_reason: string;
  history: TransactionTimelineHistory;
};
