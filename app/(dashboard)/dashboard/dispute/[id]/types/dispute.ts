export type DisputeTabKey = "details" | "progress";

// export interface CountdownData {
//   days: number;
//   hours: number;
//   minutes: number;
// }

// export interface TransactionSummary {
//   transactionId: string;
//   transactionDate: string;
//   sellerName: string;
//   buyerName: string;
//   paymentMethod: string;
//   totalAmount: string;
// }

export interface EvidenceFile {
  id: string;
  fileName: string;
  submittedAt: string;
  fileType: "pdf" | "image" | "other";
}

// export interface DisputeSummary {
//   reasonForDispute: string;
//   proposal: string;
//   submissionDate: string;
//   evidence: EvidenceFile[];
// }

export interface ProgressEvent {
  id: string;
  dateLabel: string;
  timeLabel: string;
  title: string;
  color: "accent" | "neutral";
}

// export interface DisputePageViewModel {
//   id: string;
//   status: IDisputeStatus;
//   countdown: CountdownData;
//   transactionSummary: TransactionSummary;
//   disputeSummary: DisputeSummary;
//   progressEvents: ProgressEvent[];
// }

// new one
export type IDisputeStatus =
  | "ongoing"
  | "resolved"
  | "cancelled"
  | "review"
  | "negotiation"
  | "pending_closure";

export type ResolutionOption = "FULL_REPAYMENT" | "PARTIAL_REPAYMENT";

export interface Dispute {
  id: number;
  transactionId: number;
  status: IDisputeStatus;
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
  transaction: Transaction | null;
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

export interface GetDisputeResponse {
  message: string;
  status: "success" | "error";
  payload: Dispute;
}
