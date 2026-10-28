"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

type PhoneVerificationDialogProps = {
  open: boolean;
  close: () => void;
  onsubmit: (otp: string) => void;
};

export function PhoneVerificationDialog({
  open,
  close,
  onsubmit,
}: PhoneVerificationDialogProps) {
  const [otp, setOtp] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setOtp("");
      close();
    }
  };

  const handleClose = () => handleOpenChange(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otp.length !== 6) return;

    onsubmit(otp);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-0 bg-white p-6">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Verify your phone number
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-gray-500">
            Enter the six-digit verification code sent to your phone number.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              inputMode="numeric"
              pattern="[0-9]*"
              aria-label="Phone verification code"
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="h-10 rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={otp.length !== 6}
              className="h-10 rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white transition hover:bg-brand-primary/95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Verify phone
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
