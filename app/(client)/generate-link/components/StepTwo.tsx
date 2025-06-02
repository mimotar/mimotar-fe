"use client";

import Input from "@/app/commons/Input";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import RadioInput from "@/app/commons/RadioInput";
import SecondaryButton from "@/app/commons/SecondaryButton";
import TextAreaInput from "@/app/commons/TextAreaInput";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRef } from "react";
import {
  stage2TicketSchema,
  IStage2TicketSchema,
} from "@/lib/schemas/CreateTransactionsSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";

export default function StepTwo() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const transactionData = useAppSelector((state) => state.createTransaction);
  const nextBtnRef = useRef<HTMLFormElement>(null);
  // console.log("Transaction Data:", transactionData);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStage2TicketSchema>({
    resolver: zodResolver(stage2TicketSchema),
  });

  const onSubmit = (data: IStage2TicketSchema) => {
    console.log(data);
    dispatch(setTransactionDetails(data));
    navigate.push("generate-link?step=3");
  };

  console.log("Form Errors:", errors);
  return (
    <section className="flex flex-col h-full w-full">
      <h1 className="font-bold text-lg">Transaction Details</h1>
      <h3>All information about the transaction.</h3>
      <form
        ref={nextBtnRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-6"
      >
        <Input
          {...register("amount", {
            valueAsNumber: true,
            required: "Amount is required",
            min: { value: 1, message: "Amount must be at least 1" },
          })}
          error={errors?.amount && errors.amount.message}
          labelName="Amount"
          isShowLabel={true}
        />

        <TextAreaInput
          {...register("transaction_description")}
          error={errors?.transaction_description?.message}
          labelName="Transaction description"
          isShowLabel={true}
          id="description"
        />

        <Input
          type="file"
          multiple
          accept=".png, .jpg, .jpeg,"
          {...register("attachment")}
          error={errors?.attachment && errors.attachment.message}
          labelName="Attachment"
          isShowLabel={true}
        />

        <h2>Transaction type</h2>
        <RadioInput
          {...register("transactionType")}
          value="PHYSICAL_PRODUCT"
          type="radio"
          id="physical"
          labelName="Physical product"
          className="text-base h-4 w-4"
        />
        <RadioInput
          value="ONLINE_PRODUCT"
          type="radio"
          id="Online"
          {...register("transactionType")}
          labelName="Online product"
          className="text-base h-4 w-4"
        />

        <RadioInput
          value="SERVICE"
          type="radio"
          id="service"
          {...register("transactionType")}
          labelName="Service"
          className="text-base h-4 w-4"
        />
        {errors?.transactionType && (
          <small className="text-sm text-red-300">
            {errors.transactionType.message}
          </small>
        )}
      </form>

      <div className="flex justify-between w-full h-fit mt-10">
        <PrimaryButton
          onClick={() => navigate.push("generate-link")}
          className="bg-white text-[#A21CAF] border border-[#A21CAF] text-lg w-36"
        >
          <span className="inline-flex gap-1 items-center ">
            <IoMdArrowBack />
            Back
          </span>
        </PrimaryButton>

        <SecondaryButton
          onClick={() => nextBtnRef.current?.requestSubmit()}
          className="w-36 text-lg bg-[#A21CAF] text-white"
        >
          <span className="inline-flex gap-1 items-center ">
            Next <IoMdArrowBack className="rotate-180" />
          </span>
        </SecondaryButton>
      </div>
    </section>
  );
}
