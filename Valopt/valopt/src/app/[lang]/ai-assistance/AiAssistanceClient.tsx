"use client";

import React, { useEffect, useState } from "react";
import "../../../app/globals.css";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "../../../components/Hero";
import Guide from "./Guide";
import Services from "./Services";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";

interface AiAssistanceClientProps {
  initialData: any; // Temporarily use `any` to debug the structure
  lang: string;
}

const AiAssistanceClient: React.FC<AiAssistanceClientProps> = ({
  initialData,
  lang,
}) => {
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
  if (!data || !data.AI_Assistance) {
    return <ErrorDisplay error="No data available." />;
  }

  // Extract relevant data from the fetched data
  const aiAssistanceData = data.AI_Assistance;
  const aboutHero =
    aiAssistanceData.find((item: any) => item.__component === "about.about-hero") || {};
  const aiAssistance =
    aiAssistanceData.find(
      (item: any) => item.__component === "ai-assistance.ai-assistance"
    ) || {};
  const aiServices =
    aiAssistanceData.find(
      (item: any) => item.__component === "ai-assistance.ai-assistance-services"
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

      {/* Guide Section */}
      <Guide
        title={aiAssistance.chatbot_guide_heading}
        description={aiAssistance.chatbot_guide_description}
        items={aiAssistance.ai_assistance_guide || []}
      />

      {/* Services Section */}
      <Services
        title={aiServices.ai_assistance_services_heading}
        description={aiServices.ai_assistance_services_description}
        items={aiServices.ai_assistance_services_card || []}
      />
    </>
  );
};

export default AiAssistanceClient;