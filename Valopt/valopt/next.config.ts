import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // Enable static export
  images: {
    unoptimized: true, // Disable image optimization for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.vaopt.com",
        port: "",
        pathname: "/uploads/**", // Allow all files in the /uploads directory
      },
    ],
  },
  trailingSlash: true, // Ensure URLs end with a trailing slash
  async redirects() {
    return [
      {
        source: "/fr/produits",
        destination: "/fr/products",
        permanent: true,
      },
      {
        source: "/fr/assistance-ia",
        destination: "/fr/ai-assistance",
        permanent: true,
      },
      {
        source: "/fr/deploiement-ia",
        destination: "/fr/ai-deployment",
        permanent: true,
      },
      {
        source: "/fr/personnalisation-en-temps-reel",
        destination: "/fr/real-time-personalization",
        permanent: true,
      },
      {
        source: "/fr/donnees-et-analyses",
        destination: "/fr/data-analytics",
        permanent: true,
      },
      {
        source: "/fr/academie-valopt",
        destination: "/fr/valopt-academy",
        permanent: true,
      },
      {
        source: "/fr/entreprise",
        destination: "/fr/company",
        permanent: true,
      },
      {
        source: "/fr/a-propos",
        destination: "/fr/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;