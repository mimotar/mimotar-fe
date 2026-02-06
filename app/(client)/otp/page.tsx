"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IVerifyOtpSchemaType,
  verifyOtpSchema,
} from "@/lib/schemas/verifyOTPschema";
import Loader from "@/components/Loader";
import { useMutation } from "@tanstack/react-query";
import { unTokenAxiosInstance } from "@/lib/services/axiosService";
import { AxiosErrorHandler } from "@/app/utils/axiosErrorHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const redirect = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IVerifyOtpSchemaType>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: IVerifyOtpSchemaType) => {
      try {
        const req = await unTokenAxiosInstance({
          url: "/user/verify-otp",
          method: "POST",
          data,
        });
        const result = await req.data;
        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  const handleOnSubmit: SubmitHandler<IVerifyOtpSchemaType> = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("OTP verified successfully!. Login to continue.");
        redirect.push("/");
      },
      onError: (error) => {
        const errorMessage = AxiosErrorHandler(error);
        toast.error(errorMessage);
        console.log(error);
      },
    });
  };

  const { isPending: isLoading, mutate: mutateResendOtp } = useMutation({
    mutationFn: async (data: Omit<IVerifyOtpSchemaType, "otp">) => {
      try {
        const req = await unTokenAxiosInstance({
          url: "/user/resend-otp",
          method: "POST",
          data,
        });
        const result = await req.data;
        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  const handleResendOtp = async () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter only your email before resending OTP.");
      return;
    }

    mutateResendOtp(
      { email },
      {
        onSuccess: () => {
          toast.success("OTP resent successfully!");
        },
        onError: (error) => {
          const errorMessage = AxiosErrorHandler(error);
          toast.error(errorMessage);
        },
      }
    );
  };
  return (
    <section className="flex flex-col h-full w-full justify-center items-center ">
      <section className="flex flex-col justify-center items-center max-w-[500px] ">
        <h1 className="sm:text-2xl text-xl font-bold mt-6">
          Verify Your Identity
        </h1>
        <p className="sm:text-lg text-base text-center mt-2">
          We have sent a one-time password (OTP) to your registered email.
          Please enter it below to verify identity.
        </p>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="mt-6  flex flex-col sm:w-[360px] w-[90%] space-y-5"
        >
          <div className="flex flex-col w-full ">
            <label htmlFor="otp" className="text-neutral-600 font-medium ">
              OTP
            </label>
            <input
              placeholder="OTP"
              type="text"
              {...register("otp")}
              inputMode="numeric"
              maxLength={6}
              className="border-2 rounded-md p-2 w-full  placeholder:text-sm placeholder:text-gray-800"
            />

            {errors.otp && (
              <small className="text-sm text-red-400">
                {errors.otp.message}
              </small>
            )}
          </div>
          <div className="flex flex-col w-full ">
            <label htmlFor="email" className="text-neutral-600 font-medium ">
              Email
            </label>
            <input
              placeholder="johnedoe@gmail.com"
              type="email"
              {...register("email")}
              // id="email"
              className="border-2 rounded-md p-2 w-full  placeholder:text-gray-800"
            />

            {errors.email && (
              <small className="text-sm text-red-400">
                {errors.email.message}
              </small>
            )}
          </div>

          <Button
            //   onClick={handleSubmitResetPassword}
            type="submit"
            className="w-full mt-4 text-base"
          >
            {isPending ? (
              <div className="w-8 h-8">
                <Loader />
              </div>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>

        <Button
          onClick={handleResendOtp}
          type="button"
          variant={"ghost"}
          className=" font-bold items-center border-none  text-xs text-[#A21CAF] justify-center mt-6 "
        >
          {isLoading ? (
            <div className="w-8 h-8">
              <Loader />
            </div>
          ) : (
            "Resend OTP"
          )}
        </Button>
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
