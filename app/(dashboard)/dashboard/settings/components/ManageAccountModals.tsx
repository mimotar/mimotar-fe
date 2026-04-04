"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ManageDeleteAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

type ManageAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteAccountModal({
  open,
  onOpenChange,
  onDelete,
}: ManageDeleteAccountModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] w-[90%] rounded-2xl border-0 bg-white p-6 sm:p-7 [&>button]:hidden">
        <DialogHeader className="text-left">
          <DialogTitle className="text-[#1F2937] text-lg text-center leading-[1.2] font-semibold">
            Delete your account permanently
          </DialogTitle>
          <DialogDescription className="mt-2 text-[#64748B] text-base leading-[1.45]">
            Once you delete your account, it will no longer exist.
          </DialogDescription>
        </DialogHeader>

        <p className="mt-1 text-[#64748B] text-lg leading-[1.45]">
          Do you want to continue account deletion?
        </p>

        <div className="mt-6 flex sm:flex-row flex-col gap-4 ">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-12 w-full sm:flex-1 rounded-lg border border-[#64748B] bg-white text-[#1F2937] text-base  cursor-pointer font-semibold"
          >
            No, cancel
          </button>
          <button
            onClick={onDelete}
            type="button"
            className="h-12 w-full sm:flex-1 rounded-lg bg-[#E11D48] text-white text-base font-semibold cursor-pointer "
          >
            Yes, delete account
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DisableAccountModal({
  open,
  onOpenChange,
}: ManageAccountModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] w-[90%] rounded-2xl border-0 bg-white p-6 sm:p-7 [&>button]:hidden">
        <DialogHeader className="text-left">
          <DialogTitle className="text-gray-900  text-lg leading-[1.15] font-semibold">
            Disable your account
          </DialogTitle>
          <DialogDescription className="mt-2 text-[#737373] text-base leading-[1.45]">
            Disabling your account will cause the following:
          </DialogDescription>
        </DialogHeader>

        <ul className="mt-3 list-disc pl-6 text-[#737373] text-[16px] leading-[1.55] space-y-1">
          <li>All ongoing transactions will be canceled</li>
          <li>All open disputes will be canceled</li>
          <li>All transaction creation activities will be disabled</li>
        </ul>

        <p className="mt-4 text-[#737373] text-[16px] leading-[1.45]">
          Once your account is disabled, you won&apos;t be ble to start the
          unblocking process until after at least 2 hours.
        </p>

        <div className="mt-7 flex sm:flex-row flex-col items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-[50px]  sm:min-w-[122px] w-full cursor-pointer  rounded-lg border border-brand-primary px-6 bg-white text-brand-primary text-base font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-[50px]  sm:min-w-[200px] w-full cursor-pointer rounded-lg bg-[#A21CAF] px-8 text-white text-base font-semibold"
          >
            Disable account
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
