import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmWithdrawalRequest } from "../api/confirmWithdrawalRequest";
import type { WithdrawalConfirmationVariables } from "../types/IWithdrawalRequest";

export function useConfirmWithdrawalRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["confirm-withdrawal"],
    mutationFn: (variables: WithdrawalConfirmationVariables) =>
      confirmWithdrawalRequest(variables),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["withdrawal-requests"],
      });
    },
  });
}
