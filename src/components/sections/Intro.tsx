import { RevealLines, ImageReveal, AnimatedDivider, Rise } from "@/components/Reveal";
import { SectionLabel, EditorialButton, Em } from "@/components/Editorial";
import { ABOUT_LEAD, CEO_QUOTE } from "@/content/site";

/** SECTION 02 — Company introduction as an editorial magazine spread. */
export default function Intro() {
  return (
    <section id="story" className="intro surface-ivory wrap" data-nav-theme="light" aria-labelledby="intro-title">
      <div className="grid">
        <div className="intro__head">
          <SectionLabel index="01">Who we are</SectionLabel>
          <RevealLines
            id="intro-title"
            className="display h-xxl intro__title"
            lines={["Energy begins", <>with <Em>understanding.</Em></>]}
          />
        </div>

        <AnimatedDivider tone="light" className="intro__divider" />

        <figure className="intro__figure">
          <ImageReveal
            src="/images/seismic-vessel.jpg"
            alt="High-definition view of an offshore seismic exploration vessel operating in open waters at golden hour"
            from="bottom"
            sizes="(max-width: 767px) 100vw, (max-width: 1200px) 60vw, 50vw"
            position="50% 50%"
            quality={100}
            unoptimized
          />
          <figcaption className="figcap">
            <span>Fig. 01</span>
            <span>Offshore seismic survey operations</span>
          </figcaption>
        </figure>

        <Rise className="intro__text">
          <p className="lead" data-rise>{ABOUT_LEAD}</p>
          <p className="body muted" data-rise>
            The Company was formed in 2021 and selected the Harper Basin, offshore Liberia, through a
            technology-driven screening of 30 sedimentary basins in 42 countries. It began trading on the
            TSX Venture Exchange in April 2025 and partnered with TotalEnergies in January 2026.
          </p>
          <div data-rise>
            <EditorialButton href="/corporate/about-us/">About BluEnergies</EditorialButton>
          </div>
        </Rise>

        <Rise as="figure" className="intro__quote">
          <span className="qmark" aria-hidden="true" data-rise>“</span>
          <blockquote data-rise>{CEO_QUOTE.text}</blockquote>
          <figcaption data-rise>
            {CEO_QUOTE.name}, {CEO_QUOTE.role}
          </figcaption>
        </Rise>
      </div>
    </section>
  );
}
