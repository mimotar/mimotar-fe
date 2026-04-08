import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ITransaction } from "../types/ITransactions";
import { RiArrowDropDownLine } from "react-icons/ri";
import { reasons } from "../data/reasons";
import { MdOutlineUploadFile } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  disputeSchema,
  IDisputeFormValues,
} from "../schema/createDisputeSchema";
import { useMutateAction } from "@/app/hooks/useMutation";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface IDisputeFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  transaction: Row<ITransaction> | undefined;
}

const MAX_FILES = 5;

const proposalOptions = [
  { id: "REFUND_ONLY", label: "Refund only", value: "REFUND_ONLY" },
  { id: "REPLACEMENT_ONLY", label: "Replace Only", value: "REPLACEMENT_ONLY" },
  {
    id: "REFUND_OR_REPLACEMENT",
    label: "Refund or Replacement",
    value: "REFUND_OR_REPLACEMENT",
  },
  {
    id: "PARTIAL_REPAYMENT",
    label: "Partial Repayment",
    value: "PARTIAL_REPAYMENT",
  },
  {
    id: "RESEND_PRODUCT",
    label: "Resend Product",
    value: "RESEND_PRODUCT",
  },
  {
    id: "CANCEL_TRANSACTION",
    label: "Cancel Transaction",
    value: "CANCEL_TRANSACTION",
  },
  {
    id: "REPEAT_SERVICE",
    label: "Resend product or repeat service",
    value: "REPEAT_SERVICE",
  },
  {
    id: "OTHERS",
    label: "OTHERS",
    value: "OTHERS",
  },
] as const;

type ProposalValue = (typeof proposalOptions)[number]["value"];

