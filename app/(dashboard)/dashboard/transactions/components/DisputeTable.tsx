import { Images } from "@/app/Images";
import { flexRender, Table, useReactTable } from "@tanstack/react-table";
import Image from "next/image";
import { IDispute } from "../types/IDispute";
import { useRouter } from "next/navigation";

interface DisputeTableProps {
  table: Table<IDispute>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
export default function DisputeTable({
  table,
  isLoading,
  isError,
  error,
}: DisputeTableProps) {
  const navigate = useRouter();
  // Loading state (outside table)
  if (isLoading) {
    return (
      <section className="mt-4 flex justify-center items-center py-10">
        <p className="text-gray-500">Loading Disputes...</p>
      </section>
    );
  }

  // Error state (outside table)
  if (isError) {
    return (
      <section className="mt-4 flex justify-center items-center py-10">
        <p className="text-red-500">
          {error?.message ?? "Failed to load Disputes"}
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
                onClick={() =>
                  navigate.push(`/dashboard/dispute/${row.original.id}`)
                }
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
                    You don’t have any Dispute yet.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
