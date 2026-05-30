import VerifyIcon from "@/app/svgIconComponent/VerifyIcon";
import Link from "next/link";
import NotifyInfo from "./component/NotifyInfo";
import { getTransaction } from "../approve-transaction/[id]/actions/getTransaction";
import { ITicket } from "../approve-transaction/[id]/types/ITransactionDetail";
import { notFound } from "next/navigation";
import NotApproveTicket from "@/app/commons/NotApproveTicket";
import ExpireTicket from "@/app/commons/ExpireTicket";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const id = (await searchParams).id;

  console.log("id", id);

  const TicketResult: ITicket = await getTransaction(Number(id));
  console.log(TicketResult);
  if (!id) {
    notFound();
  }

  if (TicketResult.status === "REJECTED") {
    return (
      <div className="w-full px-4 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-red-200 bg-red-50 p-5 sm:p-6 md:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M5.455 19h13.09c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.723 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-red-700 sm:text-xl md:text-2xl">
              Ticket Rejected
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              This ticket has been reviewed and was not approved. Please review
              the details below for the reason provided by the reviewer/other
              party.
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-red-100 bg-white p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Rejection Reason
            </p>

            <p className="mt-3 break-words text-sm leading-relaxed text-slate-700 sm:text-base">
              {TicketResult.rejection_reason || "No reason was provided."}
            </p>
          </div>
        </div>
      </div>
    );
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
