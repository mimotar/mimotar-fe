import { ShieldCheck } from "lucide-react";

export default function BottomInfoCard() {
  return (
    <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-3xl p-6.5 border border-amber-500/10 flex flex-col sm:flex-row items-center gap-6 text-left">
      <div className="w-12 h-12 bg-white rounded-2xl border border-amber-200/50 flex items-center justify-center shrink-0 shadow-xs">
        <ShieldCheck className="w-6 h-6 text-brand-secondary animate-pulse" />
      </div>
      <div>
        <h4 className="text-xs font-black text-[#854d0e] uppercase tracking-wider">
          Nigeria Central Bank Escrow Protocol guarantees
        </h4>
        <p className="text-[11px] text-gray-510 leading-relaxed mt-1">
          Mimotar operates with authorized fintech merchant providers to
          securely partition user budgets in partner deposit institutions within
          Nigeria. These funds cannot be unilaterally claimed nor reversed
          pending mutual workflow approval or certified legal mediation logs.
        </p>
      </div>
    </div>
  );
}
