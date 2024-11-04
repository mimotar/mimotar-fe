import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import Card from "./(components)/Card";
import DoughnutChart from "./(components)/DoughnutChart";
import ChartWrapper from "./(components)/ChartWrapper";
import ChartSession from "./(components)/ChartSession";

export default function page() {
  return (
    <section className="bg-white flex flex-col h-full w-full 2xl:p-10 p-8 overflow-y-auto">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">Welcome back, Olawale</h1>
          <p className="text-neutral-900 text-sm">
            Stay updated with the overview of your escrow transactions.
          </p>
        </div>
        <PrimaryButton className="w-fit px-6 h-fit py-4">
          Create transaction
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
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
