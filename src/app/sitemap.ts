import type { MetadataRoute } from "next";
import { NAV, NEWS } from "@/content/site";

const BASE = "https://www.blu-energies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...NAV.flatMap((g) => g.children.map((c) => c.href)), "/legal/", "/news-and-media/in-the-media/oil-majors-snap-up-west-african-blocks-in-hunt-for-next-brazil/"];
  return [
    ...pages.map((p) => ({ url: BASE + p, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...NEWS.map((n) => ({ url: BASE + n.slug, lastModified: n.iso, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
