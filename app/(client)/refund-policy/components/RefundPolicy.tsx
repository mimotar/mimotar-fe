"use client";

import { ShieldCheck } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-left">
      <div className="text-center space-y-2 mb-10">
        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
          Payment & Refunds
        </span>
        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
          Refund Policy
        </h1>
        <p className="text-[11px] text-gray-400 font-normal">
          Last updated: July 02, 2026
        </p>
      </div>

      <div className="p-8 bg-white border border-gray-100 rounded-3xl space-y-6 text-xs text-gray-650 leading-relaxed font-sans">
        <p>
          At Mimotar, we help clients and freelancers complete projects safely
          by holding project funds in escrow until the agreed work is delivered
          and approved. This Refund Policy explains when refunds may apply, how
          disputes are handled, and what happens after funds are released. By
          using Mimotar, you agree to this Refund Policy together with our Terms
          of Service. This Refund Policy explains when refunds may apply and how
          refund requests are handled on Mimotar
        </p>

        <section className="space-y-3">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            1. General Refund Principle
          </span>
          <p>
            Mimotar does not automatically refund payments simply because one
            party changes their mind after a transaction has been funded. <br />
            Refunds are considered based on the status of the project, the
            agreement between both parties, submitted evidence, and Mimotar’s
            dispute review process.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            2. Before a Project Is Funded
          </span>
          <p>
            If a project has not yet been funded, either party may choose not to
            proceed. <br /> No refund is required at this stage because no
            escrow payment has been made.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            3. After a Project Is Funded but Before Work Begins
          </span>
          <p>
            If a client funds a project and both parties agree to cancel before
            the freelancer begins work, the client may be eligible for a refund
            of the escrowed project amount. <br /> Any payment processing fees,
            transfer charges, or service fees already charged by payment
            partners may be non-refundable.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            4. After Work Has Started
          </span>
          <p>
            Once the freelancer has started work, refund requests will not be
            processed automatically. <br /> If there is a disagreement, the
            affected party must raise a dispute through Mimotar. Mimotar will
            review the project agreement, submitted deliverables, communication
            records where available, and any evidence provided by both parties.{" "}
            <br />
            Possible outcomes may include: <br />
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Release of funds to the freelancer</li>
            <li>Refund to the client</li>
            <li>Continued review or mediation</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            5. Milestone-Based Projects
          </span>
          <p>
            For projects with milestones, disputes and refund considerations
            apply only to the affected milestone. <br /> If one milestone is
            disputed, funds related to that milestone may be held while Mimotar
            reviews the issue. Other milestones may continue unless they are
            also affected by the dispute. <br /> Once a milestone has been
            approved, auto-released, or resolved in favor of the freelancer, the
            milestone payment may no longer be refundable except in exceptional
            cases determined by Mimotar.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            6. Auto-Release of Funds
          </span>
          <p>
            When a freelancer submits completed work, the client has a defined
            review period to approve the work or raise a dispute. <br /> If the
            client does not take action within the review period, the funds may
            be automatically released to the freelancer. <br /> Once funds have
            been released, refund requests may no longer be eligible unless
            Mimotar determines that there is a valid exceptional issue requiring
            further review.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            7. Disputes and Evidence
          </span>
          <p>
            To request a refund after funding, the client must raise a dispute
            and provide clear evidence explaining why the work does not meet the
            agreed terms. <br />
            Evidence may include: <br />
            <ul className="list-disc pl-5 space-y-1">
              <li>Screenshots</li>
              <li>Uploaded files</li>
              <li>Project documents</li>
              <li>Delivery records</li>
              <li>Written explanations</li>
              <li>Other supporting materials</li>
            </ul>
          </p>

          <p>
            Mimotar may contact both parties for additional clarification before
            reaching a decision.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            8. Processing Approved Refunds
          </span>
          <p>
            If a refund is approved, Mimotar will process the refund to the
            client through the available payment or bank transfer method. <br />
            Refund timelines may vary depending on the payment provider, bank
            processing time, and the method originally used to make payment.{" "}
            <br />
            Mimotar is not responsible for delays caused by banks, payment
            processors, or third-party financial institutions.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            9. Non-Refundable Fees
          </span>
          <p>
            Payment processing fees, bank charges, transfer fees, and
            third-party charges may be non-refundable.
            <br />
            Where applicable, Mimotar will clearly communicate any deductions
            before processing a refund.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            10. Mimotar Service Fees
          </span>
          <p>
            Mimotar may charge a service fee for facilitating escrow
            transactions. <br />
            Service fees may be non-refundable once a transaction has been
            successfully processed, except where a refund is required due to a
            confirmed technical error, duplicate charge, or failed transaction.{" "}
            <br />
            Any applicable payment processing charges by third-party payment
            providers may also be subject to the provider’s own policies.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            11. Duplicate or Failed Payments
          </span>
          <p>
            If a client is charged more than once for the same transaction, or
            if a payment is confirmed as failed but the client was debited, the
            client should contact Mimotar support immediately. <br />
            Once verified, Mimotar will work with its payment provider to
            resolve the issue and process a refund where applicable.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            12. Refund Processing Timeline
          </span>
          <p>
            Approved refunds will be processed within a reasonable timeframe
            after review and confirmation. <br />
            Refund timelines may depend on: <br />
            <ul className="list-disc pl-5 space-y-1">
              <li>The payment method used; </li>
              <li>The payment provider’s processing timeline;</li>
              <li> The user’s bank or card issuer;</li>
              <li> The complexity of the dispute or verification process.</li>
            </ul>
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            13.Fraud, Abuse, and False Claims
          </span>
          <p>
            Mimotar reserves the right to decline refund requests that appear
            fraudulent, abusive, dishonest, or unsupported by evidence.
            <br />
            Users who repeatedly abuse the refund or dispute process may have
            their account restricted or suspended.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            14. Contact Us
          </span>
          <p>
            For refund requests, payment issues, or dispute support, please
            contact us using the official contact details below: <br />
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Email: support@mimotar.com</li>
            <li>Phone/WhatsApp: +234 81 3367 2833</li>
            <li>Address: Marshy Hills Estate, Ajah, Lagos</li>
            <li>Support Hours: Monday–Friday, 9am–5pm WAT </li>
          </ul>

          <p>
            Please include your project ID, transaction reference, payment
            receipt, and a clear description of the issue when contacting
            support.
          </p>
        </section>
      </div>

      {/* <div className="flex justify-between items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-[10.5px]">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Protected Under Privacy Rules</span>
        </div>
        <span className="text-[10px] text-gray-400 font-mono">
          Data Safe & Encrypted
        </span>
      </div> */}
    </div>
  );
};

export default RefundPolicy;
