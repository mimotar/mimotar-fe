import Image from "next/image";
import PrimaryButton from "./commons/PrimaryButtons";
import Footer from "./commons/Footer";
import SecondaryButton from "./commons/SecondaryButton";
import Organogram from "./svgIconComponent/Organogram";
import OrganogramTwo from "./svgIconComponent/OrganogramTwo";
import OrganogramThird from "./svgIconComponent/OrganogramThird";
import OrganogramFourth from "./svgIconComponent/OganogramFourth";
import OrganogramFifth from "./svgIconComponent/OganogramFifth";
import { Images } from "./Images";
import dotsbgstyle from "./moduleCss/dotsBgcss.module.css";
import MonitorIcon from "./svgIconComponent/MonitorIcon";
import VerifyIcon from "./svgIconComponent/VerifyIcon";
import SafetyIcon from "./svgIconComponent/SafetyIcon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <section
        className={`flex justify-between gap-9 w-[80%] mx-auto py-14 px-14 ${dotsbgstyle.dotbg}`}
      >
        <div className="w-[60%] h-fit">
          <h3 className="text-[56px] leading-none font-bold">
            Securely buy, sell, and close deals with ease{" "}
          </h3>
          <p className="text-base my-[30px] w-[450px]">
            No more worries about scams or fake deals. With Mimotar, a safe deal
            is sure
          </p>

          <div className="flex gap-6">
            <SecondaryButton
              type="button"
              text="Register"
              className="w-[143px] h-[64px]"
            />

            <PrimaryButton type="button" text="Get paid/Pay someone" />
          </div>
        </div>

        <div className="w-[40%] h-fit ">
          <img
            src={Images.banner}
            alt="banner"
            height={412}
            width={392}
            className="object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col items-center  w-full py-10 px-20">
        <p className="text-2xl font-medium w-[70%] text-center">
          Step into a world of seamless business transactions, powered by an
          escrow platform designed to safeguard and secure your deals{" "}
        </p>

        <div className="flex justify-between  w-[80%] mt-12">
          <div className="flex flex-col items-center">
            <div className="w-40 h-36 flex flex-col items-center">
              {/* <img src="" alt="" height={144} width={160} /> */}
              <MonitorIcon className="" />
            </div>
            <p>Real-time monitoring</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 h-36 flex flex-col items-center">
              <VerifyIcon className="" />
            </div>
            <p>Verification of claims</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 h-36 flex flex-col items-center">
              <SafetyIcon className="" />
            </div>
            <p>Safety of both buyer and seller</p>
          </div>
        </div>
        {/* 
        <div className="w-[80%] flex justify-center mt-11"> */}
        <PrimaryButton
          type="button"
          text="Get paid/Pay someone"
          className=" mt-11  w-[270px] h-[64px]"
        />
        {/* </div> */}
      </section>

      <section className="flex flex-col items-center w-[80%] ">
        <h2 className="text-[32px] self-start my-10 font-bold">How it Works</h2>

        {/* organogram */}
        <div className="flex flex-col -space-y-10">
          <div className="flex -space-x-10">
            <div className="relative">
              <p className="absolute top-32 w-52 left-10">
                Buyer and seller agree to terms of transaction
              </p>
              <OrganogramThird className="" />
            </div>
            <div className="relative">
              <p className="absolute top-16 w-52 left-24">
                Buyer makes payment to Mimotar
              </p>
              <OrganogramTwo />
            </div>

            <div className="relative">
              <p className="absolute top-16 w-52 left-24">
                Mimotar holds the payment until seller ships item
              </p>
              <Organogram />
            </div>
          </div>

          <div className="flex ">
            <div className="flex -space-x-10">
              <div className="relative">
                <p className="absolute bottom-16 w-52 left-24">
                  Buyer verifies the item received and confirms satisfaction
                </p>
                <OrganogramFourth />
              </div>
              <div className="self-end relative">
                <p className="absolute top-16 w-52 left-24">
                  Momotar releases payment to seller
                </p>
                <OrganogramFifth />
              </div>
            </div>

            <div className="w-16 h-16 bg-[#303030] self-end ml-5 -translate-y-11"></div>
          </div>
        </div>
        <PrimaryButton type="button" text="Try it out" className="my-11" />
      </section>

      <section className="flex bg-[#F8FAFC] w-full py-16">
        <section className="w-[80%] gap-6 mx-auto flex items-center">
          <div className="">
            <div className="w-[336px] h-[412px]">
              <img src={Images.transactionStepImg} alt="" />
            </div>
          </div>

          <div className="flex flex-col w-full h-full">
            <h2 className="font-bold text-3xl">
              Supporting your transaction every step of the way
            </h2>
            <p className="text-xl mt-6">
              Our customer support are a click away to help you get the most out
              of Mimotar, so you can go on with your day worry-free.
            </p>
            <div className="w-fit">
              <SecondaryButton
                type="button"
                text="Get in touch"
                className="mt-11 w-[270px] h-[64px]"
              />
            </div>
          </div>
        </section>
      </section>

      <section className="flex flex-col py-11 justify-center items-center w-full">
        <h2 className="text-3xl  font-bold">
          Complete a safe deal today with Mimotar
        </h2>
        <p className="text-lg mt-3">
          Get up and running in less than 5 minutes
        </p>
        <PrimaryButton
          type="button"
          text="Get paid/Pay someone"
          className="mt-9"
        />
      </section>
      <Footer />
    </main>
  );
}
