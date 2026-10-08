import axiosinstance from "@/lib/services/axiosService";
import { IProfileApiResponse } from "../types/IProfileResponse";

export async function getProfileApi() {
  const profile = await axiosinstance.get<IProfileApiResponse>("profile");
  return profile.data;
}
