"use client";

import Input from "@/app/commons/Input";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import RadioInput from "@/app/commons/RadioInput";
import SecondaryButton from "@/app/commons/SecondaryButton";
import TextAreaInput from "@/app/commons/TextAreaInput";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useMemo, useRef, type ChangeEvent } from "react";
import {
  stage2TicketSchema,
  IStage2TicketSchema,
} from "@/lib/schemas/CreateTransactionsSchema";
import { ITransaction } from "@/app/types.ts/ICreateTransaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";
import toast from "react-hot-toast";
import { isFileAcceptedSize } from "@/app/utils/FileAcceptedSize";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import {
  attachmentsToFiles,
  isSameAttachment,
  normalizeAttachments,
  serializeFilesToAttachments,
} from "@/app/utils/attachmentStorage";

export default function StepTwo() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const transactionData = useAppSelector(
    (state) => state.createTransaction,
  ) as ITransaction;
  const nextBtnRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const attachmentFiles = useMemo(
    () => normalizeAttachments(transactionData?.attachment),
    [transactionData?.attachment],
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IStage2TicketSchema>({
    resolver: zodResolver(stage2TicketSchema),
  });

  const syncAttachments = (nextAttachments: typeof attachmentFiles) => {
    dispatch(
      setTransactionDetails({
        attachment: nextAttachments,
      }),
    );

    setValue("attachment", attachmentsToFiles(nextAttachments), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: IStage2TicketSchema) => {
    const serializedAttachments = await serializeFilesToAttachments(
      data.attachment,
    );

    dispatch(
      setTransactionDetails({
        ...data,
        attachment: serializedAttachments,
      }),
    );

    navigate.push("generate-link?step=3");
  };

  const handleAttachment = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    const fileCheckResult = isFileAcceptedSize(files);
    if (fileCheckResult && fileCheckResult.error) {
      toast.error(fileCheckResult.msg);
      return;
    }

    if (files instanceof FileList) {
      const fileArray = Array.from(files);
      const existingAttachments = attachmentFiles;
      const incomingAttachments = await serializeFilesToAttachments(fileArray);
      const mergedAttachments = [...existingAttachments];

      incomingAttachments.forEach((attachment) => {
        const isDuplicate = mergedAttachments.some((existingAttachment) =>
          isSameAttachment(existingAttachment, attachment),
        );

        if (!isDuplicate) {
          mergedAttachments.push(attachment);
        }
      });

      try {
        syncAttachments(mergedAttachments);
        event.target.value = "";
      } catch (err) {
        toast.error("Error converting files");
      }
    }
  };

  useEffect(() => {
    setValue("amount", transactionData.amount);

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
    setValue("attachment", attachmentsToFiles(attachmentFiles));
  }, [
    attachmentFiles,
    setValue,
    transactionData.amount,
    transactionData.transactionType,
    transactionData.transaction_description,
  ]);

  const handleClearFile = () => {
    syncAttachments([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAttachment = (indexToRemove: number) => {
    const nextAttachments = attachmentFiles.filter(
      (_file, index) => index !== indexToRemove,
    );

    syncAttachments(nextAttachments);

    if (nextAttachments.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <section className="flex flex-col h-full w-full overflow-y-auto py-6 scroll-smooth">
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

        <div className="flex justify-between ">
          <div className="flex flex-col">
            <Input
              ref={fileInputRef}
              onChange={handleAttachment}
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,.pdf"
              error={errors?.attachment && errors.attachment.message}
              labelName="Attachment"
              isShowLabel={true}
            />
            <small className="flex gap-2 mt-2">
              {attachmentFiles &&
                attachmentFiles.map((attachment, key) => {
                  const isImage = attachment.type.startsWith("image/");

                  return (
                    <div
                      key={`${attachment.name}-${attachment.size}-${attachment.lastModified}-${key}`}
                      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border bg-slate-50"
                    >
                      {isImage ? (
                        <Image
                          src={attachment.dataUrl}
                          alt={attachment.name}
                          fill
                          className="rounded-md object-cover"
                        />
                      ) : (
                        <span className="px-1 text-[8px] leading-tight text-center text-slate-700">
                          {attachment.name}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(key)}
                        className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-bl bg-black/70 text-white"
                        aria-label={`Remove attachment ${key + 1}`}
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
            </small>
          </div>

          <button
            onClick={handleClearFile}
            type="button"
            className="rounded-md text-white self-start bg-brand-secondary hover:bg-brand-secondary/80 cursor-pointer p-2"
          >
            Clear
          </button>
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
          className="bg-white text-brand-primary border-2 cursor-pointer border-brand-primary text-lg w-36"
        >
          <span className="inline-flex gap-1 items-center ">
            <IoMdArrowBack />
            Back
          </span>
        </PrimaryButton>

        <SecondaryButton
          onClick={() => nextBtnRef.current?.requestSubmit()}
          className="w-36 text-lg bg-brand-primary cursor-pointer text-white"
        >
          <span className="inline-flex gap-1 items-center ">
            Next <IoMdArrowBack className="rotate-180" />
          </span>
        </SecondaryButton>
      </div>
    </section>
  );
}
