import axiosService from "@/lib/services/axiosService";
import { IPayoutRequestAction } from "./payoutAction";

export type IConfirmPayoutAction = {
  otp: string;
};

export const ConfirmPayoutAction = async (data: IConfirmPayoutAction) => {
  const response = await axiosService({
    method: "POST",
    url: `withdrawal/{id}/confirm`,
    data,
  });

  return response.data;
};
