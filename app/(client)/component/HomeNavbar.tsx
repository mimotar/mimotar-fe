"use client";

import Link from "next/link";
import LogoIcon from "@/app/svgIconComponent/Logo";
import Button from "../../commons/PrimaryButtons";
import PrimaryButton from "../../commons/PrimaryButtons";
import { usePathname } from "next/navigation";
import SecondaryButton from "../../commons/SecondaryButton";

export default function HomeNavbar() {
  const pathname = usePathname();
  return (
    <section className="flex justify-between items-center">
      <LogoIcon className="text-sm md:w-auto md:h-auto w-28" />
      <span className="flex items-center justify-center min-[932px]:gap-10 gap-5">
        <Link
          className={`text-[#0F172A] hover:font-bold md:text-base text-sm ${
            pathname === "/" ? "text-[#86198F] font-bold" : ""
          }`}
          href={"/"}
        >
          Escrow
        </Link>

        <Link className="text-[#0F172A] md:text-base text-sm" href={""}>
          How it Works
        </Link>
        <Link className="text-[#0F172A] md:text-base text-sm" href={""}>
          Resources
        </Link>
        <Link
          className="text-[#0F172A] md:text-base text-sm md:block hidden"
          href={""}
        >
          Contact us
        </Link>
      </span>

      <div className="sm:flex hidden items-center min-[932px]:gap-10 gap-5  ">
        <SecondaryButton
          type="button"
          // text="Login"
          className="min-[932px]:w-[118px] min-[932px]:h-[48px] w-[80px] h-[35px]"
        >
          Login
        </SecondaryButton>

        <PrimaryButton
          type="button"
          className="min-[932px]:w-[118px] min-[932px]:h-[48px] w-[80px] h-[35px]"
        >
          Register
        </PrimaryButton>
      </div>
    </section>
  );
}
