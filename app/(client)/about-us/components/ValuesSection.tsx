import { motion } from "framer-motion";
import { values } from "../data/aboutUsContent";
import { item, stagger } from "./animations";

function ValueIcon({ icon }: { icon: string }) {
  return (
    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#f5eafc] ring-8 ring-[#f8f1fc]">
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
    </div>
  );
}

export default function ValuesSection() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[90%] max-w-[1120px]">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="text-center text-4xl font-semibold text-slate-800 sm:text-[2.5rem]"
        >
          Our Values
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="mx-auto mt-10 grid max-w-[1050px] gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value) => (
            <motion.article
              key={value.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="text-center"
            >
              <ValueIcon icon={value.icon} />
              <h3 className="text-xl font-semibold text-slate-800">{value.title}</h3>
              <p className="mx-auto mt-3 max-w-[290px] text-sm leading-6 text-slate-600">
                {value.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
