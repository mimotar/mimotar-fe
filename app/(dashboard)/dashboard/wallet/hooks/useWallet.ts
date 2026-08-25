import { useQuery } from "@tanstack/react-query";
import { getWallet } from "../api/getWallet";
import { getBanks } from "../api/getBanks";

export function useWallet() {
  const wallet = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => await getWallet(),
  });

  const banks = useQuery({
    queryKey: ["banks"],
    queryFn: async () => await getBanks(),
  });

  return { wallet, banks };
}
