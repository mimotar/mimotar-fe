"use client";

import { ShieldCheck } from "lucide-react";

export default function page() {
  return (
    <main className="pt-24 px-4 pb-16">
      <div className="max-w-3xl mx-auto space-y-8 text-left">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">
            Platform Guidelines
          </span>
          <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
            Terms of Service (Rules)
          </h1>
          <p className="text-[11px] text-gray-400 font-normal">
            Last updated: June 12, 2026 | Simple and clear terms
          </p>
        </div>

        <div className="p-8 bg-white border border-gray-100 rounded-3xl space-y-6 text-xs text-gray-650 leading-relaxed font-sans">
          <section className="space-y-3">
            <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
              1. Simple Rules & Legal Agreement
            </span>
            <p>
              By using Mimotar, you agree to follow these simple terms to buy,
              sell, and work together safely online.
            </p>
          </section>

          <section className="space-y-3 border-t border-gray-50 pt-5">
            <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
              2. Safely Locking & Releasing Payments
            </span>
            <p>
              All project funds are deposited safely with our secure payment
              partner (Flutterwave). Once project funds are locked, they cannot
              be pulled back by the client without the freelancer's consent,
              ensuring your payment is guaranteed.
            </p>
          </section>

          <section className="space-y-3 border-t border-gray-50 pt-5">
            <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
              3. 48-Hour Automatic Payout Guarantee
            </span>
            <p>
              To protect freelancers from uncontactable or silent clients, the
              system has a 48-hour countdown. When you upload work proof and the
              client does not respond, the locked payment releases automatically
              to you after 48 hours.
            </p>
          </section>

          <section className="space-y-3 border-t border-gray-50 pt-5">
            <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider block">
              4. Simple Service Fees
            </span>
            <p>
              We charge a simple 3% fee to keep the platform safe and secure.
              This can be split equally between both sides (1.5% each) or paid
              by one party. There are no hidden fees.
            </p>
          </section>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 text-brand-primary font-bold text-[10.5px]">
            <ShieldCheck className="w-5 h-5 text-brand-primary" />
            <span>Secure Payment Partners</span>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">
            SSL Encrypted and Protected
          </span>
        </div>
      </div>
    </main>
  );
}
