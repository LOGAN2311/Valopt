import React, { useEffect, useState, FC } from "react";
import axios from "axios"; // Ensure Axios is properly imported
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

interface Benefit {
  id: number;
  heading: string;
  description: string;
}

interface BenefitsCard {
  id: number;
  heading: string;
  description: string;
  superHeading?: string; // Optional
}

interface ApiResponse {
  data: {
    benefits: {
      benefitsCards: Benefit[];
      benefitsCard: BenefitsCard; // Access the main benefits card
    };
  };
}

const Benefits: FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [overallBenefitsCard, setOverallBenefitsCard] =
    useState<BenefitsCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home`,
          {
            params: {
              "populate[0]": "homeHero.heroImage.image",
              "populate[1]": "partners.partners",
              "populate[2]": "responsibleAI.heroImage",
              "populate[3]": "generativeAI.heroImage",
              "populate[4]": "benefits.benefitsCard",
              "populate[5]": "benefits.benefitsCards",
              "populate[6]": "accordion.faq",
              "populate[7]": "homeCTA.cta_buttons",
              "populate[8]": "homeHero.cta",
              "populate[9]": "responsibleAI.cta",
              "populate[10]": "generativeAI.cta",
            },
          }
        );

        const fetchedBenefits = response.data.data.benefits.benefitsCards || [];
        const benefitsCard = response.data.data.benefits.benefitsCard || null;

        setBenefits(fetchedBenefits);
        setOverallBenefitsCard(benefitsCard);
      } catch (err: unknown) {
        // Change the type of err to unknown
        if (isAxiosError(err)) {
          // Type guard for AxiosError
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to fetch benefits data."
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500">{`Error: ${error}`}</div>
    );
  }

  if (benefits.length === 0) {
    return <div className="text-center text-lg">No valid data found</div>;
  }

  return (
    <section className="bg-[#4945FF] py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {overallBenefitsCard && (
          <>
            {/* <h5 className="text-sm font-semibold text-[#1F3A55] bg-white rounded-full inline px-6 py-2">
              {overallBenefitsCard.superHeading}
            </h5> */}
            <h2 className="text-3xl font-medium text-white mb-4">
              {overallBenefitsCard.heading}
            </h2>
            <p className="text-center text-white max-w-2xl mx-auto mb-10">
              {overallBenefitsCard.description}
            </p>
          </>
        )}

        <Splide
          options={{
            perPage: 3,
            gap: "0.2rem",
            pagination: false,
            breakpoints: {
              1200: { perPage: 3, gap: "0.2rem" },
              900: { perPage: 2, gap: "0.2rem" },
              600: { perPage: 1, gap: "0.2rem" },
            },
          }}
        >
          {benefits.map((benefit) => (
            <SplideSlide key={benefit.id} className="flex items-center mb-2">
              <div className="bg-slate-100 w-[85%] mx-auto p-8 text-base text-center rounded-md">
                <h4 className="text-gray-700 text-lg font-bold mb-5">
                  {benefit.heading}
                </h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Benefits;
