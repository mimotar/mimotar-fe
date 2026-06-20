import { motion } from "framer-motion";
import { missionStatement } from "../data/aboutUsContent";
import { fadeUp } from "./animations";

export default function MissionSection() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mt-12 bg-[#f3e9f9] py-14"
    >
      <div className="mx-auto w-[90%] max-w-[1120px] text-center">
        <h2 className="text-4xl font-semibold text-[#8b2bb6] sm:text-[2.5rem]">Our Mission</h2>
        <p className="mx-auto mt-5 max-w-[930px] text-[15px] leading-7 text-slate-700 sm:text-base">
          {missionStatement}
        </p>
      </div>
    </motion.section>
  );
}
