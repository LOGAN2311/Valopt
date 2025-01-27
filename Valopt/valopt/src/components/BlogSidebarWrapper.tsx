import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

// Define types for the data structures
interface Post {
  id: number;
  attributes: {
    Title: string;
    slug: string;
    createdAt: string;
    thumbnail: {
      url: string;
    };
    localizations: {
      locale: string;
      slug: string;
    }[];
  };
}

interface Category {
  id: number;
  attributes: {
    name: string;
  };
}

interface Tag {
  id: number;
  attributes: {
    name: string;
  };
}

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => (
  <div className="p-6 rounded-lg mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
      {title}
    </h3>
    {children}
  </div>
);

export default function BlogSidebar() {
  const { language } = useLanguage();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Fetch data from the Strapi API
  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL; // Use environment variable

      try {
        const response = await axios.get(
          `${baseUrl}/api/blogs?locale=${language}&populate=*`
        );
        setRecentPosts(response.data.data);

        const categoriesResponse = await axios.get(
          `${baseUrl}/api/categories?locale=${language}&populate=*`
        );
        setCategories(categoriesResponse.data.data);

        const tagsResponse = await axios.get(
          `${baseUrl}/api/tags?locale=${language}&populate=*`
        );
        setTags(tagsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data from Strapi:", error);
      }
    };

    fetchData();
  }, [language]);

  useEffect(() => {
    if (!recentPosts || recentPosts.length === 0) return; // Guard clause
    if (searchQuery.trim() === "") {
      setFilteredPosts(recentPosts);
    } else {
      const filtered = recentPosts.filter((post) =>
        post.attributes.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, recentPosts]);

  const getImageUrl = (url: string) => {
    return url && url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };

  const getEnglishSlug = (post: Post) => {
    const englishLocalization = post.attributes.localizations?.find(
      (loc) => loc.locale === "en"
    );
    return englishLocalization ? englishLocalization.slug : post.attributes.slug;
  };

  return (
    <div className="w-full lg:w-[95%] xl:w-[95%] flex flex-col">
      {/* Search Section */}
      <SidebarSection title="Search">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </SidebarSection>

      {/* Recent Posts Section */}
      <SidebarSection title="Recent Posts">
        <section>
          {filteredPosts.length === 0 ? (
            <p>No recent posts available.</p>
          ) : (
            filteredPosts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${getEnglishSlug(post)}`}
                passHref
              >
                <div className="flex flex-row items-center border-b border-gray-300 py-3 dark:border-gray-600">
                  <Image
                    src={getImageUrl(post.attributes.thumbnail?.url)}
                    alt={post.attributes.Title || "Blog Image"}
                    className="h-24 w-24 max-w-32 rounded-md bg-gray-300 hover:scale-105 transition-transform duration-300 dark:bg-gray-700"
                    width={96}
                    height={96}
                    quality={75}
                  />
                  <div className="flex flex-col px-4 text-left">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {post.attributes.Title}
                    </p>
                    <p className="text-sm text-slate-800 dark:text-gray-400">
                      {new Date(post.attributes.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </section>
      </SidebarSection>

      {/* Categories Section */}
      <SidebarSection title="Categories">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/blogs/category/${category.id}`}>
              <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-indigo-500 hover:text-white dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500 dark:hover:text-white">
                {category.attributes.name}
              </div>
            </Link>
          ))}
        </div>
      </SidebarSection>

      {/* Tags Section */}
      <SidebarSection title="Tags">
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link key={tag.id} href={`/blogs/tag/${tag.id}`}>
              <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-indigo-500 hover:text-white dark:bg-indigo-600 dark:text-indigo-200 dark:hover:bg-indigo-500 dark:hover:text-white">
                {tag.attributes.name}
              </div>
            </Link>
          ))}
        </div>
      </SidebarSection>
    </div>
  );
}