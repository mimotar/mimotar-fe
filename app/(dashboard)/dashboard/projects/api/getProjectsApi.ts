import axiosService from "@/lib/services/axiosService";
import {
  ITransactionsResponse,
  ITransactionsResponseData,
} from "../types/ITransaction";

interface IType {
  page: number;
  limit: number;
  q?: string;
  status?: string;
}
export async function getProjectsApi({ page, limit, q, status }: IType) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (q) params.set("q", q);
  if (status) params.set("status", status);

  const response = await axiosService<ITransactionsResponse>(
    `ticket/projects?${params.toString()}`,
  );

  return response.data.data;
}
