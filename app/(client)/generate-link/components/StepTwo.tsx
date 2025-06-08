"use client";

import Input from "@/app/commons/Input";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import RadioInput from "@/app/commons/RadioInput";
import SecondaryButton from "@/app/commons/SecondaryButton";
import TextAreaInput from "@/app/commons/TextAreaInput";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef } from "react";
import {
  stage2TicketSchema,
  IStage2TicketSchema,
} from "@/lib/schemas/CreateTransactionsSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";
import { fileToBase64 } from "@/app/utils/FileToBase64";
import toast from "react-hot-toast";
import { isFileAcceptedSize } from "@/app/utils/FileAcceptedSize";
import Image from "next/image";

export default function StepTwo() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const transactionData = useAppSelector((state) => state.createTransaction);
  const nextBtnRef = useRef<HTMLFormElement>(null);
  const filePreview = transactionData.attachment ?? [];
  // console.log("Transaction Data:", transactionData);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IStage2TicketSchema>({
    resolver: zodResolver(stage2TicketSchema),
  });

  const onSubmit = (data: IStage2TicketSchema) => {
    console.log(data);
    dispatch(setTransactionDetails(data));
    navigate.push("generate-link?step=3");
  };

  const handleAttachment = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    const fileCheckResult = isFileAcceptedSize(files);
    if (fileCheckResult && fileCheckResult.error) {
      toast.error(fileCheckResult.msg);
      return;
    }

    if (files instanceof FileList) {
      const fileArray = Array.from(files);

      try {
        const base64Arr = await Promise.all(
          fileArray.map((file) => fileToBase64(file))
        );
        console.log("Base64 Array:", base64Arr);
        // Continue processing: e.g., save to Redux, form state, etc.
        setValue("attachment", [
          ...(transactionData.attachment ?? []),
          ...base64Arr,
        ]);
        dispatch(
          setTransactionDetails({
            attachment: [...(transactionData.attachment ?? []), ...base64Arr],
          })
        );
      } catch (err) {
        toast.error("Error converting files");
      }
    }
  };

  console.log("Form Errors:", errors);

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
      transactionData.transaction_description
    );
    setValue("attachment", transactionData.attachment ?? []);
  }, [setValue, transactionData]);
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

        <div>
          <Input
            onChange={handleAttachment}
            type="file"
            multiple
            accept=".png, .jpg, .jpeg,"
            // {...register("attachment")}
            error={errors?.attachment && errors.attachment.message}
            labelName="Attachment"
            isShowLabel={true}
          />
          <small className="inline-flex gap-2 mt-2">
            {filePreview.map((base64) => (
              <Image
                src={base64}
                alt=""
                height={50}
                width={50}
                className="rounded-md object-contain"
              />
            ))}
          </small>
        </div>

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
