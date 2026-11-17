import type { Metadata } from "next";
import { PageShell, PageHeader, Block, DocList, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import { DOCS } from "@/content/site";

export const metadata: Metadata = {
  title: "Corporate Governance",
  description: "BluEnergies Ltd. governance policies and ESTMA reporting.",
  alternates: { canonical: "/corporate/corporate-governance/" },
};

export default function GovernancePage() {
  return (
    <PageShell>
      <PageHeader section="Corporate" current="Corporate Governance" title={["Corporate", <Em key="g">governance.</Em>]} />
        <Block tone="ivory" label="Policies" index="01" heading={<>Company <Em>policies.</Em></>} first>
          <DocList
            docs={[
              { label: "Anti-Bribery Corruption Policy", href: DOCS.antiBribery.href },
              { label: "Code of Conduct and Ethics", href: DOCS.codeOfConduct.href },
            ]}
          />
        </Block>
        <Block tone="ivory" label="ESTMA" index="02" heading={<>Extractive sector <Em>transparency.</Em></>}>
          <DocList docs={[{ label: "2025 ESTMA Report", meta: "Apr 8, 2025 to Sept 30, 2025", href: DOCS.estma2025.href }]} />
        </Block>
      <NextPage href="/assets-and-operations/overview/" label="Assets & Operations" />
    </PageShell>
  );
}
