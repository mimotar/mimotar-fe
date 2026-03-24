"use client";

import { dashboardLeftPanelData } from "@/app/data/dashboardLeftpanelData";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LeftPanelProps {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}

export default function LeftPanel({
  className,
  linkClassName,
  onNavigate,
}: LeftPanelProps) {
  const location = usePathname();
  return (
    <section className={`flex flex-col space-y-5 p-5 ${className ?? ""}`}>
      {dashboardLeftPanelData.map((data) => (
        <Link
          href={data.link}
          key={data.link}
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-md ${
            location === data.link
              ? "font-bold text-brand-primary"
              : "text-neutral-900"
          } ${linkClassName ?? ""}`}
        >
          {data.icon} {data.label}
        </Link>
      ))}

      {/* <button
        className={`flex items-center gap-2 p-3 rounded-md font-bold text-[#737171]`}
      >
        <span>
          <SignOutIcon className="size-6" />
        </span>
        Logout
      </button> */}
    </section>
  );
}
