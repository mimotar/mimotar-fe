"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import React from "react";
import { MdContentCopy } from "react-icons/md";

export default function StepFive() {
  const navigate = useRouter();
  return (
    <section className="flex flex-col w-full h-full justify-center">
      <div className="flex flex-col justify-center items-center bg-[#F1F5F9] rounded-md py-6 space-y-2">
        <p className="font-semibold ">
          You can choose to copy the link below and paste into chat or email to
          share
        </p>
        <div className="relative  flex  justify-center w-[70%]">
          <input
            readOnly
            placeholder="hdeji3i33i3ui3uh4fbfejnefjh23fio32ui"
            type="text"
            className="p-2 rounded-md w-full  outline-none  border border-gray-400"
          />
          <MdContentCopy className="absolute right-2 top-2.5 text-lg cursor-pointer" />
        </div>
      </div>

      <h1 className="text-lg text-center my-4">TRANSACTION SUMMARY</h1>
      <div className="grid min-[425px]:grid-cols-2 grid-cols-1 ">
        {/* first grid */}
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-1">
            <h1 className="text-lg">Second transactor</h1>
            <h2 className="font-semibold">Olawale Ade</h2>
            <h3>olawale02@gmail.com</h3>
            <h4>+234 813 123 2276</h4>
          </div>

          <div className="flex flex-col space-y-1">
            <h1 className="text-lg">Transaction ID</h1>
            <h2 className="font-semibold">60024321</h2>
          </div>

          <div className="flex flex-col space-y-1">
            <h1 className="text-lg">Date</h1>
            <h2 className="font-semibold">5th June 2024</h2>
          </div>
        </div>

        {/* second grid */}
        <div className="flex flex-col space-y-6 ">
          <div className="flex flex-col space-y-1">
            <h1 className="text-lg">Transaction description</h1>
            <p>Purchase of a HP Elitebook 820 UK-used laptop</p>
          </div>

          <div className="flex flex-col  space-y-1">
            <h1 className="text-lg mt-16">Amount</h1>
            <h2 className="font-semibold">NGN 340,000</h2>
          </div>
        </div>
      </div>

      <div className="flex sm:justify-end justify-center w-full mt-10">
        <PrimaryButton
          onClick={() => navigate.push("/")}
          className="bg-white text-[#A21CAF] border border-[#A21CAF] text-lg "
        >
          <span className="inline-flex gap-1 items-center ">
            Go to home page
          </span>
        </PrimaryButton>
      </div>
    </section>
  );
}
