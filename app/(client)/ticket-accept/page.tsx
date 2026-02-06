import VerifyIcon from "@/app/svgIconComponent/VerifyIcon";
import Link from "next/link";
import NotifyInfo from "./component/NotifyInfo";
import { getTransaction } from "../approve-transaction/[id]/DAL/getTransaction";
import { ITicket } from "../approve-transaction/[id]/types/ITransactionDetail";
import { notFound } from "next/navigation";
import NotApproveTicket from "@/app/commons/NotApproveTicket";
import ExpireTicket from "@/app/commons/ExpireTicket";

export default async function page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id || "";

  const TicketResult: ITicket = await getTransaction(id);
  if (!TicketResult) {
    notFound();
  }
  if (TicketResult.status !== "APPROVED") {
    return <NotApproveTicket />;
  }

  if (new Date(TicketResult.expiresAt) < new Date()) {
    return <ExpireTicket />;
  }

  return (
    <section className="flex flex-col h-full w-full justify-center items-center gap-4 relative p-4">
      <NotifyInfo />

      <VerifyIcon className="w-16 h-16" />
      <h1 className="text-2xl font-bold">Transaction agreement accepted!</h1>
      {/* {JSON.stringify(TicketResult, null, 2)} */}
      <p className="text-sm text-black/90 text-center">
        You can start funding the escrow account while we inform the <br />
        other transactor that the deal is good to go!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Link
          href="/"
          className="p-3 text-center text-[#A21CAF] hover:text-[#F8FAFC] font-bold border-[#D946EF] border-2 bg-white rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF]  focus:bg-[#A21CAF] "
        >
          Go back home
        </Link>

        <Link
          href={`/payment-detail?id=${id}`}
          className="p-3 text-center text-[#F8FAFC] hover:text-[#F8FAFC]  bg-[#A21CAF] rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF]  focus:bg-[#A21CAF] "
        >
          Start escrow payment
        </Link>
      </div>
    </section>
  );
}
