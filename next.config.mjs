/** @type {import('next').NextConfig} */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  // Keep tracing bounded to this repo (avoids Next warning when parent dirs contain other lockfiles)
  outputFileTracingRoot: __dirname,

  // Enable experimental features for Cloudflare Pages
  experimental: {},

  // Optimize for Cloudflare Pages deployment
  images: {
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
