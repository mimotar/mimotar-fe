"use client";

import Footer from "../component/Footer";
import PhoneIcon from "../../assets/icons/phone.svg";
import MapIcon from "../../assets/icons/map.svg";
import EmailIcon from "../../assets/icons/mail.svg";
import ContactUsForm from "./components/ContactUsForm";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

function page() {
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [ticketRef, setTicketRef] = useState("");
  const [contactRole, setContactRole] = useState<"client" | "freelancer">(
    "client",
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      const generatedRef = `MIM-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketRef(generatedRef);
    }, 1800);
  };
  return (
    <div className="pt-24 px-4 pb-16">
      <div className="space-y-12 md:space-y-16">
        {/* Header Area */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary px-3.5 py-1.5 rounded-full text-caption font-bold uppercase tracking-wider font-sans">
            <Phone className="w-3.5 h-3.5" /> Help Center
          </div>
          <h1 className="text-h1 text-[#111827] leading-tight">
            How can we help you?
          </h1>
          <p className="text-body text-gray-450 leading-relaxed">
            Need help with card deposits, verifying locked payments, or
            resolving a project stage issue? We are here for you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form Side */}
          <div className="lg:col-span-3 bg-white p-7 rounded-3xl border border-gray-100 shadow-xs space-y-6">
            <div className="text-left">
              <h3 className="text-h3 text-gray-900">Send Us a Message</h3>
              <p className="text-body-sm text-gray-400 mt-1">
                Your messages are private, secure, and stored safely.
              </p>
            </div>

            {!sentSuccess ? (
              <form
                onSubmit={handleContactSubmit}
                className="space-y-4 text-left font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-label text-gray-400 mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Samuel Adebayo"
                      className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-xs px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-brand-primary transition"
                    />
                  </div>
                  <div>
                    <label className="text-label text-gray-400 mb-1 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="samuel@company.com"
                      className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-xs px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-brand-primary transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-label text-gray-400 mb-1 block">
                    I am using Mimotar as:
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setContactRole("client")}
                      className={`py-2 text-xs font-bold rounded-xl border transition flex items-center justify-center gap-1.5 cursor-pointer ${contactRole === "client" ? "border-[#c026d3] bg-magenta-50 text-brand-primary font-bold" : "border-gray-200 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                      💼 Payer (Client)
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactRole("freelancer")}
                      className={`py-2 text-xs font-bold rounded-xl border transition flex items-center justify-center gap-1.5 cursor-pointer ${contactRole === "freelancer" ? "border-[#3b82f6] bg-blue-50/50 text-blue-600 font-bold" : "border-gray-200 text-gray-500 bg-white hover:bg-gray-50"}`}
                    >
                      💻 Payee (Freelancer)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-label text-gray-400 mb-1 block">
                    Detailed Inquiry Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Explain the specific payment code, project step, or agreement ID you need help with..."
                    className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-xs px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-brand-primary transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 font-bold text-white text-xs rounded-xl shadow-xs transition duration-150 active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" /> Sending
                      message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-100 text-left space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-label text-emerald-600 block">
                    Message Sent Successfully
                  </span>
                  <h4 className="text-h3 text-emerald-900 mt-1">
                    We are on it!
                  </h4>
                  <p className="text-body-sm text-emerald-850 leading-relaxed font-normal mt-2.5">
                    Thanks, <strong>{contactName}</strong>. Your inquiry has
                    been sent to our friendly support team. We will get back to
                    you shortly, usually in under 30 minutes.
                  </p>
                </div>

                <div className="p-3.5 bg-white/60 border border-emerald-100/40 rounded-2xl">
                  <span className="text-caption text-emerald-700/60 font-medium block">
                    Support Ticket ID:
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-900 tracking-wider block mt-0.5">
                    {ticketRef}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSentSuccess(false);
                    setContactMessage("");
                    setContactName("");
                    setContactEmail("");
                  }}
                  className="text-body-sm font-bold text-emerald-600 hover:underline"
                >
                  File another support ticket
                </button>
              </motion.div>
            )}
          </div>

          {/* Badges and Address side */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                title: "Email Support",
                detail: "support@mimotar.com",
                desc: "Send us an email anytime. Our helpful team answers every message.",
                icon: Mail,
                color: "text-brand-primary bg-magenta-50 border-magenta-100/30",
              },
              {
                title: "WhatsApp Chat Support",
                detail: "+234 (1) 803 0000 000",
                desc: "Get fast answers and manual help directly on WhatsApp.",
                icon: Phone,
                color: "text-amber-500 bg-amber-50 border-amber-100/30",
              },
              {
                title: "Our Lagos Office",
                detail: "Eko Atlantic, VI, Lagos, Nigeria",
                desc: "Our physical office space in Lagos, built for Nigerian creators.",
                icon: MapPin,
                color: "text-brand-primary bg-magenta-50 border-magenta-100/30",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-xs flex gap-4 text-left"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl ${item.color} border flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-label text-gray-400 block tracking-wider">
                      {item.title}
                    </span>
                    <span className="text-body-sm font-bold text-gray-900 block font-sans select-all">
                      {item.detail}
                    </span>
                    <p className="text-caption text-gray-450 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    // <>
    //   <div className="min-h-screen xl:px-20 sm:px-10 p-4 ">
    //     <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-8 justify-between my-4 lg:my-8">
    //       <ContactUsForm />
    //       <div className="flex flex-col md:mt-28 mt-10 gap-10">
    //         <div className="flex flex-col items-center justify-center gap-2">
    //           <PhoneIcon />
    //           <p className=" font-normal text-center">
    //             Tel +234 803 246 5303, +234 813 019 730{" "}
    //           </p>
    //           <p className=" font-normal text-center">
    //             Sales +234 803 246 5303, +234 813 019 730{" "}
    //           </p>
    //           <p className=" font-normal text-center">
    //             Support +234 803 246 5303, +234 813 019 730
    //           </p>
    //         </div>
    //         <div className="flex flex-col items-center justify-center gap-2">
    //           <MapIcon />
    //           <p className=" text-center">
    //             {" "}
    //             8, Allen Avenue, Ikeja, Lagos, Nigeria
    //           </p>
    //         </div>
    //       </div>
    //       <div className="grid md:mt-28 mt-10">
    //         <div className="flex flex-col items-center gap-2">
    //           <EmailIcon />
    //           <p className=" font-normal  text-center">
    //             {" "}
    //             Enquires: www.mimotarenquires.com{" "}
    //           </p>
    //           <p className=" font-normal text-center">
    //             {" "}
    //             Sales: www.mimotarsales.com{" "}
    //           </p>
    //           <p className=" font-normal text-center">
    //             {" "}
    //             Support: www.mimotarsupport.com{" "}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mt-auto">
    //     <Footer />
    //   </div>
    // </>
  );
}

export default page;
