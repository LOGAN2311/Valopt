"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "@/components/Hero";
import FeaturesSection from "./FeaturesSection";
import CareerGrowthSection from "./CareerGrowthSection";
import TopCoursesSection from "./TopCoursesSection";
import WhyChooseSection from "./WhyChooseSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import {
  HeroDataAcademy,
  Feature,
  CareerGrowthData,
  TopCoursesData,
  WhyChooseData,
} from "@/app/types";

interface AcademyResponse {
  data: {
    academy_hero: HeroDataAcademy;
    academy_features: Feature[];
    academy_card: CareerGrowthData["cards"];
    academy_top_courses: TopCoursesData;
    academy_card_title: CareerGrowthData;
    academy_choose: WhyChooseData;
  };
}

interface AcademyPageClientProps {
  initialData: AcademyResponse;
  lang: string;
}

export default function AcademyPageClient({ initialData, lang }: AcademyPageClientProps) {
  const { language, setLanguage } = useLanguage();
  const [data, setData] = useState<AcademyResponse>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<AcademyResponse>(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/academy`,
          {
            params: {
              locale: lang,
              populate: [
                "academy_hero.icon",
                "academy_features",
                "academy_card",
                "academy_card.academy_image",
                "academy_top_courses",
                "academy_card_title",
                "academy_choose.about_featureList",
                "academy_top_courses.about_featureList.icon",
              ],
            },
          }
        );
        if (response.data.data) {
          setData(response.data);
        } else {
          setError("No data found.");
        }
      } catch (error) {
        console.error("Error fetching academy data:", error);
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

  const {
    academy_hero,
    academy_features,
    academy_card,
    academy_top_courses,
    academy_card_title,
    academy_choose,
  } = data.data;

  return (
    <div className="bg-white dark:bg-gray-800">
      <Hero
        heading={academy_hero.heading}
        description={academy_hero.description}
        heroImage={academy_hero?.icon}
        cta={{
          name: "Get started",
          url: "/contact-form",
        }}
      />
      <FeaturesSection data={academy_features} />
      <CareerGrowthSection data={{ ...academy_card_title, cards: academy_card }} />
      <TopCoursesSection data={academy_top_courses} />
      <WhyChooseSection data={academy_choose} />
    </div>
  );
}