import axiosService from "@/lib/services/axiosService";

export async function requestProjectToken(id: string | number) {
  const result = await axiosService({
    method: "POST",
    url: `ticket/${id}/request-token`,
  });

  return result.data;
}
