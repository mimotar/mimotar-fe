import { approveTicket } from "../api/approveProject";
import { useMutation } from "@tanstack/react-query";
import { rejectTicket } from "../api/rejectProject";

export function useMutationAction(id: string | number) {
  const approvalMutation = useMutation({
    mutationKey: ["approve_reject", id],
    mutationFn: () => approveTicket(id),
  });

  const rejectMutation = useMutation({
    mutationKey: ["reject_reject", id],
    mutationFn: (rejectionReason: string) =>
      rejectTicket(id, rejectionReason),
  });

  return { approvalMutation, rejectMutation };
}
