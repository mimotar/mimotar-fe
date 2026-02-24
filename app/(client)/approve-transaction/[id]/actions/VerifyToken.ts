"use server";
import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export async function verifyTicketToken(options: string) {
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
  return data;
}
