"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/app/commons/SecondaryButton";
import Input, { InputAndCountryFlag } from "@/app/commons/Input";
import RadioInput from "@/app/commons/RadioInput";

export default function StepFour() {
  const navigate = useRouter();
  return (
    <section className="flex flex-col w-full h-full">
      <h1 className="font-bold text-lg">Second Transactor&apos;s Info</h1>
      <h3>
        Input the personal details of the other party (whether buyer or seller).
      </h3>

      <div className="space-y-4 mt-6">
        <Input
          type="text"
          labelName="Full name"
          placeholder="First name  and Surname"
          isShowLabel={true}
        />
        <Input
          type="email"
          labelName="Email"
          placeholder="name@email.com"
          isShowLabel={true}
        />
        <InputAndCountryFlag
          labelName="Phone number"
          isShowLabel={true}
          placeholder="+1"
        />

        <Input
          type="text"
          labelName="Address (Optional)"
          placeholder="House number, Street, Town/City, State"
          isShowLabel={true}
        />

        <div className="flex flex-col">
          <h2 className="font-semibold">
            Select the option that describes you
          </h2>
          <div className="flex items-center w-fit gap-4 ">
            <RadioInput
              type="radio"
              id="buyer"
              name="buyer"
              labelName="buyer"
              className="text-base h-4 w-4"
            />

            <RadioInput
              type="radio"
              id="seller"
              name="seller"
              labelName="Seller"
              className="text-base h-4 w-4"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full h-fit mt-10">
        <PrimaryButton
          onClick={() => navigate.push("generate-link?step=3")}
          className="bg-white text-[#A21CAF] border border-[#A21CAF] text-lg w-36"
        >
          <span className="inline-flex gap-1 items-center ">
            <IoMdArrowBack />
            Back
          </span>
        </PrimaryButton>

        <SecondaryButton
          onClick={() => navigate.push("generate-link?step=5")}
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
