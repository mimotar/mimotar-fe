"use client";

import { useEffect, useState } from "react";

import "@/app/(client)/css.module/mimotar-homepage.module.css";

import {
  FeeSection,
  FaqSection,
  FinalCtaSection,
  FooterSection,
  HeroSection,
  HowItWorksSection,
  IdentityBar,
  PersonasSection,
  TrustBar,
  UseCasesSection,
} from "./HomePageSections";
import {
  STEPS,
  TXN_SAMPLES,
  type Currency,
  type Pay,
  type Role,
} from "./homePage.data";
import { SiteFooter } from "../../component/site-footer";

export function HomePage() {
  const [role, setRole] = useState<Role>("buyer");
  const [openFaq, setOpenFaq] = useState<number>(1);
  const [amount, setAmount] = useState<string>("");
  const [pay, setPay] = useState<Pay>("split");
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [txnIdx, setTxnIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setTxnIdx((i) => (i + 1) % TXN_SAMPLES.length),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  const txn = TXN_SAMPLES[txnIdx];
  const roleSummary =
    role === "buyer"
      ? "See the buyer flow from funding to release."
      : "See the seller flow from proof of funds to payout.";

  const numeric = Number(amount.replace(/,/g, ""));
  const valid = !Number.isNaN(numeric) && numeric > 0;
  const symbol = currency === "NGN" ? "₦" : "$";
  const minFee = currency === "NGN" ? 500 : 1;
  const maxFee = currency === "NGN" ? 50000 : 100;
  const rawFee = valid
    ? Math.min(Math.max(numeric * 0.015, minFee), maxFee)
    : 0;
  const yourShare = pay === "split" ? rawFee / 2 : pay === "buyer" ? rawFee : 0;
  const sellerReceives = valid
    ? numeric - (pay === "seller" ? rawFee : pay === "split" ? rawFee / 2 : 0)
    : 0;

  const fmt = (n: number) =>
    `${symbol}${n.toLocaleString(undefined, {
      maximumFractionDigits: currency === "NGN" ? 0 : 2,
    })}`;

  const steps = STEPS[role];

  return (
    <div className="mim-root">
      <HeroSection txn={txn} txnIdx={txnIdx} onSelectTxn={setTxnIdx} />
      <IdentityBar />
      <TrustBar />
      <HowItWorksSection
        role={role}
        roleSummary={roleSummary}
        steps={steps}
        onRoleChange={setRole}
      />
      <FeeSection
        symbol={symbol}
        valid={valid}
        numeric={numeric}
        rawFee={rawFee}
        yourShare={yourShare}
        sellerReceives={sellerReceives}
        currency={currency}
        amount={amount}
        pay={pay}
        onCurrencyChange={setCurrency}
        onAmountChange={setAmount}
        onPayChange={setPay}
        fmt={fmt}
      />
      <PersonasSection />
      <UseCasesSection />
      <FaqSection
        openFaq={openFaq}
        onToggleFaq={(index) => setOpenFaq(openFaq === index ? -1 : index)}
      />
      <FinalCtaSection />
      {/* <FooterSection /> */}
      <SiteFooter />
    </div>
  );
}
