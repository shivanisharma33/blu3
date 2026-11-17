import type { Metadata } from "next";
import { PageShell, PageHeader, Block, DocList, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import { Rise } from "@/components/Reveal";
import { DOCS, HARPER } from "@/content/site";

export const metadata: Metadata = {
  title: "Outlook",
  description:
    "BluEnergies (TSXV: BLU, OTCQX: BLUGF) has identified significant recoverable prospective resource potential in its deepwater Harper basin Blocks LB-30 and LB-31, offshore Liberia.",
  alternates: { canonical: "/investors/outlook/" },
};

export default function OutlookPage() {
  return (
    <PageShell>
      <PageHeader
        section="Investors"
        current="Outlook"
        title={["One of the last", <>undrilled <Em>margins.</Em></>]}
        standfirst="The Harper basin, offshore Liberia, is one of the last remaining undrilled West African margin basins containing the prolific deepwater basin floor fan play."
      />
      <Block tone="ivory" label="Outlook" index="01" heading={<>A material, <Em>high-impact</Em> asset.</>} first>
        <Rise className="prose">
          <p data-rise>
            BluEnergies Ltd. (TSXV: BLU, OTCQX: BLUGF), a Canadian Independent, has identified significant recoverable
            prospective resource potential in its deepwater Harper basin Blocks LB-30 and LB-31, based on an independent
            prospective resource report dated March 28, 2025. As context, a Harper basin discovery of even 1 bbo would rank
            among offshore Africa’s top 5% (by volume) in the past decade.
          </p>
          <p data-rise>
            These blocks provide BluEnergies with a material, high-impact asset and a potentially transformational
            opportunity for the country of Liberia.
          </p>
          <p data-rise>
            Through 2026, BluEnergies and TotalEnergies will be executing a work program designed to build its portfolio,
            mitigate and diversify risk, and accelerate the selection and drilling of its initial test of the Harper basin
            deepwater fan play. In January 2026, BluEnergies partnered with TotalEnergies in RL-003 which covers all three
            blocks (26, 30 &amp; 31) where BLU holds 35% interest and TTE 65% interest.
          </p>
        </Rise>
        <dl className="facts">
          <div><dt>Participating interest</dt><dd>35%<small>TotalEnergies 65%</small></dd></div>
          <div><dt>Licence area</dt><dd>{HARPER.areaKm2}<small>km² · {HARPER.areaAcres}</small></dd></div>
          <div><dt>3D seismic</dt><dd>{HARPER.seismicKm2}<small>km² interpreted</small></dd></div>
        </dl>
      </Block>
      <Block tone="ivory" label="Resources" index="02" heading={<>Investor <Em>materials.</Em></>}>
        <DocList
          docs={[
            { label: DOCS.corporatePresentation.label, href: DOCS.corporatePresentation.href },
            { label: "Fact Sheet", meta: "November 2026", href: DOCS.factSheet.href },
          ]}
        />
      </Block>
      <NextPage href="/investors/stock-information/" label="Stock Information" />
    </PageShell>
  );
}
