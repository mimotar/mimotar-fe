"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TabSection() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  const baseStyle = "text-[#475569] pb-2";
  const activeStyle =
    "text-brand-primary font-bold border-b-2 border-brand-primary pb-2";
  return (
    <section className="flex gap-6 border-b border-[#E2E8F0] w-full items-center mt-4">
      <Link
        href="?tab=general"
        className={activeTab === "general" ? activeStyle : baseStyle}
      >
        General
      </Link>

      <Link
        href="?tab=disputes"
        className={activeTab === "disputes" ? activeStyle : baseStyle}
      >
        Disputes
      </Link>
    </section>
  );
}
