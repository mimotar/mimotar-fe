"use client";

import MailIcon from "@/app/svgIconComponent/MailIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useMutateAction } from "@/app/hooks/useMutation";
import { useSession } from "next-auth/react";

export default function CheckMail() {
  const session = useSession();
  const email = session.data?.user?.email || "Not available";
  const navigate = useRouter();
  const handleOpenEmail = () => {
    // const email = "josephuzuegbu55@gmail.com";
    // const mailtoLink = `mailto:${email}`;
    // window.location.href = mailtoLink;
    navigate.push("/auth/forget-password?type=set-newPassword");
  };
  return (
    <section className="w-[375px]:w-auto w-[90%]  flex flex-col justify-center items-center">
      <MailIcon className="sm:w-24 sm:h-24 w-20 h-20" />
      <h1 className="sm:text-2xl text-xl font-bold mt-6">Check your email</h1>
      <p className="sm:text-lg text-base text-center text-gray-600">
        We will sent a password reset link to <strong>{email}</strong>
      </p>

      <Button
        onClick={handleOpenEmail}
        className="min-[375px]:w-[360px] w-full mt-6 text-base"
      >
        {/* Open email app */}
        Next
      </Button>
      <small className="mt-4 inline-flex gap-1">
        Didn’t receive email?{" "}
        <span className="text-[#A21CAF] font-medium">Click to resend</span>
      </small>

      <Link
        href={"/"}
        className="inline-flex sm:text-base text-sm gap-2 font-bold items-center border-none text-[#A21CAF] justify-center bg-none mt-6 "
      >
        <IoMdArrowBack /> Back to login
      </Link>
    </section>
  );
}
