import axiosService from "@/lib/services/axiosService";

export async function rejectTicket(
  id: string | number,
  rejectionReason: string,
) {
  const result = await axiosService({
    method: "PUT",
    url: `ticket/reject/${id}`,
    data: {
      rejection_reason: rejectionReason,
    },
  });

  return result.data;
}
