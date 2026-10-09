type KycDocumentType = "nin" | "bvn" | "passport" | "drivers_license";

export interface IPostKycVerificationResponse {
  message: string;
  success: boolean;
  data: {
    isVerified: boolean;
    kyc: {
      id: number;
      userId: number;
      isVerified: boolean;
      kycDocumentType: KycDocumentType;
      kycDocumentNumber: string;
      createdAt: string;
      updatedAt: string;
    };
    identity: {
      firstName: string;
      middleName: string;
      lastName: string;
      sureName: string;
    };
    providerResponse: Record<string, unknown>;
  };
}
