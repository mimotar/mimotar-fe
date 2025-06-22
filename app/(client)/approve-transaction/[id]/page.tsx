import PrimaryButton from "@/app/commons/PrimaryButtons";
import SecondaryButton from "@/app/commons/SecondaryButton";
import ExpiryBox from "./components/ExpiryBox";
import Info from "../../../assets/icons/info.svg";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { getTransaction } from "./DAL/getTransaction";
import { ITicket } from "./types/ITransactionDetail";
import { formatDateWithOrdinal } from "@/app/utils/DatefnLib";
import AcceptRejectForm from "./components/AcceptRejectForm";

export default async function ApproveTransaction({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  let decodeToken:
    | string
    | (jwt.JwtPayload & {
        creator_email: string;
        reciever_email: string;
        transaction_id: number;
        iat: number;
        exp: number;
      }) = "";

  let isInvalid = false;
  try {
    decodeToken = jwt.verify(
      params.id,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload & {
      creator_email: string;
      reciever_email: string;
      transaction_id: number;
      iat: number;
      exp: number;
    };
  } catch (err: any) {
    isInvalid = err?.message || "token expired or web token error";
  }
  if (isInvalid) {
    return (
      <main className="px-5 lg:px-10 2xl:px-16 py-3 text-center">
        <h3 className="text-black font-semibold text-2xl">
          Invalid or Expired Link
        </h3>
        <p className="text-[#64748B] mt-2">
          The link you are trying to access is either invalid or has expired.
          Please check the link and try again.
        </p>
      </main>
    );
  }

  const transactionId =
    typeof decodeToken !== "string"
      ? decodeToken.transaction_id.toString()
      : "";

  const TicketResult: ITicket = await getTransaction(transactionId);

  return (
    <main className="px-5 lg:px-10 2xl:px-16 py-3 grid gap-14">
      <section className="flex flex-col-reverse md:flex-row w-full justify-between gap-3  md:items-center">
        <h3 className="text-black font-semibold text-2xl">
          Transaction Detail & Agreement
        </h3>
        {/* <pre>{JSON.stringify(TicketResult, null, 2)}</pre> */}
        <div className="flex items-center gap-2">
          <p className="text-[#64748B]"> This link will expire in:</p>
          <div className="flex items-center gap-2">
            <ExpiryBox amount={0} duration={"DAYS"} />
            <ExpiryBox amount={10} duration={"HOURS"} />
            <ExpiryBox amount={20} duration={"MINS"} />
          </div>
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-12 justify-between">
        <div className="w-full md:w-4/6 gap-14 grid ">
          <div className=" grid ">
            <div className="bg-[#F8FAFC] w-full px-6 rounded-tr-lg rounded-tl-lg py-4">
              <h4 className="text-black leading-5 text-xl">
                Transaction details
              </h4>
            </div>
            <div className="bg-[#F1F5F9] w-full rounded-bl-lg rounded-br-lg px-6 py-4 grid gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    First transactor
                  </h5>
                  <p className="text-[#0F172A] font-semibold">
                    {" "}
                    {TicketResult.creator_fullname}{" "}
                  </p>
                  <p className="text-[#0F172A] font-normal">
                    {TicketResult.creator_email}
                  </p>
                  <p className="text-[#0F172A] font-normal">
                    {TicketResult.creator_no}
                  </p>
                </div>
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Second transactor
                  </h5>
                  <p className="text-[#0F172A] font-semibold">
                    {" "}
                    {TicketResult.receiver_fullname}
                  </p>
                  <p className="text-[#0F172A] font-normal">
                    {TicketResult.reciever_email}
                  </p>
                  <p className="text-[#0F172A] font-normal">
                    {TicketResult.receiver_no}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Transaction description
                  </h5>
                  <p className="text-[#0F172A] font-normal">
                    {TicketResult.transaction_description}
                  </p>
                </div>
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Amount
                  </h5>
                  <p className="text-[#0F172A] font-normal">
                    {" "}
                    NGN {TicketResult.amount}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Transaction ID
                  </h5>
                  <p className="text-[#0F172A] font-normal">
                    {" "}
                    {TicketResult.id}
                  </p>
                </div>
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Date
                  </h5>
                  <p className="text-[#0F172A] font-normal">
                    {" "}
                    {formatDateWithOrdinal(new Date(TicketResult.created_at))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" grid">
            <div className="bg-[#F8FAFC] w-full px-6 rounded-tr-lg rounded-tl-lg py-4">
              <h4 className="text-black leading-5 text-xl">
                {" "}
                Transaction agreement
              </h4>
            </div>
            <div className="bg-[#F1F5F9] w-full rounded-bl-lg rounded-br-lg px-6 py-4 grid gap-8">
              <div className="">
                <span className="flex items-center gap-1">
                  Who will pay the escrow fee?
                  <button title="Here is the information" className="">
                    {" "}
                    <Info />{" "}
                  </button>
                </span>
                <p className=" font-semibold">
                  {/* Both (50% - 50%)  */}
                  {TicketResult.pay_escrow_fee}
                </p>
              </div>
              <div className="">
                <span className="flex items-center gap-1">
                  How long is the inspection period?
                  <button title="Here is the information" className="">
                    {" "}
                    <Info />{" "}
                  </button>
                </span>
                <p className=" font-semibold">
                  {TicketResult.inspection_duration} day(s)
                </p>
              </div>
              <div className="">
                <span className="flex items-center gap-1">
                  Who will pay shipping costs?
                  <button title="Here is the information" className="">
                    {" "}
                    <Info />{" "}
                  </button>
                </span>
                <p className=" font-semibold">
                  {TicketResult.pay_shipping_cost}
                </p>
              </div>
              <div className="">
                <span className="flex items-center gap-1">
                  Additional agreement
                  <button title="Here is the information" className="">
                    {" "}
                    <Info />{" "}
                  </button>
                </span>
                <p className=" font-semibold">
                  {TicketResult.additional_agreement ||
                    "No additional agreement"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 px-6 w-full md:w-2/6 bg-[#F8FAFC] gap-4 grid rounded-lg h-full lg:max-h-[500px]">
          <p className="font-normal text-black text-lg">
            Please check that the information provided for the transaction are
            correct and that you accept the transaction agreement
          </p>

          <AcceptRejectForm id={TicketResult.id} />
        </div>
      </section>
    </main>
  );
}
