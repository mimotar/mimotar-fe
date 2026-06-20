"use client";

import React, { useState } from "react";
import { MOC_FAQ_ITEMS } from "../data/MOCK_FAQ_ITEMS";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  ArrowRight,
  Coins,
  Clock,
  Lock,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useCases } from "../data/USECASES";

export const Homepage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { session, IsAuthenticated } = useAuth();

  const navigate = useRouter();

  const startCTA = () => {
    if (session && IsAuthenticated) {
      navigate.push("dashboard");
    } else {
      navigate.push("auth");
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pt-16 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 max-w-7xl mx-auto animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.05,
                },
              },
            }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.08] font-display"
            >
              Freelance payments,{" "}
              <span className="text-brand-primary">without fear.</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="mt-6 text-sm md:text-base text-gray-500 max-w-lg font-normal leading-relaxed"
            >
              Mimotar holds client payments securely in escrow until milestones
              are completed and approved. Perfect protection for both Nigerian
              freelancers and absolute trust for their global clients.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="mt-8 flex flex-col sm:flex-row gap-4 items-center w-full"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={startCTA}
                className="w-full sm:w-auto text-sm font-semibold bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl px-8 py-3.5 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Start a Project Payment
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={() => {
                  const element = document.getElementById("how-it-works-sec");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto text-sm font-semibold border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-xl px-8 py-3.5 flex items-center justify-center gap-2 cursor-pointer text-center md:inline-flex"
              >
                How it Works
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column Custom Mockup Hero Image reflecting Vault Securing and funding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full flex justify-center"
          >
            {/* Background blob colors */}
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-secondary/10 rounded-full blur-2xl" />

            {/* Main Interactive Mockup Device Box - Replicated Funded Project Workspace UI */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-md bg-white border border-gray-100/90 rounded-[2rem] p-4 bg-gray-50/20 shadow-2xl overflow-hidden cursor-pointer"
            >
              {/* Window decoration */}
              <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1 font-bold">
                  <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  mimotar.com/workspace/MIM-102
                </div>
              </div>

              {/* Mock Workspace Content */}
              <div className="text-left space-y-4">
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-primary">
                      Project Workspace
                    </span>
                    <h4 className="text-base font-extrabold text-gray-900 leading-tight">
                      E-Commerce App Redesign
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Contract: <span className="font-mono">MIM-784013-NG</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 block font-bold">
                      TOTAL CAPITAL
                    </span>
                    <span className="text-sm font-black text-gray-900 font-mono">
                      ₦450,000.00
                    </span>
                  </div>
                </div>

                {/* Live Status Indicators - Glowing and Pulsing */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-wider font-mono">
                      Vault Status
                    </span>
                    <span className="text-[11px] text-gray-900 font-black flex items-center gap-1 mt-1 font-sans">
                      <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                      Secure &amp; Locked
                    </span>
                  </div>

                  <div className="p-2.5 bg-amber-50/70 border border-amber-100 rounded-xl relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </div>
                    <span className="text-[8px] text-amber-600 font-bold uppercase tracking-wider font-mono">
                      Escrow Funding
                    </span>
                    <span className="text-[11px] text-gray-900 font-black flex items-center gap-1 mt-1 font-sans">
                      <Coins className="w-3 h-3 text-amber-600 shrink-0 animate-bounce" />
                      Fully Funded
                    </span>
                  </div>
                </div>

                {/* Mini Stepper Flow */}
                <div className="p-2.5 bg-gray-50/50 border border-gray-100 rounded-xl">
                  <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold uppercase mb-2">
                    <span>Milestone Stepper</span>
                    <span className="text-emerald-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between gap-1 relative">
                    <div className="absolute top-1.5 left-1 right-1 h-0.5 bg-gray-200 -z-10" />
                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold">
                        ✓
                      </div>
                      <span className="text-[8px] text-gray-800 font-medium">
                        Agreement
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold animate-pulse">
                        ✓
                      </div>
                      <span className="text-[8px] text-gray-800 font-black">
                        Escrow Funded
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-4 h-4 rounded-full bg-brand-primary text-white flex items-center justify-center text-[8px] font-black animate-spin">
                        ⟳
                      </div>
                      <span className="text-[8px] text-brand-primary font-bold">
                        WIP
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-4 h-4 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[8px] font-medium">
                        3
                      </div>
                      <span className="text-[8px] text-gray-400 font-medium">
                        Release
                      </span>
                    </div>
                  </div>
                </div>

                {/* Milestone breakdown (Directly replicating our web app's layout) */}
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                    Secured Milestones
                  </span>

                  {/* Milestone 1 (Completed & Paid out) */}
                  <div className="p-3 bg-white border border-gray-100 rounded-xl flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-800 block line-through">
                          1. Figma Design & Prototypes
                        </span>
                        <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider font-mono">
                          Released • ₦150,000.00
                        </span>
                      </div>
                    </div>
                    <button
                      disabled
                      className="px-2 py-1 bg-gray-100 text-[9px] text-gray-400 rounded-md font-bold"
                    >
                      Paid Out
                    </button>
                  </div>

                  {/* Milestone 2 (Funded & WIP with Countdown) */}
                  <div className="p-3 bg-white border border-brand-primary/20 rounded-xl flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-primary/15 flex items-center justify-center text-brand-primary animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-gray-900 block">
                          2. React Native Frontend Code
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] text-brand-primary font-extrabold uppercase tracking-wider font-mono">
                            Secure Escrow Locked • ₦300,000.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-gray-400 block uppercase font-bold">
                        Countdown
                      </span>
                      <span className="text-[9px] text-amber-600 font-bold font-mono animate-pulse bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        42:15:30
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Verification assurance badge */}
                <div className="pt-2 border-t border-gray-100/80 flex items-center justify-between text-[9px] text-gray-400">
                  <div className="flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
                    Flutterwave Escrow Node Connected
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase text-emerald-600">
                    Secure Node
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Visual trust block with cards style without borders */}
        <div className="mt-16 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white p-7 rounded-2xl shadow-xs flex flex-col gap-3"
          >
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              Funds Held Securely
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Once money is locked in escrow, clients cannot retract it
              unilaterally. Your hard work is fully backed by real capital.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white p-7 rounded-2xl shadow-xs flex flex-col gap-3"
          >
            <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center text-brand-secondary">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              Auto-Release Countdown
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed text-left">
              Unresponsive clients? System auto-releases funds 48 hours after
              delivery files are filed on workspace. No long waits.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white p-7 rounded-2xl shadow-xs flex flex-col gap-3"
          >
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              Mediator Dispute Support
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed text-left">
              Disagreements are handled swiftly. Out of box support ensures
              quick manual intervention via WhatsApp within hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how-it-works-sec"
        className="bg-white py-16 px-4 border-t border-b border-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3.5xl font-extrabold text-gray-900 text-center tracking-tight font-display">
            Escrow protection in 4 simple moves
          </h2>
          <p className="text-center text-xs text-gray-400 mt-2 max-w-md mx-auto">
            Mimotar replaces verbal promises with automated transparency. Here
            is how simple the end-to-end payment protection process is:
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4 relative">
              <div className="text-4xl font-black text-brand-primary/15 font-sans">
                01
              </div>
              <h4 className="text-base font-bold text-gray-900 leading-snug">
                Agree on Terms
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Either client or freelancer creates the project detailing
                deadlines, amounts, and specific milestones.
              </p>
            </div>

            <div className="flex flex-col gap-4 relative">
              <div className="text-4xl font-black text-brand-secondary/20 font-sans">
                02
              </div>
              <h4 className="text-base font-bold text-gray-900 leading-snug">
                Client Funds Escrow
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Client enters card or transfer via Flutterwave. Mimotar secures
                the money safely.
              </p>
            </div>

            <div className="flex flex-col gap-4 relative">
              <div className="text-4xl font-black text-brand-neutral/20 font-sans">
                03
              </div>
              <h4 className="text-base font-bold text-gray-900 leading-snug">
                Freelancer Delivers Work
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Freelancer updates progress on workspace, uploading delivery
                files or live project links directly.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-4xl font-black text-brand-primary/15 font-sans">
                04
              </div>
              <h4 className="text-base font-bold text-gray-900 leading-snug">
                Funds Unlocked
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Client clicks approve to release payment. If empty action is
                made, auto-released 48-hour countdown pays you automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section with modern infinite Marquee Scroll */}
      <section className="py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <span className="text-label text-brand-primary block mb-2 tracking-wider">
            Trusted Work Ecosystem
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight font-display mb-4">
            Sectors securing payouts using Mimotar
          </h2>
          <p className="text-body-sm max-w-xl mx-auto font-sans leading-relaxed">
            From professional visual arts to web engineering, local and
            international clients authorize secured Escrows to eliminate
            payments risks across 20+ specialized freelancing roles.
          </p>
        </div>

        {/* Marquee Wrapper with left/right fade gradient overlays for premium touch */}
        <div className="relative w-full space-y-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-gray-50/90 via-gray-50/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-gray-50/90 via-gray-50/60 to-transparent z-10" />

          {/* Row 1: Left scrolling */}
          <div className="overflow-hidden w-full flex py-2 select-none">
            <div className="animate-marquee-left flex gap-6">
              {useCases.slice(0, 10).map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <div
                    key={`r1-${i}`}
                    className="w-[300px] md:w-[340px] flex-shrink-0 bg-white border border-[#1e2939]/15 p-6 rounded-2xl shadow-xs hover:border-brand-primary/20 hover:shadow-xs transition duration-300 flex flex-col gap-4 text-left font-sans"
                  >
                    <div className="w-10 h-10 rounded-xl bg-magenta-50 text-brand-primary flex items-center justify-center select-none">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-h5 font-extrabold text-gray-900 leading-snug">
                        {uc.title}
                      </h4>
                      <p className="text-body-sm text-brand-neutral mt-2 leading-relaxed">
                        {uc.text}
                      </p>
                    </div>
                  </div>
                );
              })}
              {/* Duplicate for seamless infinite scroll */}
              {useCases.slice(0, 10).map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <div
                    key={`r1-dup-${i}`}
                    className="w-[300px] md:w-[340px] flex-shrink-0 bg-white border border-[#1e2939]/15 p-6 rounded-2xl shadow-xs hover:border-brand-primary/20 hover:shadow-xs transition duration-300 flex flex-col gap-4 text-left font-sans"
                  >
                    <div className="w-10 h-10 rounded-xl bg-magenta-50 text-brand-primary flex items-center justify-center select-none">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-h5 font-extrabold text-gray-900 leading-snug">
                        {uc.title}
                      </h4>
                      <p className="text-body-sm text-brand-neutral mt-2 leading-relaxed">
                        {uc.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Right scrolling */}
          <div className="overflow-hidden w-full flex py-2 select-none">
            <div className="animate-marquee-right flex gap-6">
              {useCases.slice(10, 20).map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <div
                    key={`r2-${i}`}
                    className="w-[300px] md:w-[340px] flex-shrink-0 bg-white border border-[#1e2939]/15 p-6 rounded-2xl shadow-xs hover:border-brand-primary/20 hover:shadow-xs transition duration-300 flex flex-col gap-4 text-left font-sans"
                  >
                    <div className="w-10 h-10 rounded-xl bg-magenta-50 text-brand-primary flex items-center justify-center select-none">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-h5 font-extrabold text-gray-900 leading-snug">
                        {uc.title}
                      </h4>
                      <p className="text-body-sm text-brand-neutral mt-2 leading-relaxed">
                        {uc.text}
                      </p>
                    </div>
                  </div>
                );
              })}
              {/* Duplicate for seamless infinite scroll */}
              {useCases.slice(10, 20).map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <div
                    key={`r2-dup-${i}`}
                    className="w-[300px] md:w-[340px] flex-shrink-0 bg-white border border-[#1e2939]/15 p-6 rounded-2xl shadow-xs hover:border-brand-primary/20 hover:shadow-xs transition duration-300 flex flex-col gap-4 text-left font-sans"
                  >
                    <div className="w-10 h-10 rounded-xl bg-magenta-50 text-brand-primary flex items-center justify-center select-none">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-h5 font-extrabold text-gray-900 leading-snug">
                        {uc.title}
                      </h4>
                      <p className="text-body-sm text-brand-neutral mt-2 leading-relaxed">
                        {uc.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white py-16 px-4 border-t border-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center tracking-tight mb-8 font-display">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {MOC_FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-gray-50/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 font-semibold text-sm text-gray-900 flex items-center justify-between cursor-pointer focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown
                        className={`w-4 h-4 ${isOpen ? "text-brand-primary" : "text-gray-400"}`}
                      />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-gray-500 leading-relaxed font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-white border-t border-gray-100 py-12 px-4 transition-all">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 bg-brand-primary rounded-lg text-white font-black text-xs flex items-center justify-center">M</span>
              <span className="font-extrabold text-lg text-gray-900 tracking-tight">Mimotar</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs mt-1">
              Mimotar is Nigeria's premier escrow platform engineered purposefully for freelancers and overseas/local clients. Secure payments, zero fear.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-3">Company</h5>
            <ul className="flex flex-col gap-2">
              <li><button onClick={() => setActivePage('about')} className="text-xs font-semibold text-gray-400 hover:text-brand-primary transition">About Us</button></li>
              <li><button onClick={() => setActivePage('contact')} className="text-xs font-semibold text-gray-400 hover:text-brand-primary transition">Contact Support</button></li>
              <li><button onClick={() => { setActivePage('how-it-works'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xs font-semibold text-gray-400 hover:text-brand-primary transition cursor-pointer">How it Works</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-3">Legal Info</h5>
            <ul className="flex flex-col gap-2">
              <li><button onClick={() => setActivePage('tos')} className="text-xs font-semibold text-gray-400 hover:text-brand-primary transition">Terms of Service</button></li>
              <li><button onClick={() => setActivePage('privacy')} className="text-xs font-semibold text-gray-400 hover:text-brand-primary transition">Privacy Policy</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-3 text-left">Headquarters</h5>
            <p className="text-xs text-gray-400 leading-relaxed text-left">
              Eko Atlantic Workspace, Victoria Island,<br />Lagos, Nigeria.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-50 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} Mimotar Inc. All rights reserved. Registered under CAC Nigeria.
          </span>
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
            <span>Server status: </span>
            <span className="inline-block w-2 bg-emerald-500 rounded-full h-2 animate-ping" />
            <span className="font-semibold text-emerald-600">Secure (PCI-DSS compliant)</span>
          </div>
        </div>
      </footer> */}
    </div>
  );
};
