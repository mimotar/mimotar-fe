"use client";

import { useFetch } from "@/app/hooks/useFetch";
import DisputeFilter from "./DisputeFilter";
import DisputeTable from "./DisputeTable";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { disputeColumnDef } from "../TableColumnDef/DisputeTableColumnDef";
import { IGetDisputesResponse } from "../types/IDispute";

export default function DisputeTab() {
  const {
    isLoading,
    data: DisputeData,
    isError,
    error,
  } = useFetch<IGetDisputesResponse, Error, IGetDisputesResponse>(
    ["disputes"],
    "/dispute",
  );

  const table = useReactTable({
    data: DisputeData?.data || [],
    columns: disputeColumnDef,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="flex flex-col h-full w-full mt-6 rounded-md border border-neutral-200 p-3">
      <DisputeFilter />

      <DisputeTable
        table={table}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </section>
  );
}
