import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/personal_website',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
