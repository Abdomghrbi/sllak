import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  // لإسكات خطأ التوافق في Vercel مع Turbopack
  turbopack: {},
  
  webpack: (config, { dev }) => {
    // إعدادات خاصة ببيئة التطوير المحلية على Termux فقط
=======

  turbopack: {},
  
  webpack: (config, { dev }) => {
    
>>>>>>> 55781f7f9156b491bff24390556d0f24c4c59909
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
