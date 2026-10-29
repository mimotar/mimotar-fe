import axiosinstance from "@/lib/services/axiosService";

export type ISendOtpPhoneNoVerifyPayload = {
  otp: string;
};

type ISendOtpPhoneNoVerifySuccess = {
  message: string;
  success: boolean;
  data: {
    fullName: string;
    email: string;
    phone_no: string;
    phoneVerified: boolean;
    address: string;
    avatar: string;
    avatarUrl: string;
    profilePicture: string;
    profile_picture: string;
    profilePictureUrl: string;
    city: string;
    country: string;
    postal_code: string;
    id_number: string;
  };
};
export async function sendOtpPhoneNoVerify(
  payload: ISendOtpPhoneNoVerifyPayload,
): Promise<ISendOtpPhoneNoVerifySuccess> {
  const req = await axiosinstance<ISendOtpPhoneNoVerifySuccess>({
    method: "POST",
    url: "profile/phone/verify-otp",
    data: payload,
  });
  return req.data;
}
