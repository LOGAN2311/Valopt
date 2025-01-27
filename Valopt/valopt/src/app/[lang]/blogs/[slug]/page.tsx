import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";

// Module-level cache to store blog data
let blogCache: any[] = [];

interface BlogPostProps {
  params: {
    lang: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    // Fetch all blog posts
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate=*`);
    const blogs = response.data;

    console.log("blogs", blogs);

    // Store the blog data in the module-level cache
    blogCache = blogs;

    return blogs;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { lang, slug } = params;

  try {
    // Retrieve the blog data from the module-level cache
    const blogs = blogCache;

    if (!Array.isArray(blogs)) {
      console.error("Blog cache is not an array:", blogs);
      notFound();
    }

    // Find the English blog post
    const englishBlog = blogs.find((blog) => blog.slug === slug);

    console.log("englishBlog", englishBlog);
    if (!englishBlog) {
      notFound(); // Return a 404 page if the blog post is not found
    }

    // Get the localized version (French) if the requested language is 'fr'
    const blog = lang === "fr" ? englishBlog.localizations?.find((loc) => loc.locale === "fr") : englishBlog;

    if (!blog) {
      notFound(); // Return a 404 page if the localized version is not found
    }

    const { Title, content, Media } = blog;

    // Use Media from the fetched blog to construct the URL
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    // Determine which media to use: prefer localized media, fallback to the original
    const mediaToDisplay = Media?.length > 0 ? Media : englishBlog?.Media || [];
    const bannerImageUrl = mediaToDisplay.length > 0 ? `${strapiUrl}${mediaToDisplay[0].url}` : "";

    return (
      <div className="max-w-screen-xl mx-auto px-4 md:px-3 py-6">
        <div className="flex flex-col lg:flex-row gap-x-6">
          <div className="flex-1">
            <div className="prose w-full min-w-[100%] px-4 py-8">
              <h1 className="text-4xl font-bolder mb-4 animate__animated animate__fadeIn">{Title}</h1>

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
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound(); // Return a 404 page if there's an error
  }
}