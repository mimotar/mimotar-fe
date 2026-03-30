import type { ProgressEvent } from "../types/dispute";

interface ProgressTimelineItemProps {
  event?: ProgressEvent;
  isLast?: boolean;
}

export default function ProgressTimelineItem({
  event,
  isLast,
}: ProgressTimelineItemProps) {
  // const markerColor = event.color === "accent" ? "bg-[#EAB308]" : "bg-[#94A3B8]";

  return (
    <main className="grid  grid-cols-1 gap-4">
      <section className="inline-flex items-center gap-4">
        <div className="w-60   pr-2  text-base text-[#475569]">
          <span>03 Sept, 2024 </span>
          <span className="ml-3">08:22 AM </span>
        </div>

        <div className="flex flex-col items-center">
          <span className={`relative z-10 h-3 w-3 rounded-full bg-amber-600`} />
          {!isLast ? <span className="h-full w-px bg-[#CBD5E1]" /> : null}
        </div>

        <p className="text-base font-medium text-[#1E293B]">In negotiation</p>
      </section>
    </main>
  );
}
