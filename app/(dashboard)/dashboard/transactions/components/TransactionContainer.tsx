"use client";

import { useSearchParams } from "next/navigation";
import TabSection from "./TabSection";
import DisputeTab from "./DisputeTab";
import TransactionTab from "./TransactionTab";

export default function TransactionContainer() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  return (
    <section className="flex flex-col">
      <TabSection />
      {activeTab === "general" && <TransactionTab />}
      {activeTab === "disputes" && <DisputeTab />}
    </section>
  );
}
