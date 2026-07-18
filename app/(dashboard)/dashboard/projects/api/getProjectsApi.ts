import axiosService from "@/lib/services/axiosService";
import {
  ITransactionsResponse,
  ITransactionsResponseData,
} from "../types/ITransaction";

interface IType {
  search?: string;
}
export async function getProjectsApi({ search }: IType) {
  const response = await axiosService<ITransactionsResponse>(
    `ticket/transactions?search=${search}`,
  );

  return response.data.data;
}
