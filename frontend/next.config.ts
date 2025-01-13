import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal_website' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
