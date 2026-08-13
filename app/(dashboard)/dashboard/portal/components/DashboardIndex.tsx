"use client";

import { motion } from "motion/react";
import {
  Plus,
  ShieldCheck,
  HelpCircle as QuestionIcon,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import Link from "next/link";
import WalletCard from "./WalletCard";
import ActionRequired from "./ActionRequired";
import ActiveContract_RecentLog from "./ActiveContract_RecentLog";
import { useDashboardQuery } from "../hooks/useDashboardQuery";
import { DashboardHeader } from "./DashboardHeader";
import { IWallet } from "../types/IGetDashboard";

export default function DashboardIndex() {
  const { session } = useAuth();
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    refetch,
  } = useDashboardQuery();

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <main className="space-y-8 animate-fade-in font-sans">
        <DashboardHeader firstName={session?.firstName} />

        {/* Skeleton */}
        <div className="space-y-6">
          <div className="h-40 rounded-2xl bg-gray-100 animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-52 rounded-2xl bg-gray-100 animate-pulse" />
            <div className="h-52 rounded-2xl bg-gray-100 animate-pulse" />
          </div>

          <div className="h-64 rounded-2xl bg-gray-100 animate-pulse" />
        </div>
      </main>
    );
  }

  /*
   * Error state
   */
  if (isError) {
    return (
      <main className="min-h-[500px] flex items-center justify-center font-sans">
        <div className="max-w-md w-full text-center px-6">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-lg font-bold text-gray-900">
            Unable to load dashboard
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            We couldn't retrieve your dashboard information. Please try again.
          </p>

          {error instanceof Error && (
            <p className="text-xs text-red-500 mt-2">{error.message}</p>
          )}

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-8 animate-fade-in font-sans">
      {/* Top Welcome Title Grid */}

      <DashboardHeader firstName={session?.firstName} />

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
      <WalletCard wallet={dashboardData?.balance as IWallet} />

      {/* Action Required Priority Bar */}
      <ActionRequired
        actionRequiredProjects={dashboardData?.actionsRequired!}
        session={session}
      />

      {/* Main Active Escrow Board vs Empty State */}
      <ActiveContract_RecentLog
        activeContracts={[]}
        recentLogs={dashboardData?.recentActivity ?? []}
      />
    </main>
  );
}
