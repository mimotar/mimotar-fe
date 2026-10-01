import axiosService from "@/lib/services/axiosService";

export async function sendEditedTicket(id: number) {
  const result = await axiosService({
    method: "POST",
    url: `ticket/${id}/resubmit`,
  });
  return result.data;
}
