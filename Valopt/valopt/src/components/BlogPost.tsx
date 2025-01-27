"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

interface BlogPostProps {
  blogSlug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ blogSlug }) => {
  const { language } = useLanguage();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!blogSlug) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate=*&filters[slug][$eq]=${blogSlug}`
        );

        if (!response.data.data || response.data.data.length === 0) {
          throw new Error("Blog not found");
        }

        const fetchedBlog = response.data.data[0];
        setBlog(fetchedBlog);
      } catch (error) {
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [blogSlug, language]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Blog not found.</div>;
  const { Title, content, Media } = blog;

  const getImageUrl = (url) => {
    return url && url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };

  const bannerImageUrl =
    Media?.length > 0 && Media[0]?.url ? getImageUrl(Media[0].url) : "";

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-3 py-6">
      <div className="flex flex-col lg:flex-row gap-x-6">
        <div className="flex-1">
          <div className="prose w-full min-w-[100%] px-4 py-8">
            <h1 className="text-4xl font-bolder mb-4 animate__animated animate__fadeIn">
              {Title}
            </h1>
            {bannerImageUrl && (
              <div className="relative mb-4 animate__animated animate__fadeIn animate__delay-1s">
                <Image
                  src={bannerImageUrl}
                  alt={Title || "Default title"}
                  className="rounded-lg shadow-md"
                  width={1200}
                  height={600}
                  layout="responsive"
                />
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: content }} className="blog-content" />
          </div>
        </div>
        <aside className="w-full lg:w-1/3 lg:mt-10">
          <div className="px-4"></div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;