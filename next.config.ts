import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // لإسكات خطأ التوافق في Vercel مع Turbopack
  turbopack: {},
  
  webpack: (config, { dev }) => {
    // إعدادات خاصة ببيئة التطوير المحلية على Termux فقط
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
