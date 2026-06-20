"use client";

import Image from "next/image";
import Footer from "../component/Footer";
// import stepOneImage from "../../assets/png/step1.png";
// import stepTwoImage from "../../assets/png/step2.png";
// import stepThreeImage from "../../assets/png/step 3.png";
// import stepFourImage from "../../assets/png/step 4.png";

import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Clock, Gavel, Info, ShieldCheck } from "lucide-react";
import { useAuth } from "../(page)/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientSteps, freelancerSteps } from "./data/client_freelance_step";

// const steps = [
//   {
//     step: "Step 1",
//     title: "Initiate a Transaction",
//     description:
//       "Both the buyer and seller agree to the terms of their deal, and the buyer initiates the transaction by depositing funds into the escrow platform.",
//     image: stepOneImage,
//     imageAlt: "A buyer tapping a card machine with a mobile phone",
//   },
//   {
//     step: "Step 2",
//     title: "Seller Delivers Goods or Services",
//     description:
//       "The buyer's funds remain in the escrow account, ensuring that the seller will not receive payment until the goods or services are received and approved.",
//     image: stepTwoImage,
//     imageAlt: "A seller handing over a shopping bag to a buyer",
//   },
//   {
//     step: "Step 3",
//     title: "Buyer Confirms Receipt",
//     description:
//       "Once the seller delivers the goods or completes the service, the buyer take the time to inspect the goods or assess the services, and if satisfied, click 'Confirm Receipt' to release the funds to the seller. If there's an issue, MIMOTAR is here to help resolve disputes quickly and fairly.",
//     image: stepThreeImage,
//     imageAlt:
//       "A buyer confirming receipt on a mobile phone beside a delivered package",
//   },
//   {
//     step: "Step 4",
//     title: "Release of Funds",
//     description:
//       "Once the buyer confirms they have received the goods or services and are satisfied with the transaction, the escrow platform releases the funds to the seller.",
//     image: stepFourImage,
//     imageAlt: "Hands holding a jar filled with cash",
//   },
// ];

