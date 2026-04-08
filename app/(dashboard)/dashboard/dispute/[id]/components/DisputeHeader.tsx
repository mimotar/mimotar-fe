"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Dispute } from "../types/dispute";
import DisputeStatusBadge from "./DisputeStatusBadge";
import { BsChatLeftTextFill } from "react-icons/bs";
import NegotiationCountdown from "./NegotiationCountdown";
import { useSession } from "next-auth/react";

interface DisputeHeaderProps {
  disputeId: number;
  dispute: Dispute;
}

export default function DisputeHeader({
  disputeId,
  dispute,
}: DisputeHeaderProps) {
  const { data: session } = useSession();
  const isDisputeTimeEnded = new Date() > new Date(dispute.elapsesAt);
  const isCreator =
    dispute?.transaction?.creator_email === session?.user?.email;
  const isDisputeOnGOing = dispute.status === "ongoing";
  const isPendingClosure = dispute.status === "pending_closure";

  const canResolveDispute =
    (isDisputeOnGOing || isPendingClosure) && !isDisputeTimeEnded && isCreator;

  console.log(isDisputeTimeEnded);
  return (
    <header className="flex flex-col gap-5">
      <Link
        href="/dashboard/transactions?tab=disputes"
        className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-primary"
      >
        <ArrowLeft size={14} />
        <span>Back</span>
      </Link>

      <div className="flex gap-4 flex-wrap justify-between">
        <h1 className="text-2xl w-fit font-bold text-neutral-900">
          Dispute info
        </h1>
        <DisputeStatusBadge status={dispute.status} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <NegotiationCountdown elapsesAt={dispute.elapsesAt} />

        <div className="flex gap-3 items-center">
          <button
            type="button"
            aria-label={`Open chat for dispute ${disputeId}`}
            className="inline-flex sm:h-[52px] sm:w-[52px] h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-xl border border-[#D946EF] text-brand-primary"
          >
            <BsChatLeftTextFill className="sm:text-xl text-base text-brand-primary cursor-pointer" />
          </button>

          {(dispute.status === "negotiation" || isDisputeTimeEnded) && (
            <button
              type="button"
              className="inline-flex sm:h-[52px] h-[40px] min-w-[178px] items-center justify-center rounded-xl border border-[#D946EF] cursor-pointer px-6 sm:text-base text-sm font-semibold text-brand-primary"
            >
              Get assistance
            </button>
          )}

          {canResolveDispute && (
            <button
              type="button"
              className="inline-flex sm:h-[52px] h-[40px] min-w-[190px] items-center justify-center rounded-xl bg-[#A21CAF] px-6 sm:text-base text-sm cursor-pointer font-semibold text-white"
            >
              Resolve dispute
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
