"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../(page)/hooks/useAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const MimotarLogo: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => {
  const iconSizes = {
    sm: "w-7 h-7 text-sm font-black rounded-lg",
    md: "w-9 h-9 text-lg font-black rounded-xl",
    lg: "w-12 h-12 text-2xl font-black rounded-2xl",
  };

  const fontSizes = {
    sm: "text-lg font-bold tracking-tight",
    md: "text-2xl font-extrabold tracking-tight",
    lg: "text-3.5xl font-extrabold tracking-tight",
  };

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className={`${iconSizes[size]} bg-brand-primary text-white flex items-center justify-center font-sans shadow-xs transition-transform hover:scale-105 duration-200`}
      >
        M
      </div>
      <span
        className={`${fontSizes[size]} text-gray-900 font-sans tracking-tight`}
      >
        Mimotar
      </span>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { session, userVerified, SignOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activePage = usePathname();

  const navigate = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 transition-all">
      <div className="max-w-7xl  mx-auto px-4 h-full flex items-center justify-between">
        <div
          className="cursor-pointer"
          onClick={() => {
            if (session && userVerified) {
              navigate.push("dashboard");
            } else {
              navigate.push("/");
            }
          }}
        >
          <MimotarLogo size="md" />
        </div>

        {/* Desktop navbar */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href={"/how-it-works"}
            className={`text-sm font-semibold transition-all duration-200 relative py-1.5 px-0.5 ${
              activePage === "/how-it-works"
                ? "text-brand-primary"
                : "text-gray-600 hover:text-brand-primary"
            }`}
          >
            How it Works
            {activePage === "/how-it-works" && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-brand-primary rounded-full" />
            )}
          </Link>
          <Link
            href={"/about-us"}
            className={`text-sm font-semibold transition-all duration-200 relative py-1.5 px-0.5 ${
              activePage === "/about-us"
                ? "text-brand-primary"
                : "text-gray-600 hover:text-brand-primary"
            }`}
          >
            About
            {activePage === "/about-us" && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-brand-primary rounded-full" />
            )}
          </Link>
          <Link
            href={"/contact"}
            className={`text-sm font-semibold transition-all duration-200 relative py-1.5 px-0.5 ${
              activePage === "/contact"
                ? "text-brand-primary"
                : "text-gray-600 hover:text-brand-primary"
            }`}
          >
            Contact
            {activePage === "/contact" && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-brand-primary rounded-full" />
            )}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {session && userVerified ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-semibold cursor-pointer text-brand-primary transition hover:underline"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={SignOut}
                className="text-xs font-semibold cursor-pointer text-gray-500 hover:text-red-500 flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-red-200 transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href={"/auth?auth=login"}
                // onClick={() => navigate.push("auth?auth=login")}
                className="text-sm font-semibold cursor-pointer text-gray-700 hover:text-brand-primary transition py-2 px-3"
              >
                Sign In
              </Link>
              <button
                onClick={() => navigate.push("auth?auth=signup")}
                className="text-sm font-semibold cursor-pointer bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl px-5 py-2.5 transition active:scale-95"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden cursor-pointer text-gray-700 hover:text-brand-primary p-2 transition focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-6 px-4 flex flex-col gap-3 md:hidden animate-fade-in z-45">
          <Link
            href={"/how-it-works"}
            // onClick={() => navigate.push("how-it-works")}
            className={`text-left text-base font-semibold py-2.5 px-3 rounded-xl transition-all duration-200 border-l-4 flex items-center justify-between ${
              activePage === "/how-it-works"
                ? "text-brand-primary bg-magenta-50 border-brand-primary"
                : "text-gray-700 hover:text-brand-primary border-transparent hover:bg-gray-50"
            }`}
          >
            <span>How it Works</span>
            {activePage === "/how-it-works" && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            )}
          </Link>
          <Link
            href={"/about-us"}
            className={`text-left text-base font-semibold py-2.5 px-3 rounded-xl transition-all duration-200 border-l-4 flex items-center justify-between ${
              activePage === "/about-us"
                ? "text-brand-primary bg-magenta-50 border-brand-primary"
                : "text-gray-700 hover:text-brand-primary border-transparent hover:bg-gray-50"
            }`}
          >
            <span>About</span>
            {activePage === "/about-us" && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            )}
          </Link>
          <Link
            href="/contact"
            className={`text-left text-base font-semibold py-2.5 px-3 rounded-xl transition-all duration-200 border-l-4 flex items-center justify-between ${
              activePage === "/contact"
                ? "text-brand-primary bg-magenta-50 border-brand-primary"
                : "text-gray-700 hover:text-brand-primary border-transparent hover:bg-gray-50"
            }`}
          >
            <span>Contact</span>
            {activePage === "/contact" && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            )}
          </Link>

          <div className="pt-2 flex flex-col gap-3">
            {session && userVerified ? (
              <>
                <Link
                  href={"dashboard"}
                  // onClick={() => navigate.push("dashboard")}
                  className="w-full text-center cursor-pointer text-sm font-semibold bg-brand-primary text-white rounded-xl py-3 transition"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={SignOut}
                  className="w-full text-center cursor-pointer text-sm font-semibold border border-gray-200 text-gray-600 rounded-xl py-3 transition hover:text-red-500 hover:border-red-250"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href={"/auth?auth=login"}
                  // onClick={() => navigate.push("auth?auth=login")}
                  className="w-full text-center text-sm cursor-pointer font-semibold border border-gray-200 text-gray-700 rounded-xl py-2.5 transition"
                >
                  Sign In
                </Link>
                <Link
                  href={"/auth?auth=signup"}
                  // onClick={() => navigate.push("auth?auth=signup")}
                  className="w-full text-center text-sm cursor-pointer font-semibold bg-brand-primary text-white rounded-xl py-2.5 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
