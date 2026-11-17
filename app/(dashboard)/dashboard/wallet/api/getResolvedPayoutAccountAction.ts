import axiosService from "@/lib/services/axiosService";

export interface ResolvedBankAccountFetchResponse {
  message: string;
  success: boolean;
  data: BankAccount;
}

export interface BankAccount {
  id: number;
  userId: number;
  bankName: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
}
export const getResolvedPayoutAccountAction = async () => {
  const response = await axiosService<ResolvedBankAccountFetchResponse>({
    method: "GET",
    url: "withdrawal/bank",
  });

  return response.data;
};
