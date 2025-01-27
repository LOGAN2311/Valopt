// app/data-analytics/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SolvesSection from "./SolvesSection";
import ChooseSection from "./ChooseSection";
import IndustriesSection from "./IndustriesSection";

import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { DataAnalyticsData } from "@/app/types";
interface DataAnalyticsClientProps {
  initialData: DataAnalyticsData;
  lang: string;
}
export default function DataAnalytics( {initialData, 
  lang}:DataAnalyticsClientProps  ){
  const { language, setLanguage } = useLanguage();
  const [data, setData] = useState<DataAnalyticsData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: DataAnalyticsData }>(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/data-analytic`,
          {
            params: {
              locale: lang,
              populate: [
                "dataAnalytics_hero.about_hero_cta",
                "dataAnalytics_hero.about_hero_image",
                "dataAnalytics_solves.analytics_solves_list",
                "dataAnalytics_services.about_featureList",
                "dataAnalytics_choose.ai_assistance_guide",
                "dataAnalytics_industries.about_featureList",
              ],
            },
          }
        );

        if (response.data.data) {
          setData(response.data.data);
        } else {
          setError("No data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "There was an error fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!data) {
    return <ErrorDisplay error="No data available." />;
  }

  return (
    <>
      <Hero
        heading={data.dataAnalytics_hero.about_hero_heading}
        description={data.dataAnalytics_hero.about_hero_description}
        heroImage={data.dataAnalytics_hero.about_hero_image}
        cta={data.dataAnalytics_hero.about_hero_cta}
      />
      <SolvesSection
        title={data.dataAnalytics_solves.analytics_solves_heading}
        items={data.dataAnalytics_solves.analytics_solves_list}
      />
      <Services
        title={data.dataAnalytics_services.about_feature_heading}
        description={data.dataAnalytics_services.about_feature_description}
        items={data.dataAnalytics_services.about_featureList}
      />
      <ChooseSection
        title={data.dataAnalytics_choose.chatbot_guide_heading}
        description={data.dataAnalytics_choose.chatbot_guide_description}
        items={data.dataAnalytics_choose.ai_assistance_guide}
      />
      <IndustriesSection
        title={data.dataAnalytics_industries.about_feature_heading}
        description={data.dataAnalytics_industries.about_feature_description}
        items={data.dataAnalytics_industries.about_featureList}
      />
    </>
  );
}