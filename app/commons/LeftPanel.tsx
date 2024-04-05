"use client";

import { IoMdArrowDropdown, IoMdCart, IoMdClose } from "react-icons/io";
import Link from "next/link";
import Input from "./Input";

interface LeftPanelProps {
  isOpen?: boolean;
  closeModal: () => void;
}

export default function LeftPanel({ isOpen, closeModal }: LeftPanelProps) {
  return (
    <>
      {!isOpen ? (
        ""
      ) : (
        <section className="w-full h-full fixed inset-0 flex flex-col items-end bg-transparent">
          <div className="flex h-full flex-col p-4 bg-[#713F12] text-white space-y-2">
            <IoMdClose
              onClick={closeModal}
              className=" flex self-end text-2xl hover:bg-white/25 p-1 cursor-pointer rounded-full "
            />

            <Link
              className={` text-base hover:text-white/80 sm:hidden flex`}
              href={"/"}
            >
              Escrow
            </Link>
            <Link
              className={`inline-flex items-center text-base hover:text-white/80 sm:hidden `}
              href={"listings"}
            >
              Listings
              <IoMdArrowDropdown />
            </Link>

            <Link className={` hover:text-white/80 `} href={"how-it-work"}>
              How it Works
            </Link>

            <Link className={` hover:text-white/80`} href={"contact"}>
              Contact us
            </Link>
            <Link
              href={"cart"}
              className="hover:text-white/80 items-center gap-2 flex"
            >
              <IoMdCart />
              Cart
            </Link>

            <Input type="search" placeholder="Search item ..." />
          </div>
        </section>
      )}
    </>
  );
}
