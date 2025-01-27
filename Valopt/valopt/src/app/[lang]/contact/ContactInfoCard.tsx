"use client";
import Image from "next/image";

export default function ContactInfoCard({ item }) {
  return (
    <div className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      {/* Icon Container */}
      <div className="w-16 h-16 flex items-center justify-center bg-[#7C3AED] rounded-full">
        {item.icon ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.icon.url}`}
            alt={`${item.heading} Icon`}
            className="w-8 h-8 dark:filter dark:invert" // Invert icon color in dark mode
            width={32}
            height={32}
          />
        ) : (
          <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full">
            <span className="text-white text-sm">Icon</span>
          </div>
        )}
      </div>

      {/* Heading */}
      <h3 className="mt-6 text-xl font-bold dark:text-white">
        {item.heading || "Contact Info"}
      </h3>

      {/* Description */}
      <p className="mt-4 text-lg dark:text-gray-300 text-center">
        {item.description || "Description not available."}
      </p>
    </div>
  );
}
