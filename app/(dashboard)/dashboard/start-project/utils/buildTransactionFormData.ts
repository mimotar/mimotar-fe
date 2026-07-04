import { format } from "date-fns";
import { ITicket } from "../types/ITicket";
import type { Session } from "next-auth";
import { base64ToFile } from "./base64ToFile";

export function buildTransactionFormData(ticket: ITicket, session: Session) {
  const formData = new FormData();

  // Creator
  formData.append("creator_address", session?.user.address ?? "");
  formData.append("creator_email", session?.user.email ?? "");
  formData.append(
    "creator_fullname",
    `${session?.user.firstName ?? ""} ${session?.user.lastName ?? ""}`.trim(),
  );
  formData.append("creator_no", session?.user.phone_no ?? "");

  formData.append(
    "creator_role",
    ticket.reciever_role === "CLIENT" ? "FREELANCER" : "CLIENT",
  );

  // Counterparty
  formData.append("receiver_fullname", ticket.receiver_fullname);
  formData.append("receiver_email", ticket.reciever_email);
  formData.append("receiver_phone", ticket.receiver_no ?? "");
  formData.append("receiver_role", ticket.reciever_role ?? "");

  // Transaction
  formData.append("title", ticket.title);
  formData.append("transaction_description", ticket.transaction_description);
  formData.append("currency", ticket.currency);
  formData.append("amount", ticket.amount.toString());

  formData.append(
    "close_deadline",
    format(new Date(ticket.close_deadline), "yyyy-MM-dd"),
  );

  formData.append("pay_escrow_fee", ticket.pay_escrow_fee ?? "");

  // Attachments
  ticket.attachment.forEach((attachment) => {
    formData.append("attachments", base64ToFile(attachment));
  });

  // Milestones
  ticket.milestones.forEach((milestone, index) => {
    formData.append(`milestones[${index}][name]`, milestone.name);

    formData.append(`milestones[${index}][deadline]`, milestone.deadline);

    formData.append(
      `milestones[${index}][amount]`,
      milestone.amount.toString(),
    );

    if (milestone.files) {
      milestone.files.forEach((file) => {
        formData.append(`milestones[${index}][file]`, base64ToFile(file));
      });
    }
  });

  return formData;
}
