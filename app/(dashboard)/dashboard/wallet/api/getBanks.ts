import axiosService from "@/lib/services/axiosService";
import { WalletBalancesResponse } from "../types/IWallet";

export async function getBanks() {
  const result = await axiosService<{
    data: { code: string; id: number; name: string }[];
  }>("withdrawal/banks");
  return result.data.data;
}
