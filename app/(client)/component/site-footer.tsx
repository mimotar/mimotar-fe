"use client";

import Link from "next/link";
import "@/app/(client)/css.module/mimotar-homepage.module.css";

const FOOTER_SECTIONS = [
  {
    title: "Company",
    links: [
      { href: "#trust", label: "Trust & Safety" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#how", label: "How it works" },
      { href: "/contact", label: "Contact" },
      { href: "/support", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookies" },
    ],
  },
];

function SocialX() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.46 8.523L22.75 22h-6.84l-5.36-7.01L4.4 22H1.144l7.98-9.12L1.5 2h7.01l4.84 6.4L18.244 2Zm-1.2 18h1.86L7.04 4H5.06l11.984 16Z" />
    </svg>
  );
}

function SocialLinkedIn() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8h4.56v14H.22V8Zm7.4 0h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v7.46H17.3v-6.62c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H8.02V8h-.4Z" />
    </svg>
  );
}

function SocialInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-block">
          <div className="site-brand site-brand--footer">
            <span className="site-brand__mark">M</span>
            <span className="site-brand__name">Mimotar</span>
          </div>
          <p className="site-footer__tagline">
            Safe escrow for Nigerian and global trade. Buyer protected. Seller
            guaranteed.
          </p>
          <div className="site-footer__socials">
            <a href="#" className="site-footer__social" aria-label="X">
              <SocialX />
            </a>
            <a href="#" className="site-footer__social" aria-label="LinkedIn">
              <SocialLinkedIn />
            </a>
            <a href="#" className="site-footer__social" aria-label="Instagram">
              <SocialInstagram />
            </a>
          </div>
        </div>

        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="site-footer__title">{section.title}</div>
            <div className="site-footer__links">
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="site-footer__link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__copy">
          Copyright 2026 Mimotar. All rights reserved.
        </p>
        <div className="site-footer__legal">
          <Link href="/terms" className="site-footer__legal-link">
            Terms
          </Link>
          <Link href="/privacy" className="site-footer__legal-link">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
