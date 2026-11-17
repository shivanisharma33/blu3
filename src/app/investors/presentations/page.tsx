import type { Metadata } from "next";
import { PageShell, PageHeader, Block, DocList, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import { DOCS } from "@/content/site";

export const metadata: Metadata = {
  title: "Presentations",
  description: "BluEnergies Ltd. corporate presentation, fact sheet and independent research reports.",
  alternates: { canonical: "/investors/presentations/" },
};

export default function PresentationsPage() {
  return (
    <PageShell>
      <PageHeader section="Investors" current="Presentations" title={["Presentations", <>&amp; <Em>research.</Em></>]} />
      <Block tone="ivory" label="Corporate" index="01" heading={<>Corporate <Em>materials.</Em></>} first>
        <DocList
          docs={[
            { label: "Corporate Presentation", href: DOCS.corporatePresentation.href },
            { label: "Fact Sheet", meta: "November 2026", href: DOCS.factSheet.href },
          ]}
        />
      </Block>
      <Block tone="ivory" label="Research" index="02" heading={<>Independent <Em>research.</Em></>}>
        <DocList
          docs={[
            { label: "Research Report", meta: "June 1, 2026 — Granite Point", href: DOCS.researchJun2026.href },
            { label: "Research Report", meta: "March 30, 2026 — Granite Point", href: DOCS.researchMar2026.href },
          ]}
        />
      </Block>
      <NextPage href="/investors/agm/" label="AGM" />
    </PageShell>
  );
}
