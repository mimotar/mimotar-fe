"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Tab() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "transaction";

  const baseStyle = "text-[#475569] pb-2";
  const activeStyle =
    "text-brand-primary font-bold border-b-2 border-brand-primary pb-2";
  return (
    <section className="flex gap-6 border-b border-[#E2E8F0] w-full items-center mt-4">
      <Link
        href="?tab=transaction"
        className={activeTab === "transaction" ? activeStyle : baseStyle}
      >
        Transactions
      </Link>

      {/* <Link
        href="?tab=security"
        className={activeTab === "security" ? activeStyle : baseStyle}
      >
        Security
      </Link> */}

      <Link
        href="?tab=manage"
        className={activeTab === "manage" ? activeStyle : baseStyle}
      >
        Manage account
      </Link>
    </section>
  );
}
