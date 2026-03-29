import type { DisputeStatus } from "../types/dispute";

interface DisputeStatusBadgeProps {
  status: DisputeStatus;
}

export default function DisputeStatusBadge({ status }: DisputeStatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 text-[#EAB308]">
      <span className="h-2 w-2 rounded-full bg-[#EAB308]" />
      <span className="text-xl font-medium">{status}</span>
    </div>
  );
}
