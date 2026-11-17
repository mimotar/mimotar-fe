import type { Currency } from "@/app/utils/formatNumberToCurrency";

export type WithdrawalStatus =
  | "OTP_PENDING"
  | "CANCELLED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export interface WithdrawalRequest {
  id: number;
  userId: number;
  amount: number;
  currency: Currency;
  status: WithdrawalStatus;
  reference: string;
  bankAccountId: number;
  accountBank: string;
  accountNumber: string;
  accountName: string;
  providerTransferId: string | null;
  failureReason: string | null;
  otpCreatedAt: string | null;
  processedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawalRequestsResponse {
  message: string;
  success: boolean;
  data: WithdrawalRequest[];
}

export interface WithdrawalConfirmationVariables {
  requestId: WithdrawalRequest["id"];
  otp: string;
}

export interface WithdrawalConfirmationResponse {
  message?: string;
}
