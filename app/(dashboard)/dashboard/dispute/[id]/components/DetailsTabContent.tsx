import Link from "next/link";
import type { Dispute } from "../types/dispute";
import EvidenceItem from "./EvidenceItem";
import SummaryField from "./SummaryField";
import { format } from "date-fns";

interface DetailsTabContentProps {
  disputeSummary: Dispute;
}

export default function DetailsTabContent({
  disputeSummary,
}: DetailsTabContentProps) {
  return (
    <section className="mt-6 flex flex-col gap-6">
      <article className="rounded-2xl border border-[#CBD5E1] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#1E293B]">
          Transaction summary
        </h2>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
          <SummaryField
            label="Transaction ID"
            value={disputeSummary.transactionId.toString()}
          />
          <SummaryField
            label="Transaction Date"
            value={format(
              new Date(disputeSummary.transaction?.created_at || ""),
              "dd MMM yyyy",
            )}
          />
          <SummaryField
            label="Seller's Name"
            value={disputeSummary?.transaction?.creator_fullname ?? "N/A"}
          />
          <SummaryField
            label="Buyer's Name"
            value={disputeSummary?.transaction?.receiver_fullname ?? "N/A"}
          />
          <SummaryField label="Payment Method" value="N/A" />
          <SummaryField
            label="Total Amount"
            value={disputeSummary?.transaction?.amount.toString() ?? "N/A"}
          />
        </div>
      </article>

      <article className="rounded-2xl border border-[#CBD5E1] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#1E293B]">
          Dispute summary
        </h2>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
          <SummaryField
            label="Reason for Dispute"
            value={disputeSummary.reason || "N/A"}
          />
          <SummaryField
            label="Proposal"
            value={disputeSummary.resolutionOption || "N/A"}
          />
          <SummaryField
            label="Dispute Submission Date"
            value={
              disputeSummary.createdAt
                ? format(new Date(disputeSummary.createdAt), "dd MMM, yyyy")
                : "N/A"
            }
          />
        </div>

        <div className="mt-5">
          <p className="text-base font-medium text-[#94A3B8]">Evidence</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {disputeSummary.evidenceUrl.length <= 0
              ? "No Evidence Submitted"
              : disputeSummary.evidenceUrl.map((url, i) => (
                  <Link
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Evidence
                  </Link>
                ))}
          </div>
        </div>
      </article>
    </section>
  );
}
