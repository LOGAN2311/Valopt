"use client"; // Mark this as a client component

import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";

// Use the Strapi base URL from the environment variable
const baseURL: string = process.env.NEXT_PUBLIC_STRAPI_URL + "/api/home";

const Generative: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const params = {
      populate: [
        "generativeAI",
        "generativeAI.heroImage",
        "generativeAI.cta", // Make sure to populate cta
      ],
    };

    setLoading(true);
    axios
      .get(baseURL, { params })
      .then((response: AxiosResponse) => {
        console.log("API Response:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(`Error: ${error.message}`);
        setLoading(false);
      });
  }, []); // Run once on component mount

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>; // Display the error message
  }

  // Ensure generativeAI data is available before rendering
  if (!data || !data.data?.generativeAI) {
    return <div>{"No valid data found"}</div>; // Fallback text for missing data
  }

  const { generativeAI } = data.data;

  const heroImageUrl = generativeAI.heroImage?.url?.startsWith("http")
    ? generativeAI.heroImage.url // Use absolute URL
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${
        generativeAI.heroImage.url || "/default-image.png"
      }`;

  const altText =
    generativeAI.heroImage?.alternative_text || "Generative AI Image";
  const titleText = generativeAI.heading || "Generative AI";

  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid items-center gap-8 sm:gap-20 lg:grid-cols-2 sm:flex sm:flex-col lg:grid lg:flex-row">
          <div
            className="lg:order-1 md:order-1 sm:order-1 xs:order-1 relative mb-8"
            style={{ paddingTop: "65%", height: 0 }}
          >
            <Image
              src={heroImageUrl}
              alt={altText}
              title={titleText}
              fill
              sizes="(max-width: 640px) 100vw,
                      (max-width: 768px) 50vw,
                      (max-width: 1024px) 33vw,
                      25vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="lg:order-2 md:order-2 sm:order-2 xs:order-2">
            {/* <h5 className="text-white bg-[#4945FF] rounded-full mb-6 inline-block px-5 py-1">
              <span>{generativeAI.superHeading}</span>
            </h5> */}
            <h1 className="mb-6 mt-2 max-w-2xl text-3xl font-bold md:text-5xl">
              {generativeAI.heading}
            </h1>
            <p className="mb-8 max-w-lg lg:mb-10">{generativeAI.description}</p>

            {/* Call to action button */}
            <Link
              href={generativeAI?.cta?.url || "#"}
              className="inline-block rounded-md bg-[#4945FF] px-6 py-3 text-center font-semibold text-white"
            >
              {generativeAI?.cta?.name || "Explore Generative AI"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generative;
