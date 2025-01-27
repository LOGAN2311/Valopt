import React from "react";
import { motion, Variants } from "framer-motion";
import { ChooseData } from "@/app/types";

interface ChooseSectionProps {
  title: string;
  description: string;
  items: ChooseData["ai_assistance_guide"];
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

export default function ChooseSection({
  title,
  description,
  items,
}: ChooseSectionProps) {
  return (
    <section className="py-16 md:py-24 ">
      <div className="container max-w-5xl mx-auto px-5 md:px-10 lg:px-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold   bg-clip-text mb-4 dark:text-slate-300">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
            {description}
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }} // Trigger animations earlier
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {items?.map((item) => (
            <motion.div
              key={item.id}
              variants={slideUpVariants}
              className="relative group h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Card Content */}
              <div className="h-full p-8 bg-white dark:bg-[#184055] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full px-5 py-1 bg-[#4945FF] dark:bg-[#001C29]">
                    <span className="text-white font-bold text-lg">
                      {item.guide_steps_no}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold dark:text-slate-300">
                    {item.guide_steps_heading}
                  </h3>
                </div>

                {/* Content */}
                <p className="text-lg dark:text-slate-300 leading-relaxed">
                  {item.guide_steps_description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
