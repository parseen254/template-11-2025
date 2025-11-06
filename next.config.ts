import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Enable standalone output for Docker deployment
  output: "standalone",
  
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        process.env.SITE_URL || ""
      ]
    }
  }
};

export default nextConfig;
