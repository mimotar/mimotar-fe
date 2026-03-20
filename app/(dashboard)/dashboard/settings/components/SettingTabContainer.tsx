"use client";

import { useSearchParams } from "next/navigation";
import Tab from "./Tabs";
import TransactionSetting from "./TransactionSetting";

export default function SettingTabContainer() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "transaction";
  return (
    <section className="w-full h-full flex flex-col">
      <Tab />

      {activeTab === "transaction" && <TransactionSetting />}
    </section>
  );
}
