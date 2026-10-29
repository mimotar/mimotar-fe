import axiosService from "@/lib/services/axiosService";
import { KycApiResponse } from "../types/KycApiResponse";

export async function getKycVerifyVerification() {
  const KycStatus = await axiosService<KycApiResponse>({
    method: "GET",
    url: "kyc/status",
  });
  return KycStatus.data;
}
