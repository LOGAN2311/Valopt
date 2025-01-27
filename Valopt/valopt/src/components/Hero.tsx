import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface HeroProps {
  heading: string;
  description: string;
  heroImage: {
    url: string;
    alternative_text?: string;
  };
  cta?: {
    name: string;
    url: string;
  };
}

// Animation variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Stagger animations for child elements
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero({
  heading,
  description,
  heroImage,
  cta,
}: HeroProps) {
  return (
    <>
      <section className="bg-blue-50 dark:bg-[#0E2F3F] py-20 md:px-18 sm:px-2 lg:px-24 mt-8">
        <div className="container max-w-7xl mx-auto px-4 mt-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }} // Ensures animations only play once
          >
            {/* Text Content */}
            <div className="space-y-6">
              {/* Heading */}
              <motion.h1
                variants={childVariants}
                className="text-5xl font-bold dark:text-white"
              >
                {heading}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={childVariants}
                className="text-lg dark:text-gray-300"
              >
                {description}
              </motion.p>

              {/* CTA Button */}
              {cta?.url && (
                <motion.div variants={childVariants}>
                  <Link
                    href={cta.url}
                    className="inline-block px-8 py-3 bg-[#4945FF] text-white font-semibold rounded-lg hover:bg-[#3937CC] transition-colors shadow-lg dark:bg-[#001C29] dark:hover:bg-[#001C29]"
                  >
                    {cta.name}
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Hero Image */}
            <motion.div variants={imageVariants}>
              {heroImage?.url && (
                <Image
                  src={
                    heroImage.url.startsWith("http")
                      ? heroImage.url
                      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${heroImage.url}`
                  }
                  alt={heroImage?.alternative_text || "Hero Image"}
                  width={700}
                  height={500}
                  className="rounded-lg object-cover"
                  priority // Improves SEO and performance for above-the-fold images
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
