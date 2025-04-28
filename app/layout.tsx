import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "../lib/providers/StoreProvider";
import SessionProvider from "../lib/providers/SessionProvider";
import { getServerSession } from "next-auth";
import QueryClientProviderWrapper from "@/lib/providers/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mimotar",
    template: "%s - Mimotar",
  },
  description: "Escrow service",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <QueryClientProviderWrapper>
          <SessionProvider session={session}>
            <StoreProvider>{children}</StoreProvider>
          </SessionProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
