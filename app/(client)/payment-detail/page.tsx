import { AiOutlineExclamationCircle } from "react-icons/ai";
import PaymentHowYouPayMethodSection from "./components/PaymentHowYouPayMethodSection";
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

  const Total = TicketResult.amount + 0;
  return (
    <section className="2xl:w-[80%] w-[90%] mx-auto h-full">
      <h1 className="font-semibold text-xl">Payment Summary</h1>
      {/* {JSON.stringify(TicketResult, null, 2)} */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full mt-6">
        {/* first grid */}
        <div className="flex flex-col rounded-md ">
          <h1 className="font-semibold text-lg p-2 bg-[#F8FAFC]">
            Payment details
          </h1>
          <div className="flex flex-col gap-4 p-4 bg-[#F1F5F9]">
            <div className="flex justify-between">
              <p className="text-neutral-500 font-semibold">Payment amount</p>
              <p>
                {TicketResult.currency} <strong>{TicketResult.amount}</strong>
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-neutral-500 font-semibold inline-flex gap-1 items-center">
                Escrow fee <AiOutlineExclamationCircle className="text-black" />
              </p>
              <p>
                {TicketResult.currency} <strong>{0}</strong>
              </p>
            </div>

            <hr />

            <p className="text-end text-neutral-500">
              Total amount to be paid to Mimotar
            </p>
            <p className="text-end ">
              <small>{TicketResult.currency}</small>{" "}
              <strong className="text-xl">{Total}</strong>
            </p>
          </div>
        </div>

        <PaymentHowYouPayMethodSection id={id} />
      </div>
    </section>
  );
}
