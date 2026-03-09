import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { ITransaction } from "../types/ITransactions";
import { transactionColumns } from "../TableColumnDef/TransactionsColumnDef";

interface ITransactionsTableProps {
  data: ITransaction[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default function TransactionsTable({
  data,
  isLoading,
  isError,
  error,
}: ITransactionsTableProps) {
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
        <thead className="border-b bg-gray-50">
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
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={transactionColumns.length}
                className="text-center py-10 text-gray-500"
              >
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
