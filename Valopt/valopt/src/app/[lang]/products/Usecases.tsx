"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../app/globals.css"; // Ensure your global styles are included
import Image from "next/image";

// Define types for Tab and props
interface Tab {
  id: string;
  sector_name: string;
  usecases_features?: {
    keyfeature_description?: string;
    keyfeature_heading?: string;
  };
  usecases_image?: {
    url?: string;
  };
  usecases_content?: {
    sector_heading?: string;
    sector_description?: string;
  };
}

interface TabButtonProps {
  tab: Tab;
  activeTab: string | null;
  onClick: (id: string) => void;
}

interface TabContentProps {
  tab: Tab;
}

// TabButton Component
const TabButton: React.FC<TabButtonProps> = ({ tab, activeTab, onClick }) => (
  <button
    className={`tab-button ${
      activeTab === tab.id
        ? "bg-[#184055] text-white shadow-lg"
        : "bg-[#F0F0FF] text-[#184055] border border-[#184055] hover:bg-[#F8F8FF]"
    } py-2 px-3 flex-grow my-1 mx-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4945FF] transition duration-300 ease-in-out transform hover:scale-102`}
    onClick={() => onClick(tab.id)}
    style={{ minWidth: "100px" }} // Ensure a minimum width for buttons
  >
    {tab.sector_name}
  </button>
);

// TabContent Component
const TabContent: React.FC<TabContentProps> = ({ tab }) => {
  if (!tab || !tab.sector_name) return <div>No content available</div>;

  const featuresList =
    tab.usecases_features?.keyfeature_description?.split("\n") || [];
  const imageUrl = tab.usecases_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${tab.usecases_image.url}`
    : "/default-image.jpg";

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-x-10 mt-12 px-5 py-16 shadow-md rounded-lg bg-[#F8F8FF] dark:bg-[#184055]">
      <div className="w-full md:w-1/2 px-4 text-lg">
        <h2 className="text-2xl font-bold mb-4 dark:text-slate-300">
          {tab.usecases_content?.sector_heading}
        </h2>
        <p className="mt-4 leading-10 text-base max-w-xl mx-auto md:text-sm md:leading-7 dark:text-slate-300">
          {tab.usecases_content?.sector_description}
        </p>

        <h3 className="text-xl font-bold mt-4 dark:text-slate-300">
          {tab.usecases_features?.keyfeature_heading}
        </h3>
        <ul className="list-disc pl-6 mt-4">
          {featuresList.map((feature, index) => (
            <li
              className="mt-4 text-base text-[#344b80] max-w-xl mx-auto md:text-sm dark:text-slate-300"
              key={index}
            >
              {feature.trim()}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-1/2 px-4 mt-4 md:mt-0">
        <Image
          src={imageUrl}
          alt={tab.sector_name}
          width={400}
          height={350}
          className="w-full h-auto rounded-md object-cover"
        />
      </div>
    </div>
  );
};

// Tabs Component
const Tabs: React.FC = () => {
  const [tabsData, setTabsData] = useState<Tab[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const fetchTabsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/tabs`,
          {
            params: { populate: "*" },
          }
        );

        setTabsData(response.data.data);
        setLoading(false);
        if (response.data.data.length > 0) {
          setActiveTab(response.data.data[0].id); // Set the first tab as active by default
        }
      } catch (error) {
        // Changed 'err' to a more descriptive name
        console.error(error); // Log the error for debugging
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchTabsData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10">
      {/* Tab buttons container for responsive design */}
      <div className="flex flex-wrap justify-around overflow-x-auto mb-4">
        {tabsData.length > 0 ? (
          tabsData.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          ))
        ) : (
          <p>No tabs available</p>
        )}
      </div>

      {tabsData.map((tab) => (
        <div
          key={tab.id}
          className={`${activeTab === tab.id ? "block" : "hidden"}`}
        >
          <TabContent tab={tab} />
        </div>
      ))}
    </div>
  );
};

export default Tabs;
