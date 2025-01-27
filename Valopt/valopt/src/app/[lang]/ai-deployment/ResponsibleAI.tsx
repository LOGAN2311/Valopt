"use client";

import React, { useEffect, useState } from "react";
import "../../../app/globals.css";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "../../../components/Hero";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { motion } from "framer-motion";
import Image from "next/image";

interface Feature {
  icon?: { url: string; alternativeText?: string };
  heading?: string;
  description?: string;
}

interface AIDeploymentData {
  AI_deployment: {
    __component: string;
    id: number;
    about_hero_heading?: string;
    about_hero_description?: string;
    about_hero_cta?: { name: string; url: string };
    about_hero_image?: { url: string };
    about_feature_heading?: string;
    about_feature_description?: string;
    about_featureList?: Feature[];
  }[];
}

interface ResponsibleAIProps {
  initialData: AIDeploymentData;
  lang: string;
}

export default function ResponsibleAI({
  initialData,
  lang,
}: ResponsibleAIProps) {
  const [data, setData] = useState<AIDeploymentData>(initialData);
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
  if (!data || !data.AI_deployment) {
    return <ErrorDisplay error="No data available." />;
  }

  // Extract relevant data from the fetched data
  const aiDeploymentData = data.AI_deployment;
  const aboutHero =
    aiDeploymentData.find((item) => item.__component === "about.about-hero") ||
    {};
  const aboutFeatures =
    aiDeploymentData.find(
      (item) => item.__component === "about.about-features"
    ) || {};

  return (
    <>
      {/* Hero Section */}
      <Hero
        heading={aboutHero.about_hero_heading || "Default Header"}
        description={aboutHero.about_hero_description || "Default Description"}
        heroImage={aboutHero.about_hero_image}
        cta={aboutHero.about_hero_cta}
      />

      {/* Features Section */}
      <motion.section
        className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="flex flex-col max-w-3xl mx-auto items-center text-center mb-5">
            <h2 className="text-3xl font-bold dark:text-slate-300 md:text-5xl">
              {aboutFeatures.about_feature_heading || "Features Heading"}
            </h2>
            <p className="mt-4 max-w-lg text-center dark:text-slate-300">
              {aboutFeatures.about_feature_description ||
                "Features Description"}
            </p>
          </div>

          {/* Feature Items */}
          <div className="max-w-5xl mx-auto mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {aboutFeatures.about_featureList &&
            aboutFeatures.about_featureList.length > 0 ? (
              aboutFeatures.about_featureList.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col gap-6 gap-x-6 justify-center rounded-lg p-6 bg-[#F4F9FD] dark:bg-[#184055] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col gap-y-5 items-center text-center">
                    {feature.icon ? (
                      <Image
                        src={
                          feature.icon.url.startsWith("http")
                            ? feature.icon.url
                            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${feature.icon.url}`
                        }
                        alt={feature.icon.alternativeText || "Feature Icon"}
                        className="inline-block h-20 w-20 object-cover rounded-full mb-5 transition-transform duration-300 transform hover:scale-110"
                      />
                    ) : null}
                    <h3 className="text-xl font-semibold dark:text-slate-300 mb-2">
                      {feature.heading || "Feature Heading"}
                    </h3>
                    <p className="text-sm text-justify dark:text-slate-300 mb-4">
                      {feature.description || "Feature Description"}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-slate-300">
                No features available.
              </p>
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
}
