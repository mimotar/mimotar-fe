export type DisputeTabKey = "details" | "progress";

export type DisputeStatus =
  | "In Negotiation"
  | "Dispute Opened"
  | "Resolved"
  | "Cancelled";

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
  status: DisputeStatus;
  countdown: CountdownData;
  transactionSummary: TransactionSummary;
  disputeSummary: DisputeSummary;
  progressEvents: ProgressEvent[];
}
