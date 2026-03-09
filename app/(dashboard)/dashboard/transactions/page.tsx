import CreateTransactionSection from "./components/CreateTransactionSection";
import TransactionContainer from "./components/TransactionContainer";

export default function TransactionsPage() {
  return (
    <main className="flex flex-col h-full w-full bg-white rounded-md sm:p-6 p-3">
      <section className="flex flex-wrap gap-2 justify-between items-center">
        <h1 className="sm:text-xl text-lg font-bold text-[#0F172A]">
          Transactions
        </h1>
        <CreateTransactionSection />
      </section>

      <TransactionContainer />
    </main>
  );
}
