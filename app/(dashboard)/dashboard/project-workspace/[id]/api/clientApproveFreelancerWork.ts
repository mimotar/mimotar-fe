import axiosService from "@/lib/services/axiosService";

export async function clientApproveFreelancerWork(id: string | number) {
  const result = await axiosService({
    method: "PUT",
    url: `ticket/${id}/accept-resolution`,
  });

  return result.data;
}
