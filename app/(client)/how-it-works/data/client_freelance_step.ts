import {
  Lock,
  Unlock,
  Shield,
  CheckCircle,
  Send,
  Compass,
  FileText,
} from "lucide-react";

export const clientSteps = [
  {
    step: "01",
    title: "Define Project Terms",
    icon: FileText,
    desc: "Collaborate with your freelancer to lock deadlines, payout stages (milestones), and strict file guidelines on Mimotar.",
    badge: "Transparent Scope",
  },
  {
    step: "02",
    title: "Fund the Escrow Lock",
    icon: Lock,
    desc: "Deposit contract funds securely using debit card or bank transfer via Mimotar. Funds are secured legally in our vault.",
    badge: "Protected Capital",
  },
  {
    step: "03",
    title: "Track Work Deliveries",
    icon: Compass,
    desc: "Your freelancer uploads work specimens and live links directly to our workspace. No more chasing for status updates.",
    badge: "Live Submissions",
  },
  {
    step: "04",
    title: "Approve & Release Or Dispute",
    icon: Unlock,
    desc: "Inspect deliveries safely. Release the payout if perfect, or file a dispute within 48 hours to hold funds for mediation.",
    badge: "Happy Endings Only",
  },
];

export const freelancerSteps = [
  {
    step: "01",
    title: "Establish Clear Deliverables",
    icon: FileText,
    desc: "Agree on work guidelines. Set transparent milestones and upload delivery goals beforehand so client expectations are aligned.",
    badge: "Zero Misunderstandings",
  },
  {
    step: "02",
    title: "Verify Locked Escrow",
    icon: Shield,
    desc: "Never start working based on verbal promises. We notify you the second your client secures the real funds inside our vault.",
    badge: "Payment Guaranteed",
  },
  {
    step: "03",
    title: "Deliver Confidently",
    icon: Send,
    desc: "Submit your finished products or links directly through the workspace, knowing your earnings are fully insulated.",
    badge: "Secure Progress",
  },
  {
    step: "04",
    title: "Instant Naira Payout",
    icon: CheckCircle,
    desc: "Get paid instantly upon approval. If the client leaves you unapproved and quiet, our automatic countdown clears checkout.",
    badge: "Auto-Release Protected",
  },
];
