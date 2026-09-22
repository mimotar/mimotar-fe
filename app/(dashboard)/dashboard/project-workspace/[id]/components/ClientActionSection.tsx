import toast from "react-hot-toast";
import { ITransaction } from "../../../projects/types/ITransaction";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineRefresh } from "react-icons/md";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import Link from "next/link";

interface IClientActionSectionProps {
  project: ITransaction;
  role: "CLIENT" | "FREELANCER";
  handlePayment: (id: string | number) => void;
  isLoadingPayment: boolean;
  isClientApprovingFreelancerDeliverables: boolean;
  handleClientApproveFreelancerDeliverables: () => void;
  isCreator: boolean;
}

export default function ClientActionSection({
  project,
  role,
  handlePayment,
  isLoadingPayment,
  handleClientApproveFreelancerDeliverables,
  isClientApprovingFreelancerDeliverables,
  isCreator,
}: IClientActionSectionProps) {
  const [showReleaseConfirm, setShowReleaseConfirm] = useState(false);

  if (role !== "CLIENT") {
    return null;
  }

  const hasMilestones = project.milestones && project.milestones.length > 0;

  return (
    <>
      {/* {project.status === "APPROVED" && ( */}
      <div className="space-y-4">
        {project.status === "APPROVED" && (
          <div className="p-5 relative bg-purple-100/[0.02] border border-purple-100 rounded-2xl space-y-4">
            <MdOutlineRefresh className="absolute top-2 right-2 text-xl cursor-pointer" />
            <span className="text-xs font-bold text-brand-primary block">
              Client Funding Required
            </span>
            <p className="text-xs text-gray-500 leading-relaxed">
              Securing funds locked inside Mimotar provides the milestone
              guarantee. Once funded, the freelancer holds a legal claim and can
              safely implement code deliverables.
            </p>
            <span className="text-xs text-brand-secondary ">
              Note: refresh or wait for a few second for the ticket to update
            </span>
            <button
              disabled={isLoadingPayment}
              // onClick={() => setShowFlutterwavePay(true)}
              onClick={() => handlePayment(project.id)}
              className="w-full py-3 bg-brand-primary inline-flex gap-2 mt-2 items-center justify-center text-white text-xs font-bold rounded-xl shadow-xs hover:bg-brand-primary/95 transition cursor-pointer text-center"
            >
              Fund Escrow (₦{project.amount.toLocaleString()}){" "}
              {isLoadingPayment && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
            </button>
          </div>
        )}

        {project.status === "ONGOING" && !hasMilestones && (
          <div className="p-5.5 bg-gray-50 rounded-2xl">
            <span className="text-xs font-semibold text-gray-500 block">
              Status: Awaiting Work Submission
            </span>
            <p className="text-xs text-gray-400 leading-relaxed mt-2">
              Frightened about outcomes? Money is secured locked. Freelancer has
              been notified and is actively crafting your scope guide
              requirements.
            </p>
          </div>
        )}

        {project.status === "REJECTED" && isCreator && !hasMilestones && (
          <div className="space-y-4">
            <div className="bg-brand-primary/[0.02] border-2 border-dashed border-brand-primary/30 p-5 rounded-2xl">
              <span className="text-xs font-bold text-brand-primary block">
                Ticket Rejected
              </span>
              <p className="text-xs text-gray-400 mt-4 leading-normal">
                This ticket was rejected by the other party and cannot be
                continued. Review the reason below and create a new ticket if
                you still want to proceed.
              </p>
              {/* Rejection Reason */}{" "}
              <div className="mt-4 p-4 bg-white border border-red-100 rounded-xl space-y-2">
                <span className="text-[10px] text-red-500 uppercase font-bold font-mono">
                  Rejection Reason{" "}
                </span>{" "}
                <p className="text-xs text-gray-700 leading-relaxed">
                  {false || "No rejection reason was provided."}{" "}
                </p>{" "}
              </div>
              <div className="mt-4 p-4.5 bg-brand-primary/[0.03] rounded-2xl border border-brand-primary/20 space-y-3 animate-fade-in text-left">
                <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
                  <Link
                    href="/dashboard/start-project"
                    className="flex-1 inline-flex items-center justify-center py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition cursor-pointer text-center"
                  >
                    Create New Ticket
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.status === "CHANGES_REQUESTED" &&
          isCreator &&
          !hasMilestones && (
            <div className="space-y-4">
              <div className="bg-brand-primary/[0.02] border-2 border-dashed border-brand-primary/30 p-5 rounded-2xl">
                <span className="text-xs font-bold text-brand-primary block">
                  Changes Requested
                </span>
                <p className="text-xs text-gray-400 mt-4 leading-normal">
                  The other party has requested changes to this ticket. Review
                  the feedback below and update the ticket to address the
                  requested changes.
                </p>

                <div className="mt-4 p-4 bg-white border border-red-100 rounded-xl space-y-2">
                  <span className="text-[10px] text-red-500 uppercase font-bold font-mono">
                    Requested Changes
                  </span>{" "}
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {project.change_request_comment ||
                      "No rejection reason was provided."}{" "}
                  </p>
                </div>
                <div className="mt-4 p-4.5 bg-brand-primary/[0.03] rounded-2xl border border-brand-primary/20 space-y-3 animate-fade-in text-left">
                  <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
                    <button
                      onClick={() => ""}
                      className="flex-1 inline-flex items-center justify-center py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition cursor-pointer text-center"
                    >
                      Make Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        {project.status == "PENDING_CLOSURE" && !hasMilestones && (
          <div className="space-y-4">
            <div className="bg-brand-primary/[0.02] border-2 border-dashed border-brand-primary/30 p-5 rounded-2xl">
              <span className="text-xs font-bold text-brand-primary block">
                Review Workspace Submission
              </span>

              <div className="mt-4 p-4 bg-white border border-gray-100 rounded-xl space-y-3">
                <span className="text-[10px] text-gray-400 uppercase font-bold font-mono">
                  Deliverables Notes & Assets
                </span>
                <p className="text-xs text-gray-700 leading-relaxed italic">
                  {project.delivery_note || "No Note"}
                </p>
                {project.delivery_file && (
                  <>
                    <div className="text-xs font-bold text-brand-primary flex items-center gap-1 bg-brand-primary/5 px-2.5 py-1.5 rounded-lg w-fit">
                      💾 {project.delivery_file.fileName}
                    </div>

                    <button
                      className="text-sm border font-semibold rounded-md border-brand-secondary p-2 text-brand-primary cursor-pointer"
                      onClick={() =>
                        window.open(project.delivery_file?.fileUrl, "_blank")
                      }
                    >
                      View deliverable
                    </button>
                  </>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-4 leading-normal">
                Verify elements meet requirements. Click approve to trigger the
                Flutterwave-connected bank payouts instantly.
              </p>

              {showReleaseConfirm ? (
                <div className="mt-4 p-4.5 bg-brand-primary/[0.03] rounded-2xl border border-brand-primary/20 space-y-3 animate-fade-in text-left">
                  <span className="text-xs font-bold text-gray-900 block font-sans">
                    ⚠️ Security Release Confirmation
                  </span>
                  <p className="text-[11px] text-gray-600 leading-normal">
                    Are you absolutely sure you want to approve this delivery
                    and release the locked escrow funds of{" "}
                    <span className="font-extrabold text-gray-900 font-mono">
                      {formatNumberToCurrency(project.amount, project.currency)}
                    </span>{" "}
                    to the freelancer? Once confirmed, this payout cannot be
                    cancelled, recalled, or reversed.
                  </p>
                  <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
                    <button
                      onClick={handleClientApproveFreelancerDeliverables}
                      className="flex-1 inline-flex items-center justify-center py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition cursor-pointer text-center"
                    >
                      Release Funds{" "}
                      {isClientApprovingFreelancerDeliverables && (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      )}
                    </button>
                    <button
                      onClick={() => setShowReleaseConfirm(false)}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-col md:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowReleaseConfirm(true);
                    }}
                    className="flex-1 py-3 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-xs hover:bg-brand-primary/95 transition cursor-pointer text-center"
                  >
                    Approve & Release
                  </button>
                  <button
                    //   onClick={() => setShowDisputeModal(true)}
                    className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Raise Dispute
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
}
