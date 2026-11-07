import axiosService from "@/lib/services/axiosService";

export const getPayoutAccountAction = async () => {
  const response = await axiosService({
    method: "GET",
    url: "withdrawal/bank",
  });

  return response.data;
};
