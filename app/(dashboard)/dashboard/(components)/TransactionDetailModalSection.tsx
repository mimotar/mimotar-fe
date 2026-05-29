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
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";
import { useEffect, useMemo, useRef, type ChangeEvent } from "react";
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
import { ITransaction } from "@/app/types.ts/ICreateTransaction";

export default function TransactionDetailModalSection() {
  const transactionData = useAppSelector(
    (state) => state.createTransaction,
  ) as ITransaction;
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentFiles = useMemo(
    () => normalizeAttachments(transactionData?.attachment),
    [transactionData?.attachment],
  );
  const {
    register,
    handleSubmit,
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

  const handleAttachment = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    const fileCheckResult = isFileAcceptedSize(files);
    if (fileCheckResult && fileCheckResult.error) {
      toast.error(fileCheckResult.msg);
      return;
    }

    if (files instanceof FileList) {
      const fileArray = Array.from(files);
      const incomingAttachments = await serializeFilesToAttachments(fileArray);
      const mergedAttachments = [...attachmentFiles];

      incomingAttachments.forEach((attachment) => {
        const isDuplicate = mergedAttachments.some((existingAttachment) =>
          isSameAttachment(existingAttachment, attachment),
        );

        if (!isDuplicate) {
          mergedAttachments.push(attachment);
        }
      });

      syncAttachments(mergedAttachments);
      event.target.value = "";
    }
  };

  const handleNext = async (data: IStage2TicketSchema) => {
    const serializedAttachments = await serializeFilesToAttachments(
      data.attachment,
    );

    dispatch(
      setTransactionDetails({
        ...data,
        attachment: serializedAttachments,
      }),
    );
    dispatch(setStage(2));
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
                ref={fileInputRef}
                onChange={handleAttachment}
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.pdf"
                className="border rounded-md p-2 border-brand-primary"
              />
              <small className="inline-flex gap-2 mt-2 flex-wrap">
                {attachmentFiles.map((attachment, key) => {
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
