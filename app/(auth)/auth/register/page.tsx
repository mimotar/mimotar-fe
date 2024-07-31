"use client";
import Password from "@/app/commons/Password";
import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import SecondaryButton from "@/app/commons/SecondaryButton";
import { TextInput } from "@/app/commons/TextInput";
import { AuthTypes } from "@/app/types/AuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ZodType, z } from "zod";

const page = () => {
  const schema: ZodType<AuthTypes> = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthTypes>({
    resolver: zodResolver(schema),
  });

  return (
    <div className=" w-full h-full p- xl:p-4 flex flex-col  items-center">
      <form className=" w-[70%] ">
        <div className="space-y-4 xl:space-y-6">
          <TextInput
            type="text"
            name="email"
            label="Email"
            register={register}
            error={errors.email}
            placeholder="name@gmail.com"
          />
          <Password
            type="password"
            name="password"
            label="Password"
            register={register}
            error={errors.password}
            placeholder="password"
          />
          <div className="w-full  pt-4">
            <PrimaryButton
              className="text-xs xl:text-base w-full h-10 font-bold text-neutral-50"
              // text=
            >
              {"Register"}
            </PrimaryButton>
            <div className="text-[10px] xl:text-xs py-2 xl:w-[95%] ">
              By creating an account, you agree to the Mimotar{" "}
              <strong className="text-primary-700">Terms of Service</strong> and{" "}
              <strong className="text-primary-700">Privacy Policy</strong>
            </div>
          </div>

          <div className="w-full gap-x-1  flex flex-row items-center h-4">
            <div className="h-[1px] bg-neutral-900 w-[50%] xl:text-base text-xs"></div>
            <p className="font-bold xl:text-base text-xs">OR</p>
            <div className="h-[1px] bg-neutral-900 xl:text-sm text-xs w-[50%] "></div>
          </div>
          <div className="w-full">
            <PrimaryOutline>
              <FcGoogle className="h-4 w-4" />
              <p className="text-primary-700 font-bold  text-xs xl:text-sm">
                Login with your Google account
              </p>
            </PrimaryOutline>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
