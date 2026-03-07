"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppSelector } from "@/lib/hooks";
import { IoMdArrowBack } from "react-icons/io";
import { useAppDispatch } from "@/lib/hooks";
import { setStage, setIsOpen } from "@/lib/slices/createTransactionStateSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IStage2TicketSchema,
  stage2TicketSchema,
} from "@/lib/schemas/CreateTransactionsSchema";
import { useEffect } from "react";

export default function TransactionDetailModalSection() {
  const { stepState, transactionData } = useAppSelector((state) => ({
    stepState: state.createTransactionStateModal,
    transactionData: state.createTransaction,
  }));
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IStage2TicketSchema>({
    resolver: zodResolver(stage2TicketSchema),
  });

  const handleAttachment = () => {};

  const handleNext = (data: IStage2TicketSchema) => {
    console.log(data);
    dispatch(setStage(2));
  };

  useEffect(() => {
    setValue("amount", transactionData.amount);
    if (transactionData.attachment instanceof FileList) {
      setValue("attachment", transactionData.attachment);
    }

    if (
      transactionData.transactionType === "PHYSICAL_PRODUCT" ||
      transactionData.transactionType === "ONLINE_PRODUCT" ||
      transactionData.transactionType === "SERVICE"
    ) {
      setValue("transactionType", transactionData.transactionType);
    }
    setValue(
      "transaction_description",
      transactionData.transaction_description,
    );
    setValue("attachment", transactionData.attachment ?? []);
  }, [setValue, transactionData]);

  return (
    <section className="flex flex-col mx-auto sm:w-[580px] w-[95%]">
      <div className="flex flex-col">
        <h1 className="2xl:text-2xl text-xl font-bold">Transaction Details</h1>
        <p className="2xl:text-lg  font-light">
          All information about the transaction.
        </p>
      </div>

      <div className="flex flex-col h-full w-full mt-6">
        <form
          onSubmit={handleSubmit(handleNext)}
          className="flex flex-col 2xl:gap-8 gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              id="amount"
              placeholder="$ 40"
              className="p-2 rounded-md border"
            />
            {errors.amount && (
              <small className="text-red-400">{errors.amount.message}</small>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="transaction_description ">
              Transaction description
            </label>
            <textarea
              {...register("transaction_description")}
              rows={4}
              id="transaction_description"
              placeholder="What is this payment for?"
              className="p-2 rounded-md border"
            ></textarea>
            {errors.transaction_description && (
              <small className="text-red-400">
                {errors.transaction_description.message}
              </small>
            )}
          </div>
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <input
                onChange={handleAttachment}
                type="file"
                multiple
                accept=".png, .jpg, .jpeg,"
                // {...register("attachment")}
              />
              <small className="inline-flex gap-2 mt-2"></small>
            </div>

            <button
              onClick={() => ""}
              type="button"
              className="rounded-md text-white self-start bg-brand-secondary hover:bg-brand-secondary/80 cursor-pointer p-2"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col">
            <h1 className="mb-2">Transaction type</h1>
            <div className="inline-flex items-center gap-2">
              <input
                type="radio"
                {...register("transactionType")}
                value="PHYSICAL_PRODUCT"
                id="physical_product"
                className="w-5 h-5 accent-purple-800"
              />
              <label htmlFor="physical_product" className="text-sm">
                Physical product
              </label>
            </div>

            <div className="inline-flex items-center gap-2 mt-2">
              <input
                type="radio"
                {...register("transactionType")}
                value="ONLINE_PRODUCT"
                id="online_product"
                className="w-5 h-5 accent-purple-800"
              />
              <label htmlFor="online_product" className="text-sm">
                Online product
              </label>
            </div>
            <div className="inline-flex items-center gap-2 mt-2">
              <input
                type="radio"
                {...register("transactionType")}
                value="SERVICE"
                id="service"
                className="w-5 h-5 accent-purple-800"
              />
              <label htmlFor="service" className="text-sm">
                Service
              </label>
            </div>

            {errors.transactionType && (
              <small className="text-red-400">
                {errors.transactionType.message}
              </small>
            )}
          </div>

          <div className="flex justify-between items-center">
            <PrimaryOutline
              onClick={() => dispatch(setIsOpen(false))}
              className="px-6 cursor-pointer"
            >
              <IoMdArrowBack />
              Back
            </PrimaryOutline>

            <PrimaryButton
              type="submit"
              className="inline-flex cursor-pointer w-fit h-fit justify-center items-center gap-2 px-6 py-2"
            >
              Next
              <IoMdArrowBack className="rotate-180" />
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
