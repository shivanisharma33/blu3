import type { Metadata } from "next";
import { PageShell, PageHeader, Block, DocList, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import { DOCS } from "@/content/site";

export const metadata: Metadata = {
  title: "AGM",
  description: "Annual General Meeting of Shareholders of BluEnergies Ltd. — meeting materials.",
  alternates: { canonical: "/investors/agm/" },
};

export default function AgmPage() {
  return (
    <PageShell>
      <PageHeader section="Investors" current="AGM" title={["Annual General", <Em key="m">Meeting.</Em>]} />
      <Block tone="ivory" label="2026 meeting" index="01" heading={<>Annual General Meeting of <Em>Shareholders.</Em></>} first>
        <dl className="event">
          <div><dt>Date</dt><dd>June 23, 2026</dd></div>
          <div><dt>Time</dt><dd>11:00am PST</dd></div>
          <div><dt>Company</dt><dd>BluEnergies Ltd.</dd></div>
        </dl>
        <DocList
          title="AGM materials"
          docs={[
            { label: DOCS.agmCircular.label, href: DOCS.agmCircular.href },
            { label: DOCS.agmProxy.label, href: DOCS.agmProxy.href },
            { label: DOCS.agmReturnCard.label, href: DOCS.agmReturnCard.href },
          ]}
        />
      </Block>
      <NextPage href="/news-and-media/news/" label="News releases" />
    </PageShell>
  );
}
