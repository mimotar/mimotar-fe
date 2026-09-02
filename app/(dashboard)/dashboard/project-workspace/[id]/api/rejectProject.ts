import axiosService from "@/lib/services/axiosService";

export async function rejectTicket(
  id: string | number,
  otp: string,
  rejectionReason: string,
) {
  const result = await axiosService({
    method: "PUT",
    url: `ticket/reject/${id}`,
    data: {
      otp,
      rejection_reason: rejectionReason,
    },
  });

  return result.data;
}
