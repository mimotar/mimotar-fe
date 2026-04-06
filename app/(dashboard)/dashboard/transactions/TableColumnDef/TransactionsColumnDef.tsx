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

export const transactionColumnsFn = (
  setOpenDispute: (Row: Row<ITransaction>) => void,
  setOpenMarkedAsResolve?: (Row: Row<ITransaction>) => void,
  setOpenAcceptToResolve?: (Row: Row<ITransaction>) => void,
  setOpenRejectToResolve?: (Row: Row<ITransaction>) => void,
): ColumnDef<ITransaction>[] => {
  const session = useSession();
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
        const status = row.getValue<string>("status");

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
      cell: ({ row }) => (
        <>
          {new Date(row.original.expiresAt) < new Date() ? (
            <div>
              {row.original.status === "DISPUTE" ? (
                <div className="flex justify-center text-center text-red-500">
                  Check the dispute tab.
                </div>
              ) : row.original.status === "REJECTED" ? (
                <div className="flex justify-center text-center text-red-500">
                  This transaction was rejected by the other party.
                </div>
              ) : row.original.creator_email === session.data?.user.email ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMarkedAsResolve && setOpenMarkedAsResolve(row);
                  }}
                  className="p-2 cursor-pointer rounded-md bg-green-400 whitespace-nowrap text-white text-center"
                >
                  Initial Closure
                </div>
              ) : (
                <div className="inline-flex gap-2  items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenAcceptToResolve && setOpenAcceptToResolve(row);
                    }}
                    type="button"
                    className="p-2 cursor-pointer rounded-md bg-green-400 whitespace-nowrap text-white"
                  >
                    Accept to Resolve
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenRejectToResolve && setOpenRejectToResolve(row);
                    }}
                    type="button"
                    className="p-2 cursor-pointer rounded-md bg-red-400 whitespace-nowrap text-white"
                  >
                    Reject to Resolve
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="flex justify-center text-center text-gray-500">
              Confirmation button will appear here after expires Date
            </span>
          )}
        </>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const status = row.getValue<string>("status");

        if (status === "ONGOING") {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="cursor-pointer">
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
