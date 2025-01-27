import React from "react";
import { motion, Variants } from "framer-motion";

interface CtaProps {
  title: string;
  description: string;
}

// Animation variants for Framer Motion
const fadeInVariants: Variants = {
  offscreen: {
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.1,
    },
  },
};

export default function Cta({ title, description }: CtaProps) {
  return (
    <section className="bg-white dark:bg-[#0E2F3F] py-16 md:px-18 sm:px-2 lg:px-24">
      <div className="container max-w-7xl mx-auto px-4">
        {/* CTA Container */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }} // Trigger animations earlier
          variants={fadeInVariants}
          className="bg-[#1D1B84] p-12 rounded-lg text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 dark:bg-[#184055]"
        >
          {/* CTA Heading */}
          <h2 className="text-4xl font-bold text-white mb-6">{title}</h2>

          {/* CTA Description */}
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            {description}
          </p>

          {/* CTA Button (Optional) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <button className="bg-white text-[#1D1B84] px-8 py-3 rounded-md font-semibold hover:bg-purple-50 transition-colors shadow-lg dark:bg-[#001C29] dark:text-slate-300">
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
