import { ColumnDef, Row } from "@tanstack/react-table";
import { ITransaction } from "../types/ITransactions";
import { TbRefreshAlert } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";

export const transactionColumnsFn = (
  currentSession: DefaultSession | null,
  setOpenDispute: (Row: Row<ITransaction>) => void,
  setOpenMarkedAsResolve?: (Row: Row<ITransaction>) => void,
  setOpenAcceptToResolve?: (Row: Row<ITransaction>) => void,
  setOpenRejectToResolve?: (Row: Row<ITransaction>) => void,
): ColumnDef<ITransaction>[] => {
  const transactionColumns: ColumnDef<ITransaction>[] = [
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue<string>("created_at"));
        return <div className="min-w-32">{format(date, "dd MMM yyyy")}</div>;
      },
    },
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => (
        <div className="max-w-48">
          {row.getValue<number>("id").toString().padStart(6, "0")}
        </div>
      ),
    },
    {
      accessorKey: "receiver_fullname",
      header: "Reciever",
      cell: ({ row }) => (
        <div className="min-w-36 min-w-56">
          {row.original.receiver_fullname}
        </div>
      ),
    },

    {
      accessorKey: "creator_fullname",
      header: "Creator",
      cell: ({ row }) => (
        <div className="min-w-36 min-w-56">{row.original.creator_fullname}</div>
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
        const currency = row.original.currency ?? "";

        return (
          <span className="whitespace-nowrap">
            {currency} {amount.toLocaleString()}
          </span>
        );
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
      accessorKey: "inspection_duration",
      header: "Inspection Duration",
      cell: ({ row }) => (
        <div className="text-center">{row.original.inspection_duration}</div>
      ),
    },

    {
      accessorKey: "reciever_role",
      header: "Reciever Role",
      cell: ({ row }) => (
        <div className="text-center">{row.original.reciever_role}</div>
      ),
    },

    {
      accessorKey: "creator_role",
      header: "Creator Role",
      cell: ({ row }) => (
        <div className="text-center">{row.original.creator_role}</div>
      ),
    },

    {
      accessorKey: "transactionType",
      header: "Transaction Type",
      cell: ({ row }) => (
        <div className="text-center">{row.original.transactionType}</div>
      ),
    },

    {
      accessorKey: "pay_escrow_fee",
      header: "Who will pay escrow Fee",
      cell: ({ row }) => (
        <div className="text-center">{row.original.pay_escrow_fee}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        const statusStyles: Record<string, string> = {
          CREATED: "text-brand-primary bg-brand-primary/10",
          REJECTED: "text-red-600 bg-red-100",
          APPROVED: "text-green-600 bg-green-100",
          ONGOING: "text-amber-600 bg-amber-100",
          COMPLETED: "text-blue-600 bg-blue-100",
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
      header: "Confirmation",
      cell: ({ row }) => {
        const isExpired = new Date(row.original.expiresAt) > new Date();
        const isDispute = row.original.status === "DISPUTE";
        const isRejected = row.original.status === "REJECTED";
        const isPENDING_CLOSURE = row.original.status === "PENDING_CLOSURE";

        const isCreator =
          row.original.creator_email === currentSession?.user?.email;
        // console.log(isCreator);
        return (
          <>
            <div>
              <div className="inline-flex gap-2  items-center">
                <button
                  disabled={!isCreator || isRejected}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMarkedAsResolve && setOpenMarkedAsResolve(row);
                  }}
                  // className="p-2 cursor-pointer rounded-md bg-green-400 whitespace-nowrap text-white text-center"
                  className={`p-2 ${!isCreator || isRejected ? "cursor-not-allowed bg-gray-300 text-gray-500" : "cursor-pointer  bg-green-500 hover:bg-green-600"} rounded-md  whitespace-nowrap text-white`}
                >
                  Initial Closure
                </button>

                <button
                  disabled={isCreator || isRejected || !isPENDING_CLOSURE}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenAcceptToResolve && setOpenAcceptToResolve(row);
                  }}
                  type="button"
                  className={`p-2 ${isCreator || isRejected || !isPENDING_CLOSURE ? "cursor-not-allowed bg-gray-300 text-gray-500" : "cursor-pointer bg-green-500 hover:bg-green-600"} rounded-md  whitespace-nowrap text-white`}
                >
                  Accept to Resolve
                </button>

                <button
                  disabled={isCreator || isRejected || !isPENDING_CLOSURE}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenRejectToResolve && setOpenRejectToResolve(row);
                  }}
                  type="button"
                  className={`p-2 ${isCreator || isRejected || !isPENDING_CLOSURE ? "cursor-not-allowed bg-gray-300 text-gray-500" : "cursor-pointer bg-green-500 hover:bg-green-600"} rounded-md  whitespace-nowrap text-white`}
                >
                  Reject to Resolve
                </button>
              </div>
            </div>
          </>
        );
      },
    },

    {
      header: "Dispute Action",
      cell: ({ row }) => {
        const status = row.getValue<string>("status");

        if (status === "ONGOING") {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="cursor-pointer  flex justify-center items-center  w-full"
                >
                  <TbRefreshAlert className="text-brand-primary/70 w-5 h-5 cursor" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDispute(
                        row.original as unknown as Row<ITransaction>,
                      );
                    }}
                  >
                    Open dispute
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        // return null;
      },
    },
  ];

  return transactionColumns;
};
