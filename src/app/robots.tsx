import { type DynamicRouteSegmentConfig } from "@/types/api-response";

export const dynamic: DynamicRouteSegmentConfig = "force-dynamic";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "*?page=*",
        "*?style=*",
        //  `${baseUrl}/_next=*`,
        //  `${baseUrl}/manifest.webmanifest`,
      ],
    },
    // sitemap: `${baseUrl}/name/sitemap.xml`,
  };
}
