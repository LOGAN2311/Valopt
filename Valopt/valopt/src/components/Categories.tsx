import React from "react";

interface CategoriesProps {
  categories: { id: number; name: string }[];
  language?: string; // Only English and French are supported
}

const Categories: React.FC<CategoriesProps> = ({ categories, language = 'en' }) => {
  // Determine the heading text based on the language
  const headingText = language === 'fr' ? 'Catégories' : 'Categories';

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {headingText}
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <span
            key={category.id}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer capitalize"
          >
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Categories;