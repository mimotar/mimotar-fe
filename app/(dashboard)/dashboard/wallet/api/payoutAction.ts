import axiosService from "@/lib/services/axiosService";

export type IPayoutRequestAction = {
  amount: number;
  currency: "NGN" | "USD";
};

export const PayoutRequestAction = async (data: IPayoutRequestAction) => {
  const response = await axiosService({
    method: "POST",
    url: "withdrawal/request",
    data,
  });

  return response.data;
};
