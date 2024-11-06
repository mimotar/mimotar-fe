import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import Card from "./(components)/Card";
import DoughnutChart from "./(components)/DoughnutChart";
import ChartWrapper from "./(components)/ChartWrapper";
import ChartSession from "./(components)/ChartSession";

export default function page() {
  return (
    <section className="bg-white flex flex-col h-full w-full 2xl:p-10 sm:p-8 p-3 overflow-y-auto ">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="flex flex-col">
          <h1 className="font-bold sm:text-2xl text-lg">
            Welcome back, Olawale
          </h1>
          <p className="text-neutral-900 text-sm">
            Stay updated with the overview of your escrow transactions.
          </p>
        </div>
        <PrimaryButton className="w-fit sm:px-6 px-3 h-fit sm:py-4 py-2">
          Create transaction
        </PrimaryButton>
      </div>

      <div className="grid min-[700px]:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 gap-4 mt-6">
        <Card className="p-6" amount={22400} title="Escrow balance" />
        <Card
          className="p-6"
          amount={37}
          title="Total transactions "
          button={
            <PrimaryOutline className="w-fit px-5 text-[#D946EF]">
              View all
            </PrimaryOutline>
          }
        />

        <Card
          className="p-6"
          amount={2}
          title="Open disputes"
          button={
            <PrimaryOutline className="w-fit px-5 text-[#D946EF]">
              View all
            </PrimaryOutline>
          }
        />
      </div>

      <ChartSession />
    </section>
  );
}
