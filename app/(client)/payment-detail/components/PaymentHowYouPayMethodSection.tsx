"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import { useMutateAction } from "@/app/hooks/useMutation";
import BankHouse from "@/app/svgIconComponent/BankHouse";
import MasterCardIcon from "@/app/svgIconComponent/MastercardIcon";
import Loader from "@/components/Loader";
import { useState } from "react";
import toast from "react-hot-toast";
import { SiVisa } from "react-icons/si";
import { FlutterwaveCheckoutResponse } from "../type/IPaymentPayload";

export default function PaymentHowYouPayMethodSection({ id }: { id: string }) {
  const [isChecked, setIsChecked] = useState({ type: "card", isChecked: true });
  const { mutate, isPending, isError } = useMutateAction(
    "post",
    `payment/initialize/${id}`
  );

  const handlePayment = () => {
    if (!isChecked.isChecked) {
      toast.error("Please select a payment method");
      return;
    }
    if (isChecked.type === "card") {
      mutate(
        {},
        {
          onSuccess: (data) => {
            const FlutterwaveData = data as FlutterwaveCheckoutResponse;
            console.log(data);
            if (FlutterwaveData.status === "success") {
              if (FlutterwaveData.data && FlutterwaveData.data.link) {
                window.open(FlutterwaveData.data.link, "_blank");
              } else {
                toast.error("Payment link is missing.");
                return;
              }
            } else {
              toast.error(
                FlutterwaveData.message || "Payment initialization failed"
              );
              return;
            }
          },
          onError: (error) => {
            toast.error(error.message || "An error occurred during payment");
            return;
          },
        }
      );
    }
  };
  return (
    <div className="flex flex-col rounded-md ">
      <h1 className="font-semibold text-lg p-2 bg-[#F8FAFC]">
        How do you want to pay?
      </h1>
      <div className="flex flex-col gap-4 p-4 bg-[#F1F5F9]">
        <div
          className={`flex border justify-between items-center rounded-md  p-2 ${
            isChecked.type === "card" && isChecked.isChecked
              ? " border border-[#F0ABFC]  bg-[#FDF4FF]"
              : "bg-white "
          }`}
        >
          <input
            type="text"
            name=""
            placeholder="Card"
            id=""
            className={`outline-none w-full bg-transparent  mr-2 ${
              isChecked.type === "card" &&
              isChecked.isChecked &&
              "placeholder:text-[#F0ABFC]"
            }`}
          />

          <div className="inline-flex items-center gap-3">
            <MasterCardIcon className="size-8 rounded-md px-2 bg-white" />
            <SiVisa className="text-3xl  rounded-md px-2 bg-white" />
            <input
              onChange={() =>
                setIsChecked({ type: "card", isChecked: !isChecked.isChecked })
              }
              type="checkbox"
              checked={isChecked.type === "card" && isChecked.isChecked}
              name=""
              id=""
              className="size-4 rounded-md  accent-[#A21CAF]"
            />
          </div>
        </div>

        <div
          className={`flex  border justify-between items-center rounded-md  p-2 ${
            isChecked.type === "transfer" && isChecked.isChecked
              ? "border border-[#F0ABFC]  bg-[#FDF4FF]"
              : "bg-white "
          }`}
        >
          <input
            type="text"
            name=""
            placeholder="Bank transfer"
            id=""
            className={`outline-none w-full bg-transparent  mr-2 ${
              isChecked.type === "transfer" &&
              isChecked.isChecked &&
              "placeholder:text-[#F0ABFC]"
            }`}
          />

          <div className="inline-flex items-center gap-3">
            <BankHouse className="size-6 rounded-md px-1 bg-white" />
            <input
              onChange={() =>
                setIsChecked({
                  type: "transfer",
                  isChecked: !isChecked.isChecked,
                })
              }
              type="checkbox"
              checked={isChecked.type === "transfer" && isChecked.isChecked}
              name=""
              id=""
              className="size-4 rounded-md  accent-[#A21CAF]"
            />
          </div>
        </div>

        <PrimaryButton
          onClick={handlePayment}
          className="w-full p-1 font-semibold inline-flex gap-2 items-center justify-center "
        >
          Confirm payment{" "}
          {isPending && (
            <div className="w-6 h-6">
              <Loader />
            </div>
          )}
        </PrimaryButton>
      </div>
    </div>
  );
}
