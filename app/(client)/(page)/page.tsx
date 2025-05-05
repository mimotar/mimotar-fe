import Image from "next/image";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import Footer from "../component/Footer";
import SecondaryButton from "@/app/commons/SecondaryButton";
import { Images } from "../../Images";

import dotsbgstyle from "../../moduleCss/dotsBgcss.module.css";
import MonitorIcon from "@/app/svgIconComponent/MonitorIcon";
import VerifyIcon from "@/app/svgIconComponent/VerifyIcon";
import SafetyIcon from "@/app/svgIconComponent/SafetyIcon";
// import gif from "./assets/gif/How_it_works.gif";
import gif from "../../assets/gif/How_it_works.gif";
// import Dotsbg from "@/app/svgIconComponent/Dotsbg";
import Dotsbg from "../../svgIconComponent/Dotsbg";
import AbsoluteSmalldots from "@/app/svgIconComponent/AbsoluteSmalldots";
import Link from "next/link";
import AuthForm from "@/app/auth/AuthForm";
import DealBtns from "../component/DealBtns";
import TestingUserSessionComponent from "../component/TestingUserSessionComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <section className={`${dotsbgstyle.dotbg}`}>
        <div
          className={`grid md:grid-cols-2 grid-cols-1 gap-10 w-[90%] mx-auto md:py-14 py-5 `}
        >
          <div className=" w-full h-full flex flex-col justify-center">
            {/* min-[1300px]:text-[56px] md:text-3xl sm:text-4xl text-3xl */}
            <h3 className=" sm:text-5xl text-4xl font-semibold">
              Securely buy, sell, and close deals with ease{" "}
            </h3>

            {/* lg:w-[450px] */}
            <p className="text-xl my-[30px] ">
              No more worries about scams or fake deals. With Mimotar, a safe
              deal is sure.
            </p>
            <DealBtns />
          </div>

          <div className="  w-full h-full relative block">
            <img
              src={Images.banner}
              alt="banner"
              className="object-cover rounded-bl-lg rounded-tr-lg"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      </section>
      {/* py-10 sm:px-20 px-5 min-[2000px]:px-[15%] */}

      {/* <TestingUserSessionComponent /> */}
      <section className="flex flex-col items-center  w-full py-10 px-5  bg-neutral-50">
        <p className="lg:text-2xl text-lg font-bold lg:w-[70%]  text-center">
          Step into a world of seamless business transactions, powered by an
          escrow platform designed to safeguard and secure your deals
        </p>

        <div className=" grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:w-[90%] w-full mt-12">
          <div className="flex flex-col items-center w-full">
            <div className="md:w-40 md:h-36 w-32 h-28 flex flex-col items-center">
              {/* <img src="" alt="" height={144} width={160} /> */}
              <MonitorIcon className="" />
            </div>
            <p className="text-center lg:text-xl text-lg font-bold mt-3">
              Real-time monitoring
            </p>

            <p className="text-center text-base mt-1">
              Track your transactions in real-time, with instant updates on
              payment processing and status. Stay informed and in control
              throughout the entire process.
            </p>
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="md:w-40 md:h-36 w-32 h-28 flex flex-col items-center">
              <VerifyIcon className="" />
            </div>
            <p className="text-center lg:text-xl text-lg font-bold mt-3">
              Verification of claims
            </p>
            <p className="text-center text-base mt-1">
              We thoroughly verify claims to ensure accuracy and legitimacy,
              giving you peace of mind and protection from disputes. Only
              verified claims are processed, guaranteeing a secure transaction.
            </p>
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="md:w-40 md:h-36 w-32 h-28 flex flex-col items-center">
              <SafetyIcon className="" />
            </div>
            <p className="text-center lg:text-xl text-lg font-bold mt-3">
              Safety of both buyer and seller
            </p>
            <p className="text-center text-base mt-1">
              Our secure platform protects sensitive information and ensures
              payments are only released when obligations are met. Buyers and
              sellers can transact with confidence, knowing their interests are
              safeguarded.
            </p>
          </div>
        </div>
        {/* 
        <div className="w-[80%] flex justify-center mt-11"> */}
        <PrimaryButton type="button" className=" mt-11  w-[270px] h-[64px]">
          Get paid/Pay someone
        </PrimaryButton>
        {/* </div> */}
      </section>

      <section className="flex flex-col items-center">
        <h2 className="sm:text-[32px] text-2xl self-start my-10 font-bold ml-16">
          How it Works
        </h2>

        <Image
          src={gif}
          alt=""
          unoptimized={true}
          sizes="100vw"
          // Make the image display full width
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <PrimaryButton type="button" className="my-11">
          Try it out
        </PrimaryButton>
      </section>

      <section className="flex bg-neutral-50 w-full py-16">
        <section className="lg:w-[80%] w-[90%] gap-6 mx-auto flex md:flex-row flex-col items-center relative">
          <div className="w-full h-[412px] relative block sm:mt-0 mt-16 sm:order-1 order-2">
            <Image
              src={Images.transactionStepImg}
              fill
              sizes="100vw"
              alt=""
              className="object-cover z-50"
            />
          </div>
          <AbsoluteSmalldots className="absolute -left-16 sm:-top-12 top-80" />
          <div className="flex justify-center flex-col w-full md:h-full sm:order-2 order-1">
            <h2 className="font-bold sm:text-3xl text-2xl">
              Supporting your transaction every step of the way
            </h2>
            <p className="sm:text-lg text-base mt-6">
              Our customer support are a click away to help you get the most out
              of Mimotar, so you can go on with your day worry-free.
            </p>
            <div className="w-fit">
              <PrimaryButton type="button" className="mt-11 w-[270px] h-[64px]">
                Get in touch
              </PrimaryButton>
            </div>
          </div>
        </section>
      </section>

      <section className="flex flex-col py-11 justify-center items-center w-full ">
        <div className="rounded-lg flex flex-col justify-center sm:p-10 p-4 items-center w-[90%] sm:w-[80%] bg-neutral-50">
          <h2 className="sm:text-3xl text-xl  font-bold text-center ">
            Complete a safe deal today with Mimotar
          </h2>
          <p className="sm:text-lg text-base mt-3 text-center">
            Get up and running in less than 5 minutes
          </p>
          <PrimaryButton type="button" className="mt-9">
            Get paid/Pay someone
          </PrimaryButton>
        </div>
      </section>
      <Footer />
    </main>
  );
}
