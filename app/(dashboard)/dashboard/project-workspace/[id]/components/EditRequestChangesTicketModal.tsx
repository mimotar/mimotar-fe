"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUploader } from "../../../../utils/FileUploader";
import {
  makeChangesSchema,
  MakeChangesFormValues,
  MakeChangesPayload,
} from "../schema/makeChanges";
import { Loader2 } from "lucide-react";
import { ITransaction } from "../../../projects/types/ITransaction";

interface EditRequestChangesTicketModalProps {
  isPending: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultValues: ITransaction;
  onSubmit: (payload: MakeChangesPayload) => Promise<void>;
}

const mapDefaultValue = (data: ITransaction): MakeChangesFormValues => {
  return {
    title: data.title,
    amount: data.amount,
    transaction_description: data.transaction_description,
    terms: data.terms ? data.terms : "",
    additional_agreement: data.additional_agreement
      ? data.additional_agreement
      : "",
    deadline: new Date(data.deadline).toISOString().slice(0, 16),
    inspection_duration: data.inspection_duration,
    pay_escrow_fee: data.pay_escrow_fee,
    pay_shipping_cost: data.pay_shipping_cost,
    files: [],
  };
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-primary";

export default function EditRequestChangesTicketModal({
  isPending,
  setOpen,
  defaultValues,
  onSubmit,
}: EditRequestChangesTicketModalProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MakeChangesFormValues>({
    resolver: zodResolver(makeChangesSchema),
    defaultValues: mapDefaultValue(defaultValues),
    mode: "onTouched",
  });

  const submit = async (values: MakeChangesFormValues) => {
    try {
      await onSubmit({
        ...values,
        deadline: new Date(values.deadline).toISOString(),
      });
      setOpen(false);
    } catch (error) {}
  };

  const error = (field: keyof MakeChangesFormValues) => errors[field]?.message;

  return (
    <Dialog open onOpenChange={(open) => !open && setOpen(false)}>
      <DialogContent className="w-[calc(100%-1rem)] max-w-2xl max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-2xl bg-white p-4 text-gray-900 sm:max-h-[90dvh] sm:rounded-3xl sm:p-6">
        <DialogHeader className="pr-8 text-left">
          <DialogTitle className="text-base font-bold text-gray-900">
            Edit Changes
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-400">
            Update the project agreement and submit the revised details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Project title" message={error("title")}>
              <input {...register("title")} className={inputClass} />
            </Field>
            <Field label="Amount" message={error("amount")}>
              <input
                type="number"
                min="0"
                step="0.01"
                {...register("amount", { valueAsNumber: true })}
                className={inputClass}
              />
            </Field>
          </div>

          <Field
            label="Transaction description"
            message={error("transaction_description")}
          >
            <textarea
              rows={3}
              {...register("transaction_description")}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Terms" message={error("terms")}>
              <textarea
                rows={3}
                {...register("terms")}
                className={inputClass}
              />
            </Field>
            <Field
              label="Additional agreement"
              message={error("additional_agreement")}
            >
              <textarea
                rows={3}
                {...register("additional_agreement")}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Deadline" message={error("deadline")}>
              <input
                type="datetime-local"
                {...register("deadline")}
                className={inputClass}
              />
            </Field>
            <Field
              label="Inspection duration (days)"
              message={error("inspection_duration")}
            >
              <input
                type="number"
                min="0"
                {...register("inspection_duration", { valueAsNumber: true })}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField
              label="Who pays escrow fee"
              name="pay_escrow_fee"
              register={register}
            />
            <SelectField
              label="Who pays shipping cost"
              name="pay_shipping_cost"
              register={register}
            />
          </div>

          <Controller
            name="files"
            control={control}
            render={({ field, fieldState }) => (
              <FileUploader
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                label="Project files"
                description="Attach updated project documents or references."
              />
            )}
          />

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex gap-2 cursor-pointer items-center justify-center rounded-xl bg-brand-primary py-3 text-xs font-bold text-white shadow-xs hover:bg-brand-primary/95"
            >
              Save Changes{" "}
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  message,
  children,
}: {
  label: string;
  message?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold text-slate-500">
        {label}
      </label>
      {children}
      {message && <p className="mt-1 text-xs text-red-500">{message}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  register,
}: {
  label: string;
  name: "pay_escrow_fee" | "pay_shipping_cost";
  register: ReturnType<typeof useForm<MakeChangesFormValues>>["register"];
}) {
  return (
    <Field label={label}>
      <select {...register(name)} className={inputClass}>
        <option value="CLIENT">Client</option>
        <option value="FREELANCER">Freelancer</option>
        <option value="BOTH">Both</option>
      </select>
    </Field>
  );
}
