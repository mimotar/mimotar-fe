import axiosService from "@/lib/services/axiosService";
import { DisputeFormData } from "../components/CreateDisputeDialog";

export async function RaiseDisputeApi(
  transactionId: number,
  payload: DisputeFormData,
) {
  const formData = new FormData();
  formData.append("transactionId ", transactionId.toString());
  formData.append("reason ", payload.reason);
  formData.append("description  ", payload.description);
  formData.append("resolutionOption   ", payload.resolutionOption);
  // Append each file individually
  payload.files.forEach((file) => {
    formData.append("evidence", file);
  });

  const result = await axiosService({
    method: "POST",
    url: `dispute`,
    data: formData,
  });
  return result.data;
}
