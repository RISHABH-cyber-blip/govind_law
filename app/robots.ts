import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://govind-law.vercel.app/sitemap.xml",
    host: "https://govind-law.vercel.app/",
  };
}
