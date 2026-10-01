import { approveTicket } from "../api/approveProject";
import { useMutation } from "@tanstack/react-query";
import { rejectTicket } from "../api/rejectProject";
import { requestProjectToken } from "../api/requestProjectToken";
import { fundProject } from "../api/fundingAction";
import {
  freelancerWorkSubmission,
  IFreelancerWorkSubmissionPayload,
} from "../api/freelancerWorkSubmission";
import { extendDeadline, IExtendDeadlinePayload } from "../api/extendDeadline";
import { clientApproveFreelancerWork } from "../api/clientApproveFreelancerWork";
import { RequestChanges } from "../api/requestForChanges";
import { editRequestedTicket } from "../api/editRequestTicket";
import { MakeChangesPayload } from "../schema/makeChanges";
import { sendEditedTicket } from "../api/sendEditedTicket";

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

  const FreelancerWorkSubmissionMutation = useMutation({
    mutationKey: ["freelancerWorkSubmission", id],
    mutationFn: (payload: IFreelancerWorkSubmissionPayload) =>
      freelancerWorkSubmission(id, payload),
  });

  const ClientDeadlineExtension = useMutation({
    mutationKey: ["deadlineExtension", id],
    mutationFn: (payload: IExtendDeadlinePayload) =>
      extendDeadline(id, payload),
  });

  const ApproveFreelancerWork = useMutation({
    mutationKey: ["approve-freelancer-work", id],
    mutationFn: () => clientApproveFreelancerWork(id),
  });

  const RequestChangesFromCreator = useMutation({
    mutationKey: ["request-changes-from-freelancer", id],
    mutationFn: (data: string) => RequestChanges(id, data),
  });

  const editRequestTicket = useMutation({
    mutationKey: ["edit-requested-ticket", id],
    mutationFn: (data: MakeChangesPayload) => editRequestedTicket(id, data),
  });

  const SendEditedTicket = useMutation({
    mutationKey: ["send-edit-ticket", id],
    mutationFn: () => sendEditedTicket(id),
  });

  return {
    approvalMutation,
    rejectMutation,
    requestTokenMutation,
    fundingMutation,
    FreelancerWorkSubmissionMutation,
    ClientDeadlineExtension,
    ApproveFreelancerWork,
    RequestChangesFromCreator,
    editRequestTicket,
    SendEditedTicket,
  };
}
