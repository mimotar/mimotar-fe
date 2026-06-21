"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  IVerifyOtpSchemaType,
  verifyOtpSchema,
} from "../schema/UserVerifyOtpSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { unTokenAxiosInstance } from "@/lib/services/axiosService";
import toast from "react-hot-toast";
import { AxiosErrorHandler } from "@/app/utils/axiosErrorHandler";
import { AlertCircle, Loader, Loader2 } from "lucide-react";

export default function UserOtp() {
  const searchParams = useSearchParams();
  const mail =
    (searchParams.get("auth") as "login" | "signup" | "mail" | null) ?? "mail";
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

  const handleOtpSubmit: SubmitHandler<IVerifyOtpSchemaType> = (data) => {
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
      },
    );
  };
  return (
    <>
      <h2 className="text-center text-xl font-bold text-gray-900">
        Enter authorization code
      </h2>
      <p className="mt-1 pb-1 text-center text-xs text-gray-400">
        Verification OTP dispatched to{" "}
        <span className="font-semibold text-gray-700">{mail}</span>
      </p>

      <div className="mt-4 text-center bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-3.5 flex flex-col gap-1">
        <span className="text-[11px] text-gray-500 font-medium">
          Visual Sandbox Token
        </span>
        <span className="text-sm font-black tracking-widest text-brand-primary font-mono">
          1 2 3 4 5 6
        </span>
      </div>

      <form onSubmit={handleSubmit(handleOtpSubmit)} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="otp-verification-code"
            className="block text-xs font-bold text-gray-500 mb-1.5 text-center"
          >
            6-Digit Verification Pin
          </label>
          <input
            id="otp-verification-code"
            type="text"
            required
            maxLength={6}
            {...register("otp")}
            placeholder="0 0 0 0 0 0"
            className="w-full text-center px-4 py-3.5 tracking-widest text-base font-bold text-gray-800 rounded-xl border border-gray-100 placeholder-gray-300 focus:outline-none focus:border-brand-primary bg-gray-50"
          />
        </div>

        {errors?.otp && (
          <div className="p-3 bg-red-50 text-red-700 text-[11px] font-medium rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
            <span>{errors.otp?.message}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="otp-mail"
            className="block text-xs font-bold text-gray-500 mb-1.5 text-center"
          >
            Mail
          </label>
          <input
            id="otp-email"
            type="email"
            required
            {...register("email")}
            placeholder="johndoe@gmail.com"
            className="w-full text-center px-4 py-3.5 tracking-widest text-base font-bold text-gray-800 rounded-xl border border-gray-100 placeholder-gray-300 focus:outline-none focus:border-brand-primary bg-gray-50"
          />
        </div>

        {errors?.email && (
          <div className="p-3 bg-red-50 text-red-700 text-[11px] font-medium rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
            <span>{errors.email?.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition active:scale-95 bg-brand-primary"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            "Authorize OTP Session"
          )}
        </button>
      </form>

      <div className="mt-5 text-center flex flex-col gap-2">
        <button
          onClick={handleResendOtp}
          className="text-xs font-semibold text-brand-primary hover:underline cursor-pointer"
        >
          Resend verification token{" "}
          {isLoading && <Loader className="animate-spin text-lg" />}
        </button>

        <button
          //   onClick={() => setMode("signup")}
          className="text-[11px] text-gray-400 hover:text-gray-600 transition"
        >
          Change Registration email
        </button>
      </div>
    </>
  );
}
