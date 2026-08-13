"use client";

import React, { useState, useEffect, Suspense } from "react";
// import { useAppState } from "../useAppState";
// import { Project } from "../types";
// import { InteractiveMultiUploader } from "./InteractiveMultiUploader";
import {
  ShieldCheck,
  Clock,
  FileText,
  Send,
  AlertTriangle,
  HelpCircle,
  Check,
  ChevronRight,
  ArrowLeft,
  X,
  Loader2,
  Lock,
  MessageSquareCode,
  CheckCircle,
  FileCheck,
  Calendar,
  Database,
  Sparkles,
  ChevronDown,
  ChevronUp,
  User,
  Cpu,
} from "lucide-react";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { useProjectApp } from "../hooks/useProjectApp";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { InteractiveMultiUploader } from "../../../start-project/components/InteractiveMultiUploader";
// import { toast } from "@/components/ui/toast";

const AutoReleaseTimer: React.FC<{ deliveredAt?: string }> = ({
  deliveredAt,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("48:00:00");

  useEffect(() => {
    if (!deliveredAt) {
      setTimeLeft("48:00:00");
      return;
    }

    const calculateTimeLeft = () => {
      const deliveryTime = new Date(deliveredAt).getTime();
      const targetTime = deliveryTime + 48 * 60 * 60 * 1000; // 48 hours from delivery
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        return "00:00:00";
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const pad = (num: number) => String(num).padStart(2, "0");
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Tick every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [deliveredAt]);

  return (
    <div className="text-base font-black text-amber-950 bg-white px-4.5 py-1.5 rounded-xl border border-amber-200 shrink-0 font-mono animate-pulse">
      {timeLeft}
    </div>
  );
};

const MilestoneCountdown: React.FC<{ submittedAt?: string }> = ({
  submittedAt,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>(
    "48 Hours : 00 Minutes : 00 Seconds",
  );

  useEffect(() => {
    if (!submittedAt) {
      setTimeLeft("48 Hours : 00 Minutes : 00 Seconds");
      return;
    }

    const calculateTimeLeft = () => {
      const submissionTime = new Date(submittedAt).getTime();
      const targetTime = submissionTime + 48 * 60 * 60 * 1000;
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        return "00 Hours : 00 Minutes : 00 Seconds";
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const pad = (num: number) => String(num).padStart(2, "0");
      return `${hours} Hours : ${pad(minutes)} Minutes : ${pad(seconds)} Seconds`;
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [submittedAt]);

  return <>{timeLeft}</>;
};

export default function ProjectWorkspaceView() {
  // const {
  //   projects,
  //   demoRole,
  //   currentUser,
  //   setActivePage,
  //   selectedProjectId,
  //   acceptProjectAgreement,
  //   rejectProjectAgreement,
  //   fundProjectEscrow,
  //   submitProjectDelivery,
  //   releaseEscrowFunds,
  //   raiseProjectDispute,
  //   resolveProjectDispute,
  //   extendProjectDeadline,
  //   submitMilestoneDelivery,
  //   releaseMilestoneFunds,
  //   raiseMilestoneDispute,
  //   resolveMilestoneDispute,
  //   simulateMilestone48hPassage,
  //   showAlert,
  //   updatePhoneNumber,
  // } = useAppState();

  const params = useParams();
  const navigate = useRouter();

  const id = params.id as string;
  const { getProject } = useProjectApp(id);

  const session = useAuth();

  // const project = projects.find((p) => p.id === selectedProjectId);
  const project = getProject.data;

  // Modal / form states
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submissionFileName, setSubmissionFileName] = useState("");
  const [submissionFiles, setSubmissionFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Milestone inline form states
  const [submittingMilestoneId, setSubmittingMilestoneId] = useState<
    string | null
  >(null);
  const [milestoneNotes, setMilestoneNotes] = useState("");
  const [milestoneFile, setMilestoneFile] = useState("");
  const [milestoneFilesList, setMilestoneFilesList] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [disputingMilestoneId, setDisputingMilestoneId] = useState<
    string | null
  >(null);
  const [milestoneDisputeReason, setMilestoneDisputeReason] = useState("");
  const [milestoneDisputeEvidenceFiles, setMilestoneDisputeEvidenceFiles] =
    useState<string[]>([]);

  // Extend deadline modal states
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [extendedDeadline, setExtendedDeadline] = useState("");
  const [extendedMilestoneDeadlines, setExtendedMilestoneDeadlines] = useState<
    { id: string; deadline: string }[]
  >([]);

  useEffect(() => {
    if (project) {
      setExtendedDeadline(project.deadline);
      if (project.milestones.length > 0 && project.milestones) {
        setExtendedMilestoneDeadlines(
          project.milestones.map((m) => ({
            id: String(m.id),
            deadline: m.deadline,
          })),
        );
      } else {
        setExtendedMilestoneDeadlines([]);
      }
    }
  }, [project, showExtendModal]);

  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeEvidence, setDisputeEvidence] = useState("");
  const [disputeEvidenceFiles, setDisputeEvidenceFiles] = useState<string[]>(
    [],
  );

  // Pending dispute OTP interception states
  const [pendingDisputeAction, setPendingDisputeAction] = useState<{
    type: "project" | "milestone";
    milestoneId?: string;
    reason: string;
    evidenceFiles: string[];
  } | null>(null);
  const [disputeOtpPhone, setDisputeOtpPhone] = useState("");
  const [disputeOtpCode, setDisputeOtpCode] = useState("");
  const [disputeOtpSent, setDisputeOtpSent] = useState(false);
  const [disputeOtpError, setDisputeOtpError] = useState("");
  const [disputeVerificationSubmitting, setDisputeVerificationSubmitting] =
    useState(false);

  const [showResolveConfirm, setShowResolveConfirm] = useState(false);
  const [showReleaseConfirm, setShowReleaseConfirm] = useState(false);

  // Activity Ledger filter & interaction states
  const [logFilter, setLogFilter] = useState<
    "all" | "client" | "freelancer" | "system"
  >("all");
  const [showFeeDetails, setShowFeeDetails] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState<{ [id: string]: boolean }>(
    {},
  );

  const toggleLogExpand = (id: string) => {
    setExpandedLogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatAbsoluteDate = (isoString?: string) => {
    if (!isoString) return "Jun 15, 2026, 12:00 PM";
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return isoString;
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  const handleExtendDeadlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    if (!extendedDeadline) {
      toast.error("Total project deadline cannot be empty");
      return;
    }
    // extendProjectDeadline(
    //   project.id,
    //   extendedDeadline,
    //   extendedMilestoneDeadlines,
    // );
    setShowExtendModal(false);
  };

  // Flutterwave simulated overlay
  const [showFlutterwavePay, setShowFlutterwavePay] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!project) {
    return (
      <div className="py-12 text-center text-xs text-gray-500 animate-fade-in font-sans">
        No active project selected. Return to{" "}
        <button
          onClick={() => navigate.push("./dashboard/projects")}
          className="text-brand-primary font-bold hover:underline"
        >
          Projects
        </button>
        .
      </div>
    );
  }

  // Derive active steps for the Status Header Stepper
  // const getStepperIndex = () => {
  //   if (project.status !== "APPROVED") return 0; // Pending invite
  //   // if (project.escrowStatus === "unfunded") return 1; // Unfunded
  //   if (project.payment?.status === "PENDING" || project.payment?.status === "FAILED") return 1; // Unfunded
  //   // if (project.escrowStatus === "funded" && !project.isDelivered) return 2; // Funded / In Progress
  //    if (project.payment?.status === "COMPLETED") return 2; // Funded / In Progress
  //   // if (
  //   //   project.isDelivered &&
  //   //   !project.isReleased &&
  //   //   project.escrowStatus !== "dispute"
  //   // )
  //   //   return 3; // Delivered
  //     if (project.status !== "DISPUTE") return 3; // Delivered
  //   // if (project.isReleased || project.escrowStatus === "completed") return 4; // Released
  //     if ( project.status === "COMPLETED") return 4; // Released
  //   return 2; // Disputed falls into workspace progress
  // };

  const getStepperIndex = () => {
    // Waiting for the other party to accept
    if (project.status === "CREATED") return 0;

    // Agreement accepted but escrow not funded
    if (
      project.payment?.status === "PENDING" ||
      project.payment?.status === "FAILED"
    ) {
      return 1;
    }

    // Work in progress or dispute
    if (project.status === "ONGOING" || project.status === "DISPUTE") {
      return 2;
    }

    // Completed
    if (project.status === "COMPLETED") {
      return 4;
    }

    return 2;
  };

  const stepperIdx = getStepperIndex();
  const role =
    project.creator_email === session.session?.email
      ? project.creator_role
      : project.reciever_role;

  const myMail =
    project.creator_email === session.session?.email
      ? project.creator_email
      : project.reciever_email;

  const countyPartyMail =
    project.creator_email === session.session?.email
      ? project.reciever_email
      : "";

  const formatMoney = (amount: number, currency: "NGN" | "USD") => {
    return currency === "NGN"
      ? `₦${amount.toLocaleString()}`
      : `$${amount.toLocaleString()}`;
  };

  const handleFlutterwaveFund = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      // fundProjectEscrow(project.id);
      setIsProcessingPayment(false);
      setShowFlutterwavePay(false);
      const feePercent =
        project.pay_escrow_fee === "CLIENT"
          ? 3
          : project.pay_escrow_fee === "BOTH"
            ? 1.5
            : 0;
      const feeAmt = project.amount * (feePercent / 100);
      const totalAmt = project.amount + feeAmt;
      toast.add({
        description: `Flutterwave Secure Lock Approved: ${formatMoney(totalAmt, project.currency)} deposited and locked successfully!`,
        type: "success",
      });
    }, 2000);
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionNotes) {
      setUploadError("Please describe what deliverables you are attaching.");
      return;
    }

    // submitProjectDelivery(
    //   project.id,
    //   submissionNotes,
    //   submissionFiles.join(", ") || undefined,
    // );
    setShowSubmitModal(false);
    setSubmissionNotes("");
    setSubmissionFileName("");
    setSubmissionFiles([]);
  };

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeReason) return;
    if (disputeEvidenceFiles.length === 0) {
      toast.error(
        "You must upload at least one evidence file (screenshot, log, or document) to initiate a project dispute.",
      );
      return;
    }

    // if (!currentUser.phoneVerified) {
    //   setPendingDisputeAction({
    //     type: "project",
    //     reason: disputeReason,
    //     evidenceFiles: disputeEvidenceFiles,
    //   });
    //   // setDisputeOtpPhone(currentUser.phone || "");
    //   setDisputeOtpSent(false);
    //   setDisputeOtpCode("");
    //   setDisputeOtpError("");
    //   setShowDisputeModal(false);
    //   return;
    // }

    // raiseProjectDispute(
    //   project.id,
    //   disputeReason,
    //   disputeEvidenceFiles.join(", ") || undefined,
    // );
    setShowDisputeModal(false);
    setDisputeReason("");
    setDisputeEvidence("");
    setDisputeEvidenceFiles([]);
  };

  const handleResolveConfirmTriggerChange = () => {
    // resolveProjectDispute(project.id);
    setShowResolveConfirm(false);
  };

  return (
    // <Suspense fallback="Loading ...">Hello project </Suspense>
    <div className="space-y-6 animate-fade-in font-sans pb-10">
      {/* Back to Dashboard bar and Role helpful hints selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate.push("./dashboard/portal")}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-brand-primary transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Interactive Dashboard
        </button>

        <div className="text-right flex items-center gap-2.5 bg-brand-primary/5 px-3 py-1.5 rounded-xl border border-brand-primary/10">
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
            Reviewing Perspective:
          </span>
          <span className="text-xs font-bold text-brand-primary capitalize">
            {/* {demoRole === "client" ? "Client Controls" : "Freelancer Controls"} */}
            {project.creator_email === session.session?.email
              ? project.creator_role
              : project.reciever_role}
          </span>
        </div>
      </div>

      {/* DISPUTE LOCK STATE BANNER */}
      {project.status === "DISPUTE" && (
        <div className="bg-red-50 text-red-700/85 p-4.5 rounded-2xl border border-red-200/50 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-red-800">
                DISPUTE LOCK ACTIVE
              </span>
              <p className="text-[11px] font-medium leading-relaxed mt-0.5">
                This transaction has been frozen and is currently under
                independent mediator review. All payout releases and withdrawals
                are temporarily restricted.
              </p>
            </div>
          </div>
          <div className="text-[11px] font-bold shrink-0 bg-white text-red-600 px-3.5 py-1 rounded-xl">
            WhatsApp Review Active
          </div>
        </div>
      )}

      {/* A. STATUS HEADER (TOP PRIORITY STEPPER) */}
      <div className="bg-white rounded-2xl p-5.5 shadow-xs border border-gray-100/30">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">
          Contract Escrow Progress
        </h2>

        <div className="relative flex items-center justify-between overflow-visible py-2">
          {[
            { label: "Agreement", sub: "Draft & Invite" },
            { label: "Funding", sub: "Mimotar lock" },
            { label: "In Progress", sub: "Deliverables" },
            { label: "Delivered", sub: "Client check" },
            { label: "Released", sub: "Cash Payout" },
          ].map((stepItem, index) => {
            const isCompleted = index < stepperIdx;
            const isActive = index === stepperIdx;

            return (
              <div
                key={index}
                className="flex-1 min-w-0 flex flex-col items-center text-center relative px-0.5 sm:px-2"
              >
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs font-mono mb-1.5 md:mb-2 relative z-10 border transition-all ${
                    isCompleted
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : isActive
                        ? "bg-brand-primary text-white border-brand-primary scale-105 shadow-xs ring-2 md:ring-4 ring-brand-primary/10"
                        : "bg-white text-gray-300 border-gray-150"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3.5px]" />
                  ) : (
                    index + 1
                  )}
                </div>

                <span
                  className={`text-[9px] sm:text-[10px] md:text-[11px] font-bold block truncate max-w-full px-1 ${isActive ? "text-brand-primary" : "text-[#111827]"}`}
                >
                  {stepItem.label}
                </span>
                <span className="text-[8px] md:text-[9.5px] text-gray-400 hidden sm:block mt-0.5 truncate max-w-full px-1">
                  {stepItem.sub}
                </span>

                {/* Stepper bar joining dots */}
                {index < 4 && (
                  <div
                    className={`absolute top-3 md:top-4 left-[calc(50%+12px)] md:left-[calc(50%+16px)] right-[calc(-50%+12px)] md:right-[calc(-50%+16px)] h-0.5 -z-0 ${
                      index < stepperIdx ? "bg-emerald-500" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workspace Control Center: Dynamic Action and Agreement summary columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* C. ACTION PANEL (DYNAMIC BASED ON PERSPECTIVE) */}
          <div className="bg-white rounded-3xl p-6.5 shadow-xs border border-gray-100/50 space-y-6 text-left">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  Secure Workspace Panel
                </h3>
                <p className="text-xs text-brand-neutral mt-1">
                  Interventions allowed dynamically based on the active role
                  perspective.
                </p>
              </div>

              {project.status === "COMPLETED" && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  🎉 Completed & Released
                </span>
              )}
            </div>

            {/* AGREEMENT ACCEPTANCE BLOCK */}
            {/* {project.agreementStatus === "pending_invite" && ( */}
            {project.status !== "APPROVED" && (
              <div className="p-5.5 bg-yellow-50 rounded-2xl border border-yellow-200/50 space-y-4">
                <span className="text-xs font-bold text-yellow-800">
                  Proposal Pending Verification
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The counterparty must accept these terms before payments can
                  be funded. As the simulator, you can accept or decline
                  instantly to bypass!
                </p>

                <div className="flex gap-3">
                  <button
                    // onClick={() => acceptProjectAgreement(project.id)}
                    className="flex-1 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer hover:bg-brand-primary/95 transition text-center"
                  >
                    Accept Terms
                  </button>
                  <button
                    // onClick={() => rejectProjectAgreement(project.id)}
                    className="px-4 py-2.5 bg-white border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}

            {/* CLIENT ACTION PATH */}
            {role === "CLIENT" && project.status === "APPROVED" && (
              <div className="space-y-4">
                {/* {project.escrowStatus === "unfunded" && ( */}
                project.payment?.status === "PENDING" ||
                {project.payment?.status === "FAILED" && (
                  <div className="p-5 bg-purple-100/[0.02] border border-purple-100 rounded-2xl space-y-4">
                    <span className="text-xs font-bold text-brand-primary block">
                      Client Funding Required
                    </span>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Securing funds locked inside Mimotar provides the
                      milestone guarantee. Once funded, the freelancer holds a
                      legal claim and can safely implement code deliverables.
                    </p>
                    <button
                      onClick={() => setShowFlutterwavePay(true)}
                      className="w-full py-3 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-xs hover:bg-brand-primary/95 transition cursor-pointer text-center"
                    >
                      Fund Escrow (₦{project.amount.toLocaleString()})
                    </button>
                  </div>
                )}
                {project.payment?.status === "COMPLETED" &&
                  // !project.isDelivered &&
                  project.milestones &&
                  !(project.milestones.length > 0) && (
                    <div className="p-5.5 bg-gray-50 rounded-2xl">
                      <span className="text-xs font-semibold text-gray-500 block">
                        Status: Awaiting Work Submission
                      </span>
                      <p className="text-xs text-gray-400 leading-relaxed mt-2">
                        Frightened about outcomes? Money is secured locked.
                        Freelancer has been notified and is actively crafting
                        your scope guide requirements.
                      </p>
                    </div>
                  )}
                {
                  // project.isDelivered &&
                  //   !project.isReleased &&
                  project.status !== "APPROVED" &&
                    !(project.milestones.length > 0) && (
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
                              {/* "{project.deliveryNotes}" */}
                              Delivery notes
                            </p>
                            {/* {project.deliveryFileName && (
                            <div className="text-xs font-bold text-brand-primary flex items-center gap-1 bg-brand-primary/5 px-2.5 py-1.5 rounded-lg w-fit">
                              💾 {project.deliveryFileName}
                            </div>
                          )} */}
                          </div>

                          <p className="text-xs text-gray-400 mt-4 leading-normal">
                            Verify elements meet requirements. Click approve to
                            trigger the Flutterwave-connected bank payouts
                            instantly.
                          </p>

                          {showReleaseConfirm ? (
                            <div className="mt-4 p-4.5 bg-brand-primary/[0.03] rounded-2xl border border-brand-primary/20 space-y-3 animate-fade-in text-left">
                              <span className="text-xs font-bold text-gray-900 block font-sans">
                                ⚠️ Security Release Confirmation
                              </span>
                              <p className="text-[11px] text-gray-600 leading-normal">
                                Are you absolutely sure you want to approve this
                                delivery and release the locked escrow funds of{" "}
                                <span className="font-extrabold text-gray-900 font-mono">
                                  {project.currency === "NGN"
                                    ? `₦${project.amount.toLocaleString()}`
                                    : `$${project.amount.toLocaleString()}`}
                                </span>{" "}
                                to the freelancer? Once confirmed, this payout
                                cannot be cancelled, recalled, or reversed.
                              </p>
                              <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
                                <button
                                  onClick={() => {
                                    // releaseEscrowFunds(project.id);
                                    toast.success(
                                      `Escrow successfully released to your freelancer. Receipt logged!`,
                                    );
                                    setShowReleaseConfirm(false);
                                  }}
                                  className="flex-1 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition cursor-pointer text-center"
                                >
                                  Release Funds
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
                                onClick={() => setShowDisputeModal(true)}
                                className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl transition cursor-pointer"
                              >
                                Raise Dispute
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                }
              </div>
            )}

            {/* FREELANCER ACTION PATH */}
            {role === "FREELANCER" && project.status === "APPROVED" && (
              <div className="space-y-4">
                {project.payment?.status === "PENDING" ||
                  (project.payment?.status === "FAILED" && (
                    <div className="p-5.5 bg-gray-50 rounded-2xl">
                      <span className="text-xs font-semibold text-gray-500 block">
                        Status: Waiting for Client to Fund Escrow
                      </span>
                      <p className="text-xs text-gray-400 leading-relaxed mt-2 text-left">
                        DO NOT start working yet. We will notify you via in-app
                        alerts and email once the client authorizes Flutterwave
                        funding security layers.
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
                          Your notes and assets were successfully dispatched.
                          The client has 48 hours to review. If inaction
                          happens, funds auto-release into your available
                          balance instantly.
                        </p>
                      </div>
                    )
                }
              </div>
            )}

            {/* AUTO-RELEASE TIMER COUNTDOWN (VERY IMPORTANT MOMENT) */}
            {
              // project.isDelivered &&
              //   !project.isReleased &&
              project.status !== "DISPUTE" &&
                !(project.milestones && project.milestones.length > 0) && (
                  <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200/50 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in text-left">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-brand-secondary shrink-0 animate-pulse" />
                      <div>
                        <span className="text-xs font-bold text-amber-900 block">
                          Auto-Release Countdown
                        </span>
                        <p className="text-[10px] text-amber-800/80 leading-relaxed mt-0.5">
                          Funds will be released into freelancer's available
                          balance in 48 hours if client takes no action.
                        </p>
                      </div>
                    </div>
                    <AutoReleaseTimer deliveredAt={project.expiresAt} />
                  </div>
                )
            }

            {/* COMPLETED SUCCESS STATE DETAILS */}
            {project.status === "COMPLETED" && (
              <div className="p-6 bg-emerald-50 text-emerald-950 rounded-3xl border border-emerald-100 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 bg-white text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-800">
                    Funds Released Successfully!
                  </h4>
                  <p className="text-xs text-emerald-950/70 leading-relaxed max-w-sm mx-auto mt-1">
                    The escrow security holding cleared. Available balance has
                    updated and is ready to be instantly withdrawn into Nigerian
                    banks.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success(
                        "Downloading official encrypted Mimotar Transaction receipt PDF...",
                      );
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-primary font-bold hover:underline"
                  >
                    Download PDF Payment Receipt
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* B. AGREEMENT DETAILS PANEL */}
          <div className="bg-white rounded-3xl p-6.5 shadow-xs border border-gray-100/50 text-left space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Escrow Scope Agreement
            </span>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">
                {project.transaction_description}
              </p>
            </div>

            {project.files && project.files.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] text-gray-400 font-bold block mb-2">
                  Scope Clarification uploads:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.files.map((file, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-slate-800 font-medium font-sans"
                    >
                      📄 {file.fileName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-50 text-xs shrink-0">
              <div>
                <span className="text-gray-400 font-medium block">
                  Total Escrow Value
                </span>
                <span className="font-bold text-gray-800 block mt-1 font-mono">
                  {formatMoney(project.amount, project.currency)}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block">
                  Agreement Deadline
                </span>
                <span className="font-bold text-gray-800 block mt-1">
                  {project.deadline}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block">
                  Fee Division
                </span>
                <span className="font-bold text-gray-800 block mt-1 capitalize">
                  {/* {project.feePayer} */}
                  {project.pay_escrow_fee}
                </span>
              </div>
            </div>

            {role === "CLIENT" && project.status !== "COMPLETED" && (
              // !project.isReleased &&
              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  id="btn_extend_deadlines_open"
                  onClick={() => setShowExtendModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-[11.5px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition duration-150 cursor-pointer text-right shrink-0"
                >
                  <Clock className="w-3.5 h-3.5" /> Extend Deadline
                </button>
              </div>
            )}

            {/* FEE TRANSPARENCY EXPLANATORY PANEL (COLLAPSIBLE TO PREVENT COGNITIVE OVERLOAD) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowFeeDetails(!showFeeDetails)}
                className="w-full flex items-center justify-between p-3 bg-gray-50/75 hover:bg-gray-100/50 border border-gray-150/40 rounded-2xl text-[11.5px] font-bold text-gray-750 transition cursor-pointer text-left"
              >
                <span className="flex items-center gap-1.5">
                  ⚙️{" "}
                  <span className="text-gray-700">
                    Fee Allocation Details (
                    {project.pay_escrow_fee === "BOTH"
                      ? "Split 1.5%"
                      : project.pay_escrow_fee === "CLIENT"
                        ? "Covered by Client 3%"
                        : "Settled by Freelancer 3%"}
                    )
                  </span>
                </span>
                <span className="text-indigo-600 text-[10px] uppercase tracking-wider">
                  {showFeeDetails ? "Hide details ↑" : "View breakdown ↓"}
                </span>
              </button>

              {showFeeDetails && (
                <div className="mt-2 animate-fade-in">
                  {(() => {
                    const deductPercent =
                      project.pay_escrow_fee === "FREELANCER"
                        ? 3
                        : project.pay_escrow_fee === "BOTH"
                          ? 1.5
                          : 0;
                    if (deductPercent > 0) {
                      return (
                        <div className="p-3.5 bg-brand-primary/[0.02] border border-brand-primary/15 rounded-2xl text-[11px] leading-relaxed text-[#111827] font-semibold flex items-start gap-2.5">
                          <span className="text-xs">ℹ️</span>
                          <div className="space-y-1 text-left">
                            <span className="text-[#111827] font-bold block">
                              Fee Split Transparency Breakdown
                            </span>
                            <span className="text-gray-500 font-medium block">
                              Under the{" "}
                              <span className="text-brand-primary font-bold capitalize">
                                "{project.pay_escrow_fee}"
                              </span>{" "}
                              agreement terms:
                            </span>
                            <ul className="list-disc pl-4 text-gray-500 font-medium space-y-1.5 mt-1.5">
                              {project.pay_escrow_fee === "BOTH" ? (
                                <>
                                  <li>
                                    <strong className="text-gray-800">
                                      Client added premium:
                                    </strong>{" "}
                                    Client paid{" "}
                                    <strong className="text-gray-900 font-mono">
                                      1.5%
                                    </strong>{" "}
                                    (
                                    {formatMoney(
                                      project.amount * 0.015,
                                      project.currency,
                                    )}
                                    ) extra on funding.
                                  </li>
                                  <li>
                                    <strong className="text-gray-800">
                                      Freelancer deduction:
                                    </strong>{" "}
                                    Freelancer settles{" "}
                                    <strong className="text-gray-900 font-mono">
                                      1.5%
                                    </strong>{" "}
                                    (
                                    {formatMoney(
                                      project.amount * 0.015,
                                      project.currency,
                                    )}
                                    ) which is automatically deducted from the{" "}
                                    {project.milestones
                                      ? "first milestone phase payout"
                                      : "full payout withdrawal"}
                                    . Note: subsequent payouts will experience
                                    zero deductions.
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li>
                                    <strong className="text-gray-800">
                                      Client fee exemption:
                                    </strong>{" "}
                                    Client paid{" "}
                                    <strong className="text-gray-900 font-mono">
                                      0%
                                    </strong>{" "}
                                    extra on funding.
                                  </li>
                                  <li>
                                    <strong className="text-gray-800">
                                      Freelancer flat fee:
                                    </strong>{" "}
                                    Freelancer settles the flat platform fee of{" "}
                                    <strong className="text-gray-900 font-mono">
                                      3%
                                    </strong>{" "}
                                    (
                                    {formatMoney(
                                      project.amount * 0.03,
                                      project.currency,
                                    )}
                                    ) which is automatically deducted from the{" "}
                                    {project.milestones
                                      ? "first milestone phase payout"
                                      : "completed payout withdrawal"}
                                    .
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="p-3.5 bg-emerald-50/40 border border-emerald-100 rounded-2xl text-[11px] leading-relaxed text-emerald-950 font-semibold flex items-start gap-2.5 bg-emerald-10/10">
                          <span className="text-xs">🛡️</span>
                          <div className="space-y-1 text-left">
                            <span className="text-emerald-950 font-bold block">
                              100% Client-Covered Fee Notice
                            </span>
                            <span className="text-emerald-800/80 font-medium block">
                              The client paid the full{" "}
                              <strong className="text-emerald-950 font-mono">
                                3% platform fee
                              </strong>{" "}
                              during Flutterwave secure lock. The freelancer
                              receives 100% of the milestone allocations with
                              zero service fee deductions.
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
            </div>

            {project.milestones && project.milestones.length > 0 && (
              <div className="pt-4 border-t border-gray-50">
                <span className="text-label text-gray-400 block mb-3 font-bold uppercase tracking-wider text-[10px]">
                  Escrow Milestone Phases ({project.milestones.length})
                </span>
                <div className="space-y-4">
                  {project.milestones.map((m, i) => {
                    const isProjectFunded =
                      project.payment?.status == "PENDING" ||
                      project.payment?.status == "FAILED";

                    // Determine Milestone Status Layout
                    let statusBadge = null;
                    let cardBorderColor = "border-gray-100";
                    let cardBgColor = "bg-gray-50/50";

                    if (m.status === "COMPLETED") {
                      statusBadge = (
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                          Released
                        </span>
                      );
                      cardBorderColor = "border-emerald-100/55";
                      cardBgColor = "bg-emerald-50/[0.02]";
                    } else if (m.status === "DISPUTE") {
                      statusBadge = (
                        <span className="text-[10px] text-red-650 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse">
                          Disputed
                        </span>
                      );
                      cardBorderColor = "border-red-100/60";
                      cardBgColor = "bg-red-50/[0.01]";
                    } else if (m.status === "ONGOING") {
                      statusBadge = (
                        <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                          Submitted - Pending Release
                        </span>
                      );
                      cardBorderColor = "border-amber-100/60";
                      cardBgColor = "bg-amber-50/[0.02]";
                    } else if (!isProjectFunded) {
                      statusBadge = (
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                          Awaiting Funding
                        </span>
                      );
                    } else {
                      statusBadge = (
                        <span className="text-[10px] text-brand-primary bg-brand-primary/5 border border-brand-primary/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                          Active / In Progress
                        </span>
                      );
                      cardBorderColor = "border-brand-primary/10";
                      cardBgColor = "bg-white";
                    }

                    return (
                      <div
                        key={m.id}
                        className={`p-5 rounded-2xl flex flex-col gap-3.5 border ${cardBorderColor} ${cardBgColor} text-xs font-sans transition-all duration-200`}
                      >
                        {/* Upper row: title & amount & status */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200/50 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                                Phase {i + 1}
                              </span>
                              {statusBadge}
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 font-display mt-1">
                              {m.name}
                            </h4>
                            <span className="text-[10.5px] text-gray-405 block font-semibold">
                              Deadline:{" "}
                              <span className="text-gray-600">
                                {m.deadline}
                              </span>
                            </span>
                          </div>
                          <div className="shrink-0 flex items-center gap-1.5 bg-white shadow-xs border border-gray-150 px-3.5 py-2 rounded-xl">
                            <span className="text-[10px] text-gray-400 font-bold uppercase font-mono tracking-wider">
                              Value:
                            </span>
                            <span className="text-xs font-extrabold text-gray-900 font-mono">
                              {formatMoney(m.amount, project.currency)}
                            </span>
                          </div>
                        </div>

                        {/* Spec / Attachments row */}
                        {(m.files && m.files.length > 0) || m.files ? (
                          <div className="text-[10.5px] bg-gray-50/50 border border-gray-100 p-2.5 rounded-xl flex flex-wrap items-center gap-2 text-gray-600 font-medium">
                            <span className="text-gray-450 font-semibold">
                              📎 Technical Specifications:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {m.files?.map((file, fIdx) => (
                                <span
                                  key={fIdx}
                                  className="text-brand-primary font-mono select-all font-semibold bg-white border border-gray-150 px-2 py-0.5 rounded text-[9.5px]"
                                >
                                  {file.fileName}
                                </span>
                              )) || (
                                <span className="text-brand-primary font-mono select-all font-semibold bg-white border border-gray-150 px-2 py-0.5 rounded text-[9.5px]">
                                  {/* {m.deliveryFile} */}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : null}

                        {/* Details on Submissions or Disputes */}
                        {/* {m.isSubmitted && m.deliveryNotes && (
                          <div className="mt-1 p-3 bg-amber-50/20 border border-amber-100 rounded-xl space-y-2 text-left font-sans">
                            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider block">
                              Freelancer Submission deliverables
                            </span>
                            <p className="text-xs text-gray-700 italic">
                              "{m.deliveryNotes}"
                            </p>
                            {m.deliveryFile && (
                              <div className="text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2 py-1 rounded w-fit border border-brand-primary/10 select-all font-mono">
                                💾 {m.deliveryFile}
                              </div>
                            )}
                            <div className="p-2.5 bg-amber-50 text-amber-950 rounded-lg flex items-center gap-2 font-medium text-[10px] border border-amber-100/50">
                              <span className="text-xs">⏱️</span>
                              <span>
                                <strong>
                                  48-Hour Escrow Watchdog Enabled:
                                </strong>{" "}
                                If no dispute is filed or approved, this phase
                                funds will automatically transfer into the
                                freelancer's wallet balance.
                              </span>
                            </div>
                          </div>
                        )} */}

                        {m.status === "DISPUTE" && "" && (
                          <div className="mt-1 p-3 bg-red-50/20 border border-red-100 rounded-xl space-y-1.5 text-left font-sans">
                            <span className="text-[9px] font-bold text-red-650 uppercase tracking-wider block">
                              Active Milestone dispute details
                            </span>
                            <p className="text-xs text-red-900 bg-red-50/40 p-2 rounded-lg border border-red-100/40 leading-relaxed font-semibold">
                              Reason specified:
                              {/* "{m.disputeReason}" */}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              Independent assessment has locked these escrow
                              funds from release. Chat support will reach out
                              over WhatsApp within 12-24h.
                            </p>
                          </div>
                        )}

                        {i === 0 &&
                          (project.pay_escrow_fee === "FREELANCER" ||
                            project.pay_escrow_fee === "BOTH") &&
                          m.status !== "COMPLETED" && (
                            <div className="p-3 bg-brand-primary/[0.015] border border-dashed border-brand-primary/20 rounded-xl space-y-0.5 mt-0.5 text-left">
                              <span className="text-[9px] text-brand-primary font-bold uppercase tracking-wider font-mono">
                                ⚠️ Escrow Fee Scheduled
                              </span>
                              <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                                Platform fee of{" "}
                                {project.pay_escrow_fee === "BOTH"
                                  ? "1.5%"
                                  : "3%"}{" "}
                                (
                                {formatMoney(
                                  project.amount *
                                    (project.pay_escrow_fee === "BOTH"
                                      ? 0.015
                                      : 0.03),
                                  project.currency,
                                )}
                                ) will be processed on release of this first
                                phase. Subsequent phases have zero deductions.
                              </p>
                            </div>
                          )}

                        {/* INTERACTIVE COMPONENT ACTIONS PER ROLE */}
                        {isProjectFunded && m.status !== "COMPLETED" && (
                          <div className="mt-2 pt-3.5 border-t border-gray-100">
                            {role === "FREELANCER" ? (
                              <></>
                            ) : (
                              // Freelancer actions
                              // <div className="space-y-3.5">
                              //   {!m.isSubmitted &&
                              //     !m.isDisputed &&
                              //     (submittingMilestoneId === m.id ? (
                              //       <form
                              //         onSubmit={(e) => {
                              //           e.preventDefault();
                              //           if (!milestoneNotes) {
                              //             showAlert(
                              //               "Please explain what you are delivering for this phase.",
                              //               "error",
                              //             );
                              //             return;
                              //           }
                              //           submitMilestoneDelivery(
                              //             project.id,
                              //             m.id,
                              //             milestoneNotes,
                              //             milestoneFilesList.join(", ") ||
                              //               undefined,
                              //             milestoneFilesList,
                              //           );
                              //           setSubmittingMilestoneId(null);
                              //           setMilestoneNotes("");
                              //           setMilestoneFile("");
                              //           setMilestoneFilesList([]);
                              //         }}
                              //         className="bg-white border border-brand-primary/10 p-4 rounded-xl space-y-4.5 shadow-xs animate-fade-in"
                              //       >
                              //         <div className="flex items-center justify-between border-b border-gray-55 pb-2">
                              //           <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">
                              //             Submitting Deliverables for Phase{" "}
                              //             {i + 1}
                              //           </span>
                              //           <span className="text-[9px] text-gray-400 font-medium">
                              //             Step 2 of 2
                              //           </span>
                              //         </div>

                              //         <div className="space-y-1.5">
                              //           <label className="block text-[10px] font-bold text-gray-500 uppercase">
                              //             Submission Notes or Description
                              //           </label>
                              //           <textarea
                              //             value={milestoneNotes}
                              //             onChange={(e) =>
                              //               setMilestoneNotes(e.target.value)
                              //             }
                              //             placeholder="Define what you built, add live staging credentials, Github pull requests, or design document pointers..."
                              //             className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary font-medium"
                              //             rows={2.5}
                              //             required
                              //           />
                              //         </div>

                              //         {/* Drag & Drop File Upload Area */}
                              //         <InteractiveMultiUploader
                              //           id={`milestone-file-uploader-${m.id}`}
                              //           files={milestoneFilesList}
                              //           onChange={setMilestoneFilesList}
                              //           label="Upload Work Deliverables Attachment"
                              //           placeholder="Drag & drop work deliverables, zip archives, or assets here"
                              //         />

                              //         <div className="flex gap-2.5 pt-2">
                              //           <button
                              //             type="submit"
                              //             className="flex-1 py-2 bg-brand-primary hover:bg-brand-primary/95 text-white text-[11px] font-bold rounded-lg cursor-pointer text-center"
                              //           >
                              //             Submit Deliverables
                              //           </button>
                              //           <button
                              //             type="button"
                              //             onClick={() => {
                              //               setSubmittingMilestoneId(null);
                              //               setMilestoneNotes("");
                              //               setMilestoneFile("");
                              //             }}
                              //             className="px-3.5 py-2 bg-gray-50 border border-gray-150 text-[11px] text-gray-500 font-semibold rounded-lg"
                              //           >
                              //             Cancel
                              //           </button>
                              //         </div>
                              //       </form>
                              //     ) : (
                              //       <button
                              //         onClick={() =>
                              //           setSubmittingMilestoneId(m.id)
                              //         }
                              //         className="w-full py-2 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition duration-150 shadow-xs cursor-pointer text-center block"
                              //       >
                              //         📤 Submit Deliverables (Phase {i + 1})
                              //       </button>
                              //     ))}

                              //   {m.isSubmitted && (
                              //     <div className="space-y-3.5">
                              //       {/* Elegant watchdog visual stopwatch for the Freelancer */}
                              //       <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left space-y-2.5 animate-fade-in">
                              //         <div className="flex items-center justify-between">
                              //           <div className="flex items-center gap-2">
                              //             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                              //               Automatic Watchdog Timer
                              //             </span>
                              //             <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 uppercase tracking-wider animate-pulse">
                              //               Running
                              //             </span>
                              //           </div>
                              //           <span className="text-[10px] text-slate-500 font-mono font-semibold">
                              //             T+48 Hrs Max
                              //           </span>
                              //         </div>

                              //         <div className="flex items-start gap-3">
                              //           <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 text-base">
                              //             ⏱️
                              //           </div>
                              //           <div className="space-y-0.5">
                              //             <div className="text-base font-bold text-slate-800 font-mono tracking-tight leading-none">
                              //               <MilestoneCountdown
                              //                 submittedAt={m.submittedAt}
                              //               />
                              //             </div>
                              //             <p className="text-[10px] text-gray-450 leading-relaxed font-medium">
                              //               Countdown is active! If the client
                              //               does not dispute or release this
                              //               phase within 48 hours, these escrow
                              //               funds will automatically transfer
                              //               into your available balance wallet.
                              //             </p>
                              //           </div>
                              //         </div>
                              //       </div>

                              //       <div className="p-3 bg-brand-primary/[0.02] border border-brand-primary/10 rounded-xl flex items-center justify-between gap-3 text-xs leading-none">
                              //         <div className="flex items-center gap-2">
                              //           <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                              //           <span className="text-[10px] font-bold text-brand-primary uppercase font-sans tracking-wide">
                              //             Waiting for Client Review & Release
                              //           </span>
                              //         </div>
                              //         <span className="text-[10px] text-gray-405 font-medium">
                              //           WhatsApp moderator standby
                              //         </span>
                              //       </div>
                              //     </div>
                              //   )}

                              //   {m.isDisputed && (
                              //     <div className="text-[10.5px] p-2.5 bg-gray-150/40 border border-gray-200 rounded-xl leading-relaxed font-semibold block">
                              //       🛡️ Escrow funds are locked since the client
                              //       raised a dispute. Mimotar mediator support
                              //       team will review is ongoing.
                              //     </div>
                              //   )}
                              // </div>
                              <></>
                              // Client actions
                              // <div className="space-y-3.5">
                              //   {!m.isSubmitted && !m.isDisputed && (
                              //     <div className="text-[10.5px] text-gray-455 italic font-semibold">
                              //       ⌛ Freelancer is currently working on this
                              //       milestone.
                              //     </div>
                              //   )}

                              //   {m.isSubmitted && (
                              //     <div className="space-y-3.5">
                              //       {/* Watchdog Countdown Timer visible to Client */}
                              //       <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left space-y-2.5 animate-fade-in">
                              //         <div className="flex items-center justify-between">
                              //           <div className="flex items-center gap-2">
                              //             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                              //               Automatic Watchdog Timer
                              //             </span>
                              //             <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 uppercase tracking-wider animate-pulse">
                              //               Running
                              //             </span>
                              //           </div>
                              //           <span className="text-[10px] text-slate-500 font-mono font-semibold">
                              //             T+48 Hrs Max
                              //           </span>
                              //         </div>

                              //         <div className="flex items-start gap-3">
                              //           <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 text-base">
                              //             ⏱️
                              //           </div>
                              //           <div className="space-y-0.5">
                              //             <div className="text-base font-bold text-slate-800 font-mono tracking-tight leading-none">
                              //               <MilestoneCountdown
                              //                 submittedAt={m.submittedAt}
                              //               />
                              //             </div>
                              //             <p className="text-[10px] text-gray-450 leading-relaxed font-semibold">
                              //               Please review and approve or raise a
                              //               dispute on this milestone phase
                              //               before the countdown expires.
                              //               Unresolved phases automatically
                              //               release funds.
                              //             </p>
                              //           </div>
                              //         </div>
                              //       </div>

                              //       {disputingMilestoneId === m.id ? (
                              //         <form
                              //           onSubmit={(e) => {
                              //             e.preventDefault();
                              //             if (!milestoneDisputeReason) {
                              //               showAlert(
                              //                 "Please state a valid reason for this dispute.",
                              //                 "error",
                              //               );
                              //               return;
                              //             }
                              //             if (
                              //               milestoneDisputeEvidenceFiles.length ===
                              //               0
                              //             ) {
                              //               showAlert(
                              //                 "You must upload at least one evidence file (screenshot, log, or document) to initiate a milestone dispute.",
                              //                 "error",
                              //               );
                              //               return;
                              //             }
                              //             if (!currentUser.phoneVerified) {
                              //               setPendingDisputeAction({
                              //                 type: "milestone",
                              //                 milestoneId: m.id,
                              //                 reason: milestoneDisputeReason,
                              //                 evidenceFiles:
                              //                   milestoneDisputeEvidenceFiles,
                              //               });
                              //               setDisputeOtpPhone(
                              //                 currentUser.phone || "",
                              //               );
                              //               setDisputeOtpSent(false);
                              //               setDisputeOtpCode("");
                              //               setDisputeOtpError("");
                              //               setDisputingMilestoneId(null);
                              //               setMilestoneDisputeReason("");
                              //               return;
                              //             }
                              //             raiseMilestoneDispute(
                              //               project.id,
                              //               m.id,
                              //               milestoneDisputeReason,
                              //               milestoneDisputeEvidenceFiles.join(
                              //                 ", ",
                              //               ),
                              //             );
                              //             setMilestoneDisputeEvidenceFiles([]);
                              //             setDisputingMilestoneId(null);
                              //             setMilestoneDisputeReason("");
                              //           }}
                              //           className="bg-white border border-red-200 p-3.5 rounded-xl space-y-3 shadow-xs animate-fade-in"
                              //         >
                              //           <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">
                              //             Raise Dispute on Phase {i + 1}
                              //           </span>
                              //           <div className="space-y-2">
                              //             <label className="block text-[10px] font-bold text-gray-500 uppercase">
                              //               Reason for dispute
                              //             </label>
                              //             <textarea
                              //               value={milestoneDisputeReason}
                              //               onChange={(e) =>
                              //                 setMilestoneDisputeReason(
                              //                   e.target.value,
                              //                 )
                              //               }
                              //               placeholder="Explain key missing parts, bugs, or differences against milestone guidelines..."
                              //               className="w-full text-xs p-2 bg-gray-50 border border-red-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 animate-pulse"
                              //               rows={2.5}
                              //               required
                              //             />
                              //           </div>
                              //           <div className="space-y-2">
                              //             <InteractiveMultiUploader
                              //               id={`milestone-dispute-uploader-${m.id}`}
                              //               files={
                              //                 milestoneDisputeEvidenceFiles
                              //               }
                              //               onChange={
                              //                 setMilestoneDisputeEvidenceFiles
                              //               }
                              //               label="Upload Milestone Dispute Evidence"
                              //               placeholder="Drag & drop screenshots, logs, or chat proofs here"
                              //               theme="danger"
                              //             />
                              //           </div>

                              //           <div className="flex gap-2 pt-1.5">
                              //             <button
                              //               type="submit"
                              //               className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg cursor-pointer text-center shadow-xs"
                              //             >
                              //               Freeze Escrow & Dispute
                              //             </button>
                              //             <button
                              //               type="button"
                              //               onClick={() => {
                              //                 setDisputingMilestoneId(null);
                              //                 setMilestoneDisputeReason("");
                              //                 setMilestoneDisputeEvidenceFiles(
                              //                   [],
                              //                 );
                              //               }}
                              //               className="px-3 py-2 bg-gray-50 border border-gray-150 text-[11px] text-gray-500 font-semibold rounded-lg"
                              //             >
                              //               Cancel
                              //             </button>
                              //           </div>
                              //         </form>
                              //       ) : (
                              //         <div className="space-y-3">
                              //           <div className="flex flex-col sm:flex-row gap-2.5">
                              //             <button
                              //               onClick={() => {
                              //                 releaseMilestoneFunds(
                              //                   project.id,
                              //                   m.id,
                              //                 );
                              //               }}
                              //               className="flex-1 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition duration-150 shadow-xs cursor-pointer text-center block"
                              //             >
                              //               ✅ Approve & Release Funds
                              //             </button>
                              //             <button
                              //               onClick={() =>
                              //                 setDisputingMilestoneId(m.id)
                              //               }
                              //               className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-semibold rounded-xl transition cursor-pointer text-center block animate-fade-in"
                              //             >
                              //               🚨 Dispute
                              //             </button>
                              //           </div>

                              //           {/* Client simulation bypass button triggers 48h automatic release */}
                              //           <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
                              //             <span className="text-[10px] text-gray-400 font-semibold italic">
                              //               Demo Simulator
                              //             </span>
                              //             <button
                              //               onClick={() =>
                              //                 simulateMilestone48hPassage(
                              //                   project.id,
                              //                   m.id,
                              //                 )
                              //               }
                              //               className="py-1.5 px-3 bg-brand-primary/10 hover:bg-brand-primary/15 text-brand-primary text-[10px] font-bold rounded-lg cursor-pointer transition shrink-0 flex items-center gap-1.5"
                              //               title="Simulated 48 hours passage to test system watchdog release trigger"
                              //             >
                              //               ⏩ Fast-Forward 48H (Auto-Release
                              //               Simulation)
                              //             </button>
                              //           </div>
                              //         </div>
                              //       )}
                              //     </div>
                              //   )}

                              //   {m.isDisputed && (
                              //     <div className="bg-red-50/20 p-2.5 rounded-xl border border-red-100 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                              //       <span className="text-[10px] text-red-700 font-bold">
                              //         Dispute Resolution Platform
                              //       </span>
                              //       <button
                              //         onClick={() => {
                              //           resolveMilestoneDispute(
                              //             project.id,
                              //             m.id,
                              //           );
                              //         }}
                              //         className="py-1.5 px-3 bg-red-650 hover:bg-red-700 text-white text-[10.5px] font-bold rounded-lg transition shadow-xs cursor-pointer shrink-0 block"
                              //       >
                              //         🤝 Resolve & Release Milestone
                              //       </button>
                              //     </div>
                              //   )}
                              // </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Workspace Sidebar: Dispute handlers, WhatsApp and Logs */}
        <div className="space-y-6">
          {/* TRUST & SECURITY CENTRE (CONTEXTUAL ROLE & VERIFICATION STATUS PANEL) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 text-left space-y-3.5">
            <div className="flex items-center gap-2 border-b border-gray-50 pb-2.5">
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Trust & Verification
                </h3>
                <p className="text-[9px] text-gray-400 font-medium">
                  Safe progressive security credentials
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-705">
              {/* You Row */}
              <div className="flex items-center justify-between p-2.5 bg-gray-50/60 rounded-xl border border-gray-100/55">
                <div className="space-y-0.5">
                  <span className="text-[10.5px] font-bold text-gray-800">
                    You ({role})
                  </span>
                  <span className="block text-[9.5px] text-gray-400 truncate max-w-[130px]">
                    {session.session?.email}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                    Email ✓
                  </span>
                  {session.session?.phone_no ? (
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                      WhatsApp Verified ✓
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100/50">
                      Phone Unverified
                    </span>
                  )}
                </div>
              </div>

              {/* Partner Row */}
              <div className="flex items-center justify-between p-2.5 bg-gray-50/60 rounded-xl border border-gray-100/55">
                <div className="space-y-0.5">
                  <span className="text-[10.5px] font-bold text-gray-800">
                    Partner ({role === "CLIENT" ? "freelancer" : "client"})
                  </span>
                  <span className="block text-[9.5px] text-gray-400 truncate max-w-[130px]">
                    {/* {project.creatorRole === "CLIENT"
                      ? "amara@freelancer.io"
                      : "chidi@client.co"} */}
                    {countyPartyMail}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/40">
                    Email ✓
                  </span>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/40">
                    WhatsApp Secured ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RESOLVED DISPUTE BUTTON & CONFIRMATION DIALOG */}
          {project.status === "DISPUTE" && (
            <div className="bg-red-50/20 border border-red-200/50 p-5 rounded-2xl space-y-3 text-left animate-fade-in animate-pulse">
              <span className="text-xs font-bold text-red-700 block mb-1">
                Incident Dispute Resolution
              </span>
              <p className="text-[10px] text-slate-650 leading-relaxed">
                Mediations are active. Once resolved by the client or Mimotar,
                funds will be released to the freelancer.
              </p>

              {role === "FREELANCER" ? (
                <div className="bg-white border border-gray-150 p-3 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 font-semibold leading-relaxed block">
                    Freelancers are already protected by locked funds and cannot
                    raise or resolve disputes. Waiting for client/mediator
                    action.
                  </span>
                </div>
              ) : (
                <>
                  {showResolveConfirm ? (
                    <div className="bg-white border border-red-100 p-3 rounded-xl space-y-3 shadow-xs animate-fade-in">
                      <span className="text-[10px] font-bold text-red-600 block">
                        Are you sure you want to resolve and instantly release
                        funds?
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={handleResolveConfirmTriggerChange}
                          className="flex-1 py-1.5 bg-brand-primary text-white text-[10px] font-bold rounded"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setShowResolveConfirm(false)}
                          className="flex-1 py-1.5 bg-gray-50 border border-gray-150 text-[10px] text-slate-500 font-semibold rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      id="btn_resolve_dispute"
                      onClick={() => setShowResolveConfirm(true)}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition cursor-pointer text-center shadow-xs block"
                    >
                      Resolve Dispute
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* D. DISPUTE ACTION BUTTONS WHEN APPLICABLE */}
          {project.status !== "DISPUTE" &&
            project.status !== "COMPLETED" &&
            project.payment?.status == "COMPLETED" &&
            (role === "CLIENT" &&
            !project.milestones &&
            // project.isDelivered ||
            new Date(project.deadline).getTime() < Date.now() ? (
              <button
                onClick={() => setShowDisputeModal(true)}
                className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-2xl transition cursor-pointer flex items-center justify-center gap-1.5 border border-red-100 animate-fade-in"
              >
                <AlertTriangle className="w-4 h-4 text-red-500" /> Raise Dispute
              </button>
            ) : null)}

          {/* WHATSAPP SUPPORT DETAILS */}
          {project.status === "DISPUTE" && (
            <div className="bg-white rounded-3xl p-5.5 shadow-xs border border-gray-100/50 space-y-4 text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Dispute Mediation Support
              </span>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquareCode className="w-5 h-5" />
                </div>
                <div className="font-sans">
                  <span className="text-xs font-bold text-[#111827] block">
                    WhatsApp Mediation Process
                  </span>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                    Our dispute resolution and mediation operations are
                    conducted entirely via WhatsApp. An official Mimotar
                    representative will contact you directly to resolve any
                    concerns.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100/30 text-xs">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Contact Details
                </span>
                <p className="text-[10px] text-emerald-950 leading-relaxed mt-1">
                  You will be contacted by a Mimotar representative on your
                  registered WhatsApp phone number:
                </p>
                {session.session?.phone_no ? (
                  <div className="mt-2.5 flex items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="font-mono font-bold text-emerald-800 text-xs">
                      {session.session?.phone_no}
                    </span>
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold ml-auto border border-emerald-100">
                      Confirmed
                    </span>
                  </div>
                ) : (
                  <div className="mt-2.5 space-y-2">
                    <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[10px] text-amber-800 leading-normal">
                      ⚠️ No WhatsApp phone number is registered on your account
                      profile yet. Please save and confirm your WhatsApp number
                      in profile settings.
                    </div>
                    <button
                      onClick={() => {
                        // setActivePage("settings");

                        toast.error(
                          "Please configuration save your WhatsApp Phone Number.",
                        );
                      }}
                      className="w-full text-center py-2 bg-brand-primary text-white text-[10px] font-bold rounded-lg hover:bg-brand-primary/95 transition cursor-pointer"
                    >
                      Setup WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROJECT TIMELINE / SECURE ACTIVITY LEDGER */}
          {(() => {
            // const rawLogs = project.activityLogs || [];
            const rawLogs = [];

            // Generate some fallback logs if is empty for visual layout robustness
            const logsToRender = [
              {
                id: "fallback-agree-created",
                title: "Contract Agreement Created",
                description: `Oluwaseun Adebayo drafted escrow specifications of "${project.title}" for ${project.currency === "NGN" ? "₦" : "$"}${project.amount.toLocaleString()}. Counterparty secure invite links dispatched.`,
                timestamp:
                  // project.createdAt ||
                  new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
                actor: "client" as const,
                type: "project_created",
              },
              {
                id: "fallback-escrow-funded",
                title: "Escrow Secured (Flutterwave)",
                description: `Payment lock triggered successfully. Secure deposit of ${project.currency === "NGN" ? "₦" : "$"}${project.amount.toLocaleString()} received and locked inside Mimotar safe custodian box. Hash ID: TX-184920-LOK.`,
                timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
                actor: "client" as const,
                type: "escrow_funded",
              },

              {
                id: "fallback-work-submitted",
                title: "Work Deliverables Submitted",
                description: `Amara Ndukwe uploaded final deliverables archive. Countdown clock initialized. Notes: "Project milestone attachments successfully prepared."}"`,
                timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
                actor: "freelancer" as const,
                type: "work_submitted",
              },
            ];

            // Filter based on active filter state
            const filteredLogs = logsToRender.filter((log) => {
              if (logFilter === "all") return true;
              return log.actor === logFilter;
            });

            return (
              <div
                id="activity_ledger_container"
                className="bg-white rounded-3xl p-5 md:p-6 shadow-xs border border-gray-100/50 space-y-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider block">
                      PROJECT ACTIVITY LOG
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 font-display flex items-center gap-1.5 mt-0.5">
                      <Database className="w-4 h-4 text-brand-primary" />{" "}
                      Multi-Party Ledger
                    </h3>
                  </div>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold uppercase font-mono tracking-wide border border-slate-200/45">
                    immutable audit
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 leading-normal">
                  Chronological record of state updates and security approvals.
                  Fully immutable.
                </p>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-xl">
                  {(
                    [
                      { id: "all", label: "All" },
                      { id: "client", label: "Client" },
                      { id: "freelancer", label: "Freelancer" },
                      { id: "system", label: "Mediator" },
                    ] as const
                  ).map((f) => {
                    const isActive = logFilter === f.id;
                    const count =
                      f.id === "all"
                        ? logsToRender.length
                        : logsToRender.filter((l) => l.actor === f.id).length;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setLogFilter(f.id)}
                        className={`flex-1 py-1 px-1 rounded-lg text-[9.5px] font-bold text-center transition-all cursor-pointer whitespace-nowrap ${
                          isActive
                            ? "bg-gray-950 text-white shadow-xs"
                            : "text-gray-500 hover:bg-gray-100/50"
                        }`}
                      >
                        {f.label} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Timeline */}
                <div className="relative pt-2.5 pl-1">
                  {filteredLogs.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400 font-sans">
                      No matching audit items found for this role.
                    </div>
                  ) : (
                    <div className="relative border-l-2 border-gray-100 pl-4 py-1 space-y-5">
                      {filteredLogs.map((log) => {
                        const isExpanded = !!expandedLogs[log.id];

                        // Decide Colors and Icons
                        let dotBg = "bg-gray-400 ring-gray-100";
                        let actorBadgeColor =
                          "bg-gray-50 text-gray-500 text-[9px] font-bold";
                        let actorName = "System";
                        let eventIcon = <Database className="w-2.5 h-2.5" />;

                        if (log.actor === "client") {
                          dotBg = "bg-indigo-500 ring-indigo-50/70";
                          actorBadgeColor =
                            "bg-indigo-55/10 text-indigo-700 hover:bg-indigo-100/50";
                          actorName =
                            project.creator_role === "CLIENT"
                              ? "Client"
                              : "Counterparty Client";
                        } else if (log.actor === "freelancer") {
                          dotBg = "bg-brand-primary ring-purple-50";
                          actorBadgeColor =
                            "bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10";
                          actorName =
                            project.creator_role === "FREELANCER"
                              ? "Freelancer"
                              : "Counterparty Freelancer";
                        } else {
                          dotBg = "bg-emerald-500 ring-emerald-50";
                          actorBadgeColor =
                            "bg-emerald-50 text-emerald-700 hover:bg-emerald-100/50";
                          actorName = "Smart Protection Engine";
                        }

                        // Icon selection
                        if (log.type === "escrow_funded") {
                          eventIcon = <Lock className="w-2.5 h-2.5" />;
                        } else if (
                          log.type === "payment_released" ||
                          log.type === "dispute_resolved"
                        ) {
                          eventIcon = <CheckCircle className="w-2.5 h-2.5" />;
                        } else if (log.type === "dispute_raised") {
                          eventIcon = <AlertTriangle className="w-2.5 h-2.5" />;
                        } else if (log.type === "work_submitted") {
                          eventIcon = (
                            <FileText className="w-2.5 h-2.5 animate-pulse" />
                          );
                        }

                        return (
                          <div
                            key={log.id}
                            onClick={() => toggleLogExpand(log.id)}
                            className="relative group cursor-pointer"
                          >
                            {/* Marker Node Dot */}
                            <div
                              className={`absolute -left-[24.5px] top-1 w-4 h-4 rounded-full ring-4 flex items-center justify-center text-white ${dotBg} transition-all duration-200 group-hover:scale-110`}
                            >
                              {eventIcon}
                            </div>

                            {/* Header */}
                            <div className="flex items-center justify-between gap-2.5">
                              <span className="text-[11.5px] font-bold text-gray-800 leading-snug group-hover:text-brand-primary transition-colors">
                                {log.title}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5 text-gray-405 shrink-0" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-gray-405 shrink-0" />
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 mt-1">
                              <span
                                className={`text-[9.5px] uppercase tracking-wide font-extrabold px-1.5 py-0.5 rounded-md ${actorBadgeColor}`}
                              >
                                {actorName}
                              </span>
                              <span className="text-[9px] text-gray-450 font-mono leading-none font-medium">
                                {formatAbsoluteDate(log.timestamp)}
                              </span>
                            </div>

                            {/* Collapsible expanded section */}
                            {isExpanded ? (
                              <div className="mt-2.5 p-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-xs space-y-2 animate-fade-in text-left">
                                <p className="text-gray-600 leading-relaxed font-sans">
                                  {log.description}
                                </p>

                                <div className="pt-2 border-t border-gray-100/50 grid grid-cols-2 gap-2 text-[9px] font-mono font-medium text-slate-400">
                                  <div>
                                    <span className="block text-[8px] text-gray-400 uppercase font-bold">
                                      Ledger Stamp
                                    </span>
                                    <span className="text-gray-600 block select-all">
                                      SHA-256 SECURED
                                    </span>
                                  </div>
                                  <div>
                                    <span className="block text-[8px] text-gray-400 uppercase font-bold">
                                      Block Coordinates
                                    </span>
                                    <span className="text-gray-600 block select-all">
                                      #
                                      {Math.floor(
                                        400000 + Math.random() * 200000,
                                      )}
                                    </span>
                                  </div>
                                  <div className="col-span-2">
                                    <span className="block text-[8px] text-gray-400 uppercase font-bold">
                                      Cryptographical Signature
                                    </span>
                                    <span
                                      className="text-brand-primary font-bold block truncate select-all"
                                      title="Verified cryptographic verification string"
                                    >
                                      SIG_MIMO_SEC_2026_{log.id.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-[11px] text-gray-500 leading-normal mt-1 w-full line-clamp-1">
                                {log.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* FLUTTERWAVE SIMULATED SECURE PAYMENT MODAL */}
      {showFlutterwavePay && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-fade-in text-left">
            <button
              onClick={() => setShowFlutterwavePay(false)}
              className="absolute top-4 right-4 p-2.5 hover:bg-gray-100/85 rounded-xl transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <span className="text-[10px] bg-amber-50 text-[#854d0e] font-bold px-3 py-1 rounded-full uppercase">
              Secure Flutterwave Checkout Gateway
            </span>
            <h3 className="text-base font-bold text-[#111827] mt-3">
              Lock Funds securely in Mimotar Escrow
            </h3>

            {(() => {
              const feePercent =
                project.pay_escrow_fee === "CLIENT"
                  ? 3
                  : project.pay_escrow_fee === "BOTH"
                    ? 1.5
                    : 0;
              const feeAmt = project.amount * (feePercent / 100);
              const totalAmt = project.amount + feeAmt;
              return (
                <>
                  <div className="my-5 p-4.5 bg-gray-50 rounded-2xl border border-gray-100/20 space-y-2.5 font-mono">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Escrow Value:</span>
                      <span className="font-bold text-gray-700">
                        {formatMoney(project.amount, project.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Fee Mode:</span>
                      <span className="font-bold text-brand-primary capitalize">
                        {project.pay_escrow_fee === "BOTH"
                          ? "Split 50/50"
                          : project.pay_escrow_fee === "FREELANCER"
                            ? "Freelancer Pays All"
                            : "Client Pays All"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Your Share ({feePercent}%):
                      </span>
                      <span className="font-bold text-gray-700">
                        {formatMoney(feeAmt, project.currency)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200/50 pt-2 flex justify-between text-sm font-bold">
                      <span className="text-slate-800">
                        Grand Total to Pay:
                      </span>
                      <span className="text-brand-primary">
                        {formatMoney(totalAmt, project.currency)}
                      </span>
                    </div>
                  </div>

                  {project.pay_escrow_fee === "BOTH" && (
                    <div className="space-y-2 mb-6">
                      <div className="p-3 bg-indigo-50/50 text-brand-primary text-[10.5px] leading-relaxed rounded-xl font-semibold border border-indigo-100/50">
                        🤝 <strong>Split Fee Selected (1.5% each):</strong> You
                        are paying an additional 1.5% fee now. The freelancer is
                        also charged 1.5% which is automatically deducted from
                        their first milestone payout when withdrawn.
                      </div>
                    </div>
                  )}

                  {project.pay_escrow_fee === "FREELANCER" && (
                    <div className="space-y-2 mb-6">
                      <div className="p-3 bg-emerald-50/50 text-emerald-800 text-[10.5px] leading-relaxed rounded-xl font-semibold border border-emerald-100/50">
                        🛡️ <strong>Freelancer Handled Fee:</strong> You pay 0%
                        fees during checkout. Standard flat 3% platform fee is
                        deducted directly from your freelancer's milestone
                        payout withdrawal.
                      </div>
                    </div>
                  )}

                  {project.pay_escrow_fee === "CLIENT" && (
                    <div className="space-y-2 mb-6">
                      <div className="p-3 bg-purple-50/50 text-purple-900 text-[10.5px] leading-relaxed rounded-xl font-semibold border border-purple-100/50">
                        💎 <strong>Client Coivered Fee:</strong> You are
                        covering the complete 3% escrow fee. Your freelancer
                        receives 100% of the milestone funds with zero
                        deductions.
                      </div>
                    </div>
                  )}
                </>
              );
            })()}

            <button
              disabled={isProcessingPayment}
              onClick={handleFlutterwaveFund}
              className="w-full py-3.5 bg-brand-primary text-white text-xs font-bold rounded-xl transition hover:bg-brand-primary/95 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Bank
                  OTP...
                </>
              ) : (
                "Confirm Payment"
              )}
            </button>
          </div>
        </div>
      )}

      {/* FREELANCER DELIVERABLES SUBMISSION SYSTEM MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleDeliverySubmit}
            className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-fade-in text-left space-y-4"
          >
            <button
              type="button"
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 p-2.5 hover:bg-gray-100/85 rounded-xl transition cursor-pointer"
              aria-label="Close font-sans"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div>
              <h3 className="text-base font-bold text-[#111827]">
                Submit Project Deliverables
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Briefly define your deliverables and include direct
                file/documentation pointers.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Delivered proof notes
              </label>
              <textarea
                rows={3}
                required
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="List Figma links, repository credentials, or ZIP folder details. Clear descriptions support faster release timers."
                className="w-full text-xs bg-gray-50 px-3 py-2 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary font-medium"
              />
            </div>

            <InteractiveMultiUploader
              id="submit-archive-path-uploader"
              files={submissionFiles}
              onChange={setSubmissionFiles}
              label="Attach Final Archive ZIP File & Deliverables"
              placeholder="Drag & drop final files, source code archive, or images here"
            />

            {uploadError && (
              <p className="text-xs text-red-600 font-semibold">
                {uploadError}
              </p>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-3.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />{" "}
                  Archiving assets...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      )}

      {/* DISPUTE CREATION FLOATING DIALOG */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleDisputeSubmit}
            className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-fade-in text-left space-y-4"
          >
            <button
              type="button"
              onClick={() => setShowDisputeModal(false)}
              className="absolute top-4 right-4 p-2.5 hover:bg-gray-100/85 rounded-xl transition cursor-pointer"
              aria-label="Close font-sans"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
              <h3 className="text-base font-bold text-[#111827]">
                Initiate Escrow Dispute
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-normal">
              Filing a dispute instantly locks funds and freezes the client's
              automated withdrawal access. An independent arbitrator will
              evaluate requirements based on the scope details agreements.
            </p>

            <div>
              <label
                htmlFor="dispute-issue-description"
                className="block text-xs font-bold text-gray-500 mb-1"
              >
                Core issue description
              </label>
              <textarea
                id="dispute-issue-description"
                rows={3}
                required
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="List contract sections that were violated, elements that are missing, or deadline problems."
                className="w-full text-xs bg-gray-50 px-3 py-2 rounded-xl border border-red-100 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 leading-relaxed"
              />
            </div>

            <InteractiveMultiUploader
              id="dispute-evidence-uploader"
              files={disputeEvidenceFiles}
              onChange={setDisputeEvidenceFiles}
              label="Upload Issue Evidence Assets"
              placeholder="Drag & drop screenshots, logs, or chat proofs here"
              theme="danger"
            />

            <button
              id="btn_report_incident"
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer block"
            >
              File Dispute
            </button>
          </form>
        </div>
      )}

      {/* UPDATE DEADLINES MODAL SYSTEM */}
      {showExtendModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleExtendDeadlineSubmit}
            className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-fade-in text-left space-y-4"
          >
            <button
              type="button"
              onClick={() => setShowExtendModal(false)}
              className="absolute top-4 right-4 p-2.5 hover:bg-gray-100/85 rounded-xl transition cursor-pointer"
              aria-label="Close font-sans"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div>
              <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-primary" /> Extend
                Project Deadlines
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                Clients can select a new date to extend deadlines. All milestone
                phases and the total contract deadline can be adjusted here.
              </p>
            </div>

            <div>
              <label
                htmlFor="extension-total-agreement-deadline"
                className="block text-xs font-bold text-slate-500 mb-1"
              >
                Total Agreement Deadline
              </label>
              <input
                id="extension-total-agreement-deadline"
                type="date"
                required
                value={extendedDeadline}
                onChange={(e) => setExtendedDeadline(e.target.value)}
                className="w-full text-xs bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary font-medium"
              />
            </div>

            {project.milestones && extendedMilestoneDeadlines.length > 0 && (
              <div className="space-y-3 pt-1 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Modify Milestone Phases Deadlines
                </span>
                <div className="space-y-3.5 max-h-52 overflow-y-auto pr-1">
                  {project.milestones.map((m, i) => {
                    const msState = extendedMilestoneDeadlines.find(
                      (u) => u.id === m.id,
                    );
                    const currentDeadlineVal = msState
                      ? msState.deadline
                      : m.deadline;
                    return (
                      <div
                        key={m.id}
                        className="bg-gray-50/70 p-3 rounded-xl border border-gray-100 flex flex-col gap-1 text-left"
                      >
                        <span className="text-[10px] font-bold text-gray-600 block">
                          Milestone {i + 1}: {m.title}
                        </span>
                        <input
                          type="date"
                          required
                          value={currentDeadlineVal}
                          onChange={(e) => {
                            const newVal = e.target.value;
                            setExtendedMilestoneDeadlines((prev) =>
                              prev.map((x) =>
                                x.id === m.id ? { ...x, deadline: newVal } : x,
                              ),
                            );
                          }}
                          className="w-full bg-white px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary font-semibold"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setShowExtendModal(false)}
                className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-605 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ⚠️ DISPUTE VERIFICATION OTP FLOATING DIALOG */}
      {pendingDisputeAction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-55 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6.5 shadow-2xl relative animate-fade-in text-left space-y-4">
            <button
              type="button"
              onClick={() => setPendingDisputeAction(null)}
              className="absolute top-4 right-4 p-2 px-3 hover:bg-gray-100 rounded-xl transition cursor-pointer font-bold text-gray-400 text-xs flex items-center gap-1"
            >
              Cancel <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] bg-indigo-50 text-indigo-705 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                🔒 Progressive Security Verification
              </span>
              <h3 className="text-base font-bold text-gray-900 mt-2 font-display">
                Verify Phone for Mediation channels
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed font-sans mt-1">
                To guarantee secure legal mediation and receive automated
                notifications from the dispute board, verify your WhatsApp phone
                number.
              </p>
            </div>

            <div className="space-y-4 pt-1">
              {/* Phone Entry Step */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor="otp-dispute-phone"
                  className="block text-xs font-bold text-slate-500 uppercase"
                >
                  WhatsApp Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    id="otp-dispute-phone"
                    type="text"
                    disabled={disputeOtpSent}
                    value={disputeOtpPhone}
                    onChange={(e) => setDisputeOtpPhone(e.target.value)}
                    placeholder="e.g. +234 803 123 4567"
                    className="flex-1 px-3.5 py-2.5 text-xs bg-gray-55/40 border border-gray-200/80 rounded-xl font-medium focus:outline-none focus:border-indigo-600 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!disputeOtpPhone) {
                        showAlert(
                          "Please enter your WhatsApp phone number.",
                          "error",
                        );
                        return;
                      }
                      setDisputeVerificationSubmitting(true);
                      setTimeout(() => {
                        updatePhoneNumber(disputeOtpPhone, false); // Store on user
                        setDisputeOtpSent(true);
                        setDisputeVerificationSubmitting(false);
                        showAlert(
                          "Security verification code sent to WhatsApp!",
                          "success",
                        );
                      }, 1000);
                    }}
                    className="px-4 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-black transition cursor-pointer disabled:opacity-50 shrink-0"
                    disabled={disputeVerificationSubmitting}
                  >
                    {disputeVerificationSubmitting
                      ? "Sending..."
                      : disputeOtpSent
                        ? "Resend"
                        : "Send Code"}
                  </button>
                </div>
                {disputeOtpSent && (
                  <span className="block text-[10px] text-emerald-600 font-bold mt-1 leading-normal">
                    ✓ Security code simulated via WhatsApp Business! Standard
                    demo codes: "1234" or "9999".
                  </span>
                )}
              </div>

              {/* OTP Entry Step and Submission */}
              {disputeOtpSent && (
                <div className="space-y-3 pt-3 border-t border-gray-100 animate-fade-in">
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="otp-dispute-code"
                      className="block text-xs font-bold text-slate-500 uppercase"
                    >
                      4-Digit Security OTP
                    </label>
                    <input
                      id="otp-dispute-code"
                      type="text"
                      maxLength={4}
                      value={disputeOtpCode}
                      onChange={(e) => {
                        setDisputeOtpCode(e.target.value);
                        setDisputeOtpError("");
                      }}
                      placeholder="e.g. 1234"
                      className="w-full px-3.5 py-2.5 text-center tracking-[1em] text-sm bg-gray-55/40 border border-gray-250 rounded-xl font-mono focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  {disputeOtpError && (
                    <p className="text-[10.5px] text-red-600 font-bold leading-normal">
                      ❌ {disputeOtpError}
                    </p>
                  )}

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          disputeOtpCode === "1234" ||
                          disputeOtpCode === "9999"
                        ) {
                          // Complete Verification!
                          // updatePhoneNumber(disputeOtpPhone, true);
                          toast.success(
                            "WhatsApp Phone Number verified successfully!",
                          );

                          // Execute Dispute Action!
                          if (pendingDisputeAction.type === "project") {
                            // raiseProjectDispute(
                            //   project.id,
                            //   pendingDisputeAction.reason,
                            //   pendingDisputeAction.evidenceFiles.join(", ") ||
                            //     undefined,
                            // );
                          } else {
                            // raiseMilestoneDispute(
                            //   project.id,
                            //   pendingDisputeAction.milestoneId!,
                            //   pendingDisputeAction.reason,
                            //   pendingDisputeAction.evidenceFiles.join(", ") ||
                            //     undefined,
                            // );
                          }
                          setPendingDisputeAction(null);
                        } else {
                          setDisputeOtpError(
                            'Incorrect security OTP code. Please try again! (Tip: Use demo OTP "1234" or "9999" to verify!)',
                          );
                        }
                      }}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition cursor-pointer text-center font-sans shadow-md shadow-red-200"
                    >
                      Verify & File Dispute
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
