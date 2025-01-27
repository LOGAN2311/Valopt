import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react"; // Import Lucide icons

// Define the props interface
interface SocialShareProps {
  postUrl: string;
  postTitle: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ postUrl, postTitle }) => {
  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          postUrl
        )}&text=${encodeURIComponent(postTitle)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          postUrl
        )}&title=${encodeURIComponent(postTitle)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="space-y-4">
      {/* Share Heading */}
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
        Share
      </h2>

      {/* Share Buttons */}
      <div className="flex items-center gap-4">
        {/* Facebook Share Button */}
        <button
          onClick={() => handleShare("facebook")}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md shadow-gray-200 dark:shadow-gray-700 hover:shadow-lg transition-all duration-300 group"
        >
          <Facebook
            size={24}
            className="text-[#0766FF] group-hover:text-[#054bb3] dark:text-[#0766FF] dark:group-hover:text-[#054bb3]"
          />
        </button>

        {/* Twitter Share Button */}
        <button
          onClick={() => handleShare("twitter")}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md shadow-gray-200 dark:shadow-gray-700 hover:shadow-lg transition-all duration-300 group"
        >
          <Twitter
            size={24}
            className="text-[#1DA1F2] group-hover:text-[#0c85d0] dark:text-[#1DA1F2] dark:group-hover:text-[#0c85d0]"
          />
        </button>

        {/* LinkedIn Share Button */}
        <button
          onClick={() => handleShare("linkedin")}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md shadow-gray-200 dark:shadow-gray-700 hover:shadow-lg transition-all duration-300 group"
        >
          <Linkedin
            size={24}
            className="text-[#0A66C2] group-hover:text-[#084a8f] dark:text-[#0A66C2] dark:group-hover:text-[#084a8f]"
          />
        </button>
      </div>
    </div>
  );
};

export default SocialShare;