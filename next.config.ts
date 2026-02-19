import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dwtvol0ha/image/upload/**')],
  },
};

export default nextConfig;
