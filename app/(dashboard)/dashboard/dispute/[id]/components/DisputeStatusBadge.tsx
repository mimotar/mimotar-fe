import type { IDisputeStatus } from "../types/dispute";

interface DisputeStatusBadgeProps {
  status: IDisputeStatus;
}

export default function DisputeStatusBadge({
  status,
}: DisputeStatusBadgeProps) {
  const statusColors: Record<IDisputeStatus, string> = {
    ongoing: "text-[#EAB308]",
    resolved: "text-[#10B981]",
    cancelled: "text-[#EF4444]",
    review: "text-[#F59E0B]",
    negotiation: "text-[#EAB308]",
  };

  const bgDotColors: Record<IDisputeStatus, string> = {
    ongoing: "bg-[#EAB308]",
    resolved: "bg-[#10B981]",
    cancelled: "bg-[#EF4444]",
    review: "bg-[#F59E0B]",
    negotiation: "bg-[#EAB308]",
  };
  return (
    <div
      className={`inline-flex items-center gap-2 ${statusColors[status]}  w-fit`}
    >
      <span className={`h-2 w-2 rounded-full ${bgDotColors[status]}`} />
      <span className="text-lg font-medium">{status}</span>
    </div>
  );
}
