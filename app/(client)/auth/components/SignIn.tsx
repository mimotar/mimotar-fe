"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { AuthTypes } from "../types/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormSchema } from "../schema/AuthSchema";
import { AxiosErrorHandler } from "@/app/utils/axiosErrorHandler";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { unTokenAxiosInstance } from "@/lib/services/axiosService";
import toast from "react-hot-toast";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  const location =
    (searchParams.get("auth") as "login" | "signup" | null) ?? "signup";

  const navigate = useRouter();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<AuthTypes>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: AuthTypes) => {
      try {
        const req = await unTokenAxiosInstance({
          url: "/user",
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

  const onSubmit: SubmitHandler<AuthTypes> = (dataPayload) => {
    mutate(dataPayload, {
      onSuccess: (data) => {
        console.log(data);
        navigate.push("auth?auth=login");
        toast.success("Registration successful, please check your email");
        // closeModal();
      },
      onError: (error) => {
        const errorMessage = AxiosErrorHandler(error);
        toast.error(errorMessage);
      },
    });
  };
  return (
    <div>
      <h2 className="text-center text-xl font-extrabold text-[#111827]">
        Create persistent account
      </h2>
      <p className="mt-1.5 text-center text-xs text-gray-400">
        Secure escrow payouts inside Nigeria
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-xs font-bold text-gray-500 mb-1"
          >
            First Name
          </label>
          <div className="relative">
            <input
              id="firstName"
              type="text"
              required
              {...register("firstName")}
              //   value={fullName}
              placeholder="e.g. Oluwaseun"
              className={`w-full px-4 py-3 rounded-xl border placeholder-gray-300 text-xs text-gray-800 focus:outline-none transition-colors ${errors.firstName ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
            />
            {errors.firstName && (
              <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.firstName?.message}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-xs font-bold text-gray-500 mb-1"
          >
            Last Name
          </label>
          <div className="relative">
            <input
              id="lastName"
              type="text"
              required
              {...register("lastName")}
              // value={""}

              placeholder="e.g. Adebayo"
              className={`w-full px-4 py-3 rounded-xl border placeholder-gray-300 text-xs text-gray-800 focus:outline-none transition-colors ${errors.firstName ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
            />
            {errors.lastName && (
              <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.lastName?.message}</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="signup-email"
            className="block text-xs font-bold text-gray-500 mb-1"
          >
            Email address
          </label>
          <div className="relative">
            <input
              id="signup-email"
              type="email"
              required
              {...register("email")}
              placeholder="name@email.com"
              className={`w-full px-4 py-3 rounded-xl border placeholder-gray-300 text-xs text-gray-800 focus:outline-none transition-colors ${errors.email ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
            />
            {errors.email && (
              <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-xs font-bold text-gray-500 mb-1"
          >
            Secret Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              {...register("password")}
              placeholder="Must be strong & secure"
              className={`w-full px-4 py-3 rounded-xl border placeholder-gray-300 text-xs text-gray-800 focus:outline-none pr-12 transition-colors ${errors.password ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 bottom-0 px-4 text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Password Strength Gauge & Explanatory Tips */}
          {getValues("password").length > 0 && (
            <div className="mt-2.5 p-3 rounded-2xl bg-gray-50 border border-gray-100 text-left space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-gray-500 uppercase tracking-wider">
                  Password Strength:
                </span>
                {(() => {
                  const len = getValues("password").length >= 8;
                  const cap = /[A-Z]/.test(getValues("password"));
                  const num = /[0-9]/.test(getValues("password"));
                  const score = (len ? 1 : 0) + (cap ? 1 : 0) + (num ? 1 : 0);
                  if (score === 1)
                    return (
                      <span className="text-red-500 font-extrabold font-mono">
                        WEAK
                      </span>
                    );
                  if (score === 2)
                    return (
                      <span className="text-amber-500 font-extrabold font-mono">
                        FAIR
                      </span>
                    );
                  if (score === 3)
                    return (
                      <span className="text-emerald-500 font-extrabold font-mono">
                        STRONG & SECURE
                      </span>
                    );
                  return (
                    <span className="text-gray-400 font-bold font-mono">
                      DRAFT
                    </span>
                  );
                })()}
              </div>

              {/* Progress Bar Segments */}
              <div className="flex gap-1 h-1.5">
                {(() => {
                  const len = getValues("password").length >= 8;
                  const cap = /[A-Z]/.test(getValues("password"));
                  const num = /[0-9]/.test(getValues("password"));
                  const score = (len ? 1 : 0) + (cap ? 1 : 0) + (num ? 1 : 0);

                  return [1, 2, 3].map((val) => {
                    let bg = "bg-gray-200";
                    if (score >= val) {
                      if (score === 1) bg = "bg-red-500";
                      else if (score === 2) bg = "bg-amber-400";
                      else if (score === 3) bg = "bg-emerald-500";
                    }
                    return (
                      <div
                        key={val}
                        className={`flex-1 rounded-sm h-full transition-all duration-300 ${bg}`}
                      />
                    );
                  });
                })()}
              </div>

              {/* Checklists */}
              <div className="space-y-1 text-[10.5px] font-sans">
                <div className="flex items-center gap-1.5 font-semibold">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${getValues("password").length >= 8 ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}`}
                  >
                    {getValues("password").length >= 8 ? "✓" : "•"}
                  </span>
                  <span
                    className={
                      getValues("password").length >= 8
                        ? "text-emerald-700 font-sans"
                        : "text-gray-400 font-sans"
                    }
                  >
                    At least 8 characters ({getValues("password").length}/8)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${/[A-Z]/.test(getValues("password")) ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}`}
                  >
                    {/[A-Z]/.test(getValues("password")) ? "✓" : "•"}
                  </span>
                  <span
                    className={
                      /[A-Z]/.test(getValues("password"))
                        ? "text-emerald-700 font-sans"
                        : "text-gray-400 font-sans"
                    }
                  >
                    Contains a capital letter (A-Z)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${/[0-9]/.test(getValues("password")) ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}`}
                  >
                    {/[0-9]/.test(getValues("password")) ? "✓" : "•"}
                  </span>
                  <span
                    className={
                      /[0-9]/.test(getValues("password"))
                        ? "text-emerald-700 font-sans"
                        : "text-gray-400 font-sans"
                    }
                  >
                    Contains a number (0-9)
                  </span>
                </div>
              </div>
            </div>
          )}

          {errors?.password && (
            <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.password.message}</span>
            </div>
          )}
        </div>

        {/* {errorText && (
          <div className="p-3 bg-red-50 text-red-600 text-[11px] font-medium rounded-xl flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorText}</span>
          </div>
        )} */}

        <button
          type="submit"
          disabled={isPending}
          className="w-full relative py-3 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition active:scale-95 cursor-pointer flex items-center justify-center"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            "Create Secure Account App"
          )}
        </button>
      </form>

      <div className="mt-5 text-center">
        <Link
          href={"auth?auth=login"}
          //   onClick={() => setMode("login")}
          className="text-xs font-semibold text-brand-primary hover:underline"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
