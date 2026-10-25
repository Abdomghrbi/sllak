import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
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
