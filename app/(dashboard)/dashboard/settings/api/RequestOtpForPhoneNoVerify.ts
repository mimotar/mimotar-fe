import axiosinstance from "@/lib/services/axiosService";
import { KycVerificationPayload } from "../types/kycVerifyPayload";
import { IPostKycVerificationResponse } from "../types/IPostKycApiResponse";

export type IRequestOtpPhoneVerifyPayload = {
  phone_no: string;
};

type IRequestOtpSuccess = {
  message: string;
  success: boolean;
  data: {
    phone: string;
    expiresInMinutes: number;
  };
};
export async function RequestOtpForPhoneNoVerify(
  payload: IRequestOtpPhoneVerifyPayload,
): Promise<IRequestOtpSuccess> {
  const requestOtpPhoneVerify = await axiosinstance<IRequestOtpSuccess>({
    method: "POST",
    url: "profile/phone/send-otp",
    data: payload,
  });
  return requestOtpPhoneVerify.data;
}
