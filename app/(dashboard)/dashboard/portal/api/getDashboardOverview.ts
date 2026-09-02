import axiosService from "@/lib/services/axiosService";
import { DashboardSummaryResponse } from "../types/IGetDashboard";

export async function getDashboardOverview() {
  const response = await axiosService<DashboardSummaryResponse>("dashboard");
  return response.data.data;
}
