"use client";

import { motion } from "motion/react";
import { Plus, ShieldCheck, HelpCircle as QuestionIcon } from "lucide-react";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import Link from "next/link";
import WalletCard from "./WalletCard";
import ActionRequired from "./ActionRequired";
import ActiveContract_RecentLog from "./ActiveContract_RecentLog";

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
      {!session?.phone_no ? (
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
      ) : null}

      {/* Wallet Card Section (Important but not Dominant) */}
      <WalletCard />

      {/* Action Required Priority Bar */}
      <ActionRequired />

      {/* Main Active Escrow Board vs Empty State */}
      <ActiveContract_RecentLog />
    </main>
  );
}
