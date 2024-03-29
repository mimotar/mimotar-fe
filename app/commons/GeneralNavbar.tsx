import Link from "next/link";
import LogoIcon from "../svgIconComponent/Logo";
import Button from "./PrimaryButtons";
import PrimaryButton from "./PrimaryButtons";
import { IoMdCart } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

export default function GeneralNavbar() {
  return (
    <section className="flex justify-between items-center ">
      <Link href={"/"}>
        {" "}
        <LogoIcon className="" />
      </Link>

      <span className="flex items-center gap-10">
        <Link className="text-[#0F172A]" href={""}>
          Escrow
        </Link>
        <Link className="text-[#0F172A]" href={""}>
          Listings
        </Link>

        <Link className="text-[#0F172A]" href={""}>
          How it Works
        </Link>

        <Link className="text-[#0F172A]" href={""}>
          Contact us
        </Link>

        <span className="relative">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search item ..."
            className="rounded-md p-3 outline-none border-2 border-gray-400 placeholder:pl-4 peer"
          />
          <IoSearchOutline className="absolute left-2 top-4 text-xl text-gray-400 peer-focus:hidden" />
        </span>
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
