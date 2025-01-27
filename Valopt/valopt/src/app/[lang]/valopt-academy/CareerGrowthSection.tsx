import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { CareerGrowthData } from "@/app/types";

interface CareerGrowthSectionProps {
  data: CareerGrowthData;
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

export default function CareerGrowthSection({
  data,
}: CareerGrowthSectionProps) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 md:px-18 sm:px-2 lg:px-24">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 dark:text-white"
        >
          {data?.heading || "Career Growth"}
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }} // Trigger animations earlier
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {data?.cards?.map((card, index) => (
            <motion.div
              key={index}
              variants={slideUpVariants}
              className="relative group h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Card Content */}
              <div className="relative bg-white dark:bg-gray-700 p-8 rounded-xl border border-purple-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                {/* Card Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src={
                      card?.academy_image?.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${card?.academy_image?.url}`
                        : "/default-avatar.jpg"
                    }
                    alt={card?.academy_heading || "Card Image"}
                    fill // Use fill to make the image responsive within the container
                    className="rounded-full object-cover"
                    priority={index < 3} // Prioritize loading the first 3 images
                  />
                </div>

                {/* Card Heading */}
                <h3 className="text-2xl font-bold text-center mb-4 px-4 dark:text-white transition-colors duration-300 flex-shrink-0">
                  {card?.academy_heading || "Card Heading"}
                </h3>

                {/* Card Description */}
                <p className="dark:text-gray-300 text-center mb-6 transition-colors duration-300 flex-grow">
                  {card?.academy_description || "Card description goes here."}
                </p>

                {/* Card Feature List */}
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                  {card?.academy_featureList?.map((listItem, idx) => (
                    <li key={idx}>{listItem}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
