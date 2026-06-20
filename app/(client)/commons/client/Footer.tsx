"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4 transition-all">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-brand-primary rounded-lg text-white font-black text-xs flex items-center justify-center">
              M
            </span>
            <span className="font-extrabold text-lg text-gray-900 tracking-tight">
              Mimotar
            </span>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs mt-1">
            Mimotar is Nigeria's premier escrow platform engineered purposefully
            for freelancers and overseas/local clients. Secure payments, zero
            fear.
          </p>
        </div>

        <div>
          <h5 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-3">
            Company
          </h5>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/about-us"
                // onClick={() => setActivePage("about")}
                className="text-xs font-semibold cursor-pointer text-gray-400 hover:text-brand-primary transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                // onClick={() => setActivePage("contact")}
                className="text-xs font-semibold cursor-pointer text-gray-400 hover:text-brand-primary transition"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                href={"/how-it-works"}
                // onClick={() => {
                //   //   setActivePage("how-it-works");
                //   window.scrollTo({ top: 0, behavior: "smooth" });
                // }}
                className="text-xs font-semibold cursor-pointer text-gray-400 hover:text-brand-primary transition cursor-pointer"
              >
                How it Works
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-3">
            Legal Info
          </h5>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href={"/term-of-service"}
                // onClick={() => setActivePage("tos")}
                className="text-xs cursor-pointer font-semibold text-gray-400 hover:text-brand-primary transition"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href={"/privacy"}
                // onClick={() => setActivePage("privacy")}
                className="text-xs cursor-pointer font-semibold text-gray-400 hover:text-brand-primary transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-3 text-left">
            Headquarters
          </h5>
          <p className="text-xs text-gray-400 leading-relaxed text-left">
            Eko Atlantic Workspace, Victoria Island,
            <br />
            Lagos, Nigeria.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-50 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[11px] text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Mimotar Inc. All rights reserved.
          Registered under CAC Nigeria.
        </span>
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
          <span>Server status: </span>
          <span className="inline-block w-2 bg-emerald-500 rounded-full h-2 animate-ping" />
          <span className="font-semibold text-emerald-600">
            Secure (PCI-DSS compliant)
          </span>
        </div>
      </div>
    </footer>
  );
}
