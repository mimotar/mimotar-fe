"use client";

import Link from "next/link";
import LogoIcon from "../svgIconComponent/Logo";
import Button from "./PrimaryButtons";
import PrimaryButton from "./PrimaryButtons";
import { usePathname } from "next/navigation";
import SecondaryButton from "./SecondaryButton";

export default function HomeNavbar() {
  const pathname = usePathname();
  return (
    <section className="flex justify-between items-center ">
      <LogoIcon className="" />
      <span className="flex gap-10">
        <Link
          className={`text-[#0F172A] hover:font-bold ${
            pathname === "/" ? "text-[#86198F] font-bold" : ""
          }`}
          href={"/"}
        >
          Escrow
        </Link>

        <Link className="text-[#0F172A]" href={""}>
          How it Works
        </Link>
        <Link className="text-[#0F172A]" href={""}>
          Resources
        </Link>
        <Link className="text-[#0F172A]" href={""}>
          Contact us
        </Link>
      </span>

      <div className="flex gap-10 ">
        <SecondaryButton
          type="button"
          text="Login"
          className="w-[118px] h-[48px]"
        />
        {/* <PrimaryButton
          type="button"
          text="Register"
          className="bg-[#334155] hover:bg-[#25303f]"
        /> */}
        <PrimaryButton
          type="button"
          text="Register"
          className="w-[118px] h-[48px]"
        />
      </div>
    </section>
  );
}
