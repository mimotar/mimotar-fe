import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export async function getTransaction(id: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/ticket/transactions/?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      }
    );
    // ticket/transactions
    const result = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch transaction");
    }

    return result;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw new Error("Error fetching transaction");
  }
}
