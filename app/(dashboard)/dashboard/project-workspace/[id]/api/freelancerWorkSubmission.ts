import axiosService from "@/lib/services/axiosService";

export type IFreelancerWorkSubmissionPayload = {
  note: string;
  file: File; //File[]
};

export async function freelancerWorkSubmission(
  id: number,
  payload: IFreelancerWorkSubmissionPayload,
) {
  const formData = new FormData();
  formData.append("note", payload.note);
  formData.append("file", payload.file);

  const result = await axiosService({
    method: "PUT",
    url: `ticket/${id}/resolve`,
    data: formData,
  });
  return result.data;
}
