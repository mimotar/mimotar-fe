import axiosinstance from "@/lib/services/axiosService";
import { KycApiResponse } from "../types/KycApiResponse";

export async function getKycVerifyVerification() {
  const KycStatus = await axiosinstance<KycApiResponse>({
    method: "GET",
    url: "kyc/status",
  });
  return KycStatus.data;
}
