"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";

const baseURL: string = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home`;

const Responsible: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = {
      populate: [
        "responsibleAI",
        "responsibleAI.heroImage",
        "responsibleAI.cta",
      ],
    };

    setLoading(true);
    axios
      .get(baseURL, { params })
      .then((response: AxiosResponse) => {
        setData(response.data);
      })
      .catch((error: any) => {
        setError(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data || !data.data?.responsibleAI) {
    return <div>No valid data found</div>;
  }

  const { responsibleAI } = data.data;

  const heroImageUrl = responsibleAI.heroImage?.url?.startsWith("http")
    ? responsibleAI.heroImage.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${
        responsibleAI.heroImage?.url || "/default-image.png"
      }`;

  const altText =
    responsibleAI.heroImage?.alternative_text || "Responsible AI Image";
  const titleText = responsibleAI.heading || "Responsible AI";

  return (
    <section className="bg-[#F0F0FF]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid items-center gap-8 sm:gap-20 lg:grid-cols-2 sm:flex sm:flex-col lg:grid lg:flex-row">
          <div
            className="lg:order-2 md:order-2 sm:order-1 xs:order-1 relative"
            style={{ paddingTop: "65%", height: 0 }}
          >
            <Image
              src={heroImageUrl}
              alt={altText}
              title={titleText}
              fill
              sizes="(max-width: 640px) 100vw,
                     (max-width: 768px) 50vw,
                     (max-width: 1024px) 33vw"
              priority
              style={{ objectFit: "fill" }}
            />
          </div>

          <div className="lg:order-1 md:order-1 sm:order-2 xs:order-2">
            {/* <h5 className="text-white bg-[#4945FF] rounded-full mb-6 inline-block px-5 py-1">
              {responsibleAI.superHeading}
            </h5> */}
            <h1 className="mb-6 mt-2 max-w-2xl text-3xl font-bold md:text-5xl">
              {titleText}
            </h1>
            <p className="mb-8 max-w-lg lg:mb-8">{responsibleAI.description}</p>

            <Link
              href={responsibleAI?.cta?.url || "#"}
              className="inline-block rounded-md bg-[#4945FF] px-6 py-3 text-center font-semibold text-white"
            >
              {responsibleAI?.cta?.name || "Explore Responsible AI"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Responsible;
