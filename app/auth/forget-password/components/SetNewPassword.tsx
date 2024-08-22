"use client";

import PasswordIcon from "@/app/svgIconComponent/PasswordIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";

export default function SetNewPassword() {
  return (
    <section className="flex flex-col justify-center items-center ">
      <PasswordIcon className="sm:w-24 sm:h-24 w-20 h-20" />
      <h1 className="sm:text-2xl text-xl font-bold mt-6">Set new password</h1>
      <p className="sm:text-lg text-base text-center  ">
        Your new password must be different from previous passwords.
      </p>

      <form className="mt-6  flex flex-col sm:w-[360px] w-[90%] space-y-6">
        <div className="flex flex-col w-full relative">
          <label htmlFor="password" className="text-neutral-600 font-medium ">
            Password
          </label>
          <input
            placeholder="........"
            type="password"
            name="password"
            id="password"
            className="border-2 rounded-md p-2 w-full placeholder:text-4xl placeholder:text-gray-800"
          />
          <AiOutlineEye className="absolute bottom-3 text-lg text-gray-600  right-3" />
        </div>

        <div className="flex flex-col w-full relative">
          <label htmlFor="password" className="text-neutral-600 font-medium ">
            Confirm password
          </label>
          <input
            placeholder="........"
            type="password"
            name="password"
            id="password"
            className="border-2 rounded-md p-2 w-full placeholder:text-4xl placeholder:text-gray-800"
          />
          <AiOutlineEye className="absolute bottom-3 text-lg text-gray-600  right-3" />
        </div>

        <Button type="submit" className="w-full mt-4 text-base">
          Reset password
        </Button>
      </form>

      <Link
        href={"/auth/login"}
        className="inline-flex gap-2 font-bold items-center border-none  sm:text-base text-sm text-[#A21CAF] justify-center bg-none mt-6 "
      >
        <IoMdArrowBack /> Back to login
      </Link>
    </section>
  );
}
