"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import LogoIcon from "@/app/svgIconComponent/Logo";
import AuthForm from "@/app/auth/AuthForm";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useSession } from "next-auth/react";

const HomeNavbar: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { data } = useSession();

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";

    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isMobileNavOpen]);

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleOpen = (tab: "login" | "register") => {
    setActiveTab(tab);
    setOpen(true);
  };

  const handleMobileAuthOpen = (tab: "login" | "register") => {
    setIsMobileNavOpen(false);
    handleOpen(tab);
  };

  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <section className="flex justify-between items-center">
      <Link href={"/"}>
        <LogoIcon className="text-sm md:w-auto md:h-auto w-28" />
      </Link>

      <span className="min-[1120px]:flex hidden items-center justify-center min-[932px]:gap-10 gap-5">
        {/* <Link
          className={`text-[#0F172A] hover:font-bold md:text-base text-sm ${
            pathname === "/" ? "text-[#86198F] font-bold" : ""
          }`}
          href="/"
        >
          Escrow
        </Link> */}
        <Link className="text-[#0F172A] md:text-base text-sm" href="/">
          How it Works
        </Link>
        <Link
          className={`text-[#0F172A] hover:font-bold md:text-base text-sm ${
            pathname === "#" ? "text-[#86198F] font-bold" : ""
          }`}
          href="/"
        >
          About us
        </Link>
        <Link className="text-[#0F172A] md:text-base text-sm" href="/blog">
          Blog
        </Link>
        <Link
          className="text-[#0F172A] md:text-base text-sm md:block hidden"
          href="/"
        >
          Contact us
        </Link>
      </span>

      <div className="flex items-center justify-center min-[932px]:gap-10 gap-5 ">
        <div className="md:flex hidden items-center justify-center min-[932px]:gap-10 gap-5">
          {data?.user && data.user.verified && (
            <Link
              href="/dashboard"
              className="text-[#A21CAF]  hover:text-[#D946EF]"
            >
              Dashboard
            </Link>
          )}
          <Button
            onClick={() => handleOpen("login")}
            className="min-[932px]:w-[118px] min-[932px]:h-[48px] cursor-pointer text-[#A21CAF] hover:text-[#F8FAFC] font-bold  hover w-[80px] h-[35px] border-[#D946EF] border-2 bg-white rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF] active:font-bold focus:bg-[#A21CAF] focus:font-bold"
          >
            Login
          </Button>

          <Button
            onClick={() => handleOpen("register")}
            className="min-[932px]:w-[118px] min-[932px]:h-[48px] w-[80px] h-[35px] cursor-pointer text-[#F8FAFC] hover:text-[#F8FAFC]  bg-[#A21CAF] rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF] active:font-bold focus:bg-[#A21CAF] focus:font-bold"
          >
            Register
          </Button>
        </div>

        <button
          aria-label="Open mobile navigation"
          onClick={() => setIsMobileNavOpen(true)}
          className="hover:bg-gray-200 rounded-full p-1 text-2xl min-[1120px]:hidden"
        >
          <RxHamburgerMenu />
        </button>
      </div>

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            className="fixed inset-0 z-50 min-[1120px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              aria-label="Close mobile navigation"
              className="absolute inset-0 bg-black/35"
              onClick={closeMobileNav}
            />
            <motion.section
              role="dialog"
              aria-modal="true"
              className="relative z-10 h-full bg-white px-4 py-6 flex flex-col"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <LogoIcon className="w-28 h-auto" />
                <button
                  aria-label="Close menu"
                  onClick={closeMobileNav}
                  className="text-3xl text-slate-700"
                >
                  <RxCross2 />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-7 text-lg">
                <Link
                  onClick={closeMobileNav}
                  className="text-[#0F172A]"
                  href="/"
                >
                  How it Works
                </Link>
                <Link
                  onClick={closeMobileNav}
                  className="text-[#0F172A]"
                  href="/"
                >
                  About us
                </Link>
                <Link
                  onClick={closeMobileNav}
                  className="text-[#0F172A]"
                  href="/blog"
                >
                  Blog
                </Link>
                <Link
                  onClick={closeMobileNav}
                  className="text-[#0F172A]"
                  href="/"
                >
                  Contact us
                </Link>
                {data?.user && data.user.verified && (
                  <Link
                    onClick={closeMobileNav}
                    href="/dashboard"
                    className="text-[#A21CAF]"
                  >
                    Dashboard
                  </Link>
                )}
              </nav>

              <div className="mt-auto pt-6 border-t border-slate-200">
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={() => handleMobileAuthOpen("register")}
                    className="h-12 w-full bg-[#A21CAF] hover:bg-[#D946EF] text-[#F8FAFC] text-lg font-semibold rounded-xl"
                  >
                    Register
                  </Button>
                  <Button
                    onClick={() => handleMobileAuthOpen("login")}
                    className="h-12 w-full border-2 border-[#A21CAF] bg-white text-[#A21CAF] hover:bg-[#FAF5FF] text-lg font-semibold rounded-xl"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthForm
        open={open}
        setOpen={handleDialogChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </section>
  );
};

export default HomeNavbar;
