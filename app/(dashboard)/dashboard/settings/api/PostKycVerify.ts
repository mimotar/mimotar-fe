import axiosinstance from "@/lib/services/axiosService";
import { KycVerificationPayload } from "../types/kycVerifyPayload";
import { IPostKycVerificationResponse } from "../types/IPostKycApiResponse";

export async function PostKycVerify(
  payload: KycVerificationPayload,
): Promise<IPostKycVerificationResponse> {
  const KycPostResult = await axiosinstance<IPostKycVerificationResponse>({
    method: "POST",
    url: "kyc/verify",
    data: payload,
  });
  return KycPostResult.data;
}
