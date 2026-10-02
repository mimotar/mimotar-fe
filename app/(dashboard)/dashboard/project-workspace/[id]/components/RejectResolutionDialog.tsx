"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface RejectResolutionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onsubmit: (reason: string) => void;
  isSubmitting: boolean;
}

const MAX_REASON_LENGTH = 500;

export default function RejectResolutionDialog({
  open,
  onOpenChange,
  onsubmit,
  isSubmitting,
}: RejectResolutionDialogProps) {
  const [reason, setReason] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setReason("");
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onsubmit(reason);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-1rem)] max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-5 shadow-2xl sm:p-6">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-lg font-semibold leading-tight text-slate-900 sm:text-xl">
            Reject resolution and deliverables
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-slate-500">
            Explain why the submitted deliverables do not meet the project
            requirements. This reason will help guide the next review.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label
            htmlFor="resolution-rejection-reason"
            className="text-sm font-semibold text-slate-700"
          >
            Reason for rejection
          </label>
          <Textarea
            id="resolution-rejection-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Describe what needs to be corrected or completed..."
            rows={6}
            maxLength={MAX_REASON_LENGTH}
            className="min-h-[140px] resize-none rounded-xl border-slate-200 bg-white text-sm leading-6 text-slate-900 placeholder:text-slate-400 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Maximum {MAX_REASON_LENGTH} characters</span>
            <span>
              {reason.length}/{MAX_REASON_LENGTH}
            </span>
          </div>
        </div>

        <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:space-x-0">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer border-slate-200 text-slate-700 hover:bg-slate-50 sm:w-auto"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!reason.trim()}
            className="w-full inline-flex gap-2 items-center justify-center  cursor-pointer bg-brand-secondary text-gray-800 hover:bg-brand-secondary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Submit rejection{" "}
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin " />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
