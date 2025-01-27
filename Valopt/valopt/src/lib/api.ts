import { AboutData } from "@/app/types";
import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchBlogPosts(language: string = 'en') {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/blogs`, {
      params: {
        locale: language,
        populate: '*',
      },
    });
    return response.data.data; // Strapi returns data in a `data` field
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return []; // Return an empty array to avoid breaking the build
  }
}

export async function fetchBlogPost(slug: string, language: string = 'en') {
  console.log("blog",language)
  try {
    const response = await axios.get(`${STRAPI_URL}/api/blogs`, {
      params: {
        filters: { slug: { $eq: slug } },
        locale: language,
        populate: '*',
      },
    });
    return response.data.data[0] || null; // Return the first matching blog post
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null; // Return null to handle missing posts
  }
}


export async function fetchAboutData(language: string): Promise<AboutData> {
  console.log("lang form lib",language)
  try {
    const response = await axios.get<{ data: AboutData }>(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about`,
      {
        params: {
          locale: language,
          populate: [
            "About",
            "About.about_hero_image",
            "About.about_featureList.icon",
            "About.about_cta_emailButton",
          ],
        },
      }
    );

    if (!response.data.data) {
      throw new Error("No data found");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching about data:", error);
    throw error;
  }
}

export async function fetchLocalizedData<T>(
  endpoint: string, 
  language: string, 
  populateFields: string[] = []
): Promise<T> {
  try {
    const response = await axios.get<{ data: T }>(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}${endpoint}`,
      {
        params: {
          locale: language,
          populate: populateFields.length > 0 ? populateFields : '*',
        },
      }
    );

    if (!response.data.data) {
      throw new Error(`No data found for ${endpoint}`);
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching localized data for ${endpoint}:`, error);
    throw error;
  }
}