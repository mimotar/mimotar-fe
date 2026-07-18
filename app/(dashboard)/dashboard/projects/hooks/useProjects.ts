import { useQuery } from "@tanstack/react-query";
import { getProjectsApi } from "../api/getProjectsApi";

export function useProjects(search?: string) {
  const getProjects = useQuery({
    queryKey: ["projects"],
    queryFn: async () => getProjectsApi({ search }),
  });

  return getProjects;
}
