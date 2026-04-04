"use server";
import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export async function verifyTicketToken(options: string) {
  try {
    const session = await getServerSession(authOptions);
    // console.log("session", session);
    const res = await fetch(`${process.env.API_BASE_URL}/token/verify-token`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({ token: options }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || "Failed to verify token");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to verify token:", error);
      throw error;
    }
    console.error("Failed to verify token:", error);
    throw new Error("Error verifying token");
  }
}
