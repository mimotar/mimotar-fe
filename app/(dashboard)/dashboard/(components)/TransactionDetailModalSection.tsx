"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppSelector } from "@/lib/hooks";
import { IoMdArrowBack } from "react-icons/io";
import { useAppDispatch } from "@/lib/hooks";
import { setStage, setIsOpen } from "@/lib/slices/createTransactionStateSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TransactionDetailSchema, {
  TransactionDetailSchemaType,
} from "@/lib/schemas/createTransactionSchema";

export default function TransactionDetailModalSection() {
  const getCreateTransactionStateModal = useAppSelector(
    (state) => state.createTransactionStateModal
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionDetailSchemaType>({
    resolver: zodResolver(TransactionDetailSchema),
  });

  const handleNext = (data: TransactionDetailSchemaType) => {
    console.log(data);
    dispatch(setStage(2));
  };

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
              type="text"
              {...register("amount")}
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

          <div className="flex flex-col">
            <h1 className="mb-2">Transaction type</h1>
            <div className="inline-flex items-center gap-2">
              <input
                type="radio"
                {...register("transaction_type")}
                value="physical product"
                id="physical_product"
                className="w-5 h-5 accent-purple-800"
              />
              <label htmlFor="physical_product " className="text-sm">
                Physical product
              </label>
            </div>

            <div className="inline-flex items-center gap-2 mt-2">
              <input
                type="radio"
                {...register("transaction_type")}
                value="online product"
                id="online_product"
                className="w-5 h-5 accent-purple-800"
              />
              <label htmlFor="online_product " className="text-sm">
                Online product
              </label>
            </div>
            <div className="inline-flex items-center gap-2 mt-2">
              <input
                type="radio"
                {...register("transaction_type")}
                value="service"
                id="service"
                className="w-5 h-5 accent-purple-800"
              />
              <label htmlFor="service " className="text-sm">
                Service
              </label>
            </div>

            {errors.transaction_type && (
              <small className="text-red-400">
                {errors.transaction_type.message}
              </small>
            )}
          </div>

          <div className="flex justify-between items-center">
            <PrimaryOutline
              onClick={() => dispatch(setIsOpen(false))}
              className="px-6"
            >
              <IoMdArrowBack />
              Back
            </PrimaryOutline>

            <PrimaryButton
              type="submit"
              className="inline-flex w-fit h-fit justify-center items-center gap-2 px-6 py-2"
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
