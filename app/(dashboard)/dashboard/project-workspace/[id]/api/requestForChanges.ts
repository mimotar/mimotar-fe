import axiosService from "@/lib/services/axiosService";

export async function RequestChanges(id: string | number, comment: string) {
  const result = await axiosService({
    method: "POST",
    url: `ticket/${id}/request-changes`,
    data: {
      comment,
    },
  });

  return result.data;
}
