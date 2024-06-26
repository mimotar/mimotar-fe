"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/app/commons/SecondaryButton";

export default function StepFour() {
  const navigate = useRouter();
  return (
    <section className="flex flex-col w-full h-full">
      <h1 className="font-bold text-lg">Second Transactor's Info</h1>
      <h3>
        Input the personal details of the other party (whether buyer or seller).
      </h3>

      <div className="space-y-5 mt-6"></div>

      <div className="flex justify-between w-full h-fit mt-10">
        <PrimaryButton
          onClick={() => navigate.push("generate-link?step=2")}
          className="bg-white text-[#A21CAF] border border-[#A21CAF] text-lg w-36"
        >
          <span className="inline-flex gap-1 items-center ">
            <IoMdArrowBack />
            Back
          </span>
        </PrimaryButton>

        <SecondaryButton
          onClick={() => navigate.push("generate-link?step=4")}
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
