import axiosService from "@/lib/services/axiosService";

export async function CreateTicket(data: FormData) {
  const response = await axiosService({
    method: "POST",
    url: "/ticket",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  });
  return response.data;
}
