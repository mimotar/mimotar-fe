import { motion } from "framer-motion";
import { aboutIntro } from "../data/aboutUsContent";
import { fadeUp } from "./animations";
import Image from "next/image";

export default function IntroHeroSection() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="pt-5 sm:pt-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <article>
          <h1 className="text-4xl font-bold text-slate-800 sm:text-4xl">
            {aboutIntro.title}
          </h1>
          <div className="mt-4 space-y-5 text-[15px] leading-7 text-slate-700 sm:text-base">
            {aboutIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={aboutIntro.heroImageUrl}
            alt={aboutIntro.heroImageAlt}
            className="h-[240px] w-full object-cover sm:h-[300px] lg:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.section>
  );
}
