import axiosService from "@/lib/services/axiosService";
import { WalletBalancesResponse } from "../types/IWallet";

export async function getWallet() {
  const result = await axiosService<WalletBalancesResponse>("wallet/balances");
  return result.data.data;
}
