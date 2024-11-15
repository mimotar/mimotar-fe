import { AiOutlineExclamationCircle } from "react-icons/ai";
import PaymentHowYouPayMethodSection from "./components/PaymentHowYouPayMethodSection";

export default function page() {
  return (
    <section className="2xl:w-[80%] w-[90%] mx-auto h-full">
      <h1 className="font-semibold text-xl">Payment Summary</h1>
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
                NGN <strong>340,000</strong>
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-neutral-500 font-semibold inline-flex gap-1 items-center">
                Escrow fee <AiOutlineExclamationCircle className="text-black" />
              </p>
              <p>
                NGN <strong>500</strong>
              </p>
            </div>

            <hr />

            <p className="text-end text-neutral-500">
              Total amount to be paid to Mimotar
            </p>
            <p className="text-end ">
              <small>NGN</small> <strong className="text-xl">340,500</strong>
            </p>
          </div>
        </div>

        <PaymentHowYouPayMethodSection />
      </div>
    </section>
  );
}
