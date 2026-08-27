"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DefaultSession } from "next-auth";
import { AxiosError } from "axios";
import { ITransaction } from "../../../projects/types/ITransaction";
import AgreementDecisionModal from "./AgreementDecisionModal";
import { useMutationAction } from "../hooks/useMutationActions";

interface AgreementAcceptanceBlockProps {
  project: ITransaction;
  session: DefaultSession["user"];
  isCreator: boolean;
}

export default function AgreementAcceptanceBlock({
  project,
  session,
  isCreator,
}: AgreementAcceptanceBlockProps) {
  const queryClient = useQueryClient();
  const [decision, setDecision] = useState<"accept" | "reject" | null>(null);

  const { approvalMutation, rejectMutation } = useMutationAction(project.id);

  const openDecisionModal = (nextDecision: "accept" | "reject") => {
    setDecision(nextDecision);
  };

  const closeDecisionModal = () => {
    setDecision(null);
  };

  const handleConfirmDecision = (rejectionReason?: string) => {
    if (decision === "accept") {
      approvalMutation.mutate(undefined, {
        onSuccess: async (data) => {
          toast.success(data?.message || "Agreement accepted successfully.");
          await queryClient.invalidateQueries({
            queryKey: ["project", project.id],
          });
          setDecision(null);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data?.message);
            return;
          }
          if (error instanceof Error) {
            toast.error(
              error?.message || "Unable to accept the agreement right now.",
            );
            return;
          }

          toast.error("Unable to accept the agreement right now.");
        },
      });
      return;
    }

    const reason = rejectionReason?.trim();

    if (!reason) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    rejectMutation.mutate(reason, {
      onSuccess: async (data) => {
        toast.success(data?.message || "Agreement rejected successfully.");
        await queryClient.invalidateQueries({
          queryKey: ["project", project.id],
        });
        setDecision(null);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
          return;
        }
        if (error instanceof Error) {
          toast.error(
            error?.message || "Unable to reject the agreement right now.",
          );
          return;
        }

        toast.error("Unable to reject the agreement right now.");
      },
    });
  };

  return (
    <>
      {/* {project.agreementStatus === "pending_invite" && ( */}
      {project.status !== "APPROVED" && !isCreator && (
        <div className="p-5.5 bg-yellow-50 rounded-2xl border border-yellow-200/50 space-y-4">
          <span className="text-xs font-bold text-yellow-800">
            Proposal Pending Verification
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            The counterparty must accept these terms before payments can be
            funded. You can accept or decline instantly to bypass!. Request for
            token in order to Accept or Reject
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => openDecisionModal("accept")}
              className="flex-1 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer hover:bg-brand-primary/95 transition text-center"
            >
              Accept Terms
            </button>
            <button
              onClick={() => openDecisionModal("reject")}
              className="px-4 py-2.5 bg-white border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      <AgreementDecisionModal
        open={Boolean(decision)}
        decision={decision}
        projectTitle={project.title}
        isLoading={
          (approvalMutation.isPending && decision === "accept") ||
          (rejectMutation.isPending && decision === "reject")
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDecisionModal();
          }
        }}
        onConfirm={handleConfirmDecision}
      />
    </>
  );
}
