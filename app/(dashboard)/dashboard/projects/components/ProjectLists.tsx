import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  FolderOpen,
  ShieldAlert,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  ITransaction,
  type ITransactionsResponseData,
} from "../types/ITransaction";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { format, isValid } from "date-fns";
import { useRouter } from "next/navigation";

interface IProjectLists {
  filteredProjects: ITransactionsResponseData;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setStatusFilter: Dispatch<
    SetStateAction<
      | "all"
      | "unfunded"
      | "funded"
      | "disputed"
      | "completed"
      | "pending_agreement"
    >
  >;
}

export default function ProjectLists({
  filteredProjects,
  setSearchTerm,
  setStatusFilter,
}: IProjectLists) {
  const session = useAuth();
  const navigate = useRouter();
  const getStatusBadge = (project: ITransaction) => {
    const approvalLabel =
      session.session?.email === project.creator_email
        ? "Pending others Approval"
        : "waiting for my Approval";
    // project.isReleased
    if (project.status === "COMPLETED") {
      return (
        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-150 uppercase tracking-wider flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Released
        </span>
      );
    }
    if (project.status === "DISPUTE") {
      return (
        <span className="px-3 py-1 bg-red-50 text-red-650 text-[10px] font-bold rounded-full border border-red-150 uppercase tracking-wider flex items-center gap-1 animate-pulse">
          <ShieldAlert className="w-3 h-3" /> Disputed
        </span>
      );
    }
    if (
      // project.status === "funded" ||
      project.payment ||
      project.status === "ONGOING"
    ) {
      return (
        <span className="px-3 py-1 bg-magenta-50 text-brand-primary text-[10px] font-bold rounded-full border border-brand-primary/20 uppercase tracking-wider flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-[#c026d3] rounded-full animate-ping"></div>{" "}
          Escrow Funded
        </span>
      );
    }
    if (
      // project.status === "pending_invite" ||
      // project.agreementStatus === "draft"

      project.status !== "APPROVED"
    ) {
      return (
        <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full border border-gray-150 uppercase tracking-wider flex items-center gap-1">
          <Clock className="w-3 h-3" /> {approvalLabel}
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-amber-50/50 text-[#a16207] text-[10px] font-bold rounded-full border border-amber-150 uppercase tracking-wider flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> Agreement Signed
      </span>
    );
  };

  return (
    <>
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-3xl py-16 px-4 border border-gray-100 text-center max-w-lg mx-auto flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-350">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              No Mimotar records found
            </h3>
            <p className="text-xs text-gray-400 mt-1 pb-4 leading-normal">
              No digital agreements match the active status or criteria toggled.
              Clear filters to browse all records.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-xs font-bold text-brand-primary hover:underline"
            >
              Reset Search Filter
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const hasMilestones = project.milestones.length > 0;
            const completedCount = project.milestones.filter(
              (m) => m.status === "COMPLETED",
            ).length;
            const totalCount = project.milestones.length;

            return (
              <div
                key={project.id}
                onClick={() => navigate.push(`project-workspace/${project.id}`)}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full justify-between transition-all hover:shadow-md hover:border-gray-150 group cursor-pointer text-left"
              >
                <div>
                  {/* Card Header Top Row */}
                  {project.status === "EXPIRED" && (
                    <span className="text-red-500 text-xs animate-pulse font-semibold">
                      Ticket Expired
                    </span>
                  )}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="space-y-0.5 text-left">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] text-gray-400 font-mono font-bold tracking-tight uppercase">
                          MIM-{project.id}-TX
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 font-bold uppercase rounded-md tracking-wider ${project.creator_role === "CLIENT" ? "bg-indigo-50 text-indigo-700 border border-indigo-100/50" : "bg-magenta-55/15 text-[#c026d3] border border-magenta-200/20"}`}
                        >
                          You:{" "}
                          {project.myRole === "CLIENT"
                            ? "Client"
                            : "Freelancer"}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 font-display tracking-tight leading-snug group-hover:text-brand-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="shrink-0">{getStatusBadge(project)}</div>
                  </div>

                  {/* Card Description */}
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-6">
                    {project.transaction_description}
                  </p>

                  {/* Info stats split */}
                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-50">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 font-semibold block">
                        Counterparty Nodes
                      </span>
                      <span className="text-xs font-bold text-gray-800 truncate block">
                        {project.receiver_fullname}
                      </span>
                      <span className="text-[9px] text-gray-450 uppercase tracking-widest block font-mono">
                        {project.reciever_role}
                      </span>
                    </div>

                    <div className="space-y-0.5 text-right">
                      <span className="text-[10px] text-gray-400 font-semibold block">
                        Protected Budget
                      </span>
                      <span className="text-[15px] font-black text-gray-950 block tracking-tight font-display">
                        {/* {formatMoney(project.amount, project.currency)} */}
                        {formatNumberToCurrency(
                          project.amount,
                          project.currency ?? "NGN",
                        )}
                      </span>
                      <span className="text-[9px] text-gray-450 block font-mono">
                        3% platform escrow protec.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Bottom Row */}
                <div className="pt-4 flex items-center justify-between text-[11px] text-gray-400 mt-auto leading-none">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5" />

                    <span>
                      DUE:{" "}
                      {project.deadline && isValid(new Date(project.deadline))
                        ? format(new Date(project.deadline), "MMM d, yyyy")
                        : "N/A"}
                    </span>
                  </div>

                  {hasMilestones ? (
                    <div className="flex items-center gap-1.5 font-bold text-gray-500 bg-gray-50 py-1 px-2.5 rounded-lg border border-gray-100">
                      <span>Milestones:</span>
                      <span className="text-brand-primary font-mono">
                        {completedCount}/{totalCount}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 font-bold text-gray-400 bg-gray-50/50 py-1 px-2.5 rounded-lg">
                      <span>One-off Escrow Close</span>
                    </div>
                  )}

                  <div className="w-8 h-8 rounded-full bg-magenta-50/20 text-brand-primary flex items-center justify-center border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white group-hover:scale-105 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
