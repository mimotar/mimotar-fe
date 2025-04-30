import LogoIcon from "@/app/svgIconComponent/Logo";
import PasswordIcon from "@/app/svgIconComponent/PasswordIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

export default function OtpPage() {
  return (
    <section className="flex flex-col h-screen w-full">
      <div className="sm:px-10 px-4 w-full flex justify-between py-4 sticky top-0 border-b mb-12">
        <LogoIcon className="w-36 h-8" />
      </div>

      <section className="flex flex-col justify-center items-center ">
        {/* <PasswordIcon className="sm:w-24 sm:h-24 w-20 h-20" /> */}
        <h1 className="sm:text-2xl text-xl font-bold mt-6">
          Verify Your Identity
        </h1>
        <p className="sm:text-lg text-base text-center mt-2">
          We have sent a one-time password (OTP) to your registered email.
          Please enter it below to verify identity.
        </p>

        <form className="mt-6  flex flex-col sm:w-[360px] w-[90%] space-y-5">
          <div className="flex flex-col w-full ">
            <label htmlFor="email" className="text-neutral-600 font-medium ">
              Email
            </label>
            <input
              placeholder="johedoe@gmail.com"
              type="email"
              name="email"
              id="email"
              className="border-2 rounded-md p-2 w-full placeholder:text-4xl placeholder:text-gray-800"
            />
          </div>

          <Button
            //   onClick={handleSubmitResetPassword}
            type="submit"
            className="w-full mt-4 text-base"
          >
            Verify email
          </Button>
        </form>

        <Link
          href={"/"}
          className="inline-flex gap-2 font-bold items-center border-none  sm:text-base text-sm text-[#A21CAF] justify-center bg-none mt-6 "
        >
          <IoMdArrowBack /> Resend OTP
        </Link>
      </section>

      <section className="flex sticky bottom-0 sm:px-10 px-5 justify-between items-center text-neutral-50 text-sm bg-[#0F172A] sm:h-20 h-10 w-full mt-auto p-6">
        <span>&copy; {new Date().getFullYear()} Mimotar.</span>
        <Link href="" className="">
          Contact us
        </Link>
      </section>
    </section>
  );
}
