import axiosService from "@/lib/services/axiosService";

type IUploadProfileReturn = {
  message: string;
  success: boolean;
  data: {
    avatar: string;
  };
};

export async function PostUploadAvatar(payload: File) {
  const formData = new FormData();
  formData.set("avatar", payload);
  console.log("server file", formData);
  const ProfilePicPostResult = await axiosService<IUploadProfileReturn>({
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "profile/avatar",
    data: formData,
  });
  return ProfilePicPostResult.data;
}
