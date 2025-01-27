import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { TopCoursesData } from "@/app/types";

interface TopCoursesSectionProps {
  data: TopCoursesData;
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

export default function TopCoursesSection({ data }: TopCoursesSectionProps) {
  return (
    <section className="bg-[#1D1B84] dark:bg-[#001C29] py-20 md:px-18 sm:px-2 lg:px-24">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          {data?.about_feature_heading || "Top Courses"}
        </motion.h2>

        {/* Courses Grid */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }} // Trigger animations earlier
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {data?.about_featureList?.map((list, index) => (
            <motion.div
              key={index}
              variants={slideUpVariants}
              className="relative group h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Course Card */}
              <Link
                href="#"
                className="relative bg-white p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col dark:bg-[#0E2F3F] dark:border-[#184055]"
              >
                {/* Course Image */}
                <div className="relative w-full h-48 mb-6">
                  <Image
                    src={
                      list?.icon?.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${list.icon.url}`
                        : "/default-hero-image.jpg"
                    }
                    alt={list?.heading || "Course Image"}
                    fill // Use fill to make the image responsive within the container
                    className="rounded-lg object-cover"
                    priority={index < 3} // Prioritize loading the first 3 images
                  />
                </div>

                {/* Course Heading */}
                <h3 className="text-2xl font-bold mb-4 transition-colors duration-300 flex-shrink-0 dark:text-slate-300">
                  {list?.heading || "Course Heading"}
                </h3>

                {/* Course Description */}
                <p className="transition-colors duration-300 flex-grow dark:text-slate-300">
                  {list?.description || "Course description goes here."}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
