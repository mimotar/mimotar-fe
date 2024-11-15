"use client";

import { dashboardLeftPanelData } from "@/app/data/dashboardLeftpanelData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftPanel() {
  const location = usePathname();
  return (
    <section className="flex flex-col space-y-5 p-5 ">
      {dashboardLeftPanelData.map((data, i) => (
        <Link
          href={data.link}
          key={i}
          className={`flex items-center gap-2 rounded-md  ${
            location === data.link
              ? "font-bold text-primary"
              : "text-neutral-900"
          }`}
        >
          <span>{data.icon}</span> {data.label}
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
