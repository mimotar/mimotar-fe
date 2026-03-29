import type { DisputePageViewModel, DisputeTabKey } from "../types/dispute";
import DetailsTabContent from "./DetailsTabContent";
import ProgressTabContent from "./ProgressTabContent";

interface DisputeTabContentProps {
  activeTab: DisputeTabKey;
  data: DisputePageViewModel;
}

export default function DisputeTabContent({
  activeTab,
  data,
}: DisputeTabContentProps) {
  if (activeTab === "progress") {
    return <ProgressTabContent events={data.progressEvents} />;
  }

  return (
    <DetailsTabContent
      transactionSummary={data.transactionSummary}
      disputeSummary={data.disputeSummary}
    />
  );
}
