import {
  BankIcon,
  BriefcaseIcon,
  CodeIcon,
  DeviceMobileIcon,
  GlobeHemisphereWestIcon,
  HouseLineIcon,
  LaptopIcon,
  LightningIcon,
  LockIcon,
  LockOpenIcon,
  PaintBrushIcon,
  PackageIcon,
  PencilSimpleIcon,
  ClipboardTextIcon,
  ScalesIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIconType } from "@phosphor-icons/react";

export type Role = "buyer" | "seller";
export type Pay = "split" | "buyer" | "seller";
export type Currency = "NGN" | "USD";

export type TxnSample = {
  type: string;
  item: string;
  amountNgn: string;
  amountUsd: string;
  buyer: { name: string; initials: string; location: string; gradient: string };
  seller: {
    name: string;
    initials: string;
    location: string;
    gradient: string;
  };
  status: string;
  progress: number;
  Icon: PhosphorIconType;
};

export const TXN_SAMPLES: TxnSample[] = [
  {
    type: "Electronics",
    item: "MacBook Pro M3",
    amountNgn: "₦1,450,000",
    amountUsd: "≈ $980",
    buyer: {
      name: "Aminu D.",
      initials: "A",
      location: "Lagos, NG",
      gradient: "linear-gradient(135deg,#C026D3,#E879F9)",
    },
    seller: {
      name: "TechMart Global",
      initials: "TM",
      location: "London, UK",
      gradient: "linear-gradient(135deg,#EAB308,#F97316)",
    },
    status: "In Transit",
    progress: 55,
    Icon: LaptopIcon,
  },
  {
    type: "Real estate",
    item: "Lekki 2-bed Rent Deposit",
    amountNgn: "₦2,800,000",
    amountUsd: "≈ $1,890",
    buyer: {
      name: "Chioma O.",
      initials: "C",
      location: "Abuja, NG",
      gradient: "linear-gradient(135deg,#A21CAF,#D946EF)",
    },
    seller: {
      name: "Prime Realty",
      initials: "PR",
      location: "Lagos, NG",
      gradient: "linear-gradient(135deg,#0EA5E9,#6366F1)",
    },
    status: "Inspection",
    progress: 35,
    Icon: HouseLineIcon,
  },
  {
    type: "Freelance",
    item: "Brand Identity · Milestone 2",
    amountNgn: "₦450,000",
    amountUsd: "≈ $300",
    buyer: {
      name: "Sarah K.",
      initials: "SK",
      location: "Nairobi, KE",
      gradient: "linear-gradient(135deg,#22C55E,#10B981)",
    },
    seller: {
      name: "Femi Designs",
      initials: "FD",
      location: "Remote",
      gradient: "linear-gradient(135deg,#F97316,#F59E0B)",
    },
    status: "In Review",
    progress: 75,
    Icon: BriefcaseIcon,
  },
];

export const STEPS: Record<Role, { name: string; desc: string; callout?: string }[]> =
  {
    buyer: [
      {
        name: "Deposit",
        desc: "Create the transaction, describe the item, set the amount, invite the seller. Funds go into the secure vault.",
        callout: "Seller cannot access funds until you confirm",
      },
      {
        name: "Verify",
        desc: "The seller delivers. You receive the item and verify it matches the agreed description exactly.",
      },
      {
        name: "Release",
        desc: "Happy with everything? Tap Release. Funds go instantly to the seller. Dispute window stays open for 48 hours.",
      },
    ],
    seller: [
      {
        name: "Get Funded",
        desc: "Buyer creates the deal and funds the vault. You see proof-of-funds before you ship a single item.",
        callout: "You'll only ship after funds are locked",
      },
      {
        name: "Deliver",
        desc: "Ship the item or deliver the service. Upload tracking and proof of delivery into the deal.",
      },
      {
        name: "Get Paid",
        desc: "Buyer confirms - funds release instantly to your wallet. No more chasing, no more 'I'll pay tomorrow'.",
      },
    ],
  };

