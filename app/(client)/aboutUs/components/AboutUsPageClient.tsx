"use client";

import Footer from "../../component/Footer";
import IntroHeroSection from "./IntroHeroSection";
import MissionSection from "./MissionSection";
import ValuesSection from "./ValuesSection";

export default function AboutUsPageClient() {
  return (
    <section className="min-h-full bg-[#fafbfc]">
      <div className="mx-auto w-[90%] max-w-[1120px] pb-10">
        <IntroHeroSection />
      </div>
      <MissionSection />
      <ValuesSection />
      <Footer />
    </section>
  );
}
