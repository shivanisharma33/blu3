import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell, PageHeader, Block } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import SiteSearch, { type SearchDoc } from "@/components/page/SiteSearch";
import { RELEASES, OVERVIEW_HTML, LEGAL_HTML, PEOPLE, MEDIA } from "@/content/pages";
import { ABOUT_LEAD, NAV } from "@/content/site";

export const metadata: Metadata = { title: "Search", robots: { index: false, follow: true }, alternates: { canonical: "/search/" } };

const strip = (h: string) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const INDEX: SearchDoc[] = [
  { title: "About Us", href: "/corporate/about-us/", kind: "Corporate", text: ABOUT_LEAD },
  { title: "Board & Management", href: "/corporate/board-management/", kind: "Corporate", text: PEOPLE.flatMap((g) => g.people.map((p) => `${p.name} ${p.title} ${strip(p.html)}`)).join(" ") },
  { title: "Corporate Governance", href: "/corporate/corporate-governance/", kind: "Corporate", text: "Anti-Bribery Corruption Policy Code of Conduct and Ethics ESTMA Report" },
  { title: "Assets & Operations — Overview", href: "/assets-and-operations/overview/", kind: "Assets", text: strip(OVERVIEW_HTML) },
  { title: "Legal — Privacy Policy & Terms of Use", href: "/legal/", kind: "Legal", text: strip(LEGAL_HTML) },
  ...NAV.find((g) => g.label === "Investors")!.children.map((c) => ({ title: c.label, href: c.href, kind: "Investors", text: "investors " + c.label })),
  ...RELEASES.map((r) => ({ title: r.title, href: r.slug, kind: `News · ${r.date}`, text: strip(r.html) })),
  ...MEDIA.map((m) => ({ title: m.title, href: m.href, kind: `Media · ${m.source}`, text: m.source })),
];

export default function SearchPage() {
  return (
    <PageShell>
      <PageHeader section="Search" current="Search" title={["Search", <Em key="s">the site.</Em>]} />
      <Block tone="ivory" label="Search" index="01" heading={<>Pages, people &amp; <Em>releases.</Em></>} first>
        <Suspense fallback={null}>
          <SiteSearch index={INDEX} />
        </Suspense>
      </Block>
    </PageShell>
  );
}
