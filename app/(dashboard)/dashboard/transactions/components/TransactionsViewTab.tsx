import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { ITransaction } from "../types/ITransactions";
import { Row } from "@tanstack/react-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BiSolidDownload } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";

interface ITransactionsTableProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: Row<ITransaction>;
}

export function TransactionsViewTab({
  open,
  setOpen,
  data,
}: ITransactionsTableProps) {
  const color =
    data?.original.status === "CREATED"
      ? "text-teal-600"
      : data?.original.status === "REJECTED"
        ? "text-red-400"
        : data?.original.status === "APPROVED"
          ? "text-blue-400"
          : "";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex justify-between gap-2 items-center mt-3">
            <h1 className=" font-black">Transaction info</h1>

            <span className={`text-sm ${color}`}>
              {data?.original.status || "N/A"}
            </span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Tabs defaultValue="details">
              <TabsList className="">
                <TabsTrigger
                  value="details"
                  className="cursor-pointer text-neutral-600 data-[state=active]:text-brand-primary data-[state=active]:border-b-2 border-brand-primary data-[state=active]:font-bold"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="cursor-pointer text-neutral-600 data-[state=active]:text-brand-primary data-[state=active]:border-b-2 border-brand-primary data-[state=active]:font-bold"
                >
                  History
                </TabsTrigger>
              </TabsList>
              <hr />

              <TabsContent
                value="details"
                className="flex flex-col mt-3 space-y-5"
              >
                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Transaction ID</h1>{" "}
                  <span className="text-neutral-900 font-bold">
                    {data?.original.id}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Transaction Date</h1>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {data?.original.created_at
                      ? format(
                          new Date(data.original.created_at),
                          "d MMM, yyyy",
                        )
                      : ""}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Seller’s Name</h1>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {"N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Buyer’s Name</h1>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {data?.original.receiver_fullname}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Payment Method</h1>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {"N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Total Amount</h1>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {data?.original.amount}
                  </span>
                </div>

                <div className="flex sm:justify-end w-full mt-3">
                  <Button
                    type="button"
                    className="text-white bg-brand-primary gap-1 cursor-pointer"
                  >
                    <BiSolidDownload />
                    Download
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="history" className="flex flex-col mt-3">
                <div className="flex gap-4">
                  <div className="inline-flex gap-2 text-sm">
                    <span>29 Aug, 2024 </span> <span>06:34 PM </span>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <GoDotFill className="text-teal-400" />

                    <div className="w-0.5 h-16 rounded-full bg-neutral-600"></div>
                  </div>

                  <p className="text-sm text-neutral-900">
                    Transaction completed
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="inline-flex gap-2 text-sm">
                    <span>29 Aug, 2024 </span> <span>06:34 PM </span>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <GoDotFill className="text-amber-400" />

                    <div className="w-0.5 h-16 rounded-full bg-neutral-600"></div>
                  </div>

                  <p className="text-sm text-neutral-900">
                    Inspection successful
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="inline-flex gap-2 text-sm">
                    <span>29 Aug, 2024 </span> <span>06:34 PM </span>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <GoDotFill className="text-amber-400" />

                    <div className="w-0.5 h-16 rounded-full bg-neutral-600"></div>
                  </div>

                  <p className="text-sm text-neutral-900">
                    Payment sent to escrow
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <DialogFooter className="sm:justify-end "></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
