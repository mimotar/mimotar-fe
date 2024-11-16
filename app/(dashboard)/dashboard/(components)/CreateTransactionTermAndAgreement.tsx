"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  TermAndAgreementSchema,
  TermAndAgreementSchemaType,
} from "@/lib/schemas/createTransactionSchema";
import { setIsOpen, setStage } from "@/lib/slices/createTransactionStateSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function CreateTransactionTermAndAgreement() {
  const getCreateTransactionStateModal = useAppSelector(
    (state) => state.createTransactionStateModal
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TermAndAgreementSchemaType>({
    resolver: zodResolver(TermAndAgreementSchema),
  });

  const handleNext = (data: TermAndAgreementSchemaType) => {
    console.log(data);
    dispatch(setStage(3));
  };
  return (
    <section className="flex flex-col mx-auto sm:w-[580px] w-[90%]">
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
            <div className="inline-flex gap-2 justify-between items-center">
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("escrowFeePayer")}
                  id="escrowFeePayer_buyer"
                  value={"Buyer (100%)"}
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
                  {...register("escrowFeePayer")}
                  id="escrowFeePayer_seller"
                  value="Seller (100%)"
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
                  {...register("escrowFeePayer")}
                  id="escrowFeePayer_both"
                  value="Both (50% - 50%)"
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

            {errors.escrowFeePayer && (
              <small className="text-red-400">
                {errors.escrowFeePayer.message}
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
              {...register("inspection_period")}
              id="inspection_period"
              placeholder="between 1 to 30 days"
              className="p-3 rounded-md border"
            />
            {errors.inspection_period && (
              <small className="text-red-400">
                {errors.inspection_period.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="inline-flex gap-2 items-center text-neutral-600 mb-2 font-medium">
              Who will pay shipping costs?
              <span className="bg-neutral-100 rounded-full py-0.5 text-sm px-1.5">
                Optional
              </span>
            </h1>
            <div className="inline-flex gap-2 justify-between items-center">
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("shipping_cost_payer")}
                  id="shippingCostPayer_buyer"
                  value={"Buyer (100%)"}
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
                  {...register("shipping_cost_payer")}
                  id="shippingCostPayer_seller"
                  value=" Seller (100%)"
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
                  {...register("shipping_cost_payer")}
                  id="shippingCostPayer_both"
                  value="Both (50% - 50%)"
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

            {errors.shipping_cost_payer && (
              <small className="text-red-400">
                {errors.shipping_cost_payer.message}
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

          <div className="flex justify-between items-center">
            <PrimaryOutline
              onClick={() => dispatch(setStage(1))}
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
