import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  compress: true,
  
  async rewrites() {
    return [
      { source: '/:lang(en|id)', destination: '/' },
      { source: '/:lang(en|id)/:path*', destination: '/:path*' },
    ];
  },
  
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
