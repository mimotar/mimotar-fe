"use client";

import PasswordIcon from "@/app/svgIconComponent/PasswordIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutateAction } from "@/app/hooks/useMutation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

// zod schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password cannot be longer than 32 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password cannot be longer than 32 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function SetNewPassword() {
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const { isPending, mutate } = useMutateAction<any, Record<string, string>>(
    "post",
    "password-reset/"
  );
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  // console.log(token, email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleSubmitResetPassword = (data: ResetPasswordFormData) => {
    console.log(data);
    const payload = {
      token: token!,
      email: email!,
      newPassword: data.password!,
    };
    mutate(payload, {
      onError: (error) => {
        toast(error.message);
        return;
      },
      onSuccess: () => {
        toast("password reset successfully");
        navigate.push("/auth/forget-password?type=password-reset");
        return;
      },
    });
  };

  return (
    <section className="flex flex-col justify-center items-center ">
      <PasswordIcon className="sm:w-24 sm:h-24 w-20 h-20" />
      <h1 className="sm:text-2xl text-xl font-bold mt-6">Set new password</h1>
      <p className="sm:text-lg text-base text-center mt-2">
        Your new password must be different from previous passwords.
      </p>

      <form
        onSubmit={handleSubmit(handleSubmitResetPassword)}
        className="mt-6  flex flex-col sm:w-[360px] w-[90%] space-y-5"
      >
        <div className="flex flex-col w-full relative">
          <label htmlFor="password" className="text-neutral-600 font-medium ">
            Password
          </label>
          <input
            id="password"
            placeholder={passwordVisibility.password ? "" : "........"}
            type={passwordVisibility.password ? "text" : "password"}
            {...register("password")}
            className="border-2 rounded-md p-2 w-full placeholder:text-4xl placeholder:text-gray-800"
          />
          <AiOutlineEye
            onClick={() =>
              setPasswordVisibility((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            className="absolute bottom-3 text-lg text-gray-600  right-3"
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-full relative">
          <label
            htmlFor="confirmPassword"
            className="text-neutral-600 font-medium "
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            placeholder={passwordVisibility.confirmPassword ? "" : "........"}
            type={passwordVisibility.confirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className="border-2 rounded-md p-2 w-full placeholder:text-4xl placeholder:text-gray-800"
          />
          <AiOutlineEye
            onClick={() =>
              setPasswordVisibility((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
            className="absolute bottom-3 text-lg text-gray-600  right-3"
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
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
