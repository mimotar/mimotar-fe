import { useRef } from "react";
import { TbCopy } from "react-icons/tb";
import toast from "react-hot-toast";
import { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppDispatch } from "@/lib/hooks";
import { setIsOpen, setStage } from "@/lib/slices/createTransactionStateSlice";

export default function CreateTransactionGenerateLink() {
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
            value={"hdddbjbjwjqbw721892"}
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
            <strong>Olawale Ade</strong>
            <p className="text-neutral-500">olawale02@gmail.com</p>
            <p className="text-neutral-500"> +234 813 123 2276</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Transaction description</h1>

            <p className="text-neutral-500">
              Purchase of a HP Elitebook 820 UK-used laptop
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 w-full mt-4">
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Transaction ID</h1>

            <p className="text-neutral-500"> 60024321</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Amount</h1>
            <p className="text-neutral-500">NGN 340,000</p>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full mt-4">
          <div className="flex flex-col">
            <h1 className="text-neutral-500">Date</h1>

            <p className="text-neutral-500"> 5th June 2024</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-4">
        <PrimaryOutline
          type="button"
          onClick={() => {
            dispatch(setIsOpen(false));
            dispatch(setStage(0));
          }}
          className="px-6 text-[#A21CAF]"
        >
          Finish
        </PrimaryOutline>
      </div>
    </section>
  );
}
