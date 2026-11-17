import { useMutation, useQuery } from "@tanstack/react-query";
import { getWallet } from "../api/getWallet";
import { getBanks } from "../api/getBanks";
import {
  IResolvePayoutAccountAction,
  resolvePayoutAccountAction,
} from "../api/resolvePayoutAction";
import { getResolvedPayoutAccountAction } from "../api/getResolvedPayoutAccountAction";
import { IPayoutRequestAction, PayoutRequestAction } from "../api/payoutAction";
import {
  ConfirmPayoutAction,
  IConfirmPayoutAction,
} from "../api/ConfirmPayoutAction";

export function useWallet() {
  const wallet = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => await getWallet(),
  });

  const banks = useQuery({
    queryKey: ["banks"],
    queryFn: async () => await getBanks(),
  });

  const resolvePayoutAccount = useMutation({
    mutationKey: ["resolvePayoutAccount"],
    mutationFn: async (data: IResolvePayoutAccountAction) =>
      await resolvePayoutAccountAction(data),
  });

  const getResolvedPayoutAccount = useQuery({
    queryKey: ["get-resolved-payout-account"],
    queryFn: async () => await getResolvedPayoutAccountAction(),
  });

  const PayoutRequest = useMutation({
    mutationKey: ["payout-request"],
    mutationFn: async (data: IPayoutRequestAction) =>
      await PayoutRequestAction(data),
  });

  const ConfirmPayout = useMutation({
    mutationKey: ["confirm-payout"],
    mutationFn: async (data: IConfirmPayoutAction) =>
      await ConfirmPayoutAction(data),
  });

  return {
    wallet,
    banks,
    resolvePayoutAccount,
    getResolvedPayoutAccount,
    PayoutRequest,
    ConfirmPayout,
  };
}
