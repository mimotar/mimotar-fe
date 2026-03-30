import { ColumnDef } from "@tanstack/react-table";
import { IDispute } from "../types/IDispute";
import { BsChatLeftTextFill } from "react-icons/bs";

export const disputeColumnDef: ColumnDef<IDispute>[] = [
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },

  {
    header: "Transaction ID",
    accessorKey: "transactionId",
  },
  {
    header: "Recipient",
    accessorKey: "transaction.receiver_fullname",
  },
  { header: "Amount", accessorKey: "transaction.amount" },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue<"ongoing" | "resolved" | "cancelled">(
        "status",
      );
      const statusStyles: Record<string, string> = {
        CREATED: "text-brand-primary bg-brand-primary/10",
        REJECTED: "text-red-600 bg-red-100",
        APPROVED: "text-green-600 bg-green-100",
        ongoing: "text-amber-600 bg-amber-100",
      };

      return (
        <span className={statusStyles[status] || "text-gray-600 bg-gray-100"}>
          {status}
        </span>
      );
    },
  },
  {
    header: "Actions",
    enableHiding: true,
    cell: ({ row }) => {
      const status = row.original.status;

      if (
        status == "review" ||
        status == "negotiation" ||
        status == "ongoing"
      ) {
        return (
          <BsChatLeftTextFill
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-xl text-brand-primary cursor-pointer"
          />
        );
      }
    },
  },
];
