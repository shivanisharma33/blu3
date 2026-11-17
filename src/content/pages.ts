/**
 * Long-form content extracted verbatim from blu-energies.com (2026-11-17) by
 * scripts in the audit workspace → src/content/generated/*.json (sanitised: safe tags, href/src only).
 * Small, documented corrections are applied here, never in the JSON.
 */
import newsJson from "./generated/news.json";
import pagesJson from "./generated/pages.json";
import peopleJson from "./generated/people.json";
import { NEWS } from "./site";

const ORIGIN_IMG = "https://www.blu-energies.com/_resources/images/";
const LOCAL_FIGURES = ["MAP_BluEnergies.png", "Fan_Play_image_v2.jpg", "Deep_Fan_Play_image_v1.jpg"];

/** Paragraphs that contain nothing but bold text are subheadings in the source releases → semantic h3. */
const promoteSubheads = (html: string) => html.replace(/<p>\s*<(strong|b)>([^<,]{1,90})<\/\1>\s*:?\s*<\/p>/g, "<h3>$2</h3>");

/** Serve figures we already host locally; keep everything else on origin until /_resources is migrated. */
function localiseFigures(html: string) {
  return LOCAL_FIGURES.reduce((h, f) => h.split(ORIGIN_IMG + f).join("/site/" + f), html);
}

export const OVERVIEW_HTML = localiseFigures(pagesJson.overview)
  // the source page's trailing "News" sidebar heading is not part of the overview copy
  .replace(/<h2>\s*News\s*<\/h2>[\s\S]*$/, "");

/** Correction: the live page renders an unfilled phone placeholder "[l]" — removed (flagged in docs). */
export const LEGAL_HTML = pagesJson.legal.replace(/<br>\s*<strong>Phone Number<\/strong>:\s*\[l\]/, "");

export const OIL_MAJORS_HTML = pagesJson.oilMajors;

export type Person = { name: string; title: string; image: string | null; html: string };
export const PEOPLE = peopleJson as { group: string; people: Person[] }[];

type RawRelease = { title: string; dateLine: string; html: string; images: string[] };
const RAW = newsJson as Record<string, RawRelease>;

export const RELEASES = NEWS.map((n) => {
  const slug = n.slug.replace("/news-and-media/news/", "").replace(/\/$/, "");
  const raw = RAW[slug];
  return { ...n, key: slug, html: promoteSubheads(raw?.html ?? "") };
});

export const releaseByKey = (key: string) => RELEASES.find((r) => r.key === key);

/** In the Media — dates and titles as listed on /news-and-media/in-the-media/. */
export const MEDIA = [
  { date: "05.14.26", iso: "2026-05-14", title: "SmithWeekly Research Discussion with Craig Steinke, CEO and Doug Allen, Senior Manager, Investor Relations", source: "SmithWeekly Research", type: "Video", href: "https://youtu.be/XUNiuHwe3kc" },
  { date: "05.06.26", iso: "2026-05-06", title: "Wall Street Unplugged podcast with host, Frank Curzio, and BluEnergies CEO, Craig Steinke", source: "Curzio Research", type: "Podcast", href: "https://www.curzioresearch.com/this-tiny-offshore-driller-is-ahead-of-the-majors-in-the-global-energy-race/" },
  { date: "04.15.26", iso: "2026-04-15", title: "The Race to Discover Offshore Oil & Gas Reserves", source: "BNN Bloomberg", type: "Video", href: "https://www.bnnbloomberg.ca/video/shows/commodities/2026/04/15/the-race-to-discover-offshore-oil-gas-reserves/" },
  { date: "02.04.26", iso: "2026-02-04", title: "Oil majors snap up West African blocks in hunt for next Brazil", source: "Reuters", type: "Article", href: "/news-and-media/in-the-media/oil-majors-snap-up-west-african-blocks-in-hunt-for-next-brazil/" },
  { date: "11.27.24", iso: "2024-11-27", title: "Liberia Emerges as Africa's Next Deep-Water Oil Hub", source: "The Vaultz News", type: "Article", href: "https://thevaultznews.com/business/extractives-energy/liberia-emerges-as-africas-next-deep-water-oil-hub/" },
  { date: "11.26.24", iso: "2024-11-26", title: "Liberia: Africa's Top Deepwater Hydrocarbon Hotspot", source: "African Energy Council", type: "Article", href: "https://africanenergycouncil.org/liberia-africas-top-deepwater-hydrocarbon-hotspot/" },
  { date: "11.25.24", iso: "2024-11-25", title: "Liberia Named Top Destination for Deepwater Hydrocarbon Exploration in Africa", source: "FrontPageAfrica", type: "Article", href: "https://frontpageafricaonline.com/news/liberia-named-top-destination-for-deepwater-hydrocarbon-exploration-in-africa/" },
];

/** Milestones — each line is sourced from a release or company page. */
export const MILESTONES = [
  { when: "Sept 2021", what: "Begins operations as a private entity.", src: "News release, May 8, 2025" },
  { when: "Apr 2025", what: "Commences trading on the TSX Venture Exchange (TSXV: BLU).", src: "News release, April 14, 2025" },
  { when: "May 2025", what: "Craig Steinke appointed Chief Executive Officer and director.", src: "News release, May 8, 2025" },
  { when: "Jan 2026", what: "TotalEnergies partners with BluEnergies in the Harper Basin fan play.", src: "News release, January 15, 2026" },
  { when: "Mar 2026", what: "Begins trading on the OTCQX Best Market as BLUGF; top bid in a Gulf of America lease sale.", src: "News releases, March 19 & 30, 2026" },
  { when: "Jul 2026", what: "Closes an oversubscribed non-brokered private placement for gross proceeds of C$20.7 million.", src: "News release, July 23, 2026" },
];
