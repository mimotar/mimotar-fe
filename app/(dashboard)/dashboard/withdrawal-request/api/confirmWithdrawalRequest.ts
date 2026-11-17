import axiosService from "@/lib/services/axiosService";
import type {
  WithdrawalConfirmationResponse,
  WithdrawalConfirmationVariables,
} from "../types/IWithdrawalRequest";

export async function confirmWithdrawalRequest({
  requestId,
  otp,
}: WithdrawalConfirmationVariables) {
  const response = await axiosService<WithdrawalConfirmationResponse>({
    method: "POST",
    url: `withdrawal/${requestId}/confirm`,
    data: { otp },
  });

  return response.data;
}
