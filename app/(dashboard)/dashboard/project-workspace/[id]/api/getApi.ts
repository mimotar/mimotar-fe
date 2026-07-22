import axiosService from "@/lib/services/axiosService";
import {
  ITransactionsResponse,
  ITransactionsResponseData,
} from "../../../projects/types/ITransaction";

export async function GetProject(id: number | string) {
  const response = await axiosService<ITransactionsResponse>(`ticket/${id}`);
  return response.data.data as ITransactionsResponseData;
}
