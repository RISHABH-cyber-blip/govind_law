/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Ensures trailing slash consistency
  trailingSlash: false,
};

module.exports = nextConfig;
