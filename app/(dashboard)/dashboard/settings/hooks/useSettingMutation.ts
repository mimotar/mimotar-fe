import { useMutation, useQuery } from "@tanstack/react-query";
import { UpdateProfile } from "../api/putProfile";
import { IProfilePayload } from "../types/ProfilePayload";
import { getProfileApi } from "../api/getProfile";
import { PostKycVerify } from "../api/PostKycVerify";

export function useSettingMutation() {
  const UpdateProfileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (payload: IProfilePayload) => UpdateProfile(payload),
  });

  const verifyKYCMutation = useMutation({
    mutationKey: ["post-kyc-verification"],
    mutationFn: (payload: any) => PostKycVerify(payload),
  });

  const getProfile = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });

  return {
    UpdateProfileMutation,
    getProfile,
    verifyKYCMutation,
  };
}
