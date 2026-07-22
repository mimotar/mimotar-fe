import { useQuery } from "@tanstack/react-query";
import { GetProject } from "../api/getApi";

export function useProjectApp(id: string | number) {
  const getProject = useQuery({
    queryKey: ["project", id],
    queryFn: () => GetProject(id),
  });

  return { getProject };
}
