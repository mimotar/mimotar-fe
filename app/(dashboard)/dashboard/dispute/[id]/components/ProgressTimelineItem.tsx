import type { ProgressEvent } from "../types/dispute";

interface ProgressTimelineItemProps {
  event: ProgressEvent;
  isLast: boolean;
}

export default function ProgressTimelineItem({
  event,
  isLast,
}: ProgressTimelineItemProps) {
  const markerColor = event.color === "accent" ? "bg-[#EAB308]" : "bg-[#94A3B8]";

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4">
      <div className="justify-self-end pr-2 text-right text-xl text-[#475569]">
        <span>{event.dateLabel}</span>
        <span className="ml-3">{event.timeLabel}</span>
      </div>

      <div className="flex min-h-[74px] flex-col items-center">
        <span className={`relative z-10 h-3 w-3 rounded-full ${markerColor}`} />
        {!isLast ? <span className="h-full w-px bg-[#CBD5E1]" /> : null}
      </div>

      <p className="text-3xl font-medium text-[#1E293B]">{event.title}</p>
    </div>
  );
}
