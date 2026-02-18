"use server";
import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export async function verifyTicketToken() {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.API_BASE_URL}/ticket/{id}/request-token`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    },
  );

  const data = await res.json();
  return data;
}
