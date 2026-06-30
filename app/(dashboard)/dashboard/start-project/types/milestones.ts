import { IPersistedAttachment } from "./ITicket";

export interface Milestone {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  files?: IPersistedAttachment[];
  // isCompleted: boolean;
  // isApproved: boolean;
  // deliveryNotes?: string;
  // deliveryFile?: string;
  // files?: IPersistedAttachment[];
  // deliveryFiles?: IPersistedAttachment[];
  // completedAt?: string;
  // releasedAt?: string;
  // isSubmitted?: boolean;
  // submittedAt?: string; // ISO String
  // isDisputed?: boolean;
  // disputedBy?: "client" | "freelancer";
  // disputeReason?: string;
  // disputedAt?: string;
  // disputeStatus?: "none" | "pending" | "resolved";
}
