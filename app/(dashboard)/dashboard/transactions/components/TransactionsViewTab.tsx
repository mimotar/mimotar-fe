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
import {
  IHISTORYKEY,
  ITransaction,
  TransactionStatus,
} from "../types/ITransactions";
import { Row } from "@tanstack/react-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BiSolidDownload } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";

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
  const color: Record<TransactionStatus, string> = {
    CREATED: "text-brand-primary bg-brand-primary/10",
    REJECTED: "text-red-600 bg-red-100",
    APPROVED: "text-green-600 bg-green-100",
    ONGOING: "text-amber-600 bg-amber-100",
    COMPLETED: "text-blue-600 bg-blue-100",
    DISPUTE: "text-rose-700 bg-rose-100",
    PENDING_CLOSURE: "text-violet-700 bg-violet-100",
    EXPIRED: "text-gray-600 bg-gray-100",
  };

  const MAPHISTORY: Record<IHISTORYKEY, string> = {
    agreement_accepted_at: "Agreement accepted at",
    inspection_completed_at: "Inspection completed at",
    inspection_started_at: "Inspection started at",
    payment_sent_to_escrow_at: "Payment sent to escrow at",
    transaction_completed_at: "Transaction completed at",
    transaction_created_at: "Transaction created at",
  };

  const attachment =
    data && data.original.files && data.original.files.length > 0
      ? data.original.files
      : [];

  // const historys = data?.original?.history
  //   ? Object.entries(data.original.history).map(([field, timestamp]) => ({
  //       field: field as IHISTORYKEY,
  //       timestamp: timestamp as string | null,
  //     }))
  //   : [];

  const historys = data?.original?.history
    ? Object.entries(data.original.history)
        .filter(([, timestamp]) => timestamp !== null)
        .map(([field, timestamp]) => ({
          field: field as IHISTORYKEY,
          timestamp: timestamp as string,
        }))
    : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex justify-between gap-2 items-center mt-3">
            <h1 className=" font-black">Transaction info</h1>

            <span
              className={`text-sm ${color[data?.original.status!]} rounded-md p-1 px-3`}
            >
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
                    {data?.original.creator_fullname || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Buyer’s Name</h1>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {data?.original.receiver_fullname || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Payment Method</h1>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {data?.original.payment?.payment_method ?? "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Total Amount</h1>{" "}
                  <span className="text-neutral-900 font-semibold">
                    {data?.original.amount}
                  </span>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                  <h1 className="text-neutral-500">Attachment</h1>{" "}
                  <span className="text-neutral-900 inline-flex gap-2 font-semibold">
                    {attachment.length > 0 ? (
                      attachment.map((file, index) => (
                        <Image
                          key={index}
                          src={file.fileUrl}
                          alt={file.fileName}
                          width={30}
                          height={30}
                          loading="lazy"
                          className="rounded-md border cursor-pointer"
                          onClick={() =>
                            window.open(file.fileUrl, "_blank", "")
                          }
                        />
                      ))
                    ) : (
                      <span className="text-sm">No File Attached</span>
                    )}
                    {/* {attachment.map((file, index)=> <Image key={index} src={file.fileUrl} alt={file.fileName} />)} */}
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
              <TabsContent
                value="history"
                className="flex max-h-56 overflow-y-auto flex-col mt-3"
              >
                {historys.length <= 0 ? (
                  <p className="text-sm text-neutral-500">
                    No history available
                  </p>
                ) : (
                  historys.map((history, index) => {
                    const date = history.timestamp
                      ? format(new Date(history.timestamp), "dd MMM, yyyy")
                      : "N/A";

                    const time = history.timestamp
                      ? format(new Date(history.timestamp), "hh:mm a")
                      : "";

                    return (
                      <div key={index} className="flex gap-4">
                        <div className="inline-flex w-[100px] max-w-2xs  flex-col text-sm text-neutral-600">
                          <span>{date}</span>
                          <span>{time}</span>
                        </div>

                        <div className="flex flex-col items-center">
                          <GoDotFill className="text-teal-400" />
                          <div className="w-0.5 h-16 rounded-full bg-neutral-300" />
                        </div>

                        <p className="text-sm truncate text-neutral-900">
                          {MAPHISTORY[history.field] ?? history.field}
                        </p>
                      </div>
                    );
                  })
                )}

                {/* 
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
                </div> */}

                {/* <div className="flex gap-4">
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
                </div> */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <DialogFooter className="sm:justify-end "></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
