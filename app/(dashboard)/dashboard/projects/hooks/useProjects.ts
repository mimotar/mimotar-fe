import { useQuery } from "@tanstack/react-query";
import { getProjectsApi } from "../api/getProjectsApi";
import type { TransactionStatus } from "../types/ITransaction";

export function useProjects({
  page,
  limit,
  q,
  status,
}: {
  page: number;
  limit: number;
  q?: string;
  status?: TransactionStatus;
}) {
  const getProjects = useQuery({
    queryKey: ["projects", page, limit, q, status],
    queryFn: async () => getProjectsApi({ page, limit, q, status }),
    placeholderData: (previousData) => previousData,
  });

  return getProjects;
}
