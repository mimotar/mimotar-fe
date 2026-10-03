"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUploader } from "@/app/(dashboard)/utils/FileUploader";

const resolutionOptions = [
  "REFUND_ONLY",
  "REPLACEMENT_ONLY",
  "REFUND_OR_REPLACEMENT",
  "PARTIAL_REPAYMENT",
  "RESEND_PRODUCT",
  "REPEAT_SERVICE",
  "CANCEL_TRANSACTION",
  "OTHER",
] as const;

const disputeFormSchema = z
  .object({
    reason: z
      .string()
      .trim()
      .min(1, "Reason is required")
      .min(10, "Reason must be at least 10 characters"),

    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .min(10, "Description must be at least 10 characters"),

    resolutionOption: z.enum(resolutionOptions, {
      message: "Please select a resolution option",
    }),

    customResolutionOption: z.string().trim().optional(),
    files: z
      .array(z.instanceof(File))
      .min(1, "Please upload at least one file")
      .max(4, "You can upload a maximum of 4 files"),
  })
  .superRefine((data, ctx) => {
    if (
      data.resolutionOption === "OTHER" &&
      !data.customResolutionOption?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customResolutionOption"],
        message: "Please specify your requested resolution",
      });
    }
  });

export type DisputeFormData = z.infer<typeof disputeFormSchema>;

interface CreateDisputeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: DisputeFormData) => void | Promise<void>;
  isSubmitting: boolean;
}

export default function CreateDisputeDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: CreateDisputeDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<DisputeFormData>({
    resolver: zodResolver(disputeFormSchema),
    defaultValues: {
      reason: "",
      description: "",
      resolutionOption: undefined,
      customResolutionOption: "",
      files: [],
    },
  });

  const resolutionOption = watch("resolutionOption");

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const handleFormSubmit = (data: DisputeFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-6 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 shrink-0 text-red-500" />

            <DialogTitle className="text-base font-bold text-[#111827]">
              Initiate Escrow Dispute
            </DialogTitle>
          </div>

          <DialogDescription className="text-xs leading-normal text-slate-500">
            Filing a dispute instantly locks funds and freezes the client's
            automated withdrawal access. An independent arbitrator will evaluate
            requirements based on the scope details and agreements.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 text-left"
        >
          {/* Description */}
          <div>
            <label
              htmlFor="dispute-description"
              className="mb-1 block text-xs font-bold text-gray-500"
            >
              Core issue description
            </label>

            <Textarea
              id="dispute-description"
              rows={4}
              placeholder="List contract sections that were violated, elements that are missing, or deadline problems."
              className="resize-none bg-gray-50 text-xs leading-relaxed"
              {...register("description")}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Reason */}
          <div>
            <label
              htmlFor="dispute-description"
              className="mb-1 block text-xs font-bold text-gray-500"
            >
              Reason for dispute
            </label>

            <Textarea
              id="dispute-reason"
              rows={2}
              placeholder="Other Reasons"
              className="resize-none bg-gray-50 text-xs leading-relaxed"
              {...register("reason")}
            />

            {errors.reason && (
              <p className="mt-1 text-xs text-red-500">
                {errors.reason.message}
              </p>
            )}
          </div>

          {/* Resolution Option */}
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">
              Requested resolution
            </label>

            <Controller
              name="resolutionOption"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-gray-50 text-xs">
                      <SelectValue placeholder="Select a resolution" />
                    </SelectTrigger>

                    <SelectContent className="bg-gray-50 text-xs">
                      {resolutionOptions.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="text-xs"
                        >
                          {option.replaceAll("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Custom Resolution */}
          {resolutionOption === "OTHER" && (
            <div>
              <label
                htmlFor="custom-resolution-option"
                className="mb-1 block text-xs font-bold text-gray-500"
              >
                Specify resolution
              </label>

              <Input
                id="custom-resolution-option"
                placeholder="Enter your requested resolution"
                className="bg-gray-50 text-xs"
                {...register("customResolutionOption")}
              />

              {errors.customResolutionOption && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.customResolutionOption.message}
                </p>
              )}
            </div>
          )}

          {/* Evidence */}
          <Controller
            name="files"
            control={control}
            render={({ field, fieldState }) => (
              <FileUploader
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                description="PNG, JPG, PDF, ZIP, DOC or DOCX. Maximum 20 MB."
                disabled={isSubmitting}
                label="Upload Issue Evidence Assets"
                multiple
                maxFiles={4}
              />
            )}
          />

          {/* Submit */}
          <Button
            id="btn_report_incident"
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-red-600 cursor-pointer py-3 text-xs font-bold text-white shadow-xs hover:bg-red-700"
          >
            {isSubmitting ? "Filing Dispute..." : "File Dispute"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
