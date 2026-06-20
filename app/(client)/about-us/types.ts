import { StaticImageData } from "next/image";

export type AboutIntro = {
  title: string;
  paragraphs: string[];
  heroImageUrl: string | StaticImageData;
  heroImageAlt: string;
};

export type ValueItem = {
  title: string;
  description: string;
  icon: string;
};

export type FooterLink = {
  label: string;
  href: string;
};
