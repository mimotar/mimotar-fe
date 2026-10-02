import axiosService from "@/lib/services/axiosService";

export async function rejectDeliverable(id: string | number, reason: string) {
  const result = await axiosService({
    method: "PUT",
    url: `ticket/${id}/reject-resolution`,
    data: {
      reason,
    },
  });

  return result.data;
}
