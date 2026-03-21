// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         pathname: "/dwtvol0ha/image/upload/**",
//       },
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dwtvol0ha/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  // Add headers configuration to fix COOP issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'unsafe-none', // Allows popup communication
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none', // Required when COOP is unsafe-none
          },
        ],
      },
    ];
  },
};

export default nextConfig;