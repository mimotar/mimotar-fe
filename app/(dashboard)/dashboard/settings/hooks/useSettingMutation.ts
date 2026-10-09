import { useMutation, useQuery } from "@tanstack/react-query";
import { UpdateProfile } from "../api/putProfile";
import { IProfilePayload } from "../types/ProfilePayload";
import { getProfileApi } from "../api/getProfile";
import { PostKycVerify } from "../api/PostKycVerify";
import { getKycVerifyVerification } from "../api/getKycVerification";
import { KycVerificationPayload } from "../types/kycVerifyPayload";

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

  return {
    UpdateProfileMutation,
    getProfile,
    postVerifyKYCMutation,
    getKycStatus,
  };
}
