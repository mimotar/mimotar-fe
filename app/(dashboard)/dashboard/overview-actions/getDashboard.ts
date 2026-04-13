"use server";

import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { DashboardSummaryResponse } from "../types/IGetDashboard";

export async function getDashboard(
  month: number,
  year?: string,
): Promise<DashboardSummaryResponse> {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/dashboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      next: { tags: ["dashboard_overview"], revalidate: 120 },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching dispute:", error.message);
      throw new Error(error.message || "Error fetching Dashboard Aggregate");
    }
    throw new Error("Error fetching Dashboard Aggregate");
  }
}
