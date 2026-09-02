"use client";

import { ITransaction } from "../../../projects/types/ITransaction";
import AgreementDecisionModal from "./AgreementDecisionModal";

type AgreementDecision = "accept" | "reject";

interface AgreementAcceptanceBlockProps {
  project: ITransaction;
  isCreator: boolean;
  decision: AgreementDecision | null;
  agreementOtp: string;
  isRequestingOtp: boolean;
  isDecisionPending: boolean;
  onRequestOtp: () => void;
  onOpenDecision: (nextDecision: AgreementDecision) => void;
  onCloseDecision: () => void;
  onAgreementOtpChange: (otp: string) => void;
  onConfirmDecision: (payload: {
    otp: string;
    rejectionReason?: string;
  }) => void;
}

export default function AgreementAcceptanceBlock({
  project,
  isCreator,
  decision,
  agreementOtp,
  isRequestingOtp,
  isDecisionPending,
  onRequestOtp,
  onOpenDecision,
  onCloseDecision,
  onAgreementOtpChange,
  onConfirmDecision,
}: AgreementAcceptanceBlockProps) {
  return (
    <>
      {project.status !== "APPROVED" && !isCreator && (
        <div className="p-5.5 bg-yellow-50 rounded-2xl border border-yellow-200/50 space-y-4">
          <span className="text-xs font-bold text-yellow-800">
            Proposal Pending Verification
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            The counterparty must accept these terms before payments can be
            funded. You can accept or decline instantly to bypass.
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onRequestOtp}
              disabled={isRequestingOtp}
              className="w-full py-2.5 bg-white border border-amber-200 text-amber-700 text-xs font-semibold rounded-xl transition cursor-pointer hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isRequestingOtp ? "Requesting OTP..." : "Request OTP"}
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onOpenDecision("accept")}
                className="flex-1 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer hover:bg-brand-primary/95 transition text-center"
              >
                Accept Terms
              </button>
              <button
                type="button"
                onClick={() => onOpenDecision("reject")}
                className="px-4 py-2.5 bg-white border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <AgreementDecisionModal
        key={`${decision ?? "none"}-${Boolean(decision)}`}
        open={Boolean(decision)}
        decision={decision}
        projectTitle={project.title}
        otp={agreementOtp}
        isLoading={isDecisionPending}
        onOpenChange={(open) => {
          if (!open) {
            onCloseDecision();
          }
        }}
        onOtpChange={onAgreementOtpChange}
        onConfirm={onConfirmDecision}
      />
    </>
  );
}
