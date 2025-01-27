"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "@/components/Hero";
import FAQ from "@/components/Frequent";
import Partners from "@/components/Partners";
import Responsible from "@/components/Responsible";
import Generative from "@/components/Generative";
import Benefits from "@/components/Benefits";
import Cta from "@/components/Cta";
import { useLanguage } from "@/context/LanguageContext";

interface ApiResponse {
  data: {
    homeHero?: any;
    accordion?: any;
    responsibleAI?: any;
    generativeAI?: any;
    benefits?: any;
    homeCTA?: any;
  };
}

const HeroData: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home`
        : "";

      if (!baseURL) {
        setError("API base URL is not defined");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(baseURL, {
          params: {
            locale: language,
            populate: [
              "homeHero.heroImage.image",
              "accordion.faq",
              "responsibleAI.heroImage",
              "responsibleAI.cta",
              "generativeAI.heroImage",
              "generativeAI.cta",
              "benefits.benefitsCards",
              "benefits.benefitsCard",
              "homeCTA.cta_buttons",
            ],
          },
        });

        if (!response.data || !response.data.data) {
          throw new Error("No data returned");
        }

        setData(response.data);
      } catch (error) {
        setError(
          axios.isAxiosError(error)
            ? error.message
            : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {data?.data.homeHero && (
        <Hero
          heading={data.data.homeHero.heading}
          description={data.data.homeHero.description}
          heroImage={{
            url:
              data.data.homeHero.heroImage?.image?.url ||
              "default-image-url.svg",
            alternative_text:
              data.data.homeHero.heroImage?.image?.alternative_text ||
              "Hero Image",
          }}
          cta={{
            name: data.data.homeHero.cta?.name || "Request a Demo",
            url: data.data.homeHero.cta?.url || "/request-a-demo",
          }}
        />
      )}
      <Partners />
      {data?.data.responsibleAI && (
        <Responsible data={data.data.responsibleAI} />
      )}
      {data?.data.generativeAI && <Generative data={data.data.generativeAI} />}
      {data?.data.benefits && (
        <Benefits
          benefitsCards={data.data.benefits.benefitsCards}
          benefitsCard={data.data.benefits.benefitsCard}
        />
      )}
      {data?.data.accordion && (
        <FAQ
          heading={data.data.accordion.heading || ""}
          description={data.data.accordion.description || ""}
          faq={data.data.accordion.faq || []}
        />
      )}
      {data?.data.homeCTA && (
        <Cta
          title={data.data.homeCTA.heading}
          description={data.data.homeCTA.description}
        />
      )}
    </>
  );
};

export default HeroData;
