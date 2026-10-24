import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**', 
          '**/.git/**', 
          '/data/**', 
          '/data/data/**',
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
