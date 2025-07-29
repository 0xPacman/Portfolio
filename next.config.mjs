/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove GitHub Pages specific paths for Cloudflare deployment
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
};

export default nextConfig;
