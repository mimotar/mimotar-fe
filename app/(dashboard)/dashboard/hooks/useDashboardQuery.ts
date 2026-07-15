import { useMutation } from "@tanstack/react-query";
import { getDashboardOverview } from "../api/getDashboardOverview";

export function useDashboardQuery() {
  const dashboardMutation = useMutation({
    mutationFn: async (data: any) => await getDashboardOverview(data),
  });
  return { mutate: dashboardMutation };
}
