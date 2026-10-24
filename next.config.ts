import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  generateBuildId: async () => {
    return 'my-build-id';
  },
  webpack: (config, { dev }) => {
    config.cache = false;
    
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**', 
        '**/.git/**', 
        '/data/**', 
        '/data/data/**',
        '/**/*' // تجاهل أي مسارات جذرية عامة
      ],
    };
    return config;
  },
};

export default nextConfig;

