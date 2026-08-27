import axiosService from "@/lib/services/axiosService";

export async function approveTicket(id: string | number) {
  const result = await axiosService({
    method: "PUT",
    url: `ticket/approve/${id}`,
  });

  return result.data;
}
