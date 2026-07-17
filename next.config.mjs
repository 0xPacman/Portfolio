/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
  images: {
    unoptimized: true,
  },
  // Remove GitHub Pages specific paths for Cloudflare deployment
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
};

export default nextConfig;
