import PrimaryButton from "../../commons/PrimaryButtons";
import SecondaryButton from "../../commons/SecondaryButton";
import ExpiryBox from "./ExpiryBox";
import Info from "../../assets/icons/info.svg";

export default function TransactionDetail() {
  return (
    <main className="px-5 lg:px-10 2xl:px-16 py-3 grid gap-14">
      <section className="flex flex-col-reverse md:flex-row w-full justify-between gap-3  md:items-center">
        <h3 className="text-black font-semibold text-2xl">
          Transaction Detail & Agreement
        </h3>
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
                {" "}
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
                  <p className="text-[#0F172A] font-semibold"> Salisu Isa </p>
                  <p className="text-[#0F172A] font-normal">
                    {" "}
                    salisuisa@gmail.com{" "}
                  </p>
                  <p className="text-[#0F172A] font-normal">
                    {" "}
                    +234 806 566 5461
                  </p>
                </div>
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Second transactor
                  </h5>
                  <p className="text-[#0F172A] font-semibold"> Olawale Ade </p>
                  <p className="text-[#0F172A] font-normal">
                    {" "}
                    olawale02@gmail.com
                  </p>
                  <p className="text-[#0F172A] font-normal">
                    {" "}
                    +234 806 566 5461
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
                    Purchase of a HP Elitebook 820 UK-used laptop
                  </p>
                </div>
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Amount
                  </h5>
                  <p className="text-[#0F172A] font-normal"> NGN 340,000 </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Transaction ID
                  </h5>
                  <p className="text-[#0F172A] font-normal">60024321</p>
                </div>
                <div className="flex flex-col justify-start gap-1">
                  <h5 className="text-[#64748B] font-semibold text-lg">
                    {" "}
                    Date
                  </h5>
                  <p className="text-[#0F172A] font-normal"> 5th June 2024</p>
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
                <p className=" font-semibold"> Both (50% - 50%)</p>
              </div>
              <div className="">
                <span className="flex items-center gap-1">
                  How long is the inspection period?
                  <button title="Here is the information" className="">
                    {" "}
                    <Info />{" "}
                  </button>
                </span>
                <p className=" font-semibold"> 3 days</p>
              </div>
              <div className="">
                <span className="flex items-center gap-1">
                  Who will pay shipping costs?
                  <button title="Here is the information" className="">
                    {" "}
                    <Info />{" "}
                  </button>
                </span>
                <p className=" font-semibold"> Seller (100%)</p>
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
                  During the inspection or testing period, buyer should test the
                  laptop carefully as I wont accept it back if there is any dent
                  or external issues.
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
          <PrimaryButton className="w-full">Accept agreement</PrimaryButton>
          <label htmlFor="" className="flex gap-2 items-center">
            <input type="checkbox" className="" />
            <p className="text-xs font-semibold">
              {" "}
              I agree to the Mimotar Terms of Service and Privacy Policy
            </p>
          </label>
          <hr className="w-full" />
          <SecondaryButton className="h-14 md:h-auto">
            Cancel Agreement
          </SecondaryButton>
        </div>
      </section>
    </main>
  );
}
