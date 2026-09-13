import axiosService from "@/lib/services/axiosService";

export type IExtendDeadlinePayload = {
  deadline: string;
  reason: string;
};

export async function extendDeadline(
  id: number,
  payload?: IExtendDeadlinePayload,
) {
  const result = await axiosService({
    method: "PATCH",
    url: `ticket/${id}/deadline`,
    data: payload,
  });
  return result.data;
}
