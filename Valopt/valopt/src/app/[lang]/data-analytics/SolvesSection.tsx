import React from "react";
import { motion, Variants } from "framer-motion";
import { SolvesData } from "@/app/types";

interface SolvesSectionProps {
  title: string;
  items: SolvesData["analytics_solves_list"];
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

export default function SolvesSection({ title, items }: SolvesSectionProps) {
  return (
    <section className="bg-white dark:bg-[#001C29]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl max-w-xl mx-auto font-bold text-center dark:text-white"
        >
          {title}
        </motion.h2>

        {/* Grid Layout */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }} // Trigger animations earlier
          variants={containerVariants}
          className="grid gap-y-8 gap-x-8 mt-10 sm:grid-cols-2 md:grid-cols-4"
        >
          {items?.map((item) => (
            <motion.div
              key={item.id}
              variants={slideUpVariants}
              className="relative group h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Card Content */}
              <div className="p-8 bg-white dark:bg-[#184055] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform h-full">
                {/* Card Heading */}
                <h3 className="text-2xl font-bold dark:text-slate-300 mb-4">
                  {item.heading}
                </h3>

                {/* Card Description */}
                <p className="text-md dark:text-slate-300">
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
