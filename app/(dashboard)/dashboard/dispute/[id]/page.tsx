import DisputeHeader from "./components/DisputeHeader";
import DisputeTabContent from "./components/DisputeTabContent";
import DisputeTabs from "./components/DisputeTabs";
import NegotiationCountdown from "./components/NegotiationCountdown";
import { getDisputeMockData } from "./schema/mockData";
import { parseDisputeTab } from "./schema/tab";

interface DisputePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string | string[] }>;
}

export default async function DisputePage({
  params,
  searchParams,
}: DisputePageProps) {
  const { id } = await params;
  const query = await searchParams;

  const activeTab = parseDisputeTab(query.tab);
  const disputeData = getDisputeMockData(id);

  return (
    <main className="flex h-full w-full flex-col gap-7 rounded-md bg-white p-4 sm:p-6">
      <DisputeHeader disputeId={disputeData.id} status={disputeData.status} />

      <div className="flex flex-col gap-7">
        <NegotiationCountdown countdown={disputeData.countdown} />
        <DisputeTabs activeTab={activeTab} disputeId={disputeData.id} />
      </div>

      <DisputeTabContent activeTab={activeTab} data={disputeData} />
    </main>
  );
}
