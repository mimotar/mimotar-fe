import { Fragment, type ReactNode } from "react";
import {
  CheckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIconType } from "@phosphor-icons/react";

import {
  FOOTER_LINK_GROUPS,
  ID_BAR_ITEMS,
  PERSONA_CARDS,
  PILL_ITEMS,
  STEP_ICONS,
  TRUST_ITEMS,
  USE_CASE_CARDS,
  FAQS,
  type Currency,
  type Role,
  type TxnSample,
} from "./homePage.data";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <div className="trust-pill">
      <div className="tp-icon tp-green">
        <CheckIcon size={10} weight="bold" color="#15803D" />
      </div>
      {children}
    </div>
  );
}

export function TrustItem({
  Icon,
  iconClass,
  label,
  sub,
  color,
}: {
  Icon: PhosphorIconType;
  iconClass: string;
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="trust-item">
      <div className={`ti-icon ${iconClass}`}>
        <Icon size={26} weight="duotone" color={color} />
      </div>
      <div>
        <div className="ti-label">{label}</div>
        <div className="ti-sub">{sub}</div>
      </div>
    </div>
  );
}

export function Step({
  n,
  Icon,
  name,
  desc,
  callout,
  active,
}: {
  n: number;
  Icon: PhosphorIconType;
  name: string;
  desc: string;
  callout?: string;
  active: boolean;
}) {
  return (
    <div className="step-item">
      <div className={`step-circle ${active ? "active-circ" : ""}`}>
        <span
          className={`step-n ${n === 2 ? "n-vivid" : ""}`}
          style={
            !active
              ? { background: "var(--gray-300)", color: "var(--gray-500)" }
              : undefined
          }
        >
          {n}
        </span>
        <span className="step-icon">
          <Icon
            size={26}
            weight="duotone"
            color={active ? "#fff" : "var(--fuchsia)"}
          />
        </span>
      </div>
      <div className="step-name">{name}</div>
      <div className="step-desc ">{desc}</div>
      {callout && <div className="step-callout">{callout}</div>}
    </div>
  );
}

export function FP({ children }: { children: ReactNode }) {
  return (
    <div className="fp">
      <div className="fp-check">
        <CheckIcon size={12} weight="bold" color="var(--green)" />
      </div>
      {children}
    </div>
  );
}

export function PCard({
  Icon,
  title,
  pain,
  desc,
}: {
  Icon: PhosphorIconType;
  title: string;
  pain: string;
  desc: string;
}) {
  return (
    <div className="pcard">
      <div className="pcard-icon">
        <Icon size={28} weight="duotone" color="var(--fuchsia)" />
      </div>
      <h3 className="pcard-title">{title}</h3>
      <p className="pcard-pain">{pain}</p>
      <p className="pcard-desc">{desc}</p>
      <div className="pcard-link">
        Learn more <span className="pcard-link-arrow">→</span>
      </div>
    </div>
  );
}

export function UCCard({
  Icon,
  title,
  body,
  quote,
}: {
  Icon: PhosphorIconType;
  title: string;
  body: string;
  quote: string;
}) {
  return (
    <div className="uc-card">
      <div className="uc-icon">
        <Icon size={28} weight="duotone" color="var(--fuchsia)" />
      </div>
      <h3 className="uc-title">{title}</h3>
      <p className="uc-body">{body}</p>
      <div className="uc-quote">{quote}</div>
    </div>
  );
}

export function DStep({
  n,
  cls,
  t,
  s,
}: {
  n: string;
  cls: string;
  t: string;
  s: string;
}) {
  return (
    <div className="dstep">
      <div className={`dn ${cls}`}>{n}</div>
      <div className="dc-content">
        <div className="dt">{t}</div>
        <div className="ds">{s}</div>
      </div>
    </div>
  );
}

export function FCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="fl-col-t">{title}</div>
      <div className="fl-links">
        {links.map((l) => (
          <a key={l} href="#" className="fl-link">
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}

function SocialX() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M18.244 2H21.5l-7.46 8.523L22.75 22h-6.84l-5.36-7.01L4.4 22H1.144l7.98-9.12L1.5 2h7.01l4.84 6.4L18.244 2Zm-1.2 18h1.86L7.04 4H5.06l11.984 16Z" />
    </svg>
  );
}

function SocialLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
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
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HeroSection({
  txn,
  txnIdx,
  onSelectTxn,
}: {
  txn: TxnSample;
  txnIdx: number;
  onSelectTxn: (index: number) => void;
}) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow">
            <div className="ey-dot" />
            <span>Trusted escrow - Nigeria & worldwide</span>
          </div>
          <h1 className="hero-h1">
            Buy and sell anything, anywhere - with <em>zero fear</em> of being
            cheated.
          </h1>
          <p className="hero-sub">
            Mimotar holds your payment in a secure vault until you confirm
            everything is right. Built for Nigerians and international users.
            Pay in NGN, USD, EUR or GBP. Buyer protected. Seller guaranteed.
          </p>
          <div className="hero-ctas">
            <button type="button" className="btn btn-primary btn-lg">
              Start a Safe Transaction
            </button>
            <a href="#how" className="btn btn-outline btn-lg">
              How it works ▷
            </a>
          </div>
          <div className="trust-pills">
            {PILL_ITEMS.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </div>
        </div>

        <div className="txn-card-wrap  ">
          <div className="txn-card" key={txnIdx}>
            <div className="txn-head">
              <div className="txn-meta-row">
                <span className="txn-type">
                  <txn.Icon
                    size={14}
                    weight="duotone"
                    style={{ verticalAlign: "-3px", marginRight: 6 }}
                  />
                  {txn.type} Escrow
                </span>
                <span className="badge-pending">
                  <span className="pend-dot" />
                  Pending
                </span>
              </div>
              <div className="txn-item-name">{txn.item}</div>
              <div className="txn-amount-label">Amount Locked</div>
              <div className="txn-amount-value">
                {txn.amountNgn}{" "}
                <span className="amount-alt">{txn.amountUsd}</span>
              </div>
            </div>

            <div className="txn-body">
              <div className="txn-party-row">
                <div
                  className="party-avatar"
                  style={{
                    background: txn.buyer.gradient,
                    fontSize: txn.buyer.initials.length > 1 ? 11 : 13,
                  }}
                >
                  {txn.buyer.initials}
                </div>
                <div className="party-info">
                  <span className="party-role-lbl">
                    Buyer · {txn.buyer.location}
                  </span>
                  <span className="party-name">{txn.buyer.name}</span>
                </div>
                <div className="party-verified">
                  <CheckIcon size={11} weight="bold" color="#15803D" />
                </div>
              </div>
              <div className="txn-party-row">
                <div
                  className="party-avatar"
                  style={{
                    background: txn.seller.gradient,
                    fontSize: txn.seller.initials.length > 1 ? 11 : 13,
                  }}
                >
                  {txn.seller.initials}
                </div>
                <div className="party-info">
                  <span className="party-role-lbl">
                    Seller · {txn.seller.location}
                  </span>
                  <span className="party-name">{txn.seller.name}</span>
                </div>
                <div className="party-dot-yellow" />
              </div>
            </div>

            <div className="txn-progress">
              <div className="progress-labels">
                <span className="prog-lbl">Funds Secured</span>
                <span className="prog-lbl">Delivery</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${txn.progress}%` }}
                />
              </div>
            </div>

            <div className="txn-footer">
              <button type="button" className="btn-release">
                Release Funds
              </button>
              <div className="txn-status">
                <span className="status-lbl">Status</span>
                <span className="status-val">{txn.status}</span>
              </div>
            </div>
            <div className="txn-dots">
              {Array.from({ length: 3 }, (_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`txn-dot ${i === txnIdx ? "on" : ""}`}
                  onClick={() => onSelectTxn(i)}
                  aria-label={`Show transaction ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="float-badge identity-badge">
            <div className="fb-icon" style={{ background: "var(--yellow-bg)" }}>
              <ShieldCheckIcon
                size={18}
                weight="duotone"
                color="var(--yellow-icon)"
              />
            </div>
            <div className="fb-text">
              <strong>Identity Checked</strong>
              <span>BVN · NIN · Passport</span>
            </div>
          </div>
          <div className="float-badge flutterwave-badge">
            <div className="fb-icon" style={{ background: "#FFF3E0" }}>
              <CreditCardIcon size={18} weight="duotone" color="#F6921E" />
            </div>
            <div className="fb-text">
              <strong>Flutterwave + Stripe</strong>
              <span>PCI-DSS compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IdentityBar() {
  return (
    <div className="id-bar">
      {ID_BAR_ITEMS.map((item, index) => (
        <Fragment key={item.text}>
          <div className="id-pill">
            <div className="id-pill-icon">
              <item.Icon size={14} weight="duotone" color="var(--fuchsia)" />
            </div>
            {item.text}
          </div>
          {index < ID_BAR_ITEMS.length - 1 ? <div className="id-sep" /> : null}
        </Fragment>
      ))}
    </div>
  );
}

export function TrustBar() {
  return (
    <div className="trust-bar" id="trust">
      <div className="trust-bar-grid">
        {TRUST_ITEMS.map((item) => (
          <TrustItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

export function HowItWorksSection({
  role,
  roleSummary,
  steps,
  onRoleChange,
}: {
  role: Role;
  roleSummary: string;
  steps: { name: string; desc: string; callout?: string }[];
  onRoleChange: (role: Role) => void;
}) {
  return (
    <section className="hiw" id="how">
      <div style={{ textAlign: "center" }}>
        <span className="sec-eyebrow">Simple by design</span>
        <h2 className="sec-h2">
          Three steps to a<br />
          safe transaction
        </h2>
        <p className="sec-sub" style={{ margin: "0 auto" }}>
          Whether you&apos;re trading across Lagos or across continents, Mimotar
          keeps every payment protected and every deal transparent.
        </p>
        <div className="role-toggle">
          <button
            type="button"
            className={`role-btn ${role === "buyer" ? "on" : ""}`}
            onClick={() => onRoleChange("buyer")}
            aria-pressed={role === "buyer"}
          >
            I&apos;m Buying
          </button>
          <button
            type="button"
            className={`role-btn ${role === "seller" ? "on" : ""}`}
            onClick={() => onRoleChange("seller")}
            aria-pressed={role === "seller"}
          >
            I&apos;m Selling
          </button>
        </div>
        <p className="role-note">{roleSummary}</p>
      </div>

      {/* hiw-steps */}
      <div className="flex my-14 lg:gap-0 gap-6 md:max-w-[760px] w-full flex-wrap relative justify-center  items-start mx-auto">
        {steps.map((s, i) => (
          <Fragment key={s.name}>
            <Step
              n={i + 1}
              Icon={STEP_ICONS[i]}
              name={s.name}
              desc={s.desc}
              callout={s.callout}
              active={i < 2}
            />
            {i < steps.length - 1 ? <div className="step-line" /> : null}
          </Fragment>
        ))}
      </div>

      <div className="hiw-cta">
        <button className="btn btn-primary btn-lg">
          Create My First Transaction →
        </button>
        <p className="hiw-sub">
          Takes less than 2 minutes. No card required to start.
        </p>
      </div>
    </section>
  );
}

export function FeeSection({
  symbol,
  valid,
  numeric,
  rawFee,
  yourShare,
  sellerReceives,
  currency,
  amount,
  pay,
  onCurrencyChange,
  onAmountChange,
  onPayChange,
  fmt,
}: {
  symbol: string;
  valid: boolean;
  numeric: number;
  rawFee: number;
  yourShare: number;
  sellerReceives: number;
  currency: Currency;
  amount: string;
  pay: "split" | "buyer" | "seller";
  onCurrencyChange: (currency: Currency) => void;
  onAmountChange: (value: string) => void;
  onPayChange: (pay: "split" | "buyer" | "seller") => void;
  fmt: (n: number) => string;
}) {
  return (
    <section className="fee-sec" id="pricing">
      <div className="fee-inner">
        <div>
          <span className="sec-eyebrow">Transparent pricing</span>
          <h2 className="sec-h2 sm:text-start text-center">
            No hidden charges <span className="sm:inline-flex hidden">.</span>
            <br className="sm:inline-flex hidden" />
            Ever.
          </h2>
          <p className="sec-sub">
            A small fee is deducted only after a successful transaction. Nothing
            is charged if a deal fails or a dispute is raised.
          </p>
          <div className="fee-points">
            <FP>1.5% of transaction value</FP>
            <FP>Minimum fee: ₦500 / $1 flat</FP>
            <FP>Maximum cap: ₦50,000 / $100</FP>
            <FP>Zero fee on disputes or failed deals</FP>
            <FP>Buyer, seller, or split 50/50 - your choice</FP>
          </div>
        </div>

        <div>
          <div className="calc-card">
            <div className="calc-head">
              <div className="calc-t">Calculate your fee</div>
              <div className="cur-toggle">
                <button
                  type="button"
                  className={currency === "NGN" ? "on" : ""}
                  onClick={() => onCurrencyChange("NGN")}
                >
                  NGN
                </button>
                <button
                  type="button"
                  className={currency === "USD" ? "on" : ""}
                  onClick={() => onCurrencyChange("USD")}
                >
                  USD
                </button>
              </div>
            </div>
            <div className="calc-field">
              <div className="calc-lbl">Transaction amount ({symbol})</div>
              <input
                type="text"
                inputMode="decimal"
                className="calc-inp"
                placeholder={currency === "NGN" ? "e.g. 1,450,000" : "e.g. 980"}
                value={amount}
                onChange={(e) => onAmountChange(e.target.value)}
              />
            </div>
            <div className="calc-field">
              <div className="calc-lbl">Who pays the fee?</div>
              <div className="pay-opts">
                {(["split", "buyer", "seller"] as const).map((p) => (
                  <button
                    type="button"
                    key={p}
                    className={`pay-opt ${pay === p ? "sel" : ""}`}
                    onClick={() => onPayChange(p)}
                    aria-pressed={pay === p}
                  >
                    <span>
                      {p === "split"
                        ? "Split 50/50"
                        : p === "buyer"
                          ? "Buyer pays"
                          : "Seller pays"}
                    </span>
                    <small>
                      {p === "split"
                        ? "Shared"
                        : p === "buyer"
                          ? "You pay all"
                          : "Seller pays"}
                    </small>
                  </button>
                ))}
              </div>
            </div>
            <div className="calc-result">
              <div className="res-row">
                <span className="res-lbl">Transaction value</span>
                <span className="res-val">{valid ? fmt(numeric) : "—"}</span>
              </div>
              <div className="res-row">
                <span className="res-lbl">Mimotar fee (1.5%)</span>
                <span className="res-val">{valid ? fmt(rawFee) : "—"}</span>
              </div>
              <div className="res-row">
                <span className="res-lbl">Your share</span>
                <span className="res-val">{valid ? fmt(yourShare) : "—"}</span>
              </div>
              <div className="res-row">
                <span className="res-total-lbl">Seller receives</span>
                <span className="res-total-val">
                  {valid ? fmt(sellerReceives) : "Enter an amount"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PersonasSection() {
  return (
    <section className="personas">
      <div style={{ textAlign: "center" }}>
        <span className="sec-eyebrow">Who uses Mimotar</span>
        <h2 className="sec-h2">
          Built for the way
          <br />
          the world actually trades
        </h2>
        <p className="sec-sub" style={{ margin: "0 auto" }}>
          If you&apos;ve ever been nervous about paying first - or delivering
          before getting paid - Mimotar was built exactly for you.
        </p>
      </div>
      <div className="persona-grid">
        {PERSONA_CARDS.map((card) => (
          <PCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

export function UseCasesSection() {
  return (
    <section className="usecases">
      <div style={{ textAlign: "center" }}>
        <span className="sec-eyebrow">Use cases</span>
        <h2 className="sec-h2">
          Any deal. Any size.
          <br />
          Any country.
        </h2>
      </div>
      <div className="uc-grid">
        {USE_CASE_CARDS.map((card) => (
          <UCCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

export function FaqSection({
  openFaq,
  onToggleFaq,
}: {
  openFaq: number;
  onToggleFaq: (index: number) => void;
}) {
  return (
    <section className="faq-sec" id="faq">
      <div className="faq-inner">
        <div>
          <span className="sec-eyebrow">Common questions</span>
          <h2 className="sec-h2" style={{ fontSize: 30 }}>
            Everything you need to know
          </h2>
          <div style={{ marginTop: 24 }}>
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`faq-item ${openFaq === i ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-btn"
                  onClick={() => onToggleFaq(i)}
                >
                  <span className="faq-q">{f.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
            <div style={{ marginTop: 18 }}>
              <a
                href="#"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--fuchsia-mid)",
                }}
              >
                See all FAQs →
              </a>
            </div>
          </div>
        </div>

        <div className="dispute-box">
          <div className="db-eyebrow">Dispute resolution</div>
          <h3 className="db-h">
            What if something
            <br />
            goes wrong?
          </h3>
          <p className="db-sub">
            Raise a dispute any time before you confirm receipt. Here&apos;s
            exactly what happens:
          </p>
          <div className="dispute-steps">
            <DStep
              n="1"
              cls="dn-1"
              t="You raise a dispute"
              s='Tap "Raise Dispute" before confirming. Upload evidence - photos, messages, delivery records.'
            />
            <DStep
              n="2"
              cls="dn-2"
              t="Funds are frozen"
              s="Neither party can access the money. Our review team is notified immediately."
            />
            <DStep
              n="✓"
              cls="dn-done"
              t="We resolve & release"
              s="Funds released to the rightful party. Decision communicated to both parties."
            />
          </div>
          <div className="sla-box">
            <div className="sla-t">Our SLA Guarantee</div>
            <div className="sla-s">
              All disputes resolved within 48-72 hours. Funds remain frozen
              until resolution.
            </div>
          </div>
          <div className="wa-box">
            <div className="wa-icon-b">
              <WhatsappLogoIcon size={18} weight="duotone" color="#fff" />
            </div>
            <div>
              <strong>Need help right now?</strong>
              <span>
                WhatsApp & email support - reply within 2 hours, 24/7.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="cta-sec">
      <div className="cta-blob cb-1" />
      <div className="cta-blob cb-2" />
      <h2 className="cta-h">
        Stop being afraid
        <br />
        to trade online.
      </h2>
      <p className="cta-sub">
        Join thousands transacting with confidence - in Nigeria and across
        borders.
      </p>
      <div className="cta-btns">
        <button type="button" className="btn btn-primary btn-lg">
          Create My First Safe Transaction
        </button>
        <a href="#" className="btn btn-ghost-white btn-lg">
          <WhatsappLogoIcon size={18} weight="duotone" /> Chat on WhatsApp
        </a>
      </div>
      <div className="cta-micros">
        <span className="cta-micro">✓ No card required to start</span>
        <span className="cta-micro">✓ Funds in a dedicated vault account</span>
        <span className="cta-micro">✓ Secured via Flutterwave & Stripe</span>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="fl-logo-row">
            <div className="fl-mark">M</div>
            <span className="fl-name">Mimotar</span>
          </div>
          <p className="fl-tagline">
            The trusted escrow platform for Nigerian and international trade.
            Every dollar, naira, pound or euro held safely until you&apos;re
            fully satisfied.
          </p>
          <div className="fl-cac">
            Registered with CAC · RC-1234567 · Mimotar Escrow Holdings
          </div>
          <div className="fl-socials">
            <a href="#" className="soc-btn" aria-label="X (Twitter)">
              <SocialX />
            </a>
            <a href="#" className="soc-btn" aria-label="LinkedIn">
              <SocialLinkedIn />
            </a>
            <a href="#" className="soc-btn" aria-label="Instagram">
              <SocialInstagram />
            </a>
            <a href="#" className="soc-btn" aria-label="WhatsApp">
              <WhatsappLogoIcon size={16} weight="duotone" />
            </a>
          </div>
        </div>
        {FOOTER_LINK_GROUPS.map((group) => (
          <FCol key={group.title} title={group.title} links={group.links} />
        ))}
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">
          © 2026 Mimotar. Registered in Nigeria (CAC RC-1234567). Payments
          powered by Flutterwave & Stripe. All funds held in Mimotar Escrow
          Holdings.
        </span>
        <div className="fl-legal">
          <a href="#" className="fl-link" style={{ fontSize: 11 }}>
            Terms
          </a>
          <a href="#" className="fl-link" style={{ fontSize: 11 }}>
            Privacy
          </a>
          <a href="#" className="fl-link" style={{ fontSize: 11 }}>
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
