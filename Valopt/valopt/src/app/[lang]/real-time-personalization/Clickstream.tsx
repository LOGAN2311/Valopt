"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "../../../components/Hero";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { motion } from "framer-motion";

interface Feature {
  id: number;
  heading: string;
  description: string;
}

interface ClickstreamStep {
  id: number;
  guide_steps_no: string;
  guide_steps_heading: string;
  guide_steps_description: string;
}

interface ClickstreamData {
  __component: string;
  about_hero_heading?: string;
  about_hero_description?: string;
  about_hero_image?: { url: string };
  about_hero_cta?: { name: string; url: string };
  about_featureList?: Feature[];
  clickstream_steps?: ClickstreamStep[];
  clickstream_heading?: string;
  clickstream_description?: string;
  clickstream_image?: { url: string };
}

interface ClickstreamProps {
  initialData: any; // Temporarily use `any` to debug the structure
  lang: string;
}

export default function Clickstream({ initialData, lang }: ClickstreamProps) {
  const [data, setData] = useState<any>(initialData); // Temporarily use `any` to debug the structure
  const [loading, setLoading] = useState<boolean>(false); // Set to false since initialData is provided
  const [error, setError] = useState<string | null>(null);
  const { setLanguage } = useLanguage();

  // Set the language based on the `lang` prop
  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);

  // Log the structure of initialData for debugging
  useEffect(() => {
    console.log("Initial Data:", initialData);
  }, [initialData]);

  // Show loading spinner if data is being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show error message if there's an error
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // Show error message if no data is available
  if (!data || !data.real_time_personalization) {
    return <ErrorDisplay error="No data available." />;
  }

  // Extract relevant data from the fetched data
  const clickstreamData = data.real_time_personalization;
  const aboutHero =
    clickstreamData.find(
      (item: any) => item.__component === "about.about-hero"
    ) || {};
  const aboutFeatures =
    clickstreamData.find(
      (item: any) => item.__component === "about.about-features"
    ) || {};
  const clickstream =
    clickstreamData.find(
      (item: any) => item.__component === "clickstream.clickstream"
    ) || {};

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Hero Section */}
      <Hero
        heading={aboutHero.about_hero_heading || "Default Heading"}
        description={aboutHero.about_hero_description || "Default Description"}
        heroImage={aboutHero.about_hero_image || { url: "/default-image.jpg" }}
        cta={aboutHero.about_hero_cta || { name: "Default CTA", url: "#" }}
      />

      {/* Features Section */}
      {aboutFeatures && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="sm:flex sm:flex-col md:flex md:flex-row lg:flx-row mx-auto w-full max-w-7xl gap-x-10 px-5 py-16 md:px-10 md:py-20">
            <div className="flex flex-col my-auto">
              <motion.h2
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-3xl text-center lg:text-left font-bold dark:text-slate-300 md:text-5xl"
              >
                {aboutFeatures?.about_feature_heading ||
                  "Default Features Heading"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mt-4 max-w-lg text-center lg:text-left dark:text-slate-300"
              >
                {aboutFeatures?.about_feature_description ||
                  "Default Feature Description"}
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-5 px-3 mt-6 text-center sm:grid-cols-2 md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-6">
              {aboutFeatures.about_featureList?.map((feature: any) => (
                <motion.div
                  key={feature.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="flex flex-col gap-5 justify-evenly rounded-md p-8 md:p-6 bg-[#F0F5FF] dark:bg-[#184055]"
                >
                  <h3 className="text-xl font-semibold dark:text-slate-300">
                    {feature.heading || "Default Feature Heading"}
                  </h3>
                  <span className="border-t border-[#D6DBE5] w-full"></span>
                  <p className="text-center max-w-3xl mx-auto text-sm dark:text-slate-300">
                    {feature.description || "Default Feature Description"}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* How it Works Section */}
      {clickstream && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex flex-col max-w-7xl mx-auto text-center w-full px-5 py-16 md:px-10 md:py-20">
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-5xl mx-auto text-3xl font-bold dark:text-slate-300 md:text-5xl"
            >
              {clickstream.clickstream_heading ||
                "Default How it Works Heading"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-4 max-w-4xl mx-auto text-center sm:text-lg dark:text-slate-300"
            >
              {clickstream.clickstream_description ||
                "Default How it Works Description"}
            </motion.p>

            {/* Content */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center">
                {clickstream.clickstream_image?.url && (
                  <motion.img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${clickstream.clickstream_image.url}`}
                    alt="How it works"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-2xl object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Steps List */}
              <div className="w-full pt-16 md:w-1/2 flex flex-col gap-8 md:px-10">
                <h2 className="text-3xl font-semibold dark:text-white text-center">
                  How it Works
                </h2>
                <div className="space-y-2">
                  {clickstream.clickstream_steps?.map((step: any) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="flex flex-col sm:flex-row gap-6 items-start justify-between bg-[#F4F5FF] dark:bg-[#184055] p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Step Number Circle */}
                      <div className="flex items-center justify-center w-10 h-10 lg:w-14 lg:h-10 bg-[#4945FF] text-slate-300 rounded-full font-bold text-lg dark:bg-[#001C29]">
                        {step.guide_steps_no || "Step No"}
                      </div>

                      {/* Step Details */}
                      <div className="flex flex-col justify-start text-left space-y-3">
                        <h3 className="text-xl font-semibold dark:text-white">
                          {step.guide_steps_heading || "Default Step Heading"}
                        </h3>
                        <p className="text-sm dark:text-gray-300">
                          {step.guide_steps_description ||
                            "Default Step Description"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
