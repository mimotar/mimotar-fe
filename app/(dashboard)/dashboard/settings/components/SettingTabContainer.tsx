"use client";

import { useSearchParams } from "next/navigation";
import ManageAccountContent from "./ManageAccountContent";
import SecurityContent from "./SecurityContent";
import Tab from "./Tabs";
import TransactionSetting from "./TransactionSetting";

export default function SettingTabContainer() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "transaction";

  return (
    <section className="w-full h-full flex flex-col overflow-y-auto">
      <Tab />

      {activeTab === "transaction" && <TransactionSetting />}
      {/* {activeTab === "security" && <SecurityContent />} */}
      {activeTab === "manage" && <ManageAccountContent />}
    </section>
  );
}
