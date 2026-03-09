import { ColumnDef } from "@tanstack/react-table";
import { ITransaction } from "../types/ITransactions";

export const transactionColumns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "receiver_fullname",
    header: "Receiver",
    cell: ({ row }) => (
      <div className="min-w-36 min-w-56">{row.original.receiver_fullname}</div>
    ),
  },
  {
    accessorKey: "reciever_email",
    header: "Receiver Email",
  },
  {
    accessorKey: "creator_email",
    header: "Creator Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      return <span>${amount.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "transaction_description",
    header: "Description",
    cell: ({ row }) => (
      <div className="min-w-56 min-w-72">
        {row.original.transaction_description}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");

      const statusStyles: Record<string, string> = {
        CREATED: "text-brand-primary bg-brand-primary/10",
        REJECTED: "text-red-600 bg-red-100",
        APPROVED: "text-green-600 bg-green-100",
      };

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            statusStyles[status] ?? "text-gray-600 bg-gray-100"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("created_at"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "txn_link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.getValue<string>("txn_link");

      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
      );
    },
  },
];
