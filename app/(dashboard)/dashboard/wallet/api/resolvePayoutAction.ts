import axiosService from "@/lib/services/axiosService";

export type IResolvePayoutAccountAction = {
  bankCode: string;
  bankName: string;
  accountNumber: string;
};
export const resolvePayoutAccountAction = async (
  data: IResolvePayoutAccountAction,
) => {
  const response = await axiosService({
    method: "PUT",
    url: "withdrawal/bank",
    data,
  });

  return response.data;
};
