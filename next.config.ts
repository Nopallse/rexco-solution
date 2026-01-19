import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  compress: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ryupowertools.com',
      },
      {
        protocol: 'https',
        hostname: 'nest-api.ryupowertools.com',
      },
    ],
  },
};

export default nextConfig;
