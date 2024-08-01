"use client";

import Input from "@/app/commons/Input";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import RadioInput from "@/app/commons/RadioInput";
import SecondaryButton from "@/app/commons/SecondaryButton";
import TextAreaInput from "@/app/commons/TextAreaInput";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function StepTwo() {
  const navigate = useRouter();
  return (
    <section className="flex flex-col h-full w-full">
      <h1 className="font-bold text-lg">Transaction Details</h1>
      <h3>All information about the transaction.</h3>
      <div className="space-y-4 mt-6">
        <Input labelName="Amount" isShowLabel={true} />
        <TextAreaInput
          labelName="Transaction description"
          isShowLabel={true}
          id="description"
        />
        <h2>Transaction type</h2>
        <RadioInput
          type="radio"
          id="physical"
          name="physical"
          labelName="Physical product"
          className="text-base h-4 w-4"
        />
        <RadioInput
          type="radio"
          id="Online"
          name="Online"
          labelName="Online product"
          className="text-base h-4 w-4"
        />

        <RadioInput
          type="radio"
          id="service"
          name="service"
          labelName="Service"
          className="text-base h-4 w-4"
        />
      </div>

      <div className="flex justify-between w-full h-fit mt-10">
        <PrimaryButton
          onClick={() => navigate.push("generate-link")}
          className="bg-white text-[#A21CAF] border border-[#A21CAF] text-lg w-36"
        >
          <span className="inline-flex gap-1 items-center ">
            <IoMdArrowBack />
            Back
          </span>
        </PrimaryButton>

        <SecondaryButton
          onClick={() => navigate.push("generate-link?step=3")}
          className="w-36 text-lg bg-[#A21CAF] text-white"
        >
          <span className="inline-flex gap-1 items-center ">
            Next <IoMdArrowBack className="rotate-180" />
          </span>
        </SecondaryButton>
      </div>
    </section>
  );
}
