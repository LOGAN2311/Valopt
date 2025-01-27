// app/[lang]/about/AboutClient.tsx
"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "@/components/Hero";
import FeaturesSection from "./FeaturesSection";
import CtaSection from "./CtaSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AboutData } from "@/app/types";
import axios from "axios";

interface AboutClientProps {
  initialData: AboutData;
  lang: string;
}

export default function AboutClient({ initialData, lang }: AboutClientProps) {
  const { language, setLanguage } = useLanguage();
  const [aboutData, setAboutData] = useState<AboutData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);


  if (!aboutData || !aboutData.About) {
    return <p className="text-center text-red-500">No data available.</p>;
  }

  const [aboutHero, aboutFeatures, aboutCta] = aboutData.About;
  return (
    <>
      <Hero
        heading={aboutHero.about_hero_heading}
        description={aboutHero.about_hero_description}
        heroImage={aboutHero.about_hero_image}
        cta={aboutHero.about_hero_cta}
      />
      <FeaturesSection
        title={aboutFeatures.about_feature_heading}
        description={aboutFeatures.about_feature_description}
        items={aboutFeatures.about_featureList.map((feature) => ({
          icon: feature.icon?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${feature.icon.url}`
            : undefined,
          heading: feature.heading,
          description: feature.description,
        }))}
      />
      <CtaSection
        heading={aboutCta.about_cta_heading}
        description={aboutCta.about_cta_description}
        placeholder={aboutCta.about_cta_emailPlaceholder}
        buttonText={aboutCta.about_cta_emailButton?.name || "Submit"}
      />
    </>
  );
}
