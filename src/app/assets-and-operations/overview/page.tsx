import type { Metadata } from "next";
import { PageShell, PageHeader, Block, Prose, NextPage } from "@/components/page/PageParts";
import { Em, EditorialButton } from "@/components/Editorial";
import GeographicVisualization from "@/components/sections/GeographicVisualization";
import { OVERVIEW_HTML } from "@/content/pages";
import { HARPER, LOUISIANA, DOCS } from "@/content/site";

export const metadata: Metadata = {
  title: "Assets & Operations — Overview",
  description:
    "Reconnaissance License LPRA-003, Harper basin, offshore Liberia: Blocks LB-26, LB-30 and LB-31 (8,924 km²). BluEnergies 35% / TotalEnergies 65%.",
  alternates: { canonical: "/assets-and-operations/overview/" },
};

export default function OverviewPage() {
  return (
    <PageShell>
      <PageHeader
        section="Assets & Operations"
        current="Overview"
        title={["The Harper Basin,", <>offshore <Em>Liberia.</Em></>]}
        standfirst="A Cretaceous deepwater fan play in one of the last remaining undrilled West African margin basins."
        meta={
          <>
            <span className="label">{HARPER.licenceShort}</span>
            <span className="label">{HARPER.blocks.join(" · ")}</span>
            <span className="label">{HARPER.areaKm2} km²</span>
            <span className="label">BLU 35% · TTE 65%</span>
          </>
        }
      />

      <GeographicVisualization index="01" label="Licence map" />

      <Block tone="ivory" label="Overview" index="02" heading={<>Reconnaissance License <Em>LPRA-003.</Em></>} first>
        <Prose html={OVERVIEW_HTML} />
      </Block>

      <Block tone="ivory" label="Additional asset" index="03" heading={<>Offshore Louisiana, <Em>USA.</Em></>}>
        <div className="prose">
          <p>The {LOUISIANA.play}, shallow water, Gulf of America.</p>
          <ul>
            {LOUISIANA.facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <p className="muted" style={{ fontSize: ".8125rem" }}>Source: BluEnergies {LOUISIANA.source}.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
            <EditorialButton href="/news-and-media/news/bluenergies-secures-top-bid-in-gulf-of-america-lease-sale--engages-independent-houston-firm-for-reserve-evaluation/">
              Read the release
            </EditorialButton>
            <EditorialButton href={DOCS.factSheet.href} download>Fact Sheet</EditorialButton>
          </div>
        </div>
      </Block>

      <NextPage href="/investors/outlook/" label="Investor Outlook" />
    </PageShell>
  );
}
