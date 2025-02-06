import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname:"placeholder.com"
      },
      {
        hostname: "scontent.fmnl3-1.fna.fbcdn.net",
      }
    ]
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    API_URL: process.env.API_URL,
  }
};

export default nextConfig;
