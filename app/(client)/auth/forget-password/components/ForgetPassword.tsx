"use client";

import PadLockIcon from "@/app/svgIconComponent/PadLock";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useMutateAction } from "@/app/hooks/useMutation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function ForgetPassword() {
  const { isPending, mutate } = useMutateAction(
    "post",
    "password-reset/confirm-email-password-reset"
  );
  const navigate = useRouter();
  const handleResetPassword = (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    // alert(email);
    mutate(
      { email },
      {
        onError: (error) => {
          toast(error.message);
          return;
        },
        onSuccess: () => {
          toast("Reset link sent to your email");
          navigate.push("/auth/forget-password?type=check-mail");
          return;
        },
      }
    );
  };

  return (
    <section className="max-w-[400px] min:w-[375px]:w-auto w-[90%] flex flex-col justify-center items-center">
      <PadLockIcon className="sm:w-24 sm:h-24 w-20 h-20" />
      <h1 className="sm:text-2xl text-xl font-bold mt-6">Forgot password?</h1>
      <p className="sm:text-lg text-base text-center text-gray-600">
        Don’t worry, just follow our instructions.
      </p>
      <form onSubmit={handleResetPassword} className="w-full mt-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="name@gmail.com"
            className="placeholder:text-base border rounded-md w-full p-2 border-neutral-500"
          />
        </div>

        <Button type="submit" className="w-full mt-4 text-base">
          {isPending ? <Loader /> : "Reset password"}
        </Button>
      </form>
      <Link
        href={"/"}
        className="inline-flex gap-2 font-bold items-center border-none  sm:text-base text-sm text-[#A21CAF] justify-center bg-none mt-6 "
      >
        <IoMdArrowBack /> Back to login
      </Link>
    </section>
  );
}
