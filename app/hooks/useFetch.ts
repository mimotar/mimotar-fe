import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import axiosService from "@/lib/services/axiosService";

interface UseQueryFacadeOptions<TQueryFnData, TError, TData>
  extends UseQueryOptions<TQueryFnData, TError, TData> {}

export function useFetch<TQueryFnData, TError, TData = TQueryFnData>(
  queryKey: any[],
  url: string,
  options?: UseQueryFacadeOptions<TQueryFnData, TError, TData>
): UseQueryResult<TData, TError> & { refresh: () => void } {
  const query = useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: async () => {
      const response = await axiosService.get(url);
      return response.data;
    },
    ...options,
  });

  const refresh = () => {
    query.refetch();
  };

  return {
    ...query,
    refresh,
  };
}
