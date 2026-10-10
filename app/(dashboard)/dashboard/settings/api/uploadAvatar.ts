import axiosinstance from "@/lib/services/axiosService";
import { KycVerificationPayload } from "../types/kycVerifyPayload";
import { IPostKycVerificationResponse } from "../types/IPostKycApiResponse";

export async function PostUploadAvatar(payload: File) {
  const KycPostResult = await axiosinstance<IPostKycVerificationResponse>({
    method: "POST",
    url: "profile/avatar",
    data: { avatar: payload },
  });
  return KycPostResult.data;
}
