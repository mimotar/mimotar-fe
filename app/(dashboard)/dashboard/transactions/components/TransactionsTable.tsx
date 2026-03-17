import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  Row,
} from "@tanstack/react-table";
import { ITransaction } from "../types/ITransactions";
import { transactionColumnsFn } from "../TableColumnDef/TransactionsColumnDef";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { TransactionsViewTab } from "./TransactionsViewTab";
import { Images } from "@/app/Images";

interface ITransactionsTableProps {
  data: ITransaction[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  setOpenDispute: Dispatch<SetStateAction<boolean>>;
  setSelectedDispute: Dispatch<SetStateAction<Row<ITransaction> | undefined>>;
}

export default function TransactionsTable({
  data,
  isLoading,
  isError,
  error,
  setOpenDispute,
  setSelectedDispute,
}: ITransactionsTableProps) {
  const [isView, setIsView] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Row<ITransaction>>();

  const handleSetSelectedDispute = (row: Row<ITransaction>) => {
    setOpenDispute(true);
    setSelectedDispute(row);
  };

  const transactionColumns = transactionColumnsFn(handleSetSelectedDispute);

  const table = useReactTable({
    data: data ?? [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading state (outside table)
  if (isLoading) {
    return (
      <section className="mt-4 flex justify-center items-center py-10">
        <p className="text-gray-500">Loading transactions...</p>
      </section>
    );
  }

  // Error state (outside table)
  if (isError) {
    return (
      <section className="mt-4 flex justify-center items-center py-10">
        <p className="text-red-500">
          {error?.message ?? "Failed to load transactions"}
        </p>
      </section>
    );
  }

  return (
    <section className="mt-4 w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead className="border-b bg-[#FDF4FF]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Body */}
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  setSelectedTransaction(row);
                  setIsView(true);
                }}
                className="odd:bg-white cursor-pointer even:bg-[#F1F5F9] hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table.getAllColumns().length}>
                <div className="w-full flex flex-col items-center justify-center py-16">
                  <Image
                    src={Images.NoDataTransactionImg}
                    height={100} // adjust size as needed
                    width={100}
                    alt="No transactions"
                  />
                  <p className="mt-2 text-neutral-600">
                    You don’t have any transactions yet.
                  </p>
                  <button
                    type="button"
                    className="mt-5 text-brand-primary border border-brand-primary/70 rounded-md py-1 px-3"
                  >
                    Start new transaction
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <TransactionsViewTab
        open={isView}
        setOpen={setIsView}
        data={selectedTransaction}
      />
    </section>
  );
}
