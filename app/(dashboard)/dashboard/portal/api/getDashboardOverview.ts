import axiosService from "@/lib/services/axiosService";

export async function getDashboardOverview(data: any) {
  const response = await axiosService("dashboard");
  return response.data;
}
