import axiosService from "@/lib/services/axiosService";
import type {
  WithdrawalRequest,
  WithdrawalRequestsResponse,
} from "../types/IWithdrawalRequest";

export async function getWithdrawalRequests() {
  const response = await axiosService<WithdrawalRequestsResponse>({
    method: "GET",
    url: "withdrawal",
  });

  return response.data;
}
