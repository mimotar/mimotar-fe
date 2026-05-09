import "./globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { StoreProvider } from "../lib/providers/StoreProvider";
import SessionProvider from "../lib/providers/SessionProvider";
import { getServerSession } from "next-auth";
import QueryClientProviderWrapper from "@/lib/providers/QueryClientProvider";

// const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Mimotar - Safe Escrow for Nigerian & Global Trade",
  description:
    "Buy and sell anything in Nigeria or across borders without fear. Mimotar locks payment in a secure vault until everyone is satisfied. Buyer protected. Seller guaranteed.",
  openGraph: {
    title: "Mimotar - Safe Escrow for Nigerian & Global Trade",
    description:
      "Escrow built for Nigerians and international buyers and sellers. Pay in NGN, USD, EUR, GBP. Funds held safely until delivery is confirmed.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    //inter.className
    <html lang="en" className={montserrat.variable}>
      <body>
        <QueryClientProviderWrapper>
          <SessionProvider session={session}>
            <StoreProvider>{children}</StoreProvider>
          </SessionProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
