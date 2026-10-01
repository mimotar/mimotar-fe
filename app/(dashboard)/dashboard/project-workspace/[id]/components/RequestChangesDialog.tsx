"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface RequestChangesDialogProps {
  open: boolean;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (comment: string) => Promise<void>;
}

const MAX_COMMENT_LENGTH = 500;

export default function RequestChangesDialog({
  open,
  isPending,
  onOpenChange,
  onSubmit,
}: RequestChangesDialogProps) {
  const [comment, setComment] = useState("");

  const closeDialog = () => {
    setComment("");
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setComment("");
    }

    onOpenChange(nextOpen);
  };

  // const handleSubmit = () => {
  //   const trimmedComment = comment.trim();

  //   if (!trimmedComment || trimmedComment.length > MAX_COMMENT_LENGTH) {
  //     return;
  //   }

  //   onSubmit(trimmedComment);
  //   closeDialog();
  // };

  const handleSubmit = async () => {
    const trimmedComment = comment.trim();

    if (!trimmedComment || trimmedComment.length > MAX_COMMENT_LENGTH) {
      return;
    }

    try {
      await onSubmit(trimmedComment);
      closeDialog();
    } catch {
      // Keep dialog open
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[92vw] max-w-[520px] max-h-[90vh] overflow-y-auto rounded-2xl border-0 bg-white p-5 shadow-2xl sm:p-6">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-lg font-semibold leading-tight text-slate-900 sm:text-xl">
            Request changes
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-slate-500">
            Tell the other party what needs to be updated before you accept the
            agreement.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label
            htmlFor="request-changes-comment"
            className="text-sm font-semibold text-slate-700"
          >
            Comment
          </label>
          <Textarea
            id="request-changes-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Describe the changes you would like..."
            rows={6}
            maxLength={MAX_COMMENT_LENGTH}
            aria-describedby="request-changes-comment-help"
            className="min-h-[140px] resize-none rounded-xl border-slate-200 bg-white text-sm leading-6 text-slate-900 placeholder:text-slate-400 focus-visible:border-amber-400 focus-visible:ring-amber-200"
          />
          <div
            id="request-changes-comment-help"
            className={`flex justify-between text-xs ${
              comment.length >= MAX_COMMENT_LENGTH
                ? "text-amber-700"
                : "text-slate-400"
            }`}
          >
            <span>Maximum {MAX_COMMENT_LENGTH} characters</span>
            <span>
              {comment.length}/{MAX_COMMENT_LENGTH}
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
            disabled={!comment.trim()}
            className="w-full inline-flex justify-center items-center gap-2 cursor-pointer bg-amber-600 text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Submit request{" "}
            {isPending && <Loader2 className="h-4 w-4 animate-spin " />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
