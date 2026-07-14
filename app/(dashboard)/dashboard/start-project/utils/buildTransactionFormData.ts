import { format } from "date-fns";
import { ITicket } from "../types/ITicket";
import type { Session } from "next-auth";
import { base64ToFile } from "./base64ToFile";

export function buildTransactionFormData(ticket: ITicket, session: Session) {
  const formData = new FormData();

  // Creator
  formData.append(
    "creator_address",
    session?.user.address?.trim() || ticket.creator_address?.trim() || "",
  );
  formData.append("creator_email", session?.user.email ?? "");
  formData.append(
    "creator_fullname",
    `${session?.user.firstName ?? ""} ${session?.user.lastName ?? ""}`.trim(),
  );
  formData.append(
    "creator_no",
    session?.user.phone_no?.trim() || ticket.creator_no?.trim() || "",
  );
  formData.append(
    "creator_role",
    ticket.reciever_role === "CLIENT" ? "FREELANCER" : "CLIENT",
  );

  // Counterparty
  formData.append("receiver_fullname", ticket.receiver_fullname);
  formData.append("reciever_email", ticket.reciever_email);
  formData.append("receiver_no", ticket.receiver_no ?? "");
  formData.append("reciever_role", ticket.reciever_role ?? "");
  formData.append("receiver_address", ticket.receiver_address ?? "");

  // Transaction
  formData.append("title", ticket.title);
  formData.append("transaction_description", ticket.transaction_description);
  formData.append("currency", ticket.currency);
  formData.append("amount", ticket.amount.toString());

  formData.append("deadline", format(new Date(ticket.deadline), "yyyy-MM-dd"));

  formData.append("pay_escrow_fee", ticket.pay_escrow_fee ?? "");

  formData.append("expiresAt", String(ticket.expiresAt ?? 0));

  formData.append("transactionType", ticket.transactionType ?? "");

  // Attachments
  ticket.files.forEach((attachment) => {
    formData.append("files", base64ToFile(attachment));
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

  formData.append("inspection_duration", String(ticket.inspection_duration));

  return formData;
}
