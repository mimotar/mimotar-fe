// "use server";

// import { authOptions } from "@/app/api/auth/authOptions";
// import { getServerSession } from "next-auth";

// export async function GetCurrentSetting() {
//   const session = await getServerSession(authOptions);
//   try {
//     const response = await fetch(`${process.env.API_BASE_URL}/settings`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session?.user?.accessToken}`,
//       },
//       next: { tags: ["setting"], revalidate: 3600 },
//     });

//     const result = await response.json();
//     if (!response.ok) {
//       throw new Error(result?.message || "Failed to fetch user setting");
//     }

//     return result.data;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Failed to fetch user setting:", error);
//       throw error;
//     }
//     console.error("Failed to fetch user setting:", error);
//     throw new Error("Failed to fetch user setting");
//   }
// }
