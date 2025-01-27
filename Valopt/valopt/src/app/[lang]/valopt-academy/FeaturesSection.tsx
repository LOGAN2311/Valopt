import { motion, Variants } from "framer-motion";
import { Feature } from "@/app/types";

interface FeaturesSectionProps {
  data: Feature[];
}

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
      staggerChildren: 0.2,
    },
  },
};

export default function FeaturesSection({ data }: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-white dark:bg-[#0E2F3F] md:px-18 sm:px-2 lg:px-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 dark:text-white"
        >
          Key Features
        </motion.h2>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {data?.map((feature, index) => (
            <motion.div
              key={index}
              variants={slideUpVariants}
              className="relative group h-full"
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

              <div className="relative bg-white dark:bg-[#184055] p-8 rounded-xl border border-purple-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                {/* Feature Icon */}
                <div className="text-[#4945FF] dark:text-slate-300 mb-6 transform group-hover:scale-105 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>

                {/* Feature Content */}
                <h3 className="text-2xl font-bold mb-4 dark:text-white transition-colors duration-300 flex-shrink-0">
                  {feature?.heading || "Feature Heading"}
                </h3>

                <p className="dark:text-gray-300 transition-colors duration-300 flex-grow">
                  {feature?.description || "Feature description goes here."}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
