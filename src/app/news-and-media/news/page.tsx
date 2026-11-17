import type { Metadata } from "next";
import { PageShell, PageHeader, Block, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import ReleaseIndex from "@/components/page/ReleaseIndex";
import { NEWS } from "@/content/site";

export const metadata: Metadata = {
  title: "News",
  description: "News releases from BluEnergies Ltd. (TSXV: BLU, OTCQX: BLUGF).",
  alternates: { canonical: "/news-and-media/news/" },
};

export default function NewsIndexPage() {
  return (
    <PageShell>
      <PageHeader
        section="News & Media"
        current="News"
        title={["News", <Em key="n">releases.</Em>]}
        meta={<span className="label">{NEWS.length} releases · 2025 — 2026</span>}
      />
      <Block tone="ivory" label="Archive" index="01" heading={<>The Energy <Em>Journal.</Em></>} first>
        <ReleaseIndex items={NEWS} />
      </Block>
      <NextPage href="/news-and-media/in-the-media/" label="In the Media" />
    </PageShell>
  );
}
