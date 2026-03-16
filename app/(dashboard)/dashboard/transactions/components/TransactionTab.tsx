"use client";

import { useState } from "react";
import FilterSection from "./FilterSection";
import TransactionsTable from "./TransactionsTable";
import { useFetch } from "@/app/hooks/useFetch";
import { ITransaction, TransactionsResponse } from "../types/ITransactions";
import { DisputeForm } from "./DisputeForm";
import { Row } from "@tanstack/react-table";

export default function TransactionTab() {
  const [openDispute, setOpenDispute] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<
    Row<ITransaction> | undefined
  >(undefined);

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
        setOpenDispute={setOpenDispute}
        setSelectedDispute={setSelectedDispute}
      />

      <DisputeForm
        open={openDispute}
        setOpen={setOpenDispute}
        transaction={selectedDispute}
      />
    </section>
  );
}
