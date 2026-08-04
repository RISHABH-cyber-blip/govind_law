/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/govind_law",
  assetPrefix: "/govind_law/",

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
