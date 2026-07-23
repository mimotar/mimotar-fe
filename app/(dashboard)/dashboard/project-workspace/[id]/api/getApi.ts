import axiosService from "@/lib/services/axiosService";
import {
  ITransaction,
  ITransactionsResponse,
  ITransactionsResponseData,
} from "../../../projects/types/ITransaction";

export async function GetProject(id: number | string) {
  const response = await axiosService<{
    message: string;
    data: ITransaction;
  }>(`ticket/${id}`);
  return response.data.data as ITransaction;
}
