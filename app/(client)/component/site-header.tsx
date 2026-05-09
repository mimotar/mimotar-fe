"use client";

import AuthForm from "@/app/auth/AuthForm";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#trust", label: "Trust & Safety" },
  { href: "#faq", label: "Support" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { data, status } = useSession();

  const navigate = useRouter();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";
  const isVerified = !!data?.user?.verified;

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleOpen = (tab: "login" | "register") => {
    setActiveTab(tab);
    setOpen(true);
  };
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-brand" aria-label="Mimotar home">
          <span className="site-brand__mark">M</span>
          <span className="site-brand__name">Mimotar</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions">
          {isLoggedIn && isVerified && (
            // <Link
            //   href="/dashboard"
            //   className="text-[#A21CAF]  hover:text-[#D946EF]"
            // >
            //   Dashboard
            // </Link>

            <button
              type="button"
              onClick={() => navigate.push("/dashboard")}
              className="site-actions__ghost"
            >
              Dashboard
            </button>
          )}

          {!isLoggedIn && (
            <button
              type="button"
              onClick={() => handleOpen("login")}
              className="site-actions__ghost"
            >
              Log in
            </button>
          )}

          {isLoggedIn && isVerified && (
            <button
              type="button"
              onClick={() =>
                signOut({
                  callbackUrl: process.env.NEXT_PUBLIC_CLIENT_DOMAIN,
                })
              }
              className="site-actions__ghost"
            >
              Log
            </button>
          )}

          {isLoggedIn && isVerified && (
            <button
              onClick={() => navigate.push("/generate-link")}
              type="button"
              className="site-actions__primary"
            >
              Get Started Free
            </button>
          )}
        </div>
      </div>

      <AuthForm
        open={open}
        setOpen={handleDialogChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </header>
  );
}
