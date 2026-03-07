import { useRef } from "react";
import { TbCopy } from "react-icons/tb";
import toast from "react-hot-toast";
import { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  reset,
  setIsOpen,
  setStage,
} from "@/lib/slices/createTransactionStateSlice";
import { format } from "date-fns";

export default function CreateTransactionGenerateLink() {
  const { successTicketPayload } = useAppSelector((state) => ({
    successTicketPayload: state.TicketSuccessPayload,
  }));
  console.log(successTicketPayload);
  const dispatch = useAppDispatch();
  const clipboardInputRef = useRef<HTMLInputElement>(null!);

  const handleCopyToClipboard = async () => {
    try {
      const copiedLink = clipboardInputRef.current.value;
      await navigator.clipboard.writeText(copiedLink);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy the link: ", error);
      toast.error("Failed to copy the link. Please try again.");
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex flex-col bg-neutral-100 rounded-lg sm:p-8 p-4 justify-center items-center mt-10">
        <p className="font-bold">
          You can choose to copy the link below and paste into chat or email to
          share
        </p>

        <div className="relative flex items-center w-full mt-3">
          <input
            ref={clipboardInputRef}
            type="text"
            name=""
            value={successTicketPayload.txn_link}
            readOnly
            id=""
            className="p-3 rounded-md w-full"
          />
          <TbCopy
            className="absolute right-2 cursor-pointer text-2xl"
            onClick={handleCopyToClipboard}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-6 w-full px-4">
        <h1 className="font-light">TRANSACTION SUMMARY </h1>
        <div className="grid sm:grid-cols-2 grid-cols-1 w-full mt-3">
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Second transactor</h1>
            <strong>{successTicketPayload?.receiver_fullname}</strong>
            <p className="text-neutral-500">
              {successTicketPayload?.reciever_email}
            </p>
            <p className="text-neutral-500">
              {" "}
              {successTicketPayload?.receiver_no}
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Transaction description</h1>

            <p className="text-neutral-500">
              {successTicketPayload?.transaction_description}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 w-full mt-4">
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Transaction ID</h1>

            <p className="text-neutral-500"> {successTicketPayload?.id}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Amount</h1>
            <p className="text-neutral-500">
              {" "}
              {successTicketPayload.currency || ""}{" "}
              {successTicketPayload.amount}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full mt-4">
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Date</h1>

            <p className="text-neutral-500">
              {" "}
              {successTicketPayload?.created_at
                ? format(
                    new Date(successTicketPayload?.created_at),
                    "do MMMM yyyy",
                  )
                : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-4">
        <PrimaryOutline
          type="button"
          onClick={() => dispatch(reset())}
          className="px-6 text-[#A21CAF] cursor-pointer"
        >
          Finish
        </PrimaryOutline>
      </div>
    </section>
  );
}
