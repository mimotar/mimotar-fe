"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { DeleteAccountModal, DisableAccountModal } from "./ManageAccountModals";

export default function ManageAccountContent() {
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <section className="flex flex-col mt-6 w-full pb-6">
      <button
        type="button"
        onClick={() => setIsDisableModalOpen(true)}
        className="w-full cursor-pointer  rounded-lg border border-neutral-400 px-4 py-4 text-left sm:px-6 sm:py-5"
      >
        <div className="flex  items-start justify-between gap-4">
          <div>
            <h2 className="text-neutral-900 text-xl font-semibold leading-none">
              Disable Account
            </h2>
            <p className="mt-3 text-[#1E293B] text-[17px] leading-[1.45]">
              Once you disable account most of your activities will be
              restricted, such as creating transactions and opening disputes.
            </p>
            <p className="text-[#1E293B] text-[17px] leading-[1.45]">
              You can choose to unblock your account at any time.
            </p>
          </div>

          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-neutral-900" />
        </div>
      </button>

      <button
        type="button"
        onClick={() => setIsDeleteModalOpen(true)}
        className="mt-10  cursor-pointer  w-full rounded-lg border border-neutral-400 px-4 py-4 text-left sm:px-6 sm:py-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-neutral-900 text-xl font-semibold leading-none">
              Delete Account
            </h2>
            <p className="mt-3 text-[#1E293B] text-[17px] leading-[1.45]">
              Please note that deleting your account cannot be reversed or
              undone. Once deleted, you will not be able to login or
            </p>
            <p className="text-[#1E293B] text-[17px] leading-[1.45]">
              view past transaction.
            </p>
          </div>

          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-neutral-900" />
        </div>
      </button>

      <DisableAccountModal
        open={isDisableModalOpen}
        onOpenChange={setIsDisableModalOpen}
      />
      <DeleteAccountModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </section>
  );
}
