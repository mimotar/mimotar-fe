export type DisputeTabKey = "details" | "progress";

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
}

export interface TransactionSummary {
  transactionId: string;
  transactionDate: string;
  sellerName: string;
  buyerName: string;
  paymentMethod: string;
  totalAmount: string;
}

export interface EvidenceFile {
  id: string;
  fileName: string;
  submittedAt: string;
  fileType: "pdf" | "image" | "other";
}

export interface DisputeSummary {
  reasonForDispute: string;
  proposal: string;
  submissionDate: string;
  evidence: EvidenceFile[];
}

export interface ProgressEvent {
  id: string;
  dateLabel: string;
  timeLabel: string;
  title: string;
  color: "accent" | "neutral";
}

export interface DisputePageViewModel {
  id: string;
  status: IDisputeStatus;
  countdown: CountdownData;
  transactionSummary: TransactionSummary;
  disputeSummary: DisputeSummary;
  progressEvents: ProgressEvent[];
}

// new one
export type IDisputeStatus =
  | "ongoing"
  | "resolved"
  | "cancelled"
  | "review"
  | "negotiation";

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
}

export interface GetDisputeResponse {
  message: string;
  status: "success" | "error";
  payload: Dispute;
}
