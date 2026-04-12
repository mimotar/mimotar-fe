"use server";

import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export type InitiateState = { error: boolean; msg: string };

export async function UploadProfilePic(
  prevState: InitiateState,
  actionPayload: FormData,
) {
  try {
    const session = await getServerSession(authOptions);
    const file = actionPayload.get("profilePic");

    if (!file) {
      return {
        error: true,
        msg: "No file provided",
        avatarUrl: "",
      };
    }

    const formData = new FormData();
    formData.set("avatar", file);

    const response = await fetch(`${process.env.API_BASE_URL}/profile/avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: formData,
      next: { tags: ["dispute"], revalidate: 120 },
    });
    const data = await response.json();
    console.log("upload file", data);
    return {
      error: false,
      msg: "Upload successful",
      avatarUrl: data.data.avatar,
    };
  } catch (error: any) {
    console.error("Upload error:", error.response?.data || error.message);

    return {
      error: true,
      msg: "Upload failed",
      avatarUrl: "",
    };
  }
}
