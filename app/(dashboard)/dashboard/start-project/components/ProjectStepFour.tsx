import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useNavigateProjectStep } from "../hooks/usenavigateProjectStep";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { ArrowRight } from "lucide-react";
import type { Session } from "next-auth";
import {
  resetTransactionDetails,
  setTransactionDetails,
} from "@/lib/slices/createTransactionslice";
import { format } from "date-fns";
import {
  CreateTransactionInput,
  createTransactionSchema,
} from "../schema/projectSchema";
import { buildTransactionFormData } from "../utils/buildTransactionFormData";
import { useCreateTicket } from "../hooks/usecreateTicket";
import toast from "react-hot-toast";
import { AxiosErrorHandler } from "@/app/utils/axiosErrorHandler";
import { createTicketSuccessPayload } from "@/lib/slices/TicketSuccessSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ProjectStepFour() {
  const { session } = useAuth();
  const { nextStep } = useNavigateProjectStep();
  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.createTransaction);
  console.log("ticket", ticket);
  const { mutate, isPending } = useCreateTicket();

  const hasMilestones = ticket.milestones && ticket.milestones.length > 0;

  const handleFinalSubmit = async () => {
    // const payload = {
    //   ...ticket,

    //   creator_address: session?.address ?? "",
    //   creator_email: session?.email ?? "",
    //   creator_fullname:
    //     `${session?.firstName ?? ""} ${session?.lastName ?? ""}`.trim(),
    //   creator_no: session?.phone_no ?? "",
    //   creator_role: ticket.reciever_role === "CLIENT" ? "FREELANCER" : "CLIENT",
    // };

    const formValidationSchema: CreateTransactionInput = {
      counterpartyEmail: ticket.reciever_email,
      counterpartyPhone: ticket.receiver_no,
      counterpartyName: ticket.receiver_fullname,
      counterpartyRole: ticket.reciever_role ?? "CLIENT",
      counterpartyAddress: ticket.receiver_address || "",

      creator_address: session?.address ?? "",
      creator_email: session?.email ?? "",
      creator_fullname:
        `${session?.firstName ?? ""} ${session?.lastName ?? ""}`.trim(),
      creator_no: session?.phone_no ?? "",
      creator_role: ticket.reciever_role === "CLIENT" ? "FREELANCER" : "CLIENT",

      expiresAt: Number(ticket.expiresAt),
      transactionType: (hasMilestones
        ? "MILESTONE_BASED_PROJECT"
        : ticket.transactionType) as
        | "PHYSICAL_PRODUCT"
        | "ONLINE_PRODUCT"
        | "SERVICE"
        | "RENTAL"
        | "MILESTONE_BASED_PROJECT",

      amount: ticket.amount,
      files: ticket.files,
      deadline: new Date(ticket.deadline),
      currency: ticket.currency,
      milestones:
        ticket.milestones?.map((milestone) => ({
          name: milestone.name,
          deadline: milestone.deadline,
          amount: milestone.amount,
        })) ?? [],
      pay_escrow_fee: ticket.pay_escrow_fee,
      title: ticket.title,

      transaction_description: ticket.transaction_description,

      inspection_duration: ticket.inspection_duration,
    };

    const result = createTransactionSchema.safeParse(formValidationSchema);
    console.log("type", formValidationSchema);
    const errors = result.error?.flatten().fieldErrors ?? {};
    console.log("Validation errors:", errors);

    if (
      errors.title ||
      errors.amount ||
      errors.transaction_description ||
      errors.deadline
    ) {
      nextStep(1);
      return;
    }

    if (errors.milestones) {
      nextStep(2);
      return;
    }

    if (
      errors.counterpartyName ||
      errors.counterpartyEmail ||
      errors.counterpartyPhone ||
      errors.counterpartyRole
    ) {
      nextStep(3);
      return;
    }

    if (!session) return;

    const formData = buildTransactionFormData(ticket, {
      user: session,
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as Session);

    mutate(formData, {
      onSuccess: (data) => {
        console.log("Transaction created successfully:", data);
        dispatch(createTicketSuccessPayload(data.data));
        dispatch(resetTransactionDetails());
        toast.success(
          "Transaction created successfully! The other party has been notified to review and approve or reject the transaction.",
        );
        nextStep(5);
      },

      onError: (error) => {
        const errorObj = AxiosErrorHandler(error);
        toast.error(errorObj);
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div>
        <h2 className="text-lg font-extrabold text-[#111827]">
          Escrow Protection Agreement Overview
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Review your legally binding parameters before generated links
          dispatch.
        </p>
      </div>

      <div className="border border-purple-100 rounded-3xl p-6.5 bg-purple-100/[0.02] space-y-6 relative">
        <div className="absolute top-6 right-6 inline-flex items-center gap-1 text-[10px] bg-brand-primary/15 text-brand-primary font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          🔒 Standard Escrow Lock
        </div>

        <div>
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            Project Specification
          </span>
          <h3 className="text-sm font-bold text-gray-900 mt-1.5 leading-snug">
            {ticket.title || "Untitled contract proposal"}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mt-2.5 whitespace-pre-wrap">
            {ticket.transaction_description ||
              "No deliverables details provided yet."}
          </p>
        </div>

        {ticket.files.length > 0 && (
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
              Contracts guidance attachments
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {ticket.files.map((file, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 bg-white border border-gray-150 rounded-xl p-2 text-xs font-medium text-slate-800"
                >
                  📄 {file.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6.5 pt-4 border-t border-gray-55/40">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">
              Budget Value
            </span>
            <span className="text-sm font-extrabold text-gray-800 block mt-1 font-mono">
              {formatNumberToCurrency(ticket.amount, "NGN")}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">
              Due Deadline
            </span>
            <span className="text-xs font-bold text-gray-800 block mt-1">
              {ticket.deadline
                ? format(new Date(ticket.deadline), "MMMM d, yyyy")
                : "No selected deadline"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">
              Fee distribution
            </span>
            <span className="text-xs font-bold text-brand-primary block mt-1 capitalize">
              {ticket.pay_escrow_fee || "Not selected"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">
              Escrow Fee (3%)
            </span>
            <span className="text-xs font-bold text-[#854d0e] block mt-1 font-mono">
              {formatNumberToCurrency(ticket.amount * 0.03, "NGN")}
            </span>
          </div>
        </div>

        {hasMilestones && (
          <div className="pt-4 border-t border-gray-55/40">
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-2.5">
              Configured Milestones Phases ({ticket.milestones.length})
            </span>
            <div className="space-y-2">
              {ticket.milestones.map((m, i) => (
                <div
                  key={m.id}
                  className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col gap-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 font-sans">
                        Phase {i + 1}: {m.name}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        Due {m.deadline}
                      </span>
                    </div>
                    <span className="font-bold text-gray-800 font-mono bg-gray-50 px-2.5 py-1 rounded border border-gray-100">
                      {formatNumberToCurrency(m.amount, "NGN")}
                    </span>
                  </div>
                  {m.files && m.files.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-550 border-t border-gray-100 pt-1.5">
                      <span>📎 Attached Files:</span>
                      {m.files.map((file, fIdx) => (
                        <span
                          key={fIdx}
                          className="font-mono bg-gray-55/40 text-gray-700 px-1.5 py-0.5 rounded text-[9px]"
                        >
                          {file.name}
                        </span>
                      ))}
                    </div>
                  ) : m.files ? (
                    <div className="flex items-center gap-1 text-[10px] text-gray-550 border-t border-gray-100 pt-1.5">
                      <span>📎 Attached File:</span>
                      <span className="font-mono bg-gray-55/40 text-gray-700 px-1.5 py-0.5 rounded text-[9px]">
                        {m.files[0]?.name}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-55/40 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">
              Counterparty Info
            </span>
            <span className="text-xs font-bold text-gray-800 block mt-1">
              {ticket.receiver_fullname} ({ticket.reciever_role})
            </span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5 font-mono">
              {ticket.reciever_email}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">
              Owner Role
            </span>
            <span className="text-xs font-bold text-gray-800 block mt-1">
              {session?.firstName || ""} {session?.lastName || ""} (Creator)
            </span>
            <span className="text-[10px] text-brand-neutral block mt-0.5 capitalize">
              {/* {currentUser.role}  */}
              {ticket.reciever_role == "CLIENT" ? "FREELANCER" : "CLIENT"} and
              funding initiator
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={() => {
            nextStep(3);
            // setStep(3)
          }}
          className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 transition"
        >
          Modify
        </button>

        <button
          disabled={isPending}
          type="button"
          onClick={handleFinalSubmit}
          className="bg-brand-primary text-white text-xs font-bold rounded-xl px-6 py-3.5 transition flex items-center gap-2 cursor-pointer"
        >
          Create Contract{" "}
          {isPending ? (
            <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
