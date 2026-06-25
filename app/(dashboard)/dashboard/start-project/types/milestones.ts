export interface Milestone {
  id: string;
  title: string;
  amount: number;
  deadline: string;
  isCompleted: boolean;
  isApproved: boolean;
  deliveryNotes?: string;
  deliveryFile?: string;
  deliveryFiles?: string[];
  completedAt?: string;
  releasedAt?: string;
  isSubmitted?: boolean;
  submittedAt?: string; // ISO String
  isDisputed?: boolean;
  disputedBy?: "client" | "freelancer";
  disputeReason?: string;
  disputedAt?: string;
  disputeStatus?: "none" | "pending" | "resolved";
}
