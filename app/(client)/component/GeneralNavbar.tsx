"use client";

import Link from "next/link";
import LogoIcon from "@/app/svgIconComponent/Logo";
import Button from "../../commons/PrimaryButtons";
import PrimaryButton from "../../commons/PrimaryButtons";
import { IoMdCart } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Input from "@/app/commons/Input";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiBars3 } from "react-icons/hi2";
import LeftPanel from "./LeftPanel";

import { useState } from "react";

export default function GeneralNavbar() {
  const [isOpenLeftPanel, setIsOpenLeftPanel] = useState(false);
  const pathname = usePathname();
  return (
    <section className="flex justify-between items-center">
      <Link href={"/"}>
        {" "}
        <LogoIcon className="" />
      </Link>

      <span className="flex items-center min-[1440px]:gap-10 gap-5">
        <Link
          className={`text-[#0F172A] min-w-fit text-base hover:text-slate-600 sm:flex hidden ${
            pathname === "/"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={"/"}
        >
          Escrow
        </Link>
        <Link
          className={`inline-flex items-center text-base hover:text-slate-600 text-[#0F172A] sm:flex hidden ${
            pathname === "/listings"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={"listings"}
        >
          Listings
          <IoMdArrowDropdown />
        </Link>

        <Link
          className={`text-[#0F172A] hover:text-slate-600 md:flex hidden ${
            pathname === "how-it-work"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={"how-it-work"}
        >
          How it Works
        </Link>

        <Link
          className={`text-[#0F172A] hover:text-slate-600 md:flex hidden ${
            pathname === "contact"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={"contact"}
        >
          Contact us
        </Link>

        <Input
          type="search"
          placeholder="Search item ..."
          wrapperClassName="min-[1440px]:flex hidden"
        />
      </span>

      <div className="flex items-center 2xl:gap-10 gap-5">
        <Link
          href={"cart"}
          className="min-[1440px]:flex items-center gap-2 font-bold hidden"
        >
          <IoMdCart />
          Cart
        </Link>
        <Link href={"auth/login"} className="flex items-center gap-2 font-bold">
          <IoMdPerson />
          Login or Register
        </Link>
        <HiBars3
          onClick={() => setIsOpenLeftPanel((prev) => !prev)}
          className="min-[1440px]:hidden flex cursor-pointer"
        />
      </div>

      <LeftPanel
        isOpen={isOpenLeftPanel}
        closeModal={() => setIsOpenLeftPanel(false)}
      />
    </section>
  );
}
