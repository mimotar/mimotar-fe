"use client";

import { IoMdCart, IoMdClose } from "react-icons/io";
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
          <div className="flex h-full flex-col p-2 bg-yellow-200 space-y-2">
            <IoMdClose onClick={closeModal} className="flex self-end" />

            <Link
              className={`text-[#0F172A] hover:text-slate-600 `}
              href={"how-it-work"}
            >
              How it Works
            </Link>

            <Link
              className={`text-[#0F172A] hover:text-slate-600`}
              href={"contact"}
            >
              Contact us
            </Link>
            <Link
              href={"cart"}
              className="fmin-[1440px]:flex items-center gap-2 font-bold hidden"
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
