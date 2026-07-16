import { CheckCircle, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useNavigateProjectStep } from "../hooks/usenavigateProjectStep";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetTicketSuccessPayload } from "@/lib/slices/TicketSuccessSlice";
import { useRouter } from "next/navigation";

export default function ProjectStepFive() {
  const [copied, setCopied] = useState(false);
  const { nextStep } = useNavigateProjectStep();
  const ticket = useAppSelector((state) => state.TicketSuccessPayload);
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  console.log("success ticket", ticket);

  const copyAgreementLink = () => {
    const link = ticket.txn_link;
    if (!link) {
      return;
    }
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
          <span className="font-bold text-gray-800">{/* {otherEmail} */}</span>.
        </p>
      </div>

      <div className="max-w-md mx-auto p-4.5 bg-gray-50 rounded-2xl flex items-center gap-3">
        <input
          type="text"
          readOnly
          value={ticket.txn_link || "no link available"}
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
        <button
          onClick={() => {
            dispatch(resetTicketSuccessPayload());
            navigate.push("/dashboard/portal");
          }}
          className="flex-1 py-3 bg-brand-primary text-white text-xs font-bold rounded-xl transition hover:bg-brand-primary/95 cursor-pointer text-center"
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            nextStep(1);
            dispatch(resetTicketSuccessPayload());
          }}
          className="flex-1 py-3 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 transition cursor-pointer text-center"
        >
          New Project
        </button>
      </div>
    </div>
  );
}
