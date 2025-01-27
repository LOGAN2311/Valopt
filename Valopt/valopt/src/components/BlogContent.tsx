import React from "react";
import Image from "next/image";

interface BlogContentProps {
  title: string;
  content: string;
  bannerImage: string;
  language?: string;
}

const BlogContent: React.FC<BlogContentProps> = ({
  title,
  content,
  bannerImage,
  language = 'en'
}) => {
  return (
    <div className="lg:col-span-2">
      {/* Blog Title */}
      <h1 
        className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        {title}
      </h1>
      
      {/* Banner Image */}
      {bannerImage && (
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${bannerImage}`}
            alt={title || "Default title"}
            className="rounded-lg shadow-md"
            fill
            style={{ objectFit: "fill" }}
            unoptimized
          />
        </div>
      )}
      
      {/* Blog Content */}
      <div
        className={`prose prose-lg max-w-none text-gray-900 dark:text-gray-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogContent;