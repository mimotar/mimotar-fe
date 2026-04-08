import type { AboutIntro, FooterLink, ValueItem } from "../types";
import hero from "../../../assets/png/aboutUsHero.png";

export const aboutIntro: AboutIntro = {
  title: "About Us",
  paragraphs: [
    "At MIMOTAR, we are dedicated to providing secure, reliable, and efficient escrow services to individuals and businesses alike. We offer a seamless and secure escrow experience, backed by a team that genuinely cares about your success. Whether you are buying or selling, our goal is to make your transactions as smooth and stress-free as possible.",
    "Founded on the principles of trust, transparency, and innovation, MIMOTAR has quickly become a leading name in the escrow industry. Our team of experienced professionals brings a wealth of knowledge and a commitment to excellence, ensuring that every transaction is handled with the utmost care and precision.",
  ],
  heroImageUrl: hero,
  heroImageAlt: "Mimotar team members standing beside a gray wall",
};

export const missionStatement =
  "Our mission is to be the most trusted escrow service provider, delivering unparalleled security and convenience to our clients. We strive to build lasting relationships based on integrity and mutual respect, fostering an environment where clients feel confident in every transaction.";

export const values: ValueItem[] = [
  {
    title: "Integrity",
    description:
      "We uphold the highest standards of honesty and ethical behavior in all our dealings.",
    icon: "\u2728",
  },
  {
    title: "Security",
    description:
      "We prioritize the safety and security of our clients transactions, implementing advanced measures to protect their assets.",
    icon: "\ud83d\udd12",
  },
  {
    title: "Transparency",
    description:
      "We believe in clear, open communication and provide complete transparency throughout the escrow process.",
    icon: "\ud83d\udcf0",
  },
  {
    title: "Innovation",
    description:
      "We continuously seek to improve our services through innovative solutions and cutting-edge technology.",
    icon: "\ud83d\udca1",
  },
  {
    title: "Customer focus",
    description:
      "Our clients are at the heart of everything we do. We listen, understand, and tailor our services to meet their unique needs.",
    icon: "\ud83c\udfaf",
  },
];

export const footerLinks: FooterLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/aboutUs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact" },
  { label: "FAQ", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];
