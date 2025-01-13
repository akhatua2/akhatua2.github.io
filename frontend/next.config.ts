import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/personal_website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal_website' : '',
};

export default nextConfig;
