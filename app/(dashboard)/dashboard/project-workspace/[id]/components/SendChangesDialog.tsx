"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface SendChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPending: boolean;
  onSubmit: () => Promise<void>;
}

export default function SendChangesDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: SendChangesDialogProps) {
  const handleSubmit = async () => {
    try {
      await onSubmit();
      onOpenChange(false);
    } catch {
      // Keep dialog open
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-1rem)] max-w-md rounded-2xl border-0 bg-white p-5 text-gray-900 shadow-2xl sm:rounded-3xl sm:p-6">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-base font-bold leading-tight text-gray-900 sm:text-lg">
            Send edited ticket?
          </DialogTitle>
          <DialogDescription className="text-xs leading-5 text-gray-500 sm:text-sm">
            If you have finished editing the ticket, continuing will send the
            edited ticket to the other party for review. Make sure all project
            details are correct before continuing.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left">
          <p className="text-xs font-semibold leading-5 text-amber-900 sm:text-sm">
            This action will send the edited ticket and may move the project to
            the other party&apos;s review stage.
          </p>
        </div>

        <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs font-bold text-gray-600 transition hover:bg-gray-50 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full cursor-pointer inline-flex justify-center items-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-brand-primary/95 sm:w-auto"
          >
            Send Changes{" "}
            {isPending && <Loader2 className="h-4 w-4 animate-spin " />}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
