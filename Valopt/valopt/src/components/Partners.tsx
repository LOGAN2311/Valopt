import React, { useState, useEffect } from "react";
import axios from "axios"; // No `AxiosError` import
import Marquee from "react-fast-marquee";
import Image from "next/image";

// Define the Partner interface
interface Partner {
  url: string;
  alternative_text: string;
  partners?: Partner[]; // Optional nested partners
}

// Define the overall expected data structure from the API
interface PartnersData {
  data: {
    partners: {
      partners: Partner[];
    };
  };
}

const baseURL: string = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home`;

const Partners: React.FC = () => {
  const [data, setData] = useState<PartnersData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const params = {
      populate: ["partners", "partners.partners"],
    };

    axios
      .get<PartnersData>(baseURL, { params })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Use a generic error type
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  if (
    !data ||
    !data.data?.partners ||
    !Array.isArray(data.data.partners.partners)
  ) {
    return <div>No valid partners data found.</div>;
  }

  const renderPartners = (partners: Partner[]) => {
    return partners.map((partner, index) => {
      const partnerImageUrl = partner.url;

      return (
        <div key={index} className="flex justify-center items-center mx-4">
          {partnerImageUrl ? (
            <div
              className="relative flex justify-center items-center max-h-20 my-8"
              style={{ height: "55px", width: "150px" }} // Adjust height and width here
            >
              <Image
                src={partnerImageUrl}
                alt={partner.alternative_text || "Partner Image"}
                title={partner.alternative_text || "Partner Image"}
                layout="fill"
                objectFit="contain" // Change this depending on your design preferences
                priority={true}
                unoptimized={true}
              />
            </div>
          ) : (
            <div>No image available</div>
          )}

          {/* Recursively render any nested partners */}
          {partner.partners && partner.partners.length > 0 && (
            <div className="ml-5">{renderPartners(partner.partners)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <section className="max-w-7xl mx-auto flex justify-evenly items-stretch bg-background-light dark:bg-background-dark">
      <div className="w-full md:w-2/3 mx-auto">
        <Marquee
          gradient={false}
          pauseOnHover
          className="overflow-hidden"
          aria-label="Partner logos scrolling horizontally"
        >
          {renderPartners(data.data.partners.partners).map((logo, index) => (
            <div key={index} className="mx-4">
              {logo}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Partners;
