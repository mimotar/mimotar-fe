"use client";
import Password from "@/app/commons/Password";
import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import SecondaryButton from "@/app/commons/SecondaryButton";
import { TextInput } from "@/app/commons/TextInput";
import { AuthTypes } from "@/lib/types/AuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ZodType, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AuthFormSchema } from "@/lib/schemas/loginSchema";
import { Input, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { Label } from "@/components/ui/label";

const Login = () => {
  const form = useForm<AuthTypes>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: AuthTypes) => {
    return setTimeout(() => {
      console.log(data);
    }, 2000);
  };

  return (
    <div className=" h-full gap-y-4 p- xl:p-4 flex flex-col  items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="font-bold">Email</Label>
                <FormControl>
                  <Input
                    placeholder="email@gmail.com"
                    {...field}
                    className="focus:outline-none focus:border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label className="font-bold">Password</Label>

                <FormControl>
                  <PasswordInput field={field} />
                </FormControl>
                <FormMessage />
                <Link href={"/"} className="text-sm text-[#A21CAF] font-bold">
                  Forget password
                </Link>
              </FormItem>
            )}
          />
          <Button
            className="w-full
            text-xs xl:text-base  h-10 font-bold text-neutral-50"
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <div className="w-8 h-8">
                <Loader />
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-y-5 pt-3 w-full">
        <div className="w-full gap-x-1  flex flex-row items-center h-4">
          <div className="h-[1px] bg-neutral-900 w-[50%] xl:text-base text-xs"></div>
          <p className="font-bold xl:text-base text-xs">OR</p>
          <div className="h-[1px] bg-neutral-900 xl:text-sm text-xs w-[50%] "></div>
        </div>
        <div className="w-full">
          <Button className="border flex gap-x-2 hover:bg-transparent bg-white border-[#A21CAF] w-full">
            <FcGoogle className="h-4 w-4" />
            <p className="text-[#A21CAF] font-bold  text-xs xl:text-sm">
              Login with your Google account
            </p>
          </Button>
        </div>
      </div>
      {/* <form className="flex flex-col h-full w-[70%] ">
        <div className="space-y-4 xl:space-y-6">
          <TextInput
            type="text"
            name="email"
            label="Email"
            register={register}
            error={errors.email}
            placeholder="name@gmail.com"
          />
          <div className="">
            <Password
              type="password"
              name="password"
              label="Password"
              register={register}
              error={errors.password}
              placeholder="password"
            />
            <Link
              href={""}
              className=" text-primary-700 font-bold text-xs lg:text-sm"
            >
              Forgot password
            </Link>
          </div>
          <div className="w-full  py-4">
            <PrimaryButton
              className="text-xs xl:text-base w-full h-10 font-bold text-neutral-50"
              // text={"Login"}
            >
              Login
            </PrimaryButton>
          </div>
          <div className="flex flex-col gap-y-3 pt-3">
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
        </div>
      </form> */}
    </div>
  );
};

export default Login;
