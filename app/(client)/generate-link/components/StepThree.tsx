"use client";

import Input from "@/app/commons/Input";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import RadioInput from "@/app/commons/RadioInput";
import SecondaryButton from "@/app/commons/SecondaryButton";
import TextAreaInput from "@/app/commons/TextAreaInput";
import Link from "next/link";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IStage3TicketSchema,
  stage3TicketSchema,
} from "@/lib/schemas/CreateTransactionsSchema";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";

export default function StepThree() {
  const navigate = useRouter();

  const dispatch = useAppDispatch();
  const transactionData = useAppSelector((state) => state.createTransaction);
  const nextBtnRef = useRef<HTMLFormElement>(null);
  console.log("Transaction Data:", transactionData);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStage3TicketSchema>({
    resolver: zodResolver(stage3TicketSchema),
  });

  const onSubmit = (data: IStage3TicketSchema) => {
    console.log(data);
    dispatch(setTransactionDetails(data));
    navigate.push("generate-link?step=4");
  };
  return (
    <section className="flex flex-col w-full h-full">
      <h1 className="font-bold text-lg">Terms and Agreement</h1>
      <h3>
        Everything that should determine how the transaction goes. Both parties
        must agree to this.
      </h3>

      <form
        ref={nextBtnRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 mt-6 "
      >
        <div className="flex flex-col">
          <p className="inline-flex items-center  gap-1 font-semibold">
            Who will pay the escrow fee?{" "}
            <Link title="gddgdbdhvjdhdh" href={"#"}>
              <AiOutlineExclamationCircle className="inline-flex" />
            </Link>
          </p>
          <div className="flex sm:flex-row flex-col gap-3 items-center w-full mt-2">
            <RadioInput
              value="BUYER"
              labelClassName=""
              type="radio"
              id="buyer"
              {...register("pay_escrow_fee")}
              labelName="Buyer (100%)"
              className="text-base h-4 w-4"
            />
            <RadioInput
              value="SELLER"
              type="radio"
              id="seller"
              {...register("pay_escrow_fee")}
              labelName="Seller (100%)"
              className="text-base h-4 w-4"
            />

            <RadioInput
              type="radio"
              id="both"
              value="BOTH"
              {...register("pay_escrow_fee")}
              labelName="Both (50% - 50%)"
              className="text-base h-4 w-4"
            />
          </div>

          <small className="text-red-400">
            {errors?.pay_escrow_fee?.message}
          </small>
        </div>

        <div className="flex flex-col">
          <p className="inline-flex items-center  gap-1 font-semibold">
            How long is the inspection period?{" "}
            <Link title="gddgdbdhvjdhdh" href={"#"}>
              <AiOutlineExclamationCircle className="inline-flex" />
            </Link>
          </p>
          <Input
            {...register("inspection_duration", {
              valueAsNumber: true,
            })}
            error={errors?.inspection_duration?.message}
            isShowLabel={false}
            placeholder="between 1 to 30 days"
          />
        </div>

        <div className="flex flex-col">
          <p className="inline-flex items-center  gap-1 font-semibold">
            Ticket Expires At?
            <Link title="gddgdbdhvjdhdh" href={"#"}>
              <AiOutlineExclamationCircle className="inline-flex" />
            </Link>
          </p>
          <Input
            {...register("expiresAt", {
              valueAsNumber: true,
            })}
            error={errors?.expiresAt?.message}
            isShowLabel={false}
            placeholder="between 1 to 30 days"
          />
        </div>

        <div className="flex flex-col">
          <p className="inline-flex items-center  gap-1 font-semibold">
            Who will pay shipping costs?{" "}
            <Link title="gddgdbdhvjdhdh" href={"#"}>
              <AiOutlineExclamationCircle className="inline-flex" />
            </Link>
          </p>
          <div className="flex sm:flex-row flex-col gap-3 items-center w-full mt-2">
            <RadioInput
              value="BUYER"
              type="radio"
              id="buyer"
              {...register("pay_shipping_cost")}
              labelName="Buyer (100%)"
              className="text-base h-4 w-4"
            />
            <RadioInput
              value="SELLER"
              type="radio"
              id="seller"
              {...register("pay_shipping_cost")}
              labelName="Seller (100%)"
              className="text-base h-4 w-4"
            />

            <RadioInput
              value="BOTH"
              type="radio"
              id="both"
              {...register("pay_shipping_cost")}
              labelName="Both (50% - 50%)"
              className="text-base h-4 w-4"
            />
          </div>

          <small className="text-red-400">
            {errors?.pay_shipping_cost?.message}
          </small>
        </div>

        <TextAreaInput
          {...register("additional_agreement")}
          error={errors?.additional_agreement?.message}
          labelName="Additional agreement (Optional)"
          id="how_long"
          rows={5}
          placeholder="Discuss with the other person before you add any terms."
          isShowLabel={true}
        />

        <TextAreaInput
          {...register("terms")}
          error={errors?.terms?.message}
          labelName="Term and Condition"
          isShowLabel={true}
          rows={4}
          id="terms"
        />
      </form>

      <div className="flex justify-between w-full h-fit mt-10">
        <PrimaryButton
          onClick={() => navigate.push("generate-link?step=2")}
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
