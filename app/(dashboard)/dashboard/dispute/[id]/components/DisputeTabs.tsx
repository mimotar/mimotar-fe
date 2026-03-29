import Link from "next/link";

import type { DisputeTabKey } from "../types/dispute";

interface DisputeTabsProps {
  activeTab: DisputeTabKey;
  disputeId: string;
}

export default function DisputeTabs({ activeTab, disputeId }: DisputeTabsProps) {
  const baseStyle = "text-[#64748B] pb-3 text-2xl font-medium";
  const activeStyle =
    "text-brand-primary font-bold border-b-4 border-[#D946EF] pb-3 text-2xl";

  return (
    <nav className="flex items-center gap-8 border-b border-[#CBD5E1]">
      <Link
        href={`/dashboard/dispute/${disputeId}?tab=details`}
        className={activeTab === "details" ? activeStyle : baseStyle}
      >
        Details
      </Link>
      <Link
        href={`/dashboard/dispute/${disputeId}?tab=progress`}
        className={activeTab === "progress" ? activeStyle : baseStyle}
      >
        Progress
      </Link>
    </nav>
  );
}
