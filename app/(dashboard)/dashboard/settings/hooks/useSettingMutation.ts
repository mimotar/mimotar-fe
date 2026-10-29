import { useMutation, useQuery } from "@tanstack/react-query";
import { UpdateProfile } from "../api/putProfile";
import { IProfilePayload } from "../types/ProfilePayload";
import { getProfileApi } from "../api/getProfile";
import { PostKycVerify } from "../api/PostKycVerify";
import { getKycVerifyVerification } from "../api/getKycVerification";
import { KycVerificationPayload } from "../types/kycVerifyPayload";
import { PostUploadAvatar } from "../api/uploadAvatar";
import {
  IRequestOtpPhoneVerifyPayload,
  RequestOtpForPhoneNoVerify,
} from "../api/RequestOtpForPhoneNoVerify";
import {
  ISendOtpPhoneNoVerifyPayload,
  sendOtpPhoneNoVerify,
} from "../api/sendOtpPhoneNoVerify";

export function useSettingMutation() {
  const UpdateProfileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (payload: IProfilePayload) => UpdateProfile(payload),
  });

  const postVerifyKYCMutation = useMutation({
    mutationKey: ["post-kyc-verification"],
    mutationFn: (payload: KycVerificationPayload) => PostKycVerify(payload),
  });

  const getProfile = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });

  const getKycStatus = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKycVerifyVerification,
  });

  const postUploadAvatarMutation = useMutation({
    mutationKey: ["profile-pic-mutation"],
    mutationFn: (payload: File) => PostUploadAvatar(payload),
  });

  const RequestOtpForPhoneVerificationMutation = useMutation({
    mutationKey: ["request-otp-phone-verification"],
    mutationFn: (payload: IRequestOtpPhoneVerifyPayload) =>
      RequestOtpForPhoneNoVerify(payload),
  });

  const SendOtpForPhoneVerificationMutation = useMutation({
    mutationKey: ["send-otp-phone-verification"],
    mutationFn: (payload: ISendOtpPhoneNoVerifyPayload) =>
      sendOtpPhoneNoVerify(payload),
  });

  return {
    UpdateProfileMutation,
    getProfile,
    postVerifyKYCMutation,
    getKycStatus,
    postUploadAvatarMutation,
    RequestOtpForPhoneVerificationMutation,
    SendOtpForPhoneVerificationMutation,
  };
}
