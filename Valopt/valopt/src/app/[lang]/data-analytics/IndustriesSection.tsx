import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { IndustriesData } from "@/app/types";

interface IndustriesSectionProps {
  title: string;
  description: string;
  items: IndustriesData["about_featureList"];
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

export default function IndustriesSection({
  title,
  description,
  items,
}: IndustriesSectionProps) {
  return (
    <section className="pt-8 pb-24 bg-white dark:bg-[#0E2F3F]">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="max-w-4xl mx-auto text-3xl md:text-4xl lg:text-5xl font-bold dark:text-slate-300 mb-4">
            {title}
          </h2>
          <p className="dark:text-slate-300 max-w-4xl mx-auto text-lg">
            {description}
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }} // Trigger animations earlier
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
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
              <div className="flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform h-full">
                {/* Image and Heading */}
                <div className="bg-[#F2F6FF] flex flex-col items-center gap-4 p-8 dark:bg-[#001C29]">
                  {item.image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image}`}
                      alt={item.heading || "Industry Image"}
                      className="inline-block h-16 w-16 object-cover rounded-full"
                      width={64}
                      height={64}
                    />
                  )}
                  <h3 className="text-2xl text-center font-bold dark:text-white">
                    {item.heading}
                  </h3>
                </div>

                {/* Description */}
                <div className="dark:bg-[#184055] p-8 border-t border-gray-200 dark:border-gray-600 flex-grow">
                  <p className="text-lg dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