export default function Page() {
  const [hwTab, setHwTab] = useState<"client" | "freelancer">("client");
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
    <div className="pt-24 px-4 pb-16">
      <div className="w-full">
        {/* Primary Page Canvas - Rendered Directly as requested */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12 animate-fade-in text-left">
          <div className="space-y-12 md:space-y-16">
            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 bg-brand-secondary/15 text-[#a16207] px-3.5 py-1.5 rounded-full text-caption font-bold uppercase tracking-wider"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#eab308]" /> How
                Mimotar Works
              </motion.div>
              <h1 className="text-h1 text-[#111827] leading-tight">
                Simple. Secure.{" "}
                <span className="text-brand-primary">Scam-free payments.</span>
              </h1>
              <p className="text-body text-gray-500 max-w-xl mx-auto leading-relaxed">
                Mimotar acts as a neutral helper. We shield both the client and
                creator by holding payment safely until the work is done and
                approved.
              </p>
            </div>

            {/* Interactive Timeline Tabs */}
            <div className="space-y-8 font-sans">
              <div className="flex justify-center bg-gray-100 p-1.5 rounded-2xl max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => setHwTab("client")}
                  className={`flex-1 py-2 rounded-xl text-body-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${hwTab === "client" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                >
                  💼 I am a Client
                </button>
                <button
                  type="button"
                  onClick={() => setHwTab("freelancer")}
                  className={`flex-1 py-2 rounded-xl text-body-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${hwTab === "freelancer" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                >
                  💻 I am a Freelancer
                </button>
              </div>

              {/* Informative Label Bar */}
              <div className="flex justify-center">
                <AnimatePresence mode="wait">
                  {hwTab === "client" ? (
                    <motion.div
                      key="client-label"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/50 rounded-2xl text-caption text-[#78350f] font-semibold"
                    >
                      <Info className="w-3.5 h-3.5 text-[#eab308] shrink-0" />
                      <span>
                        Your payment is placed in a secure vault and is only
                        sent to the freelancer when you approve the work.
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="freelancer-label"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/[0.03] border border-brand-primary/10 rounded-2xl text-caption text-brand-primary font-semibold"
                    >
                      <Clock
                        className="w-3.5 h-3.5 text-brand-primary shrink-0 animate-spin"
                        style={{ animationDuration: "4s" }}
                      />
                      <span>
                        Enjoy absolute payment guarantees. Inactive or stalling
                        clients trigger automatic 48-hour milestone releases.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step Display Deck */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {(hwTab === "client" ? clientSteps : freelancerSteps).map(
                    (st, idx) => {
                      const StepIcon = st.icon;
                      return (
                        <motion.div
                          key={`${hwTab}-${st.step}`}
                          initial={{ opacity: 0, scale: 0.95, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -15 }}
                          transition={{ duration: 0.4, delay: idx * 0.08 }}
                          whileHover={{ y: -5, transition: { duration: 0.15 } }}
                          className="bg-white rounded-3xl p-6.5 border border-gray-100 shadow-xs text-left relative flex flex-col justify-between min-h-[220px]"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-h1 text-brand-primary/15 font-bold">
                                {st.step}
                              </span>
                              <span className="text-caption font-extrabold uppercase tracking-wider text-[#a16207] bg-amber-50 px-2.5 py-1 rounded-full">
                                {st.badge}
                              </span>
                            </div>

                            <h3 className="text-h4 text-gray-900 flex items-center gap-1.5 leading-tight">
                              <StepIcon className="w-4 h-4 text-brand-primary shrink-0" />{" "}
                              {st.title}
                            </h3>
                            <p className="text-body-sm text-gray-500 mt-2.5">
                              {st.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    },
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Section: Active Dispute Assistance */}
            <div className="border border-gray-100 rounded-[2.5rem] bg-gray-50/50 p-8 md:p-12 text-left grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-label text-red-500 block">
                  How we protect you
                </span>
                <h2 className="text-h2 text-[#111827] tracking-tight leading-snug">
                  What if there is a dispute?
                </h2>
                <p className="text-body text-gray-500 mt-1 leading-relaxed">
                  We guarantee absolute fairness to both the custom client and
                  freelancer. If there is a disagreement, either party can ask
                  our helper support team to step in and help.
                </p>

                <div className="space-y-3 pt-2 font-sans">
                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-caption shrink-0">
                      1
                    </span>
                    <p className="text-body-sm text-gray-600 font-medium">
                      The payment countdown is paused instantly.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-caption shrink-0">
                      2
                    </span>
                    <p className="text-body-sm text-gray-600 font-medium">
                      Both sides share their messages, files, and work proofs
                      with our team.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-caption shrink-0">
                      3
                    </span>
                    <p className="text-body-sm text-gray-600 font-medium">
                      Our team reviews everything and releases the funds fairly
                      within 24 to 48 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center min-h-[220px] shadow-sm relative overflow-hidden">
                <div className="space-y-4 text-center z-10 max-w-xs">
                  <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-red-500 mx-auto">
                    <Gavel className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="text-label text-gray-900">
                    Friendly Human Support
                  </h3>
                  <p className="text-body-sm text-gray-400 max-w-[240px] leading-relaxed mx-auto">
                    We help resolve disagreements quickly and fairly with direct
                    WhatsApp support.
                  </p>
                </div>
              </div>
            </div>

            {/* Converter Area */}
            <div className="p-8 md:p-12 text-center rounded-[2rem] bg-gradient-to-t from-brand-primary/[0.04] to-transparent">
              <h2 className="text-h3 text-gray-900">
                Are you ready to transact with complete peace of mind?
              </h2>
              <p className="text-body-sm text-gray-400 mt-1">
                Start protecting your investments and labor instantly.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={handleStartCTA}
                className="mt-5 px-8 py-3 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-2xl shadow-sm inline-flex items-center gap-1.5 cursor-pointer font-sans"
              >
                Start a Safe Project <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <section className="flex min-h-full flex-col bg-white">
    //   <div className="w-[90%] max-w-[1120px] mx-auto py-6 sm:py-8 lg:py-10">
    //     <div className="max-w-[860px]">
    //       <h1 className="text-[2rem] font-semibold leading-tight text-slate-900 sm:text-[2.5rem]">
    //         How MIMOTAR Works
    //       </h1>
    //       <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
    //         We are dedicated to providing secure, reliable, and efficient escrow
    //         services to individuals and businesses alike.
    //         <br className="hidden sm:block" />
    //         <span className="sm:hidden"> </span>
    //         We offer a seamless and secure escrow experience, backed by a team
    //         that genuinely cares about your success.
    //       </p>
    //     </div>

    //     <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10 lg:space-y-12">
    //       {steps.map((item, index) => {
    //         const isEvenRow = index % 2 === 1;

    //         return (
    //           <article
    //             key={item.step}
    //             className="grid items-center gap-6 rounded-[28px] bg-white lg:grid-cols-2 lg:gap-10"
    //           >
    //             <div
    //               className={`order-1 ${isEvenRow ? "lg:order-2" : "lg:order-1"}`}
    //             >
    //               <Image
    //                 src={item.image}
    //                 alt={item.imageAlt}
    //                 priority={index === 0}
    //                 className="h-[220px] w-full rounded-[12px] object-cover sm:h-[260px] lg:h-[230px]"
    //               />
    //             </div>

    //             <div
    //               className={`order-2 ${isEvenRow ? "lg:order-1" : "lg:order-2"}`}
    //             >
    //               <p className="text-[1.75rem] font-semibold leading-none text-[#B334D2]">
    //                 {item.step}
    //               </p>
    //               <h2 className="mt-3 text-lg font-semibold text-slate-800 sm:text-xl">
    //                 {item.title}
    //               </h2>
    //               <p className="mt-3 max-w-[490px] text-sm leading-6 text-slate-600 sm:text-base">
    //                 {item.description}
    //               </p>
    //             </div>
    //           </article>
    //         );
    //       })}
    //     </div>
    //   </div>

    //   <div className="mt-auto">
    //     <Footer />
    //   </div>
    // </section>
  );
}
