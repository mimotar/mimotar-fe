"use client";
import PasswordResetIcon from "@/app/svgIconComponent/PasswordResetIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function PasswordIsReset() {
  const navigate = useRouter();
  return (
    <section className="flex flex-col justify-center items-center ">
      <PasswordResetIcon className="sm:w-24 sm:h-24 w-20 h-20" />
      <h1 className="sm:text-2xl text-xl font-bold mt-6">Password is reset</h1>
      <p className="sm:text-lg text-base text-center mt-2 px-6">
        Your password has been reset successfully. Click below to log into your
        dashboard.
      </p>

      <Button
        onClick={() => navigate.push("/")}
        type="submit"
        className=" sm:w-[360px] w-[90%] mt-4 text-base"
      >
        Continue
      </Button>
    </section>
  );
}
