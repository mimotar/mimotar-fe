"use client";

import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import Avata from "./Avartar";

export default function DashboardNavbar() {
  return (
    <section className="flex justify-between items-center p-5 bg-[#FFFFFF] gap-3">
      <div className="relative">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search"
          className="p-2 w-[448px] peer border border-neutral-400 outline-none rounded-md placeholder:pl-6"
        />

        <CiSearch className="absolute left-3 top-3.5 peer-focus:hidden" />
      </div>
      <div className="flex min-[375px]:gap-4 gap-1 items-center">
        <span
          onClick={() => ""}
          className="relative bg-gray-100 rounded-full p-1 hover:bg-gray-200 cursor-pointer "
        >
          <IoIosNotifications className="md:text-3xl text-xl" />
        </span>

        <div className="flex items-center justify-center gap-1">
          <Avata className="" />
          <RiArrowDropDownLine className="cursor-pointer text-2xl" />
        </div>

        <RxHamburgerMenu
          //   onClick={() => setIsCollapsed((prev) => !prev)}
          className="md:hidden block  text-3xl cursor-pointer hover:bg-gray-200 rounded-full p-1"
        />
      </div>
    </section>
  );
}
