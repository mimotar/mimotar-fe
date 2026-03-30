import type { ProgressEvent } from "../types/dispute";
import ProgressTimelineItem from "./ProgressTimelineItem";

interface ProgressTabContentProps {
  events?: ProgressEvent[];
}

export default function ProgressTabContent({
  events,
}: ProgressTabContentProps) {
  return (
    <section className="mt-12 flex flex-col gap-8">
      {/* {events.map((event, index) => ( */}
      <ProgressTimelineItem
      // key={event.id}
      // event={event}
      // isLast={index === events.length - 1}
      />
      {/* ))} */}
    </section>
  );
}
