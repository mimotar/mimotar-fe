import DisputeHeader from "./components/DisputeHeader";
import DisputeTabContent from "./components/DisputeTabContent";
import DisputeTabs from "./components/DisputeTabs";
import { parseDisputeTab } from "./schema/tab";
import { getDispute } from "./actions/GetDispute";
import { GetDisputeResponse } from "./types/dispute";

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

  const disputeData = (await getDispute(id)) as GetDisputeResponse;

  console.log("Dispute Data:", disputeData);

  return (
    <main className="flex h-full overflow-y-auto w-full flex-col gap-7 rounded-md bg-white p-4 sm:p-6">
      <DisputeHeader
        disputeId={disputeData.payload.id}
        dispute={disputeData?.payload}
      />

      <div className="flex flex-col gap-7">
        <DisputeTabs
          activeTab={activeTab}
          disputeId={disputeData?.payload?.id}
        />
      </div>

      <DisputeTabContent activeTab={activeTab} data={disputeData.payload} />
    </main>
  );
}
