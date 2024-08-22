import "../../../app/globals.css";
import LogoIcon from "@/app/svgIconComponent/Logo";
import Link from "next/link";
import { ReactNode } from "react";

export default function ForgetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="px-10 w-full py-4">
        <LogoIcon className="w-36 h-8" />
      </div>
      <hr className="mb-12" />
      {/* h-[calc(100%-112px)] */}
      {/* <div className="flex flex-col justify-center items-center"> */}
      {children}
      {/* </div> */}

      <section className="flex sm:px-10 px-5 justify-between items-center text-neutral-50 text-sm bg-[#0F172A] sm:h-28 h-14 w-full mt-auto p-6">
        <span>&copy; {new Date().getFullYear()} Mimotar.</span>
        <Link href="" className="">
          Contact us
        </Link>
      </section>
    </section>
  );
}
