import axiosService from "@/lib/services/axiosService";

export type IFreelancerWorkSubmissionPayload = {
  note: string;
  attachment: File[] | File;
};

export async function freelancerWorkSubmission(
  id: number,
  payload?: IFreelancerWorkSubmissionPayload,
) {
  const result = await axiosService({
    method: "POST",
    url: `ticket/${id}/resolve`,
    data: payload,
  });
  return result.data;
}
