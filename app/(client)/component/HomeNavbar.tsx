"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import LogoIcon from "@/app/svgIconComponent/Logo";
import AuthForm from "@/app/auth/AuthForm";
// import Button from "../../commons/PrimaryButtons";
import PrimaryButton from "../../commons/PrimaryButtons";
// import { usePathname } from "next/navigation";
import SecondaryButton from "../../commons/SecondaryButton";
import { RxHamburgerMenu } from "react-icons/rx";

const HomeNavbar: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleOpen = (tab: "login" | "register") => {
    setActiveTab(tab);
    setOpen(true);
  };

  return (
    <section className="flex justify-between items-center">
      <Link href={"/"}>
        <LogoIcon className="text-sm md:w-auto md:h-auto w-28" />
      </Link>

      <span className="md:flex hidden items-center justify-center min-[932px]:gap-10 gap-5">
        {/* <Link
          className={`text-[#0F172A] hover:font-bold md:text-base text-sm ${
            pathname === "/" ? "text-[#86198F] font-bold" : ""
          }`}
          href="/"
        >
          Escrow
        </Link> */}
        <Link className="text-[#0F172A] md:text-base text-sm" href="#">
          How it Works
        </Link>
        <Link
          className={`text-[#0F172A] hover:font-bold md:text-base text-sm ${
            pathname === "#" ? "text-[#86198F] font-bold" : ""
          }`}
          href="#"
        >
          About us
        </Link>
        <Link className="text-[#0F172A] md:text-base text-sm" href="blog">
          Blog
        </Link>
        <Link
          className="text-[#0F172A] md:text-base text-sm md:block hidden"
          href="#"
        >
          Contact us
        </Link>
      </span>

      <div className="md:flex hidden items-center min-[932px]:gap-10 gap-5">
        <Button
          onClick={() => handleOpen("login")}
          className="min-[932px]:w-[118px] min-[932px]:h-[48px] text-[#A21CAF] hover:text-[#F8FAFC] font-bold  hover w-[80px] h-[35px] border-[#D946EF] border-2 bg-white rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF] active:font-bold focus:bg-[#A21CAF] focus:font-bold"
        >
          Login
        </Button>

        <AuthForm
          open={open}
          setOpen={handleDialogChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <Button
          onClick={() => handleOpen("register")}
          className="min-[932px]:w-[118px] min-[932px]:h-[48px] w-[80px] h-[35px] text-[#F8FAFC] hover:text-[#F8FAFC]  bg-[#A21CAF] rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF] active:font-bold focus:bg-[#A21CAF] focus:font-bold"
        >
          Register
        </Button>
      </div>
      <RxHamburgerMenu className="hover:bg-gray-200 rounded-full p-1 text-2xl md:hidden" />
    </section>
  );
};

export default HomeNavbar;
