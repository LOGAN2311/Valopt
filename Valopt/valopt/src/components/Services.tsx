import React from "react";
import { motion, Variants } from "framer-motion";

interface ServiceItem {
  heading: string;
  description: string;
}

interface ServicesProps {
  title: string;
  description: string;
  items: ServiceItem[];
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

export default function Services({ title, description, items }: ServicesProps) {
  return (
    <section className="bg-blue-50 dark:bg-[#0E2F3F] py-16 md:px-18 sm:px-2 lg:px-24">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold dark:text-white mb-4">{title}</h2>
          <p className="text-lg dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }} // Trigger animations earlier
          variants={containerVariants}
          className="grid grid-cols-1 max-w-5xl mx-auto sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {items?.map((item, index) => (
            <motion.div
              key={index}
              variants={slideUpVariants}
              className="relative group h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Service Card */}
              <div className="relative bg-white p-8 rounded-xl border border-purple-100 dark:bg-[#184055] dark:border-gray-900 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                {/* Service Heading */}
                <h3 className="text-2xl font-bold mb-4 dark:text-slate-300 transition-colors duration-300 flex-shrink-0">
                  {item.heading}
                </h3>

                {/* Service Description */}
                <p className="text-md dark:text-slate-300 transition-colors duration-300 flex-grow">
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
