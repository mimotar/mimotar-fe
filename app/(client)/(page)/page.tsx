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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <section
        className={`flex justify-between gap-9 w-[80%] mx-auto py-14 px-14 ${dotsbgstyle.dotbg}`}
      >
        <div className="w-[60%] h-fit">
          <h3 className="lg:text-[56px]  text-3xl leading-none font-bold">
            Securely buy, sell, and close deals with ease{" "}
          </h3>
          <p className="text-base my-[30px] lg:w-[450px]">
            No more worries about scams or fake deals. With Mimotar, a safe deal
            is sure
          </p>

          <div className="flex gap-6">
            <SecondaryButton type="button" className="w-[143px] h-[64px]">
              Register
            </SecondaryButton>

            <Link href={"/generate-link"}>
              <PrimaryButton type="button">Get paid/Pay someone</PrimaryButton>
            </Link>
          </div>
        </div>

        <div className="w-[40%] h-full relative block">
          <Image
            src={Images.banner}
            alt="banner"
            // fill
            height={412}
            width={392}
            // sizes="100vw"
            className="object-cover h-[412px] w-[392px]"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </section>

      <section className="flex flex-col items-center  w-full py-10 px-20 min-[2000px]:px-[15%]">
        <p className="text-2xl font-medium lg:w-[70%]  text-center">
          Step into a world of seamless business transactions, powered by an
          escrow platform designed to safeguard and secure your deals{" "}
        </p>

        <div className="flex justify-between lg:w-[80%] w-full mt-12">
          <div className="flex flex-col items-center w-full">
            <div className="md:w-40 md:h-36 w-32 h-28 flex flex-col items-center">
              {/* <img src="" alt="" height={144} width={160} /> */}
              <MonitorIcon className="" />
            </div>
            <p className="text-center">Real-time monitoring</p>
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="md:w-40 md:h-36 w-32 h-28 flex flex-col items-center">
              <VerifyIcon className="" />
            </div>
            <p className="text-center">Verification of claims</p>
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="md:w-40 md:h-36 w-32 h-28 flex flex-col items-center">
              <SafetyIcon className="" />
            </div>
            <p className="text-center">Safety of both buyer and seller</p>
          </div>
        </div>
        {/* 
        <div className="w-[80%] flex justify-center mt-11"> */}
        <PrimaryButton type="button" className=" mt-11  w-[270px] h-[64px]">
          Get paid/Pay someone
        </PrimaryButton>
        {/* </div> */}
      </section>

      <section className="flex flex-col items-center w-[80%]">
        <h2 className="text-[32px] self-start my-10 font-bold">How it Works</h2>

        {/* organogram */}
        {/* <div className="flex flex-col -space-y-10">
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
        </div> */}
        <Image
          src={gif}
          alt=""
          unoptimized={true}
          sizes="100vw"
          // Make the image display full width
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <PrimaryButton type="button" className="my-11">
          Try it out
        </PrimaryButton>
      </section>

      <section className="flex bg-[#F8FAFC] w-full py-16">
        <section className="lg:w-[80%] w-[90%] gap-6 mx-auto flex items-center relative">
          <div className="w-full h-[412px] relative block">
            <Image
              src={Images.transactionStepImg}
              fill
              sizes="100vw"
              alt=""
              className="object-cover z-50"
            />
          </div>
          <AbsoluteSmalldots className="absolute -left-16 -top-12" />
          <div className="flex justify-center flex-col w-full h-full">
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
                className="mt-11 w-[270px] h-[64px]"
              >
                Get in touch
              </SecondaryButton>
            </div>
          </div>
        </section>
      </section>

      <section className="flex flex-col py-11 justify-center items-center w-full px-2">
        <h2 className="text-3xl  font-bold text-center">
          Complete a safe deal today with Mimotar
        </h2>
        <p className="text-lg mt-3">
          Get up and running in less than 5 minutes
        </p>
        <PrimaryButton type="button" className="mt-9">
          Get paid/Pay someone
        </PrimaryButton>
      </section>
      <Footer />
    </main>
  );
}
