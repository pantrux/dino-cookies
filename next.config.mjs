/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for Cloudflare Pages
  experimental: {
  },
  // Optimize for Cloudflare Pages deployment
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
