import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  devIndicators: {
    position: "bottom-left",
  },
  async rewrites() {
    return [
      {
        source: "/ads.txt",
        destination: "/ads-txt",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/ads-txt",
        destination: "/ads.txt",
        permanent: true,
      },
    ];
  },
  poweredByHeader: false,
};

export default nextConfig;
