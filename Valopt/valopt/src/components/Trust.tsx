import React from "react";
import { motion, Variants } from "framer-motion";

interface TrustItem {
  heading: string;
  description: string;
}

interface TrustProps {
  title?: string;
  items: TrustItem[];
}

// Animation variants for Framer Motion
const slideUpVariants: Variants = {
  offscreen: {
    y: 40,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.1,
    },
  },
};

const containerVariants: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2, // Stagger animations for child elements
    },
  },
};

export default function Trust({
  title = "Trusted by Customers",
  items,
}: TrustProps) {
  return (
    <section className="bg-white dark:bg-[#0E2F3F] py-16 md:px-18 sm:px-2 lg:px-24">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-4xl max-w-5xl mx-auto font-bold dark:text-slate-300 mb-12"
        >
          {title}
        </motion.h2>

        {/* Trust Cards Grid */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }} // Trigger animations earlier
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {items?.map((item, index) => (
            <motion.div
              key={index}
              variants={slideUpVariants}
              className="relative group h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Trust Card */}
              <div className="relative bg-white dark:bg-[#184055] p-8 rounded-xl border border-purple-100 dark:border-[#001C29] hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                {/* Trust Heading */}
                <h3 className="text-2xl font-bold mb-4 dark:text-slate-300 transition-colors duration-300 flex-shrink-0">
                  {item.heading}
                </h3>

                {/* Trust Description */}
                <p className="text-md dark:text-gray-300 transition-colors duration-300 flex-grow">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
