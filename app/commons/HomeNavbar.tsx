"use client";

import Link from "next/link";
import LogoIcon from "../svgIconComponent/Logo";
// import Button from "./PrimaryButtons";
import PrimaryButton from "./PrimaryButtons";
import { usePathname } from "next/navigation";
import SecondaryButton from "./SecondaryButton";
import { Button } from "@/components/ui/button";

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
        <Link href={"/auth/login"}>
          <SecondaryButton
            type="button"
            // text="Login"
            className="min-[932px]:w-[118px] min-[932px]:h-[48px] w-[80px] h-[35px]"
          >
            Login
          </SecondaryButton>
        </Link>
        <Button className="text-[#F8FAFC] hover:text-[#F8FAFC]  rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF] active:font-bold focus:bg-[#A21CAF] focus:font-bold">
          fh
        </Button>
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
