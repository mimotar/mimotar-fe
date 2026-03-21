"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
// import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function SecurityContent() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <section className="flex flex-col mt-6 w-full pb-6 ">
      <div className="w-full  p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-neutral-900 text-xl font-semibold">
            Security Questions
          </h2>
          {/* <ChevronUp className="h-5 w-5 text-[#0F172A]" /> */}
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Enter security question 1"
            className="h-14 rounded-md border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#94A3B8]"
          />
          <Input
            placeholder="Enter security answer 1"
            className="h-14 rounded-md border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#94A3B8]"
          />
          <Input
            placeholder="Enter security question 2"
            className="h-14 rounded-md border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#94A3B8]"
          />
          <Input
            placeholder="Enter security answer 2"
            className="h-14 rounded-md border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between  px-4 py-4 sm:px-6 ">
        <p className="text-neutral-900 text-xl font-semibold">
          Two-factor Authentication
        </p>
        <Switch
          checked={twoFactorEnabled}
          onCheckedChange={setTwoFactorEnabled}
          aria-label="Toggle two-factor authentication"
        />
      </div>
    </section>
  );
}
