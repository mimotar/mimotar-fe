"use client";

import { useState } from "react";
import FilterSection from "./FilterSection";
import TransactionsTable from "./TransactionsTable";

export default function TransactionTab() {
  const [open, setOpen] = useState(false);
  return (
    <section className="flex flex-col h-full w-full mt-6 rounded-md border border-neutral-200 p-3">
      <FilterSection />
      <TransactionsTable />
    </section>
  );
}
