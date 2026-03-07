import CreateTransactionSection from "./components/CreateTransactionSection";
import TabSection from "./components/TabSection";
import TransactionContainer from "./components/TransactionContainer";
import TransactionTable from "./components/TransactionTab";

export default function TransactionsPage() {
  return (
    <main className="flex flex-col h-full w-full bg-white rounded-md sm:p-6 p-3">
      <section className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#0F172A]">Transactions</h1>
        <CreateTransactionSection />
      </section>

      <TransactionContainer />
    </main>
  );
}
