"use client";

import Link from "next/link";
import LogoIcon from "../svgIconComponent/Logo";
import Button from "./PrimaryButtons";
import PrimaryButton from "./PrimaryButtons";
import { IoMdCart } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Input from "./Input";
import { IoMdArrowDropdown } from "react-icons/io";

export default function GeneralNavbar() {
  const pathname = usePathname();
  return (
    <section className="flex justify-between items-center">
      <Link href={"/"}>
        {" "}
        <LogoIcon className="" />
      </Link>

      <span className="flex items-center gap-10">
        <Link
          className={`text-[#0F172A] min-w-fit text-base hover:text-slate-600  ${
            pathname === "/"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={"/"}
        >
          Escrow
        </Link>
        <Link
          className={`inline-flex items-center text-base hover:text-slate-600 text-[#0F172A] ${
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
          className={`text-[#0F172A] hover:text-slate-600 ${
            pathname === "how-it-work"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={"how-it-work"}
        >
          How it Works
        </Link>

        <Link
          className={`text-[#0F172A] hover:text-slate-600 ${
            pathname === "contact"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={"contact"}
        >
          Contact us
        </Link>

        <Input type="search" placeholder="Search item ..." />
      </span>

      <div className="flex gap-10">
        <Link href={"cart"} className="flex items-center gap-2 font-bold">
          <IoMdCart />
          Cart
        </Link>
        <Link href={"login"} className="flex items-center gap-2 font-bold">
          <IoMdPerson />
          Login or Register
        </Link>
      </div>
    </section>
  );
}
