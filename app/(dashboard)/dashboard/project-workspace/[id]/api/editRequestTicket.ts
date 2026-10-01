import axiosService from "@/lib/services/axiosService";
import { MakeChangesPayload } from "../schema/makeChanges";

export async function editRequestedTicket(
  id: string | number,
  data: MakeChangesPayload,
) {
  console.log("JSON DATA", data);
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("amount", data.amount.toString());
  formData.append("transaction_description", data.transaction_description);
  formData.append("terms", data.terms);
  formData.append("additional_agreement", data.additional_agreement);
  formData.append("deadline", data.deadline);
  formData.append("inspection_duration", data.inspection_duration.toString());
  formData.append("pay_escrow_fee", data.pay_escrow_fee);
  formData.append("pay_shipping_cost", data.pay_shipping_cost);

  // Append each file individually
  data.files.forEach((file) => {
    formData.append("files", file);
  });

  const result = await axiosService({
    method: "PATCH",
    url: `ticket/${id}/revise`,
    data: formData,
  });

  return result.data;
}
