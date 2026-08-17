import { ITransaction } from "../../../projects/types/ITransaction";

interface AgreementAcceptanceBlockProps {
  project: ITransaction;
}

export default function AgreementAcceptanceBlock({
  project,
}: AgreementAcceptanceBlockProps) {
  return (
    <>
      {/* {project.agreementStatus === "pending_invite" && ( */}
      {project.status !== "APPROVED" && (
        <div className="p-5.5 bg-yellow-50 rounded-2xl border border-yellow-200/50 space-y-4">
          <span className="text-xs font-bold text-yellow-800">
            Proposal Pending Verification
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            The counterparty must accept these terms before payments can be
            funded. As the simulator, you can accept or decline instantly to
            bypass!
          </p>

          <div className="flex gap-3">
            <button
              // onClick={() => acceptProjectAgreement(project.id)}
              className="flex-1 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer hover:bg-brand-primary/95 transition text-center"
            >
              Accept Terms
            </button>
            <button
              // onClick={() => rejectProjectAgreement(project.id)}
              className="px-4 py-2.5 bg-white border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  );
}
