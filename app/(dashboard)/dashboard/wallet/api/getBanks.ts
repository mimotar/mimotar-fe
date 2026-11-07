import axiosService from "@/lib/services/axiosService";

export async function getBanks() {
  const result = await axiosService<{
    data: { code: string; id: number; name: string }[];
  }>("withdrawal/banks");
  return result.data.data;
}
