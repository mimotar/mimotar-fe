export type KycDocumentType =
  | "nin"
  | "passport"
  | "drivers_license"
  | "voters_card";

export interface KycApiResponse {
  message: string;
  success: boolean;
  data: {
    id: number;
    userId: number;
    isVerified: boolean;
    kycDocumentType: KycDocumentType;
    kycDocumentNumber: string;
    createdAt: string;
    updatedAt: string;
  };
}
