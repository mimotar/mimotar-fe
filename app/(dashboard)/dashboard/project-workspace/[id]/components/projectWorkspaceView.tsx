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
import Header from "./Header";
import AgreementAcceptanceBlock from "./AgreementAcceptanceBlock";
import ClientActionSection from "./ClientActionSection";
import FreelancerActionSection from "./FreelancerActionSection";
import MilestoneSection from "./MilestoneSection";
import Loading from "./loading";
import Error from "./ErrorState";
import ErrorState from "./ErrorState";
import { useQueryClient } from "@tanstack/react-query";
import { useMutationAction } from "../hooks/useMutationActions";
import { AxiosError } from "axios";
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
  const params = useParams();
  const navigate = useRouter();
  const queryClient = useQueryClient();

  const id = params.id as string;
  const { getProject } = useProjectApp(id);

  const session = useAuth();

  // const project = projects.find((p) => p.id === selectedProjectId);
  const project = getProject.data;
  const projectId = project?.id ?? "";

  const {
    approvalMutation,
    rejectMutation,
    requestTokenMutation,
    fundingMutation,
  } = useMutationAction(Number(projectId));

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

  const [agreementDecision, setAgreementDecision] = useState<
    "accept" | "reject" | null
  >(null);
  const [agreementOtp, setAgreementOtp] = useState("");

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

  const openAgreementDecision = (nextDecision: "accept" | "reject") => {
    setAgreementDecision(nextDecision);
  };

  const closeAgreementDecision = () => {
    setAgreementDecision(null);
    setAgreementOtp("");
  };

  const handleRequestAgreementOtp = () => {
    requestTokenMutation.mutate(undefined, {
      onSuccess: async (data) => {
        const requestedOtp = data?.data?.otp;

        if (requestedOtp) {
          setAgreementOtp(requestedOtp);
        }

        toast.success(data?.message || "OTP sent to your email.");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(
            error?.response?.data?.message || "Unable to request OTP.",
          );
          return;
        }
        if (error instanceof Error) {
          toast.error(error?.message || "Unable to request OTP.");
          return;
        }

        toast.error("Unable to request OTP.");
      },
    });
  };

  const handleAgreementConfirm = ({
    otp,
    rejectionReason,
  }: {
    otp: string;
    rejectionReason?: string;
  }) => {
    if (!otp.trim()) {
      toast.error("Please request and enter the OTP before continuing.");
      return;
    }

    if (agreementDecision === "accept") {
      approvalMutation.mutate(otp.trim(), {
        onSuccess: async (data) => {
          toast.success(data?.message || "Agreement accepted successfully.");
          await queryClient.invalidateQueries({
            queryKey: ["project", projectId],
          });
          closeAgreementDecision();
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

    rejectMutation.mutate(
      { otp: otp.trim(), rejectionReason: reason },
      {
        onSuccess: async (data) => {
          toast.success(data?.message || "Agreement rejected successfully.");
          await queryClient.invalidateQueries({
            queryKey: ["project", projectId],
          });
          closeAgreementDecision();
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
      },
    );
  };

  // Flutterwave simulated overlay
  const [showFlutterwavePay, setShowFlutterwavePay] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Loading state
  if (getProject.isLoading) {
    return <Loading />;
  }

  if (getProject.isError) {
    return <ErrorState data={getProject} />;
  }

  // No project returned
  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-sans">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>

          <h2 className="text-sm font-bold text-gray-900">Project not found</h2>

          <p className="text-xs text-gray-500 mt-2">
            This project may have been removed or you may not have access to it.
          </p>

          <button
            type="button"
            onClick={() => navigate.push("./dashboard/projects")}
            className="mt-5 px-4 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/90 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }
  // Derive active steps for the Status Header Stepper
  const getStepperIndex = () => {
    // Waiting for the other party to accept
    if (project.status === "CREATED") return 0;

    // Agreement accepted but escrow not funded
    if (project.status === "APPROVED") {
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
  const isCreator =
    project.creator_email?.toLowerCase() ===
    session.session?.email?.toLowerCase();

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
      // toast.add({
      //   description: `Flutterwave Secure Lock Approved: ${formatMoney(totalAmt, project.currency)} deposited and locked successfully!`,
      //   type: "success",
      // });
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

  const handlePayment = (id: string | number) => {
    if (!id) {
      toast.error("Invalid payment process");
      return;
    }
    fundingMutation.mutate(undefined, {
      onSuccess: (data) => {
        const FlutterwaveData = data;
        console.log(data);
        if (FlutterwaveData.status === "success") {
          if (FlutterwaveData.data && FlutterwaveData.data.link) {
            toast.success(
              "Processing payment... After payment refresh this page",
            );
            window.open(FlutterwaveData.data.link, "_blank");
          } else {
            toast.error("Payment link is missing.");
            return;
          }
        } else {
          toast.error(
            FlutterwaveData.message || "Payment initialization failed",
          );
          return;
        }
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "An error occurred during payment",
          );
          return;
        }
        if (error instanceof Error) {
          toast.error(error.message || "An error occurred during payment");
          return;
        }
        toast.error("An error occurred during payment");
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-10">
      {/* Back to Dashboard bar and Role helpful hints selector */}

      <Header session={session.session} project={project} />

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
                  Secure Workspace Panel{" "}
                  {project.status === "EXPIRED" && (
                    <span className="text-red-500 text-sm">
                      (Ticket Expired)
                    </span>
                  )}
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
            <AgreementAcceptanceBlock
              decision={agreementDecision}
              agreementOtp={agreementOtp}
              isRequestingOtp={requestTokenMutation.isPending}
              isDecisionPending={
                (approvalMutation.isPending &&
                  agreementDecision === "accept") ||
                (rejectMutation.isPending && agreementDecision === "reject")
              }
              isCreator={isCreator}
              project={project}
              onAgreementOtpChange={setAgreementOtp}
              onCloseDecision={closeAgreementDecision}
              onConfirmDecision={handleAgreementConfirm}
              onOpenDecision={openAgreementDecision}
              onRequestOtp={handleRequestAgreementOtp}
            />

            {/* CLIENT ACTION PATH */}
            <ClientActionSection
              project={project}
              role={role}
              handlePayment={handlePayment}
              isLoadingPayment={fundingMutation.isPending}
            />

            {/* FREELANCER ACTION PATH */}
            <FreelancerActionSection
              project={project}
              role={role}
              setShowSubmitModal={setShowSubmitModal}
            />

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
              <MilestoneSection project={project} role={role} />
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
              // files={submissionFiles}
              files={[]}
              // onChange={setSubmissionFiles}
              onChange={() => {}}
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
              // files={disputeEvidenceFiles}
              files={[]}
              // onChange={setDisputeEvidenceFiles}
              onChange={() => {}}
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
                      (u) => Number(u.id) === m.id,
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
                          Milestone {i + 1}: {m.name}
                        </span>
                        <input
                          type="date"
                          required
                          value={currentDeadlineVal}
                          onChange={(e) => {
                            const newVal = e.target.value;
                            setExtendedMilestoneDeadlines((prev) =>
                              prev.map((x) =>
                                Number(x.id) === m.id
                                  ? { ...x, deadline: newVal }
                                  : x,
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
                        toast.error("Please enter your WhatsApp phone number.");

                        return;
                      }
                      setDisputeVerificationSubmitting(true);
                      setTimeout(() => {
                        // updatePhoneNumber(disputeOtpPhone, false); // Store on user
                        setDisputeOtpSent(true);
                        setDisputeVerificationSubmitting(false);
                        toast.success(
                          "Security verification code sent to WhatsApp!",
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
