import React from "react";

import SearchSection from "./components/SearchSection";
import PostTransactImge from "@/app/svgIconComponent/PosTransactImg";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import MoreInfoPreviewCard from "./components/MoreInfoPreviewCard";

export default function page() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-[350px] bg-red-300"></div>
      <div className="w-[80%] mx-auto">
        <SearchSection />
        <div className="grid grid-cols-4">
          <div className="grid grid-cols-2 gap-2 col-span-3 h-[268px]">
            <div style={{ backgroundImage: "url('blogSampleImg.png')" }}></div>
            <div className="flex flex-col p-2 space-y-4 bg-neutral-50">
              <h1 className="font-bold text-lg">Escrow vs Direct Payment</h1>
              <p className="text-lg">
                Direct payments are quicker and simpler, escrow services provide
                enhanced security and trust, making them a preferred choice for
                higher-value or riskier transactions.
              </p>

              <PrimaryButton className=" py-1 self-end w-32 h-12 text-sm">
                Read More
              </PrimaryButton>
            </div>
          </div>
          <div className="col-span-1 flex flex-col space-y-4">
            <MoreInfoPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
