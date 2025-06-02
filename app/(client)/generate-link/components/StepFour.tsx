"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/app/commons/SecondaryButton";
import Input, { InputAndCountryFlag } from "@/app/commons/Input";
import RadioInput from "@/app/commons/RadioInput";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRef } from "react";
import {
  IStage4TicketSchema,
  stage4TicketSchema,
} from "@/lib/schemas/CreateTransactionsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";
import TextAreaInput from "@/app/commons/TextAreaInput";
import { useMutateAction } from "@/app/hooks/useMutation";
import Loader from "@/components/Loader";
import { ITransaction } from "@/app/types.ts/ICreateTransaction";
import { AxiosErrorHandler } from "@/app/utils/axiosErrorHandler";
import toast from "react-hot-toast";

export default function StepFour() {
  const navigate = useRouter();

  const dispatch = useAppDispatch();
  const transactionData = useAppSelector((state) => state.createTransaction);
  const nextBtnRef = useRef<HTMLFormElement>(null);
  // console.log("Transaction Data:", transactionData);

  const { isError, isPending, mutate } = useMutateAction<any, FormData>(
    "post",
    "ticket"
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStage4TicketSchema>({
    resolver: zodResolver(stage4TicketSchema),
  });

  const onSubmit = async (data: IStage4TicketSchema) => {
    console.log(data);
    dispatch(setTransactionDetails(data));

    const formData = new FormData();

    // Append all transactionData fields (except files)
    for (const [key, value] of Object.entries({
      ...transactionData,
      ...data,
    })) {
      if (key !== "attachment" && value !== undefined) {
        formData.append(key, value as string);
      }
    }

    // Handle and append file(s)
    const attachments = transactionData?.attachment;

    if (attachments) {
      if (attachments instanceof FileList) {
        Array.from(attachments).forEach((file) =>
          formData.append("attachment", file)
        );
      } else if (Array.isArray(attachments)) {
        attachments.forEach((file) => formData.append("attachment", file));
      } else if (attachments instanceof File) {
        formData.append("attachment", attachments);
      }
    }

    mutate(formData, {
      onError: (error) => {
        const errorObj = AxiosErrorHandler(error);
        toast.error(errorObj);
      },
      onSuccess: (data) => {
        console.log("Transaction created successfully:", data);
        toast.success("Transaction created successfully!");
        navigate.push("generate-link?step=5");
      },
    });
  };

  console.log(errors);
  return (
    <section className="flex flex-col w-full h-full">
      <h1 className="font-bold text-lg">Second Transactor&apos;s Info</h1>
      <h3>
        Input the personal details of the other party (whether buyer or seller).
      </h3>

      <form
        ref={nextBtnRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-6"
      >
        <Input
          type="text"
          labelName="Full name"
          placeholder="First name  and Surname"
          isShowLabel={true}
          {...register("receiver_fullname")}
          error={errors?.receiver_fullname?.message}
        />
        <Input
          type="email"
          labelName="Email"
          placeholder="name@email.com"
          isShowLabel={true}
          {...register("reciever_email")}
          error={errors?.reciever_email?.message}
        />
        <InputAndCountryFlag
          labelName="Phone number"
          isShowLabel={true}
          placeholder="+1"
          {...register("receiver_no")}
          error={errors?.receiver_no?.message}
        />

        <Input
          type="text"
          labelName="Address (Optional)"
          placeholder="House number, Street, Town/City, State"
          isShowLabel={true}
          {...register("receiver_address")}
          error={errors?.receiver_address?.message}
        />

        <div className="flex flex-col">
          <h2 className="font-semibold">
            Select the option that describes you
          </h2>
          <div className="flex items-center w-fit gap-4 ">
            <RadioInput
              value="BUYER"
              type="radio"
              id="buyer"
              {...register("reciever_role")}
              labelName="buyer"
              className="text-base h-4 w-4"
            />

            <RadioInput
              value="SELLER"
              type="radio"
              id="seller"
              {...register("reciever_role")}
              labelName="Seller"
              className="text-base h-4 w-4"
            />
          </div>
          <small className="text-red-400">
            {errors?.reciever_role?.message}
          </small>
        </div>
      </form>

      <div className="flex justify-between w-full h-fit mt-10">
        <PrimaryButton
          onClick={() => navigate.push("generate-link?step=3")}
          className="bg-white text-[#A21CAF] border border-[#A21CAF] text-lg w-36"
        >
          <span className="inline-flex gap-1 items-center ">
            <IoMdArrowBack />
            Back
          </span>
        </PrimaryButton>

        <SecondaryButton
          disabled={isPending}
          onClick={() => nextBtnRef.current?.requestSubmit()}
          className="w-36 text-lg bg-[#A21CAF] text-white inline-flex items-center justify-center"
        >
          <span className="inline-flex gap-1 items-center ">
            Next <IoMdArrowBack className="rotate-180" />
          </span>

          {isPending ? (
            <div className="w-8 h-8">
              <Loader />
            </div>
          ) : (
            ""
          )}
        </SecondaryButton>
      </div>
    </section>
  );
}
