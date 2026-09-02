import { approveTicket } from "../api/approveProject";
import { useMutation } from "@tanstack/react-query";
import { rejectTicket } from "../api/rejectProject";
import { requestProjectToken } from "../api/requestProjectToken";
import { fundProject } from "../api/fundingAction";

export interface ProjectAgreementOtpResponse {
  message?: string;
  data?: {
    otp?: string;
    otp_created_at?: string;
  };
}

export function useMutationAction(id: number) {
  const approvalMutation = useMutation({
    mutationKey: ["approve_reject", id],
    mutationFn: (otp: string) => approveTicket(id, otp),
  });

  const rejectMutation = useMutation({
    mutationKey: ["reject_reject", id],
    mutationFn: ({
      otp,
      rejectionReason,
    }: {
      otp: string;
      rejectionReason: string;
    }) => rejectTicket(id, otp, rejectionReason),
  });

  const requestTokenMutation = useMutation<ProjectAgreementOtpResponse>({
    mutationKey: ["request_project_otp", id],
    mutationFn: () => requestProjectToken(id),
  });

  //client funding
  const fundingMutation = useMutation({
    mutationKey: ["funding", id],
    mutationFn: () => fundProject(id),
  });

  return {
    approvalMutation,
    rejectMutation,
    requestTokenMutation,
    fundingMutation,
  };
}
