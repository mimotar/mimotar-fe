import Image from "next/image";
import PrimaryButton from "./commons/PrimaryButtons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <section className="flex justify-between gap-9 w-[80%] mx-auto py-14 px-14">
        <div className="w-[60%] h-fit">
          <h3 className="text-[56px] leading-none font-bold">
            Securely buy, sell, and close deals with ease{" "}
          </h3>
          <p className="text-base my-[30px] w-[450px]">
            No more worries about scams or fake deals. With Mimotar, a safe deal
            is sure.
          </p>

          <div className="flex gap-6">
            <PrimaryButton
              type="button"
              text="Get paid/Pay someone"
              className="bg-[#334155] hover:bg-[#25303f]"
            />
            <PrimaryButton
              type="button"
              text="Register"
              className="border-2 border-[#334155] bg-transparent text-[#334155] hover:bg-gray-300 hover:text-black"
            />
          </div>
        </div>

        <div className="w-[40%] h-fit">
          <img src="" alt="" height={412} width={392} />
        </div>
      </section>

      <section className="flex flex-col items-center bg-[#D9D9D9] w-full py-10 px-20">
        <p className="text-[32px] text-center">
          Step into a world of seamless business transactions, powered by an
          escrow platform designed to safeguard and secure your deals{" "}
        </p>

        <div className="flex justify-between  w-[80%] mt-12">
          <div className="flex flex-col items-center">
            <div className="w-40 h-36 flex flex-col bg-gray-500">
              <img src="" alt="" height={144} width={160} />
            </div>
            <p>Real-time monitoring</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 h-36 flex flex-col bg-gray-500">
              <img src="" alt="" height={144} width={160} />
            </div>
            <p>Verification of claims</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 h-36 flex flex-col bg-gray-500">
              <img src="" alt="" height={144} width={160} />
            </div>
            <p>Safety of both buyer and seller</p>
          </div>
        </div>
        {/* 
        <div className="w-[80%] flex justify-center mt-11"> */}
        <PrimaryButton
          type="button"
          text="Get paid/Pay someone"
          className="bg-[#334155] hover:bg-[#25303f] mt-11"
        />
        {/* </div> */}
      </section>

      <section className="flex flex-col items-center w-[80%] py-10">
        <h2 className="text-[32px] self-start mb-7 font-bold">How it Works</h2>
        <PrimaryButton
          type="button"
          text="Try it out"
          className="bg-[#334155] hover:bg-[#25303f] mt-11"
        />
      </section>
    </main>
  );
}
