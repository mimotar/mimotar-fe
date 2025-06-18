"use client";

import { AuthTypes } from "@/lib/types/AuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AuthFormSchema, LoginFormSchema } from "@/lib/schemas/loginSchema";
import { Input, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { AxiosErrorHandler } from "@/app/utils/axiosErrorHandler";

interface ILoginFormProps {
  closeModal: () => void;
}
const Login = () => {
  const navigate = useRouter();

  const form = useForm<Omit<AuthTypes, "firstName" | "lastName">>({
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
        // closeModal();
        navigate.push(result.url as string);
        toast.success("login successful.");

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
                <Link
                  href={"/auth/forget-password"}
                  className="text-sm text-[#A21CAF] font-bold"
                >
                  Forget password
                </Link>
              </FormItem>
            )}
          />
          <Button
            // disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full h-10 font-bold text-neutral-50 text-xs xl:text-base"
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
          <Button
            onClick={() => signIn("google")}
            className="border flex gap-x-2 hover:bg-transparent bg-white border-[#A21CAF] w-full"
          >
            <FcGoogle className="h-4 w-4" />
            <p className="text-[#A21CAF] font-bold  text-xs xl:text-sm">
              Login with your Google account
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