export const FAQS = [
  {
    q: "Is Mimotar a real, registered company?",
    a: "Yes. Mimotar is a legally registered company. Our CAC registration document is available on the Trust & Safety page. All funds are held in a dedicated escrow account - Mimotar Escrow Holdings - completely separate from our operating account.",
  },
  {
    q: "Can I use Mimotar from outside Nigeria?",
    a: "Absolutely. Mimotar supports cross-border deals in NGN, USD, EUR, and GBP. International users verify with passport or government-issued ID; Nigerian users verify with BVN or NIN. Whichever side you're on, the other side is identity-checked.",
  },
  {
    q: "What happens to my money if something goes wrong?",
    a: "If you raise a dispute, your funds are immediately frozen - the seller cannot access them under any circumstances. Our team reviews evidence from both parties and resolves every dispute within 48-72 hours. Funds are released to the rightful party based on findings.",
  },
  {
    q: "Why do you need ID verification to receive payments?",
    a: "Identity verification protects both parties - it ensures you're transacting with a real, verified person. BVN/NIN (Nigeria) and passport (international) are checked via certified KYC providers and never stored raw on our servers. Required only for users receiving funds.",
  },
  {
    q: "How long does it take for the seller to get paid?",
    a: "Funds release to the seller's wallet instantly after the buyer confirms receipt. Local NGN bank withdrawals settle in 1-2 business days. International payouts settle in 2-4 business days depending on country.",
  },
  {
    q: "Can either the buyer or seller start a transaction?",
    a: "Yes. Either party can create the transaction and send an invite link to the other. Both must agree to the terms before any funds move. The agreement is timestamped and forms the legal basis of the deal.",
  },
];

export const TRUST_ITEMS = [
  {
    Icon: BankIcon,
    color: "var(--fuchsia)",
    iconClass: "ti-purple",
    label: "Secure Vault",
    sub: "Funds locked until you're satisfied",
  },
  {
    Icon: ScalesIcon,
    color: "var(--yellow-icon)",
    iconClass: "ti-yellow",
    label: "Dispute Resolution",
    sub: "Every dispute resolved in 48-72 hours",
  },
  {
    Icon: LightningIcon,
    color: "var(--plum)",
    iconClass: "ti-gray",
    label: "Instant Release",
    sub: "Funds released the moment you confirm",
  },
];

export const ID_BAR_ITEMS = [
  {
    Icon: ShieldCheckIcon,
    text: "BVN / NIN for Nigerians · Passport for international users",
  },
  {
    Icon: LockIcon,
    text: "NGN, USD, EUR, GBP supported",
  },
  {
    Icon: ScalesIcon,
    text: "48-72hr dispute resolution SLA",
  },
];

export const PILL_ITEMS = [
  "No card required to start",
  "Secured via Flutterwave & Stripe",
  "BVN / NIN / Passport verified",
];

export const STEP_ICONS = [PencilSimpleIcon, ClipboardTextIcon, LockOpenIcon];

export const PERSONA_CARDS = [
  {
    Icon: ShoppingCartIcon,
    title: "Online Buyers",
    pain: '"I\'m scared to pay first"',
    desc: "Buy phones, laptops, fashion, sneakers, or imports from sellers anywhere - without sending money first and praying it arrives.",
  },
  {
    Icon: PackageIcon,
    title: "Sellers & Vendors",
    pain: '"I\'ll deliver and never get paid"',
    desc: "Your payment is locked in the vault before you dispatch a single item. Protected from the moment the deal is agreed.",
  },
  {
    Icon: CodeIcon,
    title: "Freelancers",
    pain: '"I finish the work and get ghosted"',
    desc: "Use milestone payments. Clients fund each phase up front. You work knowing you'll be paid - they pay knowing work gets delivered.",
  },
];

export const USE_CASE_CARDS = [
  {
    Icon: DeviceMobileIcon,
    title: "Buying electronics",
    body: "Phones, laptops, TVs, gadgets - high-value deals where trust is everything. Never pay before the item is in your hands.",
    quote:
      '"Bought a $320 iPhone from Abuja. Confirmed receipt, funds released instantly." - Tunde, Lagos',
  },
  {
    Icon: GlobeHemisphereWestIcon,
    title: "Cross-border imports",
    body: "Importing from China, Dubai, the UK or US? Hold supplier payments in escrow until your shipment clears customs.",
    quote:
      '"Paid a UK supplier in GBP, released only after delivery to my warehouse." - Sarah, Nairobi',
  },
  {
    Icon: PaintBrushIcon,
    title: "Freelance & creative",
    body: "Split projects into funded milestones. Designers, developers, writers - every payment secured before a single hour of work.",
    quote:
      '"3 milestones, $1,500 total. Each funded before I started. No more unpaid invoices." - Femi, Remote',
  },
];

export const FOOTER_LINK_GROUPS = [
  {
    title: "Product",
    links: [
      "How it works",
      "Pricing & fees",
      "Create a transaction",
      "Dashboard",
    ],
  },
  {
    title: "Trust & Legal",
    links: ["Trust & Safety", "Terms of Service", "Privacy Policy", "NDPC / GDPR"],
  },
  {
    title: "Support",
    links: [
      "Help Center",
      "WhatsApp Support",
      "Report a problem",
      "Dispute Center",
    ],
  },
];
