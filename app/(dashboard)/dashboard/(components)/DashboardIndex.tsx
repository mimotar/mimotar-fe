"use client";

import { motion } from "motion/react";
import {
  Plus,
  Wallet,
  ArrowUpRight,
  Clock,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Files,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  HelpCircle as QuestionIcon,
} from "lucide-react";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import Link from "next/link";

export default function DashboardIndex() {
  const { session } = useAuth();
  return (
    <main className="space-y-8 animate-fade-in font-sans">
      {/* Top Welcome Title Grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 font-display text-gray-900 flex items-center gap-1.5 leading-tight">
            Welcome back, {session?.firstName}
            <motion.span
              style={{
                display: "inline-block",
                transformOrigin: "bottom right",
              }}
              animate={{ rotate: [0, 15, -10, 15, -10, 15, -10, 10, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              👋
            </motion.span>
          </h1>
          {/* <p className="text-body-sm text-gray-500 mt-1 font-medium">
            Perspective:{" "}
            <span className="font-bold text-brand-primary capitalize">
              {currentUser.role} Control Panel
            </span>
            .
          </p> */}
        </div>

        <Link
          href="/dashboard/start-project"
          //   onClick={() => setActivePage("start-project")}
          className="bg-brand-primary hover:bg-brand-primary/95 text-white rounded-2xl px-6 py-3.5 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-magenta-200/50 text-center shrink-0 font-sans"
        >
          <Plus className="w-4 h-4" /> Start Project
        </Link>
      </div>

      {/* Nudge Banner */}
      {/* {!session?.phoneVerified ? (
        <div className="bg-gradient-to-r from-indigo-50/70 to-purple-50/70 border border-indigo-100 p-4.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left animate-fade-in shadow-xs">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0 mt-0.5">
              <ShieldCheck className="w-4.5 h-4.5" />
            </span>
            <div>
              <span className="text-xs font-semibold text-indigo-950 block">
                🔐 Progressive Identity Security Suggested
              </span>
              <p className="text-[11px] text-indigo-900/80 leading-relaxed mt-0.5">
                Verify your phone to enable faster dispute resolution and
                fast-track official WhatsApp mediation threads.
              </p>
            </div>
          </div>
          <button
            // onClick={() => setActivePage("settings")}
            className="text-[11.5px] font-bold text-indigo-700 hover:bg-indigo-100 px-3.5 py-2 rounded-xl border border-indigo-200/50 bg-white transition shrink-0 shadow-xs cursor-pointer"
          >
            Verify WhatsApp
          </button>
        </div>
      ) : null} */}

      {/* Wallet Card Section (Important but not Dominant) */}
      <div className="bg-white rounded-3xl p-6.5 shadow-sm border border-gray-100 text-left">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-5 h-5 text-brand-primary" />
          <h2 className="text-label text-gray-500 font-bold tracking-wider">
            Escrow Balance Reserves
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Available Naira */}
          <div className="p-4.5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[110px]">
            <div>
              <span className="text-label text-gray-400 block tracking-wider">
                Available Naira (NGN)
              </span>
              <span className="text-h2 text-amount text-gray-900 mt-1.5 block">
                {formatNumberToCurrency(450000, {
                  style: "currency",
                  currency: "NGN",
                })}
              </span>
            </div>
            <button
              //   onClick={() => {
              //     setWithdrawCurrencyPreference("NGN");
              //     setActivePage("wallet");
              //   }}
              className="mt-2.5 self-start text-body-sm font-bold text-brand-primary hover:underline transition cursor-pointer font-sans"
            >
              Withdraw NGN →
            </button>
          </div>

          {/* Card 2: Available Dollar (Visible, own clean field) */}
          <div className="p-4.5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[110px]">
            <div>
              <span className="text-label text-gray-400 block tracking-wider">
                Available Dollars (USD)
              </span>
              <span className="text-h2 text-amount text-gray-900 mt-1.5 block">
                {formatNumberToCurrency(350, {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <button
              //   onClick={() => {
              //     setWithdrawCurrencyPreference("USD");
              //     setActivePage("wallet");
              //   }}
              className="mt-2.5 self-start text-body-sm font-bold text-brand-primary hover:underline transition cursor-pointer font-sans"
            >
              Withdraw USD →
            </button>
          </div>

          {/* Card 3: Locked Naira */}
          <div className="p-4.5 bg-amber-50/20 rounded-2xl border border-amber-100/50 flex flex-col justify-between min-h-[110px]">
            <div>
              <span className="text-label text-amber-700/80 block tracking-wider">
                Locked Escrow (NGN)
              </span>
              <span className="text-h2 text-amount text-amber-600 mt-1.5 block">
                {formatNumberToCurrency(1200000, {
                  style: "currency",
                  currency: "NGN",
                })}
              </span>
            </div>
            <span className="mt-2.5 text-caption text-amber-700/60 font-medium flex items-center gap-1 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Active milestones
            </span>
          </div>

          {/* Card 4: Locked Dollar */}
          <div className="p-4.5 bg-amber-50/20 rounded-2xl border border-amber-100/50 flex flex-col justify-between min-h-[110px]">
            <div>
              <span className="text-label text-amber-700/80 block tracking-wider">
                Locked Escrow (USD)
              </span>
              <span className="text-h2 text-amount text-amber-600 mt-1.5 block">
                {/* ${wallet.pendingUsd.toLocaleString()} */}
                {formatNumberToCurrency(1500, {
                  style: "currency",
                  currency: "NGN",
                })}
              </span>
            </div>
            <span className="mt-2.5 text-caption text-amber-700/60 font-medium flex items-center gap-1 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Awaiting delivery
            </span>
          </div>
        </div>
      </div>

      {/* Action Required Priority Bar */}
      {/* {actionRequiredProjects.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
            <h2 className="text-h4 text-gray-800">
              Action Required ({actionRequiredProjects.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actionRequiredProjects.map((p) => {
              // Determine prompt copy dynamically based on status & current view
              let actionTitle = "";
              let actionBtnText = "";
              let badgeStyle = "";

              if (p.agreementStatus === "pending_invite") {
                actionTitle = "Review & Sign Agreement Proposal";
                actionBtnText = "Accept / Review";
                badgeStyle = "bg-purple-100 text-purple-700";
              } else if (
                p.agreementStatus === "accepted" &&
                p.escrowStatus === "unfunded"
              ) {
                actionTitle = `Fund Pending Escrow Contract`;
                actionBtnText = "Fund (Flutterwave)";
                badgeStyle = "bg-brand-primary/10 text-brand-primary";
              } else if (p.escrowStatus === "funded" && !p.isDelivered) {
                actionTitle = `Submit Project Deliverables`;
                actionBtnText = "Upload & Deliver";
                badgeStyle = "bg-emerald-50 text-emerald-700 font-semibold";
              } else if (p.isDelivered && !p.isReleased) {
                actionTitle = `Review & Approve Work Deliverables`;
                actionBtnText = "Review Submission";
                badgeStyle = "bg-amber-100 text-[#854d0e]";
              } else if (p.escrowStatus === "disputed") {
                actionTitle = "Escrow Disputed - Support Active";
                actionBtnText = "Dispute Room";
                badgeStyle = "bg-red-100 text-red-700";
              }

              return (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100 hover:shadow-md transition flex flex-col justify-between gap-4 animate-fade-in text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-caption px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${badgeStyle}`}
                        >
                          {actionTitle}
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 font-bold uppercase rounded-md tracking-wider ${p.creatorRole === "client" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "bg-magenta-55/15 text-[#c026d3] border border-magenta-200/20"}`}
                        >
                          You:{" "}
                          {p.creatorRole === "client" ? "Client" : "Freelancer"}
                        </span>
                      </div>
                      <h3 className="text-h4 text-gray-900 mt-3 line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-body-sm text-gray-400 mt-1">
                        Contract value:{" "}
                        <span className="font-extrabold text-amount text-gray-700">
                          {formatMoney(p.amount, p.currency)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <span className="text-caption text-brand-neutral font-semibold">
                      From:{" "}
                      {p.creatorRole === "client" ? p.otherPartyName : "You"}
                    </span>
                    <button
                      onClick={() => selectProject(p.id)}
                      className="px-3.5 py-1.5 bg-brand-primary text-white text-[11px] font-bold rounded-lg transition hover:bg-brand-primary/95 flex items-center gap-1 cursor-pointer font-sans"
                    >
                      {actionBtnText}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )} */}

      {/* Main Active Escrow Board vs Empty State */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <div className="lg:col-span-2 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-gray-800">
              Your Active Contracts ({activeProjects.length})
            </h2>
            <button
              onClick={() => setActivePage("projects")}
              className="text-body-sm font-bold text-brand-primary hover:underline flex items-center gap-1 font-sans"
            >
              See All
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {activeProjects.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-gray-50 shadow-xs animate-fade-in">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-4">
                <QuestionIcon className="w-7 h-7" />
              </div>
              <h3 className="text-h3 text-gray-900">
                Start your first project to secure payments
              </h3>
              <p className="text-body-sm text-brand-neutral mt-2 max-w-sm leading-relaxed">
                Connect with clients locally or internationally. No milestones
                are worked on without funded reserves protecting your delivery.
              </p>
              <button
                onClick={() => setActivePage("start-project")}
                className="mt-6 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl px-5 py-2.5 text-xs font-bold transition flex items-center gap-2 cursor-pointer active:scale-95 shadow-sm font-sans"
              >
                <Plus className="w-4 h-4" /> Start Project
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {activeProjects.map((p) => {
                let statusBadge = "";
                let statusLabel = "";

                if (p.escrowStatus === "unfunded") {
                  statusBadge = "bg-gray-100 text-gray-500";
                  statusLabel = "Awaiting Funding";
                } else if (p.escrowStatus === "funded" && !p.isDelivered) {
                  statusBadge = "bg-purple-100 text-brand-primary font-bold";
                  statusLabel = "In Progress";
                } else if (p.isDelivered && !p.isReleased) {
                  statusBadge = "bg-amber-100 text-[#854d0e] font-bold";
                  statusLabel = "Delivered";
                } else if (p.escrowStatus === "disputed") {
                  statusBadge = "bg-red-100 text-red-700 font-bold";
                  statusLabel = "Disputed";
                }

                return (
                  <div
                    key={p.id}
                    onClick={() => selectProject(p.id)}
                    className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100/30 hover:shadow-md transition cursor-pointer flex items-center justify-between gap-4 animate-fade-in group text-left"
                  >
                    <div className="space-y-1 max-w-[70%]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-caption px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold ${statusBadge}`}
                        >
                          {statusLabel}
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 font-bold uppercase rounded-md tracking-wider ${p.creatorRole === "client" ? "bg-indigo-50 text-indigo-700 border border-indigo-100/50" : "bg-magenta-55/15 text-[#c026d3] border border-magenta-200/20"}`}
                        >
                          You:{" "}
                          {p.creatorRole === "client" ? "Client" : "Freelancer"}
                        </span>
                        <span className="text-caption text-gray-400 font-mono">
                          ID: {p.id.split("-")[1]}
                        </span>
                      </div>
                      <h4 className="text-h5 text-gray-900 line-clamp-1 group-hover:text-brand-primary transition">
                        {p.title}
                      </h4>
                      <p className="text-body-sm text-gray-400">
                        Total Escrow Value:{" "}
                        <span className="font-extrabold text-amount text-gray-700">
                          {formatMoney(p.amount, p.currency)}
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-caption text-gray-400 block mb-1">
                        Fee:{" "}
                        {p.feePayer === "split"
                          ? "Split (1.5% each)"
                          : p.feePayer === "client"
                            ? "Client Paid"
                            : "Freelancer Paid"}
                      </span>
                      <span className="text-caption font-bold text-gray-700 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 font-mono">
                        {p.deadline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div> */}

        {/* Recent Activities Log column */}
        <div className="space-y-4 text-left">
          <h2 className="text-h4 text-gray-800 text-left">
            Recent Account Logs
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100/50 space-y-4">
            <div className="flex items-center gap-1.5 p-3.5 bg-purple-50 rounded-xl">
              <TrendingUp className="w-4 h-4 text-brand-primary" />
              <div className="text-caption text-slate-700 font-semibold leading-tight font-sans">
                Platform fee payer averages:{" "}
                <span className="font-bold text-brand-primary">
                  Split-fee Option (50-50)
                </span>{" "}
                is preferred for payouts.
              </div>
            </div>

            <div className="relative border-l-2 border-gray-100 pl-4.5 space-y-5 py-2">
              <div className="relative">
                <div className="absolute -left-[24.5px] top-0 bg-emerald-500 rounded-full w-[11px] h-[11px] border-2 border-white" />
                <span className="text-caption text-gray-400 font-mono block">
                  2 Hours Ago
                </span>
                <span className="text-body-sm font-bold text-gray-800">
                  Funds Secured in Escrow
                </span>
                <p className="text-caption text-gray-500 mt-0.5 leading-normal">
                  Naira secure: ₦850,000 deposits locked for E-Commerce platform
                  development.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[24.5px] top-0 bg-[#eab308] rounded-full w-[11px] h-[11px] border-2 border-white" />
                <span className="text-caption text-gray-400 font-mono block">
                  1 Day Ago
                </span>
                <span className="text-body-sm font-bold text-gray-800">
                  Milestone Completed
                </span>
                <p className="text-caption text-gray-500 mt-0.5 leading-normal">
                  Amara updated UI Figma wireframes and submitted design assets
                  for client check.
                </p>
              </div>

              <div className="relative font-sans">
                <div className="absolute -left-[24.5px] top-0 bg-blue-500 rounded-full w-[11px] h-[11px] border-2 border-white" />
                <span className="text-caption text-gray-400 font-mono block">
                  3 Days Ago
                </span>
                <span className="text-body-sm font-bold text-gray-805">
                  Contract Agreement Signed
                </span>
                <p className="text-caption text-gray-500 mt-0.5 leading-normal">
                  Both parties acknowledged and authorized dispute guidelines
                  for Milestone 1.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
