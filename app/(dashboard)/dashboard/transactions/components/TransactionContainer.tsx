"use client";

import { useSearchParams } from "next/navigation";
import TabSection from "./TabSection";
import DisputeTab from "./DisputeTab";
import TransactionTab from "./TransactionTab";
import { useFetch } from "@/app/hooks/useFetch";

export default function TransactionContainer() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "general";

  const { data, isLoading, isError, error } = useFetch(
    ["transactions"],
    "/ticket/transactions",
  );
  console.log(data);
  return (
    <section className="flex flex-col">
      <TabSection />
      {activeTab === "general" && <TransactionTab />}
      {activeTab === "disputes" && <DisputeTab />}
    </section>
  );
}
