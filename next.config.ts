import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // preserve the original site's URL format
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      // Section roots → first page in each section
      { source: "/corporate/", destination: "/corporate/about-us/", permanent: false },
      { source: "/assets-and-operations/", destination: "/assets-and-operations/overview/", permanent: false },
      { source: "/investors/", destination: "/investors/outlook/", permanent: false },
      { source: "/news-and-media/", destination: "/news-and-media/news/", permanent: false },
      { source: "/contact/", destination: "/contact/contact-details/", permanent: false },
      // Legacy URLs found in the audit (404 / empty on the live site)
      { source: "/assets-and-operations/resource-definitions/", destination: "/assets-and-operations/overview/", permanent: true },
      { source: "/news-and-media/in-the-media/deepwater-development-conference-mcedd-2025/", destination: "/news-and-media/in-the-media/", permanent: true },
    ];
  },
};

export default nextConfig;
