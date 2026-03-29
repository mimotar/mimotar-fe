import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";

import type { DisputeStatus } from "../types/dispute";
import DisputeStatusBadge from "./DisputeStatusBadge";

interface DisputeHeaderProps {
  disputeId: string;
  status: DisputeStatus;
}

export default function DisputeHeader({ disputeId, status }: DisputeHeaderProps) {
  return (
    <header className="flex flex-col gap-5">
      <Link
        href="/dashboard/dispute"
        className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-primary"
      >
        <ArrowLeft size={14} />
        <span>Back</span>
      </Link>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <h1 className="text-4xl font-bold text-[#0F172A]">Dispute info</h1>
        <DisputeStatusBadge status={status} />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          aria-label={`Open chat for dispute ${disputeId}`}
          className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[#D946EF] text-brand-primary"
        >
          <MessageSquare size={18} />
        </button>

        <button
          type="button"
          className="inline-flex h-[52px] min-w-[178px] items-center justify-center rounded-xl border border-[#D946EF] px-6 text-base font-semibold text-brand-primary"
        >
          Get assistance
        </button>

        <button
          type="button"
          className="inline-flex h-[52px] min-w-[190px] items-center justify-center rounded-xl bg-[#A21CAF] px-6 text-base font-semibold text-white"
        >
          Resolve dispute
        </button>
      </div>
    </header>
  );
}
