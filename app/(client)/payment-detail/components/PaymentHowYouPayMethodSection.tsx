"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import BankHouse from "@/app/svgIconComponent/BankHouse";
import MasterCardIcon from "@/app/svgIconComponent/MastercardIcon";
import { useState } from "react";
import { SiVisa } from "react-icons/si";

export default function PaymentHowYouPayMethodSection() {
  const [isChecked, setIsChecked] = useState({ type: "card", isChecked: true });
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

        <PrimaryButton className="w-full p-1 font-semibold">
          Confirm payment
        </PrimaryButton>
      </div>
    </div>
  );
}
