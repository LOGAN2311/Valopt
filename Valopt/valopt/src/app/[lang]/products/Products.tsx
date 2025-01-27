"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import "../../../app/globals.css";

// Dynamic import of components
const Tabs = dynamic(() => import("./Usecases"));
const FAQ = dynamic(() => import("../../../components/Frequent")); // Ensure proper name usage

interface Product {
  heading?: string;
  description?: string;
}

interface Features {
  products_features_heading?: string;
  products_features_description?: string;
  products_features_image?: {
    url: string;
  };
  products_features_content?: Array<{
    heading?: string;
    description?: string;
  }>;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductsData {
  products_list?: {
    productsList_heading?: string;
    productsList_description?: string;
    productsCard?: Product[];
  };
  products_assistance_features?: Features;
  products_deployment_features?: Features;
  products_realtime_features?: Features;
  products_faq?: {
    products_faq_heading?: {
      heading: string;
      description: string;
    };
    products_faqList: FAQItem[];
  };
}

interface ProductsProps {
  initialData: ProductsData;
  lang: string;
}

export default function Products({ initialData, lang }: ProductsProps) {
  const [data, setData] = useState<ProductsData>(initialData);
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
  if (!data) {
    return <ErrorDisplay error="No data available." />;
  }

  // Destructure the data from the API response
  const {
    products_list,
    products_assistance_features,
    products_deployment_features,
    products_realtime_features,
    products_faq,
  } = data;

  return (
    <>
      <div className="dark:bg-[#0E2F3F]">
        {/* Products List Section */}
        <section className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20 mt-16">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold dark:text-slate-300 md:text-5xl">
              {products_list?.productsList_heading || "Product List Heading"}
            </h2>
            <p className="mt-4 mb-8 text-base text-center max-w-xl mx-auto md:mb-12 md:text-lg lg:mb-16 dark:text-slate-300">
              {products_list?.productsList_description ||
                "Default description."}
            </p>
          </div>

          {/* Products List Items */}
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-6">
            {products_list?.productsCard?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center p-6 rounded-lg bg-white border border-slate-150 dark:bg-[#184055] dark:border-0 shadow-md align-middle transition-transform duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg"
              >
                {/* Heading */}
                <h3 className="text-2xl font-semibold mb-4 transition-all duration-300 ease-in-out dark:text-slate-300">
                  {item?.heading || "Default Product Heading"}
                </h3>

                {/* Description */}
                <p className="text-base md:text-sm dark:text-slate-300">
                  {item?.description || "Default Product Description"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Tabs />

        {/* AI Assistance Section */}
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold dark:text-slate-300 md:text-5xl">
                {products_assistance_features?.products_features_heading ||
                  "AI Assistance"}
              </h2>
              <p className="mt-4 mb-8 text-base text-center max-w-xl mx-auto md:mb-12 md:text-lg lg:mb-16 dark:text-slate-300">
                {products_assistance_features?.products_features_description ||
                  "No description available for AI Assistance."}
              </p>
            </div>

            <div className="flex flex-col items-center gap-8 mt-12 sm:flex-row sm:gap-20">
              {products_assistance_features?.products_features_image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${products_assistance_features.products_features_image.url}`}
                  alt="AI Assistance"
                  width={600}
                  height={500}
                  layout="intrinsic"
                />
              )}
              <div className="space-y-5">
                {products_assistance_features?.products_features_content ? (
                  products_assistance_features.products_features_content.map(
                    (feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="ml-6">
                          <h3 className="text-lg font-semibold dark:text-slate-300">
                            {feature?.heading || "Feature Heading"}
                          </h3>
                          <p className="mt-2 leading-10 text-base max-w-xl mx-auto md:text-sm md:leading-7 dark:text-slate-300">
                            {feature?.description || "Feature Description"}
                          </p>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>No features available for AI Assistance.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* AI Deployment Section */}
        <section className="py-10 bg-[#F6F6FF] sm:py-16 lg:py-24 dark:bg-[#0E2F3F]">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold dark:text-slate-300 md:text-5xl">
                {products_deployment_features?.products_features_heading ||
                  "AI Deployment"}
              </h2>
              <p className="mt-4 mb-8 text-base text-center max-w-xl mx-auto md:mb-12 md:text-lg lg:mb-16 dark:text-slate-300">
                {products_deployment_features?.products_features_description ||
                  "No description available for AI Deployment."}
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 mt-12 sm:flex-row sm:gap-20">
              {products_deployment_features?.products_features_image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${products_deployment_features.products_features_image.url}`}
                  alt="AI Deployment"
                  width={600}
                  height={500}
                  layout="intrinsic"
                />
              )}
              <div className="space-y-5">
                {products_deployment_features?.products_features_content?.map(
                  (feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold dark:text-slate-300">
                          {feature?.heading || "Feature Heading"}
                        </h3>
                        <p className="mt-2 leading-10 text-base max-w-xl mx-auto md:text-sm md:leading-7 dark:text-slate-300">
                          {feature?.description || "Feature Description"}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Real-time Personalization Section */}
        <section className="pt-10 sm:pt-16 lg:pt-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold dark:text-slate-300 md:text-5xl">
                {products_realtime_features?.products_features_heading ||
                  "Real-time Personalization"}
              </h2>
              <p className="mt-4 mb-8 text-base text-center max-w-2xl mx-auto md:mb-12 md:text-lg lg:mb-16 dark:text-slate-300">
                {products_realtime_features?.products_features_description ||
                  "No description available for Real-time Personalization."}
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 mt-12 sm:flex-row sm:gap-20">
              {products_realtime_features?.products_features_image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${products_realtime_features.products_features_image.url}`}
                  alt="Real-time Personalization"
                  width={600}
                  height={500}
                  layout="intrinsic"
                />
              )}
              <div className="space-y-5">
                {products_realtime_features?.products_features_content?.map(
                  (feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold dark:text-slate-300">
                          {feature?.heading || "Feature Heading"}
                        </h3>
                        <p className="mt-2 leading-10 text-base max-w-xl mx-auto md:text-sm md:leading-7 dark:text-slate-300">
                          {feature?.description || "Feature Description"}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        {products_faq && (
          <FAQ
            heading={products_faq.products_faq_heading?.heading || ""}
            description={products_faq.products_faq_heading?.description || ""}
            faq={products_faq.products_faqList || []}
          />
        )}
      </div>
    </>
  );
}
