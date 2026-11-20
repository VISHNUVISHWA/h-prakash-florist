import type { NextConfig } from 'next';

// GitHub Pages build: static export under /<repo>, with pre-generated image variants.
const pages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(pages && {
    output: 'export',
    trailingSlash: true,
    basePath,
  }),
  images: pages
    ? { loader: 'custom', loaderFile: './src/lib/image-loader.ts', deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920] }
    : {
        formats: ['image/avif', 'image/webp'],
        qualities: [75, 80, 85, 90],
        deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2400],
      },
};

export default nextConfig;
