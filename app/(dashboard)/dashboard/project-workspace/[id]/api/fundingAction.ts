import axiosService from "@/lib/services/axiosService";

export async function fundProject(id: string | number) {
  const result = await axiosService({
    method: "POST",
    url: `payment/initialize/${id}`,
  });

  return result.data;
}
