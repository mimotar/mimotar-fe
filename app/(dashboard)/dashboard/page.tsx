import { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import Card from "./(components)/Card";
import ChartSession from "./(components)/ChartSession";
import HeaderSection from "./(components)/HeaderSection";
import { getDashboard } from "./overview-actions/getDashboard";
// import { useRouter } from "next/navigation";
import Link from "next/link";

// | string[] | undefined
interface pageProps {
  searchParams: Promise<{ [key: string]: string }>;
}
export default async function page({ searchParams }: pageProps) {
  const params = await searchParams;
  const filterByMonth = params["month"] || "1";
  const filterByYear = params["year"] || new Date().getFullYear();
  const dashboard = await getDashboard(Number(filterByMonth));

  // const navigate = useRouter();
  console.log(dashboard);
  return (
    <section className="bg-white flex flex-col h-full w-full 2xl:p-10 sm:p-8 p-3 overflow-y-auto ">
      <HeaderSection />

      <div className="grid min-[700px]:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 gap-4 mt-6">
        <Card
          className="p-6"
          amount={dashboard.data.escrowBalance ?? "NA"}
          title="Escrow balance"
        />
        <Card
          className="p-6"
          amount={dashboard.data.totalTransactions ?? "NA"}
          title="Total transactions"
          button={
            <Link
              href={"/dashboard/transactions"}
              className="cursor-pointer w-fit px-5 text-[#D946EF] border border-brand-primary rounded-md p-1.5"
            >
              View all
            </Link>
          }
        />

        <Card
          className="p-6"
          amount={dashboard.data.openDisputes ?? "NA"}
          title="Open disputes"
          button={
            <Link
              href={"dashboard/transactions?tab=disputes"}
              className="w-fit px-5 cursor-pointer text-[#D946EF] border border-brand-primary rounded-md p-1.5"
            >
              View all
            </Link>
          }
        />
      </div>

      <ChartSession
        TransactionCount={dashboard.data.transactionCount}
        amountPerPeriod={dashboard.data.amountPerPeriod}
      />
    </section>
  );
}
