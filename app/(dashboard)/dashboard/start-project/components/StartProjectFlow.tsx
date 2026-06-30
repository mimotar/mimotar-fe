"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CheckCircle,
  Copy,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { Milestone } from "../types/milestones";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { renderTooltip } from "./RenderTooltip";
import { useNavigateProjectStep } from "../hooks/usenavigateProjectStep";
import ProjectStepOne from "./ProjectStepOne";
import { useAppSelector } from "@/lib/hooks";
import ProjectStepTwo from "./ProjectStepTwo";

export default function StartProjectFlow() {
  const step = Number(useSearchParams().get("step")) || 1;

  const { session } = useAuth();
  const projects = useAppSelector((state) => state.createTransaction);
  console.log(projects);

  const { nextStep } = useNavigateProjectStep();

  // ONBOARDING TOUR STATES
  const [showTour, setShowTour] = useState(() => {
    return localStorage.getItem("mimotar_tour_dismissed") !== "true";
  });
  const [activeTourIndex, setActiveTourIndex] = useState(0); // 0: Title, 1: Deliverables, 2: Milestone toggle

  // const renderTooltip = (index: number) => {
  //   if (!showTour || activeTourIndex !== index) return null;

  //   const tips = [
  //     {
  //       title: "Project Title",
  //       text: "Make your contract easily outline the scope from a glance. Keep it brief and friendly—for example, 'Figma Landing Page Redesign' or 'React Dashboard Development'. This title will appear on secure escrow receipts for both parties.",
  //     },
  //     {
  //       title: "Deliverables Scope Details",
  //       text: "Use this space to list exactly what you expect to receive or deliver (e.g. source files, PDF guidelines, social media assets, or preview URLs). Laying out clear, granular terms prevents unneeded confusion and payment friction later.",
  //     },
  //     {
  //       title: "Divide Work Into Milestones",
  //       text: "For mid-to-high budget projects, we highly recommend dividing the work into milestone phases. Each phase is funded, completed, and released step-by-step. This secures progress and ensures everyone is on the same page.",
  //     },
  //   ];

  //   const currentTip = tips[index];
  //   if (!currentTip) return null;

  //   return (
  //     <motion.div
  //       initial={{ opacity: 0, scale: 0.95, y: -4 }}
  //       animate={{ opacity: 1, scale: 1, y: 0 }}
  //       exit={{ opacity: 0, scale: 0.95, y: -4 }}
  //       transition={{ duration: 0.2 }}
  //       className="mt-2.5 p-4 bg-purple-50/95 border border-purple-200/80 rounded-2xl text-left relative shadow-xs"
  //     >
  //       <div className="flex items-center justify-between mb-1.5">
  //         <div className="flex items-center gap-1.5 font-bold text-purple-900 text-[11px] uppercase tracking-wide">
  //           <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0" />
  //           <span>
  //             Guide ({index + 1} of 3): {currentTip.title}
  //           </span>
  //         </div>
  //         <button
  //           type="button"
  //           onClick={() => {
  //             setShowTour(false);
  //             localStorage.setItem("mimotar_tour_dismissed", "true");
  //           }}
  //           className="text-purple-400 hover:text-purple-600 font-bold p-1 transition cursor-pointer"
  //           title="Dismiss guide tips"
  //           aria-label="Dismiss guide tips"
  //         >
  //           <X className="w-4 h-4" />
  //         </button>
  //       </div>
  //       <p className="text-xs text-purple-950 font-medium leading-relaxed mb-3">
  //         {currentTip.text}
  //       </p>

  //       <div className="flex justify-between items-center z-10">
  //         <button
  //           type="button"
  //           onClick={() => {
  //             setShowTour(false);
  //             localStorage.setItem("mimotar_tour_dismissed", "true");
  //           }}
  //           className="text-[10px] font-bold text-purple-500 hover:text-purple-700 transition cursor-pointer"
  //         >
  //           Dismiss Tutorial
  //         </button>

  //         <div className="flex gap-1.5">
  //           {index > 0 && (
  //             <button
  //               type="button"
  //               onClick={() => {
  //                 if (index === 2) {
  //                   setStep(1);
  //                 }
  //                 setActiveTourIndex(index - 1);
  //               }}
  //               className="px-2.5 py-1 text-[10px] bg-white border border-purple-200 text-purple-700 rounded-lg font-bold hover:bg-purple-100/50 transition cursor-pointer"
  //             >
  //               Back
  //             </button>
  //           )}
  //           <button
  //             type="button"
  //             onClick={() => {
  //               if (index < 2) {
  //                 if (index === 1) {
  //                   setStep(2); // Automatically advance step to make sure they see the milestone toggle
  //                 }
  //                 setActiveTourIndex(index + 1);
  //               } else {
  //                 setShowTour(false);
  //                 localStorage.setItem("mimotar_tour_dismissed", "true");
  //               }
  //             }}
  //             className="px-3 py-1 text-[10px] bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-primary/95 transition cursor-pointer"
  //           >
  //             {index === 2 ? "Complete Guide" : "Next Tip"}
  //           </button>
  //         </div>
  //       </div>
  //     </motion.div>
  //   );
  // };

  // FIELDS
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [amount, setAmount] = useState<number>(0);
  const [deadline, setDeadline] = useState("");
  const [feePayer, setFeePayer] = useState<"client" | "freelancer" | "split">(
    "split",
  );

  // Custom document attachments layout
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [tempFileName, setTempFileName] = useState("");

  // MILESTONES
  const [hasMilestones, setHasMilestones] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [msTitle, setMsTitle] = useState("");
  const [msAmount, setMsAmount] = useState<number>(0);
  const [msDeadline, setMsDeadline] = useState("");
  const [msFile, setMsFile] = useState("");
  const [msFiles, setMsFiles] = useState<string[]>([]);
  const [milestoneError, setMilestoneError] = useState<string | null>(null);
  const [milestoneAddedSuccess, setMilestoneAddedSuccess] =
    useState<Milestone | null>(null);

  // COUNTERPARTY INVITE
  const [otherName, setOtherName] = useState("");
  const [otherEmail, setOtherEmail] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const [otherEmailError, setOtherEmailError] = useState("");
  const [otherRole, setOtherRole] = useState<"client" | "freelancer">("client");

  // Validation Error States (to allow clickable navigation buttons with validation highlights)

  const [otherNameError, setOtherNameError] = useState("");

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleOtherEmailBlur = () => {
    if (!otherEmail) {
      setOtherEmailError("Counterparty email is required");
    } else if (!validateEmail(otherEmail)) {
      setOtherEmailError(
        "Please enter a valid counterpart email (e.g., name@email.com)",
      );
    } else {
      setOtherEmailError("");
    }
  };

  // LINK GENERATION
  const [generatedId, setGeneratedId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // ACTIONS

  const validateStep3 = () => {
    let isValid = true;
    if (!otherName.trim()) {
      setOtherNameError("Counterparty Legal Name is required");
      isValid = false;
    } else {
      setOtherNameError("");
    }

    if (!otherEmail.trim()) {
      setOtherEmailError("Counterparty Email Address is required");
      isValid = false;
    } else if (!validateEmail(otherEmail)) {
      setOtherEmailError(
        "Please enter a valid counterpart email (e.g., name@email.com)",
      );
      isValid = false;
    } else {
      setOtherEmailError("");
    }

    return isValid;
  };

  const handleFinalSubmit = () => {
    // const projId = addNewProject({
    //   title,
    //   description,
    //   amount,
    //   currency,
    //   deadline,
    //   feePayer,
    //   hasMilestones,
    //   milestones: hasMilestones ? milestones : [],
    //   creatorRole: currentUser.role as "client" | "freelancer",
    //   otherPartyName: otherName,
    //   otherPartyEmail: otherEmail,
    //   otherPartyPhone: otherPhone || undefined,
    //   otherPartyRole: otherRole,
    //   agreementStatus: "pending_invite",
    //   escrowStatus: "unfunded",
    //   attachments: attachedFiles,
    // });

    // setGeneratedId(projId);
    // setStep(5);
    nextStep(5);
  };

  const copyAgreementLink = () => {
    const link = `${window.location.origin}/accept-agreement/${generatedId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (val: number) => {
    return currency === "NGN"
      ? `₦${val.toLocaleString()}`
      : `$${val.toLocaleString()}`;
  };

  return (
    <main className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-gray-100 animate-fade-in font-sans">
      {/* Onboarding Guide Toggle Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
        <h1 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <span>New Escrow Agreement Flow</span>
        </h1>
        <button
          type="button"
          onClick={() => {
            if (showTour) {
              setShowTour(false);
              localStorage.setItem("mimotar_tour_dismissed", "true");
            } else {
              setShowTour(true);
              setActiveTourIndex(0);
              // setStep(1);
              nextStep(1);
              localStorage.setItem("mimotar_tour_dismissed", "false");
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-brand-primary border border-purple-100 hover:bg-purple-100 hover:border-purple-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
          <span>
            {showTour ? "Disable Guide Tips" : "Show Interactive Guide"}
          </span>
        </button>
      </div>

      {/* Step Progress indicators - Scroll-free Column layout */}
      <div className="flex items-start justify-between mb-8 pb-3 border-b border-gray-100/50">
        {[
          { label: "Terms" },
          { label: "Milestones" },
          { label: "Invite" },
          { label: "Summary" },
          { label: "Complete" },
        ].map((s, idx) => {
          const sNum = idx + 1;
          const isCurrent = step === sNum;
          const isPassed = step > sNum;
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center relative min-w-0"
            >
              <div className="flex items-center w-full justify-center">
                {/* Connecting bar left */}
                <div
                  className={`flex-1 h-0.5 ${idx === 0 ? "invisible" : isCurrent || isPassed ? "bg-emerald-500" : "bg-gray-100"}`}
                />

                <div
                  className={`w-6.5 h-6.5 rounded-full flex items-center justify-center font-bold text-xs font-mono transition-all shrink-0 ${
                    isCurrent
                      ? "bg-brand-primary text-white scale-110 shadow-xs ring-4 ring-brand-primary/10"
                      : isPassed
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {sNum}
                </div>

                {/* Connecting bar right */}
                <div
                  className={`flex-1 h-0.5 ${idx === 4 ? "invisible" : isPassed ? "bg-emerald-500" : "bg-gray-100"}`}
                />
              </div>
              <span
                className={`text-[9px] sm:text-[11px] font-bold block mt-1.5 tracking-tight text-center truncate px-0.5 max-w-full ${isCurrent ? "text-brand-primary" : "text-gray-400"}`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Basic Terms */}
      {step === 1 && <ProjectStepOne />}

      {/* STEP 2: Milestones Optional Toggle */}
      {step === 2 && <ProjectStepTwo />}

      {/* STEP 3: Counterparty Invite */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-extrabold text-[#111827]">
              Secure your counterparty details
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Both sides sign the escrow parameters securely inside Lagos
              portal.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                Their Role in this Project
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOtherRole("client");
                  }}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl border transition cursor-pointer ${otherRole === "client" ? "bg-purple-50 text-brand-primary border-brand-primary/50" : "bg-white text-gray-500 border-gray-100"}`}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOtherRole("freelancer");
                  }}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl border transition cursor-pointer ${otherRole === "freelancer" ? "bg-purple-50 text-brand-primary border-brand-primary/50" : "bg-white text-gray-500 border-gray-100"}`}
                >
                  Freelancer
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Counterparty Legal Name
                </label>
                <input
                  type="text"
                  value={otherName}
                  onChange={(e) => {
                    setOtherName(e.target.value);
                    if (otherNameError) setOtherNameError("");
                  }}
                  placeholder="e.g. Amara Ndukwe"
                  className={`w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border placeholder-gray-300 text-gray-800 focus:outline-none transition-colors font-medium ${otherNameError ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
                />
                {otherNameError && (
                  <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{otherNameError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Counterparty Email Address
                </label>
                <input
                  type="email"
                  value={otherEmail}
                  onChange={(e) => {
                    setOtherEmail(e.target.value);
                    if (otherEmailError) setOtherEmailError("");
                  }}
                  onBlur={handleOtherEmailBlur}
                  placeholder="name@email.com"
                  className={`w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border placeholder-gray-300 text-gray-800 focus:outline-none transition-colors font-medium ${otherEmailError ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
                />
                {otherEmailError && (
                  <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{otherEmailError}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                WhatsApp Phone Number (Optional)
              </label>
              <input
                type="text"
                value={otherPhone}
                onChange={(e) => setOtherPhone(e.target.value)}
                placeholder="e.g. +234 803 123 4567"
                className="w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border border-gray-100 placeholder-gray-300 text-gray-800 focus:outline-none focus:border-brand-primary font-medium"
              />
              <span className="block text-[10px] text-gray-400 mt-1 leading-normal font-sans">
                Dispute mediators leverage WhatsApp coordinates to reach
                resolutions directly when incident triggers happen.
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={() => {
                nextStep(2);
                // setStep(2)
              }}
              className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 transition animate-fade-in"
            >
              Back
            </button>

            <button
              onClick={() => {
                if (validateStep3()) {
                  nextStep(4);
                  // setStep(4);
                }
              }}
              className="bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl px-6 py-3.5 transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              View Summary
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: AGREEMENT SUMMARY (CRITICAL, EDITABLE) */}
      {step === 4 && (
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
                {title || "Untitled contract proposal"}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-2.5 whitespace-pre-wrap">
                {description || "No deliverables details provided yet."}
              </p>
            </div>

            {attachedFiles.length > 0 && (
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  Contracts guidance attachments
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {attachedFiles.map((file, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-white border border-gray-150 rounded-xl p-2 text-xs font-medium text-slate-800"
                    >
                      📄 {file}
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
                  {formatCurrency(amount)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">
                  Due Deadline
                </span>
                <span className="text-xs font-bold text-gray-800 block mt-1">
                  {deadline || "No select deadline"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">
                  Fee distribution
                </span>
                <span className="text-xs font-bold text-brand-primary block mt-1 capitalize">
                  {feePayer}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">
                  Escrow Fee (3%)
                </span>
                <span className="text-xs font-bold text-[#854d0e] block mt-1 font-mono">
                  {formatCurrency(amount * 0.03)}
                </span>
              </div>
            </div>

            {hasMilestones && milestones.length > 0 && (
              <div className="pt-4 border-t border-gray-55/40">
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-2.5">
                  Configured Milestones Phases ({milestones.length})
                </span>
                <div className="space-y-2">
                  {milestones.map((m, i) => (
                    <div
                      key={m.id}
                      className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col gap-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 font-sans">
                            Phase {i + 1}: {m.title}
                          </span>
                          <span className="text-[10px] text-gray-400 mt-0.5">
                            Due {m.deadline}
                          </span>
                        </div>
                        <span className="font-bold text-gray-800 font-mono bg-gray-50 px-2.5 py-1 rounded border border-gray-100">
                          {formatCurrency(m.amount)}
                        </span>
                      </div>
                      {m.deliveryFiles && m.deliveryFiles.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-550 border-t border-gray-100 pt-1.5">
                          <span>📎 Attached Files:</span>
                          {m.deliveryFiles.map((file, fIdx) => (
                            <span
                              key={fIdx}
                              className="font-mono bg-gray-55/40 text-gray-700 px-1.5 py-0.5 rounded text-[9px]"
                            >
                              {file}
                            </span>
                          ))}
                        </div>
                      ) : m.deliveryFile ? (
                        <div className="flex items-center gap-1 text-[10px] text-gray-550 border-t border-gray-100 pt-1.5">
                          <span>📎 Attached File:</span>
                          <span className="font-mono bg-gray-55/40 text-gray-700 px-1.5 py-0.5 rounded text-[9px]">
                            {m.deliveryFile}
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
                  {otherName} ({otherRole})
                </span>
                <span className="text-[10px] text-gray-400 font-medium block mt-0.5 font-mono">
                  {otherEmail}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">
                  Owner Role
                </span>
                <span className="text-xs font-bold text-gray-800 block mt-1">
                  {session?.firstName || "" + session?.lastName || ""} (Creator)
                </span>
                <span className="text-[10px] text-brand-neutral block mt-0.5 capitalize">
                  {/* {currentUser.role}  */}
                  and funding initiator
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
              onClick={handleFinalSubmit}
              className="bg-brand-primary text-white text-xs font-bold rounded-xl px-6 py-3.5 transition flex items-center gap-2 cursor-pointer"
            >
              Create Contract
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: LINK GENERATION FLOW */}
      {step === 5 && (
        <div className="space-y-8 animate-fade-in text-center py-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Agreement Link Dispatched!
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              We have generated the secure escrow contract parameter mapping and
              shared notification request to{" "}
              <span className="font-bold text-gray-800">{otherEmail}</span>.
            </p>
          </div>

          <div className="max-w-md mx-auto p-4.5 bg-gray-50 rounded-2xl flex items-center gap-3">
            <input
              type="text"
              readOnly
              value={`${window.location.origin}/accept-agreement/${generatedId}`}
              className="flex-1 bg-transparent text-xs text-gray-500 font-semibold focus:outline-none select-all truncate border-none font-mono"
            />
            <button
              onClick={copyAgreementLink}
              className="p-2.5 bg-white border border-gray-150 hover:bg-slate-50 text-brand-primary rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-xs active:scale-95"
            >
              {copied ? (
                "Copied!"
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Link
                </>
              )}
            </button>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <Link
              href="/dashboard"
              //   onClick={() => {
              //     setActivePage("dashboard");
              //   }}
              className="flex-1 py-3 bg-brand-primary text-white text-xs font-bold rounded-xl transition hover:bg-brand-primary/95 cursor-pointer text-center"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                // setStep(1);
                nextStep(1);
                setTitle("");
                setDescription("");
                setAmount(0);
                setDeadline("");
                setMilestones([]);
                setOtherName("");
                setOtherEmail("");
                setOtherPhone("");
              }}
              className="flex-1 py-3 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 transition cursor-pointer text-center"
            >
              New Project
            </button>
          </div>
        </div>
      )}

      {/* Milestone Creation Success Modal Notification */}
      <AnimatePresence>
        {milestoneAddedSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMilestoneAddedSuccess(null)}
              className="absolute inset-0 bg-black/55 backdrop-blur-xs select-none"
            />

            {/* Container Card */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white max-w-sm w-full rounded-2xl p-6 text-center shadow-2xl border border-gray-100 flex flex-col items-center gap-4 z-10 font-sans"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center shadow-sm">
                <CheckCircle className="w-6 h-6 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Milestone Phase Added
                </h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Your phase contract has been registered successfully. The
                  project total contract value was updated automatically!
                </p>
              </div>

              {/* Milestone Visual Brief Card */}
              <div className="w-full bg-slate-50 border border-slate-100/85 rounded-xl p-3.5 text-left space-y-2">
                <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Milestone {milestones.length}
                  </span>
                  <span className="text-xs font-bold text-brand-primary font-mono bg-purple-50 px-2 py-0.5 rounded border border-brand-primary/10">
                    {formatCurrency(milestoneAddedSuccess.amount)}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1">
                    {milestoneAddedSuccess.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold mt-1">
                    <span>📅 Deadline: {milestoneAddedSuccess.deadline}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMilestoneAddedSuccess(null)}
                className="w-full py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition cursor-pointer text-center shadow-md shadow-brand-primary/10 select-none"
              >
                Awesome, got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
