"use client";

import { ArrowRight, Clock, ShieldCheck, Sparkles, Users } from "lucide-react";
// import Footer from "../../component/Footer";
// import IntroHeroSection from "./IntroHeroSection";
// import MissionSection from "./MissionSection";
// import ValuesSection from "./ValuesSection";

import { motion } from "motion/react";
import { useAuth } from "../../(page)/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AboutUsPageClient() {
  const { session, IsAuthenticated, userVerified } = useAuth();

  const navigate = useRouter();
  const handleStartCTA = () => {
    if (session && IsAuthenticated) {
      navigate.push("dashboard");
    } else {
      navigate.push("auth?auth=signup");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    // <section className="min-h-full bg-[#fafbfc]">
    //   <div className="mx-auto w-[90%] max-w-[1120px] pb-10">
    //     <IntroHeroSection />
    //   </div>
    //   <MissionSection />
    //   <ValuesSection />
    //   <Footer />
    // </section>
    <div className="pt-24 px-4 pb-16">
      <div className="space-y-12 md:space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary px-3.5 py-1.5 rounded-full text-caption uppercase tracking-wider font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Safe and Simple
            Digital Payments in Nigeria
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-h1 text-[#111827] leading-tight"
          >
            Built to make online payments{" "}
            <span className="text-brand-primary bg-clip-text">safe</span> for
            everyone
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-body md:text-base text-gray-500 font-normal leading-relaxed"
          >
            Too many people lose hard-earned money to online cheats. We founded
            Mimotar to bring absolute trust, safety, and speed to remote work in
            Nigeria.
          </motion.p>
        </div>

        {/* Bento Grid: The Trust Gap */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-label text-brand-primary block tracking-wider uppercase">
              Why We Exist
            </span>
            <h2 className="text-h2 text-[#111827] tracking-tight">
              Why online payments feel risky
            </h2>
            <p className="text-body-sm text-gray-400 max-w-lg mx-auto">
              We built Mimotar to solve the payment worries and trust issues
              that hold back Nigerian freelancers and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Social Media Traps",
                desc: "The worry of sending money to a business or creator you found online, only to have them block you immediately after payment.",
                icon: ShieldCheck,
                border: "border-red-200/60 bg-red-50/[0.02]",
                iconColor: "bg-red-50 text-red-500",
              },
              {
                title: "Working at a Distance",
                desc: "Distance makes collaboration feel like a gamble. Businesses hesitate to hire talented designers or developers due to trust issues.",
                icon: Users,
                border: "border-amber-200/60 bg-amber-50/[0.02]",
                iconColor: "bg-amber-50 text-amber-500",
              },
              {
                title: "Work Done, No Payment",
                desc: "Freelancers spend hours building apps, writing copy, or designing logos, only to face clients who refuse to pay or disappear.",
                icon: Clock,
                border: "border-brand-primary/25 bg-brand-primary/[0.01]",
                iconColor: "bg-magenta-50 text-brand-primary",
              },
            ].map((gap, i) => {
              const Icon = gap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-6 md:p-8 rounded-3xl border ${gap.border} flex flex-col justify-between space-y-5 shadow-xs transition-all text-left`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${gap.iconColor} flex items-center justify-center`}
                  >
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-h4 text-[#111827] leading-snug">
                      {gap.title}
                    </h3>
                    <p className="text-body-sm text-gray-405 leading-relaxed font-normal">
                      {gap.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quote Vision Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-gray-950 via-gray-900 to-brand-primary/[0.08] bg-gray-900 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-left"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="space-y-4 max-w-xl z-10 text-left">
            <span className="text-label text-brand-secondary block tracking-wider uppercase">
              Our Goal
            </span>
            <p className="text-h3 text-gray-100 font-semibold italic leading-relaxed">
              "When people can trust each other, working together online is
              simple. Removing payment fears unlocks real opportunities for
              thousands of hardworking Nigerians."
            </p>
            <div className="pt-2 border-t border-gray-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs uppercase font-sans">
                MT
              </div>
              <div>
                <span className="text-body-sm font-bold text-white block">
                  The Mimotar Support Team
                </span>
                <span className="text-caption text-gray-400">
                  Victoria Island, Lagos
                </span>
              </div>
            </div>
          </div>

          {/* Conversion Statistics Box Inside About */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0 z-10">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left">
              <span className="text-h2 text-brand-secondary block font-bold tracking-tight">
                100%
              </span>
              <span className="text-label text-gray-300 block mt-1">
                Payment Safe
              </span>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left">
              <span className="text-h2 text-emerald-400 block font-bold tracking-tight">
                0%
              </span>
              <span className="text-label text-gray-300 block mt-1">
                No Scams
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Call to Action */}
        <div className="text-center pt-2">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={handleStartCTA}
            className="px-8 py-3.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-2.5xl shadow-md inline-flex items-center gap-1.5 cursor-pointer"
          >
            Join Mimotar Today <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
