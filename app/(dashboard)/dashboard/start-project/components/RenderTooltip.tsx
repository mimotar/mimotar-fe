"use client";

import { Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

export const renderTooltip = (
  index: number,
  showTour: boolean,
  activeTourIndex: number,
  setShowTour: (tour: boolean) => void,
  setActiveTourIndex: (tour: number) => void,
) => {
  if (!showTour || activeTourIndex !== index) return null;

  const searchParams = useSearchParams();

  const tips = [
    {
      title: "Project Title",
      text: "Make your contract easily outline the scope from a glance. Keep it brief and friendly—for example, 'Figma Landing Page Redesign' or 'React Dashboard Development'. This title will appear on secure escrow receipts for both parties.",
    },
    {
      title: "Deliverables Scope Details",
      text: "Use this space to list exactly what you expect to receive or deliver (e.g. source files, PDF guidelines, social media assets, or preview URLs). Laying out clear, granular terms prevents unneeded confusion and payment friction later.",
    },
    {
      title: "Divide Work Into Milestones",
      text: "For mid-to-high budget projects, we highly recommend dividing the work into milestone phases. Each phase is funded, completed, and released step-by-step. This secures progress and ensures everyone is on the same page.",
    },
  ];

  const currentTip = tips[index];
  if (!currentTip) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.2 }}
      className="mt-2.5 p-4 bg-purple-50/95 border border-purple-200/80 rounded-2xl text-left relative shadow-xs"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 font-bold text-purple-900 text-[11px] uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0" />
          <span>
            Guide ({index + 1} of 3): {currentTip.title}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowTour(false);
            localStorage.setItem("mimotar_tour_dismissed", "true");
          }}
          className="text-purple-400 hover:text-purple-600 font-bold p-1 transition cursor-pointer"
          title="Dismiss guide tips"
          aria-label="Dismiss guide tips"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-purple-950 font-medium leading-relaxed mb-3">
        {currentTip.text}
      </p>

      <div className="flex justify-between items-center z-10">
        <button
          type="button"
          onClick={() => {
            setShowTour(false);
            localStorage.setItem("mimotar_tour_dismissed", "true");
          }}
          className="text-[10px] font-bold text-purple-500 hover:text-purple-700 transition cursor-pointer"
        >
          Dismiss Tutorial
        </button>

        <div className="flex gap-1.5">
          {index > 0 && (
            <button
              type="button"
              onClick={() => {
                if (index === 2) {
                  //   setStep(1);
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("step", "1");
                }
                setActiveTourIndex(index - 1);
              }}
              className="px-2.5 py-1 text-[10px] bg-white border border-purple-200 text-purple-700 rounded-lg font-bold hover:bg-purple-100/50 transition cursor-pointer"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (index < 2) {
                if (index === 1) {
                  //   setStep(2); // Automatically advance step to make sure they see the milestone toggle
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("step", "2");
                }
                setActiveTourIndex(index + 1);
              } else {
                setShowTour(false);
                localStorage.setItem("mimotar_tour_dismissed", "true");
              }
            }}
            className="px-3 py-1 text-[10px] bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-primary/95 transition cursor-pointer"
          >
            {index === 2 ? "Complete Guide" : "Next Tip"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
