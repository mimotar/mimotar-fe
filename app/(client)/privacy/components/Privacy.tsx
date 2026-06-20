"use client";

import { ShieldCheck } from "lucide-react";

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-left">
      <div className="text-center space-y-2 mb-10">
        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
          Protections & Privacy
        </span>
        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-[11px] text-gray-400 font-normal">
          Last updated: June 12, 2026 | We keep your data safe
        </p>
      </div>

      <div className="p-8 bg-white border border-gray-100 rounded-3xl space-y-6 text-xs text-gray-650 leading-relaxed font-sans">
        <section className="space-y-3">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            1. Information We Collect
          </span>
          <p>
            We only collect basic info like your name, email, and bank details
            to process payments. Your data is kept strictly secure and private
            to prevent unauthorized access.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            2. Payment Security
          </span>
          <p>
            We partner with secure, licensed payment networks like Flutterwave.
            Mimotar never stores your card digits or credentials.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            3. Project & Workspace Files
          </span>
          <p>
            Files or messages shared during projects are private. If a dispute
            happens, they are only viewed by our helpers to resolve it, and we
            delete them from our logs after 90 days.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-50 pt-5">
          <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
            4. How We Use Cookies
          </span>
          <p>
            We track simple usage patterns to make the platform faster, protect
            your account, and answer support tickets. We never sell your info.
          </p>
        </section>
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-[10.5px]">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Protected Under Privacy Rules</span>
        </div>
        <span className="text-[10px] text-gray-400 font-mono">
          Data Safe & Encrypted
        </span>
      </div>
    </div>
  );
};

export default Privacy;