export function DisputeForm({ open, setOpen, transaction }: IDisputeFormProps) {
  const [openReason, setOpenReason] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutateAction<
    {
      message: string;
      status: string;
    },
    any
  >("post", "dispute");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    clearErrors,
    setError,
    formState: { errors, isValid },
  } = useForm<IDisputeFormValues>({
    resolver: zodResolver(disputeSchema),
    mode: "onChange",
    defaultValues: {
      reason: "",
      description: "",
      resolutionOption: undefined,
      evidence: [],
    },
  });

  const selectedReason = watch("reason");
  const selectedFiles = watch("evidence") || [];
  const selectedProposals = watch("resolutionOption");

  useEffect(() => {
    if (!open) {
      reset();
      setOpenReason(false);
    }
  }, [open, reset]);

  const handleReasonSelect = (reason: string) => {
    setValue("reason", reason, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    clearErrors("reason");
    setOpenReason(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const existing = watch("evidence") || [];

    const dedupedNewFiles = files.filter(
      (newFile) =>
        !existing.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size &&
            existingFile.lastModified === newFile.lastModified,
        ),
    );

    const updatedFiles = [...existing, ...dedupedNewFiles].slice(0, MAX_FILES);

    setValue("evidence", updatedFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    clearErrors("evidence");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove,
    );

    setValue("evidence", updatedFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleProposalChange = (value: ProposalValue) => {
    setValue("resolutionOption", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = async (data: IDisputeFormValues) => {
    try {
      const payload = new FormData();
      payload.append("reason", data.reason);
      payload.append("description", data.description);

      payload.append(
        "resolutionOption",
        data.resolutionOption as ProposalValue,
      );

      data.evidence.forEach((file) => {
        payload.append("evidence[]", file);
      });

      if (transaction?.id) {
        payload.append("transactionId", String(transaction?.id));
      }

      console.log("Submitting dispute:", data);

      mutate(payload, {
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(
              error.response?.data?.message || "Error submitting dispute",
            );
            return;
          }
          if (error instanceof Error) {
            toast.error(error.message || "Error submitting dispute");
            return;
          }
        },

        onSuccess: async (data) => {
          toast.success(data.message || "Dispute created successfully");
          await queryClient.invalidateQueries({ queryKey: ["transaction"] });
          setOpen(false);
          reset();
        },
      });
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "server",
        message: "Something went wrong while submitting the dispute.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="font-bold">Open dispute</DialogTitle>
          <DialogDescription>Please fill the form below</DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4 no-scrollbar">
          <form
            className="h-full w-full space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative flex flex-col">
              <label htmlFor="reason-trigger" className="mb-1 text-neutral-600">
                Select a reason for dispute{" "}
                <span className="text-red-500">*</span>
              </label>

              <button
                id="reason-trigger"
                type="button"
                onClick={() => setOpenReason((prev) => !prev)}
                className={`flex items-center justify-between gap-4 rounded-md border p-3 text-left ${
                  errors.reason ? "border-red-500" : "border-neutral-400"
                }`}
              >
                <span
                  className={`text-sm ${
                    selectedReason ? "text-neutral-700" : "text-neutral-400"
                  }`}
                >
                  {selectedReason || "Select reason"}
                </span>

                <RiArrowDropDownLine className="text-2xl" />
              </button>

              {openReason && (
                <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-md border border-neutral-300 bg-white p-2 shadow-md">
                  {reasons.map((reason, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleReasonSelect(reason)}
                      className={`w-full rounded-md p-2 text-left transition hover:bg-neutral-100 ${
                        selectedReason === reason ? "bg-[#FAE8FF]" : ""
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              )}

              {errors.reason && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.reason.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="mb-1 text-neutral-600">
                Detailed description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                rows={5}
                placeholder="Please provide as much detail as possible"
                className={`rounded-md border p-3 placeholder:text-neutral-400 outline-none ${
                  errors.description ? "border-red-500" : "border-neutral-400"
                }`}
                {...register("description")}
              />

              <div className="mt-1 flex items-center justify-between">
                {errors.description ? (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                ) : (
                  <span className="text-sm text-neutral-400">
                    Minimum 20 characters
                  </span>
                )}

                <span className="text-sm text-neutral-400">
                  {watch("description")?.length || 0}/1000
                </span>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-neutral-600 inline-flex gap-2">
                Your proposal to resolve dispute
                <span className="bg-neutral-100 py-0.5 px-3 rounded-full">
                  (Optional)
                </span>
              </label>

              <div className="mt-2 space-y-2 inline-flex gap-2 items-center flex-wrap">
                {proposalOptions.map((option) => (
                  <div
                    key={option.id}
                    className="inline-flex gap-2 items-center"
                  >
                    <input
                      type="radio"
                      id={option.id}
                      name="resolutionProposal"
                      checked={selectedProposals === option.value}
                      onChange={() => handleProposalChange(option.value)}
                    />
                    <label
                      htmlFor={option.id}
                      className="text-neutral-900 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-neutral-600">
                Please upload evidence
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`inline-flex cursor-pointer gap-3 rounded-md border border-dashed p-3 ${
                  errors.evidence ? "border-red-500" : "border-neutral-400"
                }`}
              >
                <button
                  type="button"
                  className="self-start rounded-md bg-neutral-100 p-2"
                >
                  <MdOutlineUploadFile className="text-xl" />
                </button>

                <div className="flex-1">
                  <p className="text-neutral-600">
                    Drag and drop file/picture or{" "}
                    <span className="font-bold text-brand-primary">
                      click here to upload
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">
                    JPG, PNG, GIF, or PDF formats (5 MB max each, up to{" "}
                    {MAX_FILES} files)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${file.lastModified}-${index}`}
                      className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-neutral-800">
                          {file.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="rounded-md px-2 py-1 text-sm text-red-500 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors.evidence && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.evidence.message}
                </p>
              )}
            </div>

            {errors.root?.message && (
              <p className="text-sm text-red-500">{errors.root.message}</p>
            )}

            <div className="mt-5 flex items-center gap-2 sm:justify-end">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="rounded-md border border-brand-primary cursor-pointer px-4 py-2 text-brand-primary"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isValid || isPending}
                className="rounded-md bg-brand-primary px-4 py-2 text-white hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
