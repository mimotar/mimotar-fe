"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

type AgreementDecision = "accept" | "reject";

interface AgreementDecisionModalProps {
  open: boolean;
  decision: AgreementDecision | null;
  projectTitle?: string;
  isLoading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (rejectionReason?: string) => void;
}

const decisionConfig: Record<
  AgreementDecision,
  {
    eyebrow: string;
    title: string;
    description: string;
    accent: string;
    buttonClassName: string;
    icon: typeof CheckCircle2;
    confirmLabel: string;
  }
> = {
  accept: {
    eyebrow: "Accept terms",
    title: "Confirm agreement acceptance",
    description:
      "Review the project terms one last time before confirming acceptance. This will move the workspace forward to the next stage.",
    accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
    buttonClassName:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500",
    icon: CheckCircle2,
    confirmLabel: "Accept Terms",
  },
  reject: {
    eyebrow: "Reject terms",
    title: "Confirm agreement rejection",
    description:
      "If you reject the agreement, the project terms should be reviewed again before any funding can proceed.",
    accent: "bg-rose-50 text-rose-700 border-rose-100",
    buttonClassName:
      "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500",
    icon: AlertTriangle,
    confirmLabel: "Reject",
  },
};

export default function AgreementDecisionModal({
  open,
  decision,
  projectTitle,
  isLoading = false,
  onOpenChange,
  onConfirm,
}: AgreementDecisionModalProps) {
  const config = decision ? decisionConfig[decision] : decisionConfig.accept;
  const Icon = config.icon;
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    if (decision !== "reject" || !open) {
      setRejectionReason("");
    }
  }, [decision, open]);

  return (
    <Dialog
      open={open && Boolean(decision)}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onOpenChange(false);
        }
      }}
    >
      <DialogContent className="w-[92vw] max-w-[460px] rounded-3xl border-0 bg-white p-5 sm:p-6 shadow-2xl max-h-[85vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader className="text-left space-y-3">
          <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${config.accent}`}>
            <Icon className="h-4 w-4 shrink-0" />
            <span>{config.eyebrow}</span>
          </div>

          <div className="space-y-1">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-slate-900 leading-tight">
              {config.title}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-[15px] leading-6 text-slate-500">
              {config.description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Project
          </p>
          <p className="mt-1 text-sm sm:text-[15px] font-semibold text-slate-900 break-words">
            {projectTitle || "Selected agreement"}
          </p>
          <p className="mt-2 text-xs sm:text-sm leading-6 text-slate-500">
            This confirmation is intentionally separate from the action buttons
            so the modal can be reused for both accept and reject flows.
          </p>
        </div>

        {decision === "reject" && (
          <div className="space-y-2 rounded-2xl border border-rose-100 bg-rose-50/40 p-4 sm:p-5">
            <label
              htmlFor="rejection-reason"
              className="block text-xs font-bold uppercase tracking-wider text-rose-700"
            >
              Reason for rejection
            </label>
            <textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              placeholder="Explain why you are rejecting these terms..."
              className="w-full resize-none rounded-xl border border-rose-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
            />
            <p className="text-xs leading-5 text-rose-700/80">
              Please provide a brief reason so the other party can review and
              revise the agreement.
            </p>
          </div>
        )}

        <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto cursor-pointer border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={() => onConfirm(rejectionReason.trim())}
            disabled={isLoading || (decision === "reject" && !rejectionReason.trim())}
            className={`w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ${config.buttonClassName}`}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Processing..." : config.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
