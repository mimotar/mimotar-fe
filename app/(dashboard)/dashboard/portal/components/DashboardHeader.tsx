import { Plus } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function DashboardHeader({ firstName }: { firstName?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-h2 font-display text-gray-900 flex items-center gap-1.5 leading-tight">
          Welcome back, {firstName}
          <motion.span
            style={{
              display: "inline-block",
              transformOrigin: "bottom right",
            }}
            animate={{
              rotate: [0, 15, -10, 15, -10, 15, -10, 10, 0],
            }}
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
      </div>

      <Link
        href="/dashboard/start-project"
        className="bg-brand-primary hover:bg-brand-primary/95 text-white rounded-2xl px-6 py-3.5 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-magenta-200/50 text-center shrink-0 font-sans"
      >
        <Plus className="w-4 h-4" />
        Start Project
      </Link>
    </div>
  );
}
