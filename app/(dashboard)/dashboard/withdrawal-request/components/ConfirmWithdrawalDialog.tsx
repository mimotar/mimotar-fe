import { useState } from "react";
import { Landmark, RefreshCw } from "lucide-react";
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
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import type { WithdrawalRequest } from "../types/IWithdrawalRequest";

type ConfirmWithdrawalDialogProps = {
  request: WithdrawalRequest;
  submitting: boolean;
  // error: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (otp: string) => void;
};

export function ConfirmWithdrawalDialog({
  request,
  submitting,
  // error,
  onOpenChange,
  onSubmit,
}: ConfirmWithdrawalDialogProps) {
  const [otp, setOtp] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (otp.length === 6) onSubmit(otp);
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-xl border-gray-200 bg-white p-6">
        <DialogHeader className="text-left">
          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <Landmark aria-hidden="true" className="h-5 w-5" />
          </div>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Confirm payout
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-gray-600">
            Enter the six-digit code sent to you to approve this withdrawal
            {` of ${formatNumberToCurrency(request.amount, request.currency)}`}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <label
              id="withdrawal-otp-label"
              className="block text-sm font-medium text-gray-800"
            >
              Verification code
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                inputMode="numeric"
                pattern="[0-9]*"
                aria-labelledby="withdrawal-otp-label"
                // aria-invalid={error !== null}
              >
                <InputOTPGroup className="gap-2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-11 w-11 rounded-md border border-gray-200 text-base font-semibold first:rounded-md last:rounded-md aria-[current=true]:border-brand-primary"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            {/* {error ? (
              <p role="alert" className="text-sm text-rose-700">
                {error}
              </p>
            ) : null} */}
          </div>

          <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={otp.length !== 6 || submitting}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white transition hover:bg-brand-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin"
                  />
                  Confirming…
                </>
              ) : (
                "Approve withdrawal"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
