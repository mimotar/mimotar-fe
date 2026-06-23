"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthTypes } from "../types/AuthType";
import { LoginFormSchema } from "../schema/AuthSchema";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { AxiosErrorHandler } from "@/app/utils/axiosErrorHandler";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { isPending } from "@reduxjs/toolkit";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<Omit<AuthTypes, "firstName" | "lastName">>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<
    Omit<AuthTypes, "firstName" | "lastName">
  > = async (data) => {
    console.log(data);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      console.log(result);
      if (result?.ok && result.status == 200) {
        navigate.push(result.url as string);
        toast.success("login successful.");
        // closeModal();
        return;
      }
      if (result?.error && result.status == 401) {
        toast.error("Unauthorized credential");
        return;
      }
    } catch (error) {
      console.log(error);
      const errorMessage = AxiosErrorHandler(error);
      toast.error(errorMessage);
    }
  };
  return (
    <div>
      <h2 className="text-center text-xl font-bold text-[#111827]">
        Authorized Access
      </h2>
      <p className="mt-1 text-center text-xs text-gray-400">
        Ensure payment security is maintained
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-bold text-gray-500 mb-1"
          >
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            required
            {...register("email")}
            placeholder="name@email.com"
            className={`w-full px-4 py-3 rounded-xl border placeholder-gray-300 text-xs text-gray-800 focus:outline-none transition-colors ${errors?.email ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
          />
          {errors?.email && (
            <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label
              htmlFor="login-password"
              className="block text-xs font-bold text-gray-500"
            >
              Security Password
            </label>
            <Link
              href={"/auth/forget-password"}
              type="button"
              className="text-[10px] font-semibold text-brand-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative font-sans">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              {...register("password")}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 placeholder-gray-300 text-xs text-gray-800 focus:outline-none focus:border-brand-primary pr-12"
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
        </div>

        {errors?.password && (
          <div className="p-3 bg-red-50 text-red-700 text-[11px] font-medium rounded-xl flex items-start gap-2 animate-fade-in border border-red-100/50">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
            <span>{errors?.password.message}</span>
          </div>
        )}

        {/* {suspiciousLoginState && (
          <div className="p-3 bg-amber-50 text-amber-950 text-[10px] font-medium rounded-xl border border-amber-200/50 leading-relaxed">
            🔐 <span className="font-bold">Security Tip:</span> Skip suspicious
            logs by typing simple <span className="font-bold">"password"</span>{" "}
            and log in safely.
          </div>
        )} */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative py-3 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition active:scale-95 cursor-pointer flex items-center justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            "Authorize Secure Log In"
          )}
        </button>
      </form>

      <div className="mt-5 text-center">
        <Link
          href={"auth?auth=signup"}
          className="text-xs font-semibold text-brand-primary hover:underline"
        >
          No account yet? Register Here
        </Link>
      </div>
    </div>
  );
}
