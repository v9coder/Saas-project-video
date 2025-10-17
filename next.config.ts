import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['ik.imagekit.io'], // ✅ add this line
  },
  reactStrictMode: true,
};

export default nextConfig;
