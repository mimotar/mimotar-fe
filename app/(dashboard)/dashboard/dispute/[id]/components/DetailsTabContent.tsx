import type { DisputeSummary, TransactionSummary } from "../types/dispute";
import EvidenceItem from "./EvidenceItem";
import SummaryField from "./SummaryField";

interface DetailsTabContentProps {
  transactionSummary: TransactionSummary;
  disputeSummary: DisputeSummary;
}

export default function DetailsTabContent({
  transactionSummary,
  disputeSummary,
}: DetailsTabContentProps) {
  return (
    <section className="mt-6 flex flex-col gap-6">
      <article className="rounded-2xl border border-[#CBD5E1] bg-white p-6">
        <h2 className="text-4xl font-semibold text-[#1E293B]">Transaction summary</h2>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
          <SummaryField label="Transaction ID" value={transactionSummary.transactionId} />
          <SummaryField
            label="Transaction Date"
            value={transactionSummary.transactionDate}
          />
          <SummaryField label="Seller's Name" value={transactionSummary.sellerName} />
          <SummaryField label="Buyer's Name" value={transactionSummary.buyerName} />
          <SummaryField
            label="Payment Method"
            value={transactionSummary.paymentMethod}
          />
          <SummaryField label="Total Amount" value={transactionSummary.totalAmount} />
        </div>
      </article>

      <article className="rounded-2xl border border-[#CBD5E1] bg-white p-6">
        <h2 className="text-4xl font-semibold text-[#1E293B]">Dispute summary</h2>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
          <SummaryField
            label="Reason for Dispute"
            value={disputeSummary.reasonForDispute}
          />
          <SummaryField label="Proposal" value={disputeSummary.proposal} />
          <SummaryField
            label="Dispute Submission Date"
            value={disputeSummary.submissionDate}
          />
        </div>

        <div className="mt-5">
          <p className="text-base font-medium text-[#94A3B8]">Evidence</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {disputeSummary.evidence.map((item) => (
              <EvidenceItem key={item.id} evidence={item} />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
