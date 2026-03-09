"use client";

import { useState } from "react";
import FilterSection from "./FilterSection";
import TransactionsTable from "./TransactionsTable";
import { useFetch } from "@/app/hooks/useFetch";
import { TransactionsResponse } from "../types/ITransactions";

export default function TransactionTab() {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, error } = useFetch<
    TransactionsResponse,
    Error,
    TransactionsResponse
  >(["transaction"], "ticket/transactions");

  return (
    <section className="flex flex-col h-full w-full mt-6 rounded-md border border-neutral-200 p-3">
      <FilterSection />
      <TransactionsTable
        data={data?.data ?? []}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </section>
  );
}
