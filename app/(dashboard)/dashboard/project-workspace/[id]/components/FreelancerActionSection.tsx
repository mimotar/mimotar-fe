import { Dispatch, SetStateAction } from "react";
import { ITransaction } from "../../../projects/types/ITransaction";

interface IFreelancerActionSection {
  project: ITransaction;
  role: "CLIENT" | "FREELANCER";
  setShowSubmitModal: Dispatch<SetStateAction<boolean>>;
}

export default function FreelancerActionSection({
  project,
  role,
  setShowSubmitModal,
}: IFreelancerActionSection) {
  return (
    <>
      {" "}
      {role === "FREELANCER" && project.status === "APPROVED" && (
        <div className="space-y-4">
          {project.payment?.status === "PENDING" ||
            (project.payment?.status === "FAILED" && (
              <div className="p-5.5 bg-gray-50 rounded-2xl">
                <span className="text-xs font-semibold text-gray-500 block">
                  Status: Waiting for Client to Fund Escrow
                </span>
                <p className="text-xs text-gray-400 leading-relaxed mt-2 text-left">
                  DO NOT start working yet. We will notify you via in-app alerts
                  and email once the client authorizes Flutterwave funding
                  security layers.
                </p>
              </div>
            ))}

          {project.payment?.status === "COMPLETED" && (
            <div className="p-5 bg-brand-primary/[0.01] border border-brand-primary/10 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-brand-primary">
                🎉 Client Has Funded Escrow contract
              </span>
              <p className="text-xs text-gray-500 leading-relaxed text-left">
                {project.milestones && project.milestones.length > 0
                  ? "Your milestones are secured in safety! You can now proceed to implement each phase with 100% security backing. Submit deliverables per-milestone in the milestones section below."
                  : "Your funds are locked in safety! You can now proceed to implement specifications with 100% security backing. When finished, submit work deliverables."}
              </p>
              {!(project.milestones && project.milestones.length > 0) && (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="w-full py-3 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-xs hover:bg-brand-primary/95 transition cursor-pointer text-center"
                >
                  Submit Work
                </button>
              )}
            </div>
          )}

          {
            // project.isDelivered &&
            //   !project.isReleased &&
            ["APPROVED", "ONGOING", "PENDING_CLOSURE"].includes(
              project.status,
            ) &&
              !(project.milestones && project.milestones.length > 0) && (
                <div className="p-5.5 bg-emerald-50 text-emerald-950 rounded-2xl border border-emerald-100 space-y-3">
                  <span className="text-xs font-bold text-emerald-800">
                    Deliverables Submitted Awaiting Approval
                  </span>
                  <p className="text-xs text-emerald-950/70 leading-relaxed">
                    Your notes and assets were successfully dispatched. The
                    client has 48 hours to review. If inaction happens, funds
                    auto-release into your available balance instantly.
                  </p>
                </div>
              )
          }
        </div>
      )}
    </>
  );
}
