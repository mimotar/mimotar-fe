"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStage } from "@/lib/slices/createTransactionStateSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import {
  IStage3TicketSchema,
  stage3TicketSchema,
} from "@/lib/schemas/CreateTransactionsSchema";
import { useEffect } from "react";

export default function CreateTransactionTermAndAgreement() {
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
  } = useForm<IStage3TicketSchema>({
    resolver: zodResolver(stage3TicketSchema),
  });
  console.log(errors);
  const handleNext = (data: IStage3TicketSchema) => {
    console.log(data);
    dispatch(setStage(3));
  };

  useEffect(() => {
    setValue("additional_agreement", transactionData.additional_agreement);
    setValue("expiresAt", transactionData.expiresAt!);
    setValue("inspection_duration", transactionData.inspection_duration);
    if (
      transactionData.pay_escrow_fee === "BOTH" ||
      transactionData.pay_escrow_fee === "BUYER" ||
      transactionData.pay_escrow_fee === "SELLER"
    ) {
      setValue("pay_escrow_fee", transactionData.pay_escrow_fee);
    }

    if (
      transactionData.pay_shipping_cost === "BOTH" ||
      transactionData.pay_shipping_cost === "BUYER" ||
      transactionData.pay_shipping_cost === "SELLER"
    ) {
      setValue("pay_shipping_cost", transactionData.pay_shipping_cost);
    }

    setValue("terms", transactionData.terms);
  }, [transactionData, setValue]);
  return (
    <section className="flex flex-col mx-auto sm:w-[580px] w-[95%]">
      <div className="flex flex-col">
        <h1 className="2xl:text-2xl text-xl font-bold">Terms and Agreement</h1>
        <p className="2xl:text-lg  font-light">
          Everything that should determine how the transaction goes. Both
          parties must agree to this.
        </p>
      </div>

      <div className="flex flex-col h-full w-full mt-6">
        <form
          onSubmit={handleSubmit(handleNext)}
          className="flex flex-col 2xl:gap-8 gap-4"
        >
          <div className="flex flex-col">
            <h1 className="inline-flex gap-2 items-center text-neutral-600 mb-2 font-medium">
              Who will pay the escrow fee?
              <AiOutlineExclamationCircle
                title="Who will pay the escrow fee"
                className="cursor-pointer"
              />
            </h1>
            <div className="inline-flex sm:flex-row flex-col gap-2 justify-between .sm:items-center">
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("pay_escrow_fee")}
                  id="escrowFeePayer_buyer"
                  value={"BUYER"}
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="escrowFeePayer_buyer"
                  className="text-neutral-900"
                >
                  Buyer (100%)
                </label>
              </div>
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("pay_escrow_fee")}
                  id="escrowFeePayer_seller"
                  value="SELLER"
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="escrowFeePayer_seller"
                  className="text-neutral-900"
                >
                  Seller (100%)
                </label>
              </div>
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("pay_escrow_fee")}
                  id="escrowFeePayer_both"
                  value="BOTH"
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="escrowFeePayer_both"
                  className="text-neutral-900"
                >
                  Both (50% - 50%)
                </label>
              </div>
            </div>

            {errors.pay_escrow_fee && (
              <small className="text-red-400">
                {errors.pay_escrow_fee.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="inspection_period"
              className="text-neutral-600 font-medium"
            >
              How long is the inspection period?
            </label>
            <input
              type="text"
              {...register("inspection_duration", { valueAsNumber: true })}
              id="inspection_period"
              placeholder="between 1 to 30 days"
              className="p-3 rounded-md border"
            />
            {errors.inspection_duration && (
              <small className="text-red-400">
                {errors.inspection_duration.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="expiresAt" className="text-neutral-600 font-medium">
              Ticket Expires At?
            </label>

            <input
              {...register("expiresAt", {
                valueAsNumber: true,
              })}
              id="expiresAt"
              className="p-3 rounded-md border"
              placeholder="between 1 to 30 days"
            />

            {errors.expiresAt && (
              <small className="text-red-400">{errors.expiresAt.message}</small>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="inline-flex gap-2 flex-wrap items-center text-neutral-600 mb-2 font-medium">
              Who will pay shipping costs?
              <span className="bg-neutral-100 rounded-full py-0.5 text-sm px-1.5">
                Optional
              </span>
            </h1>
            <div className="inline-flex sm:flex-row flex-col gap-2 justify-between sm:items-center">
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("pay_shipping_cost")}
                  id="shippingCostPayer_buyer"
                  value={"BUYER"}
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="shippingCostPayer_buyer"
                  className="text-neutral-900"
                >
                  Buyer (100%)
                </label>
              </div>
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("pay_shipping_cost")}
                  id="shippingCostPayer_seller"
                  value="SELLER"
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="shippingCostPayer_seller"
                  className="text-neutral-900"
                >
                  Seller (100%)
                </label>
              </div>
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("pay_shipping_cost")}
                  id="shippingCostPayer_both"
                  value="BOTH"
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="shippingCostPayer_both"
                  className="text-neutral-900"
                >
                  Both (50% - 50%)
                </label>
              </div>
            </div>

            {errors.pay_shipping_cost && (
              <small className="text-red-400">
                {errors.pay_shipping_cost.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="additional_agreement "
              className="text-neutral-600 font-medium flex items-center gap-2"
            >
              Additional agreement{" "}
              <span className="bg-neutral-100 rounded-full py-0.5 text-sm px-1.5">
                Optional
              </span>
            </label>
            <textarea
              {...register("additional_agreement")}
              rows={4}
              id="additional_agreement"
              placeholder="Discuss with the other person before you add any terms."
              className="p-2 rounded-md border"
            ></textarea>
            {errors.additional_agreement && (
              <small className="text-red-400">
                {errors.additional_agreement.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="terms"
              className="text-neutral-600 font-medium flex items-center gap-2"
            >
              Term and Condition
            </label>
            <textarea
              {...register("terms")}
              rows={4}
              id="terms"
              placeholder="Term and Condition"
              className="p-2 rounded-md border"
            />

            {errors.terms && (
              <small className="text-red-400">{errors.terms.message}</small>
            )}
          </div>

          <div className="flex justify-between items-center">
            <PrimaryOutline
              onClick={() => dispatch(setStage(1))}
              className="px-6 cursor-pointer "
            >
              <IoMdArrowBack />
              Back
            </PrimaryOutline>

            <PrimaryButton
              type="submit"
              className="inline-flex  cursor-pointer w-fit h-fit justify-center items-center gap-2 px-6 py-2"
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
