import axiosService from "@/lib/services/axiosService";

export async function approveTicket(
  id: string | number,
  otp: string,
) {
  const result = await axiosService({
    method: "PUT",
    url: `ticket/approve/${id}`,
    data: {
      otp,
    },
  });

  return result.data;
}
