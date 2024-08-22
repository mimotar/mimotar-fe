"use client";

import MailIcon from "@/app/svgIconComponent/MailIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

export default function CheckMail() {
  return (
    <section className="w-[375px]:w-auto w-[90%]  flex flex-col justify-center items-center">
      <MailIcon className="sm:w-24 sm:h-24 w-20 h-20" />
      <h1 className="sm:text-2xl text-xl font-bold mt-6">Check your email</h1>
      <p className="sm:text-lg text-base text-center text-gray-600">
        We sent a password reset link to <strong>olawale02@gmail.com</strong>
      </p>

      <Button className="min-[375px]:w-[360px] w-full mt-6 text-base">
        Open email app
      </Button>
      <small className="mt-4 inline-flex gap-1">
        Didn’t receive email?{" "}
        <span className="text-[#A21CAF] font-medium">Click to resend</span>
      </small>

      <Link
        href={"/auth/login"}
        className="inline-flex sm:text-base text-sm gap-2 font-bold items-center border-none text-[#A21CAF] justify-center bg-none mt-6 "
      >
        <IoMdArrowBack /> Back to login
      </Link>
    </section>
  );
}
