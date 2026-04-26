import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import axiosService from "@/lib/services/axiosService";
import { AxiosError } from "axios";

interface UseQueryFacadeOptions<
  TQueryFnData,
  TError,
  TData,
> extends UseQueryOptions<TQueryFnData, TError, TData> {}

export function useFetch<TQueryFnData, TError, TData = TQueryFnData>(
  queryKey: any[],
  url: string,
  options?: UseQueryFacadeOptions<TQueryFnData, TError, TData>,
): UseQueryResult<TData, TError> & { refresh: () => void } {
  const query = useQuery<TQueryFnData, TError, TData>({
    queryKey,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    queryFn: async () => {
      try {
        const response = await axiosService.get(url);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data || "failed to fetch data");
        }

        if (error instanceof AxiosError) {
          throw new Error(error.message || "failed to fetch data");
        }
        throw error;
      }
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
