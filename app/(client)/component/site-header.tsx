"use client";

import Link from "next/link";

const NAV_ITEMS = [
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#trust", label: "Trust & Safety" },
  { href: "#faq", label: "Support" },
];

export function SiteHeader() {
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
          <button type="button" className="site-actions__ghost">
            Log in
          </button>
          <button type="button" className="site-actions__primary">
            Get Started Free
          </button>
        </div>
      </div>
    </header>
  );
}
