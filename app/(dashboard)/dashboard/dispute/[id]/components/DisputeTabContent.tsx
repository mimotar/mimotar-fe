import type { Dispute, DisputeTabKey } from "../types/dispute";
import DetailsTabContent from "./DetailsTabContent";
import ProgressTabContent from "./ProgressTabContent";

interface DisputeTabContentProps {
  activeTab: DisputeTabKey;
  data: Dispute;
}

export default function DisputeTabContent({
  activeTab,
  data,
}: DisputeTabContentProps) {
  if (activeTab === "progress") {
    return <ProgressTabContent />;
  }

  return (
    <DetailsTabContent
      // transactionSummary={data.transactionSummary}
      disputeSummary={data}
    />
  );
}
