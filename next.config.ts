import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure proper production builds
  reactStrictMode: true,
  // Add cache headers for better deployment
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
