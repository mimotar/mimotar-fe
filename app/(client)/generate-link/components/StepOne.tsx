"use client";

import Input, { InputAndCountryFlag } from "@/app/commons/Input";
import RadioInput from "@/app/commons/RadioInput";
import SecondaryButton from "@/app/commons/SecondaryButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  IStage1Schema,
  stage1Schema,
} from "@/lib/schemas/CreateTransactionsSchema";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";

export default function StepOne() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const transactionData = useAppSelector((state) => state.createTransaction);
  const nextBtnRef = useRef<HTMLFormElement>(null);
  console.log("Transaction Data:", transactionData);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStage1Schema>({
    resolver: zodResolver(stage1Schema),
  });

  const onSubmit = (data: IStage1Schema) => {
    console.log(data);
    dispatch(setTransactionDetails(data));
    navigate.push("generate-link?step=2");
  };

  console.log("Form Errors:", errors);

  return (
    <section className="flex flex-col h-full w-full">
      <h1 className="font-bold text-lg">Personal information</h1>
      <h3>Input your correct personal details here.</h3>
      <form
        ref={nextBtnRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-6"
      >
        <Input
          type="text"
          labelName="Full name"
          {...register("creator_fullname")}
          error={errors?.creator_fullname?.message}
          placeholder="First name  and Surname"
          isShowLabel={true}
        />
        <Input
          type="email"
          labelName="Email"
          {...register("creator_email")}
          error={errors?.creator_email?.message}
          placeholder="name@email.com"
          isShowLabel={true}
        />
        <InputAndCountryFlag
          labelName="Phone number"
          {...register("creator_no")}
          error={errors?.creator_no?.message}
          isShowLabel={true}
          placeholder="+1"
        />

        <Input
          type="text"
          labelName="Address (Optional)"
          {...register("creator_address")}
          error={errors?.creator_address?.message}
          placeholder="House number, Street, Town/City, State"
          isShowLabel={true}
        />

        <div className="flex flex-col">
          <h2 className="font-semibold">
            Select the option that describes you
          </h2>
          <div className="flex items-center w-fit gap-4 ">
            <RadioInput
              type="radio"
              id="buyer"
              value="BUYER"
              {...register("creator_role")}
              labelName="buyer"
              className="text-base h-4 w-4"
            />

            <RadioInput
              type="radio"
              id="seller"
              value="SELLER"
              {...register("creator_role")}
              labelName="Seller"
              className="text-base h-4 w-4"
            />
          </div>
          {errors?.creator_role && (
            <small className="text-sm text-red-300">
              {errors.creator_role.message}
            </small>
          )}
        </div>
      </form>

      <div className="flex justify-end w-full mt-10">
        <SecondaryButton
          onClick={() => nextBtnRef.current?.requestSubmit()}
          // onClick={() => navigate.push("generate-link?step=2")}
          className="w-36 h-14 text-lg bg-[#A21CAF] text-white"
        >
          <span className="inline-flex gap-1 items-center ">
            Next <IoMdArrowBack className="rotate-180" />
          </span>
        </SecondaryButton>
      </div>
    </section>
  );
}
