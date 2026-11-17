import axiosService from "@/lib/services/axiosService";

export type IResolvePayoutAccountAction = {
  bankCode: string;
  bankName: string;
  accountNumber: string;
};

export interface BankAccountResolveResponse {
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

export const resolvePayoutAccountAction = async (
  data: IResolvePayoutAccountAction,
) => {
  const response = await axiosService<BankAccountResolveResponse>({
    method: "PUT",
    url: "withdrawal/bank",
    data,
  });

  return response.data;
};
