"use server";

import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export async function getDispute(id: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/dispute/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      next: { tags: ["dispute"], revalidate: 120 },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching dispute:", error.message);
      throw new Error(error.message || "Error fetching dispute");
    }
    throw new Error("Unknown error fetching dispute");
  }
}
