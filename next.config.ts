import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  compress: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rexco-solution.com',
      },
      {
        protocol: 'https',
        hostname: 'nest-api.rexco-solution.com',
      },
    ],
  },
};

export default nextConfig;
