import { useQuery } from "@tanstack/react-query";
import { getWithdrawalRequests } from "../api/getWithdrawalRequests";

export function useWithdrawalRequests() {
  return useQuery({
    queryKey: ["withdrawal-requests"],
    queryFn: getWithdrawalRequests,
  });
}
