import axiosinstance from "@/lib/services/axiosService";
import { IProfilePayload } from "../types/ProfilePayload";
import { IProfileApiResponse } from "../types/IProfileResponse";

export async function UpdateProfile(
  payload: IProfilePayload,
): Promise<IProfileApiResponse> {
  const profile = await axiosinstance<IProfileApiResponse>({
    method: "PUT",
    url: "profile",
    data: payload,
  });
  return profile.data;
}
