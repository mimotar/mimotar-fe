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

export default function GeneralNavbar() {
  const pathname = usePathname();
  return (
    <section className="flex justify-between items-center ">
      <Link href={"/"}>
        {" "}
        <LogoIcon className="" />
      </Link>

      <span className="flex items-center gap-10">
        <Link
          className={`text-[#0F172A] hover:font-bold ${
            pathname === "/"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={"/"}
        >
          Escrow
        </Link>
        <Link
          className={`text-[#0F172A] hover:font-bold ${
            pathname === "/listings"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={""}
        >
          Listings
        </Link>

        <Link
          className={`text-[#0F172A] hover:font-bold ${
            pathname === "how-it-work"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={""}
        >
          How it Works
        </Link>

        <Link
          className={`text-[#0F172A] hover:font-bold ${
            pathname === "contact"
              ? "text-[#86198F] font-bold border-b-2 border-[#86198F]"
              : ""
          }`}
          href={""}
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
