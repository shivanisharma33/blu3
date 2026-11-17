import type { Metadata } from "next";
import Image from "next/image";
import { PageShell, PageHeader, Block, NextPage } from "@/components/page/PageParts";
import { Em, EditorialButton } from "@/components/Editorial";
import { Rise } from "@/components/Reveal";
import { ABOUT_LEAD, CORPORATE_VIDEO, HARPER, CEO_QUOTE } from "@/content/site";
import { MILESTONES } from "@/content/pages";

export const metadata: Metadata = {
  title: "About Us",
  description: ABOUT_LEAD,
  alternates: { canonical: "/corporate/about-us/" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        section="Corporate"
        current="About Us"
        title={["A West Africa", <>deepwater <Em>explorer.</Em></>]}
        standfirst={ABOUT_LEAD}
        image={{ src: "/images/platform-day.jpg", alt: "Offshore platform on open water", position: "50% 55%", caption: "Fig. — Offshore operations" }}
      />

      <Block tone="ivory" label="Our approach" index="01" heading={<>A technology-driven <Em>selection.</Em></>} first>
        <Rise className="prose">
          <p data-rise>
            BluEnergies is positioned in the Harper basin following a proactive, strategy-led, data-intensive evaluation —
            its geo-technical team evaluated {HARPER.screening}, shortlisting five opportunities before selecting the
            Harper Basin.
          </p>
          <p data-rise>
            The Company holds a 35% interest, alongside TotalEnergies (65%), in Reconnaissance License LPRA-003 — Blocks
            LB-26, LB-30 and LB-31, offshore Liberia — covering {HARPER.areaKm2} km² ({HARPER.areaAcres}).
          </p>
          <blockquote data-rise className="serif" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)", lineHeight: 1.2, marginTop: "2.5rem", maxWidth: "26ch" }}>
            “{CEO_QUOTE.text}”
            <footer style={{ fontFamily: "var(--f-body)", fontSize: ".875rem", marginTop: "1rem", color: "var(--ink-70)" }}>
              — {CEO_QUOTE.name}, {CEO_QUOTE.role}
            </footer>
          </blockquote>
          <div data-rise style={{ marginTop: "2rem" }}>
            <EditorialButton href="/assets-and-operations/overview/">Assets &amp; Operations</EditorialButton>
          </div>
        </Rise>
      </Block>

      <Block tone="ivory" label="Corporate video" index="02" heading={<>BluEnergies, <Em>in motion.</Em></>}>
        <a className="video-card" href={CORPORATE_VIDEO} target="_blank" rel="noopener noreferrer">
          <Image src="/images/sea-aerial.jpg" alt="" fill sizes="(max-width: 1023px) 100vw, 66vw" style={{ objectFit: "cover" }} />
          <span className="video-card__label">
            <strong>Watch the corporate video</strong>
            <span className="video-card__play" aria-hidden="true">▶</span>
          </span>
          <span className="sr-only"> (YouTube, opens in a new tab)</span>
        </a>
      </Block>

      <Block tone="ivory" label="Milestones" index="03" heading={<>From private venture to <Em>partnered explorer.</Em></>}>
        <Rise as="ol" className="timeline">
          {MILESTONES.map((m) => (
            <li key={m.when + m.what} data-rise>
              <time>{m.when}</time>
              <p>
                {m.what}
                <small>Source: {m.src}</small>
              </p>
            </li>
          ))}
        </Rise>
      </Block>

      <NextPage href="/corporate/board-management/" label="Board & Management" />
    </PageShell>
  );
}
