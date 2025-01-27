import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface Feature {
  icon?: string;
  heading: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  description: string;
  items: Feature[];
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

export default function FeaturesSection({
  title,
  description,
  items,
}: FeaturesSectionProps) {
  return (
    <section className="bg-white dark:bg-[#0E2F3F] py-12 md:py-12">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="max-w-4xl mx-auto text-3xl font-bold dark:text-slate-300 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg dark:text-slate-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={slideUpVariants}
              className="relative group h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 hover:bg-slate-300 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Feature Card */}
              <div className="bg-[#EFF6FF] box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff; dark:bg-[#184055] p-8 rounded-lg shadow-lg hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center text-center">
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.heading}
                    className="h-16 w-16 object-cover rounded-full mb-6"
                    width={64}
                    height={64}
                  />
                )}
                <h3 className="text-2xl font-bold dark:text-slate-300 mb-4">
                  {item.heading}
                </h3>
                <p className="text-lg dark:text-slate-300">
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
