import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "../api/getDashboardOverview";

export function useDashboardQuery() {
  const dashboardQuery = useQuery({
    queryKey: ["dashboard overview"],
    queryFn: async (data: any) => await getDashboardOverview(data),
  });
  return dashboardQuery;
}
