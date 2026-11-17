"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { RevealLines, ImageReveal, Rise } from "@/components/Reveal";
import { SectionLabel, EditorialButton, Em } from "@/components/Editorial";
import { HARPER, ANALOGUES, LOUISIANA } from "@/content/site";

const ENTRIES = [
  { id: "licence", title: "The licence" },
  { id: "play", title: "The play" },
  { id: "evidence", title: "The evidence" },
  { id: "partnership", title: "The partnership" },
  { id: "louisiana", title: "Additional asset" },
];

/**
 * SECTION 03 — A visual exploration journal.
 * Signature motion: the photographic canvas opens from a framed plate to full bleed as you scroll.
 * Then a sticky index tracks five journal entries.
 */
export default function Exploration() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (!prefersReducedMotion()) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q(".explore__canvas")[0], start: "top 75%", end: "bottom bottom", scrub: 0.6 },
        });
        tl.fromTo(q(".explore__frame"), { clipPath: "inset(12% 16% 12% 16%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
          .fromTo(q(".explore__frame img"), { scale: 1.2 }, { scale: 1, ease: "none" }, 0);

        gsap.fromTo(
          q(".explore__title .label, .explore__title p"),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: q(".explore__title")[0], start: "top 85%", once: true } }
        );
        /* technical labels arrive progressively */
        q(".specs > div").forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
      }
      q(".entry").forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setActive(i) });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="explore surface-navy" data-nav-theme="dark" aria-labelledby="explore-title">
      <div className="explore__canvas">
        <div className="explore__frame">
          <Image
            src="/images/rig-sunlit.jpg"
            alt="Offshore sunlit drilling and production rig in deepwater basin"
            fill
            sizes="100vw"
            quality={100}
            unoptimized
            style={{ objectFit: "cover", objectPosition: "50% 50%" }}
          />
        </div>
        <span className="explore__credit">Representative imagery</span>
        <div className="explore__title">
          <SectionLabel index="02">Exploration &amp; Operations</SectionLabel>
          <RevealLines id="explore-title" className="display h-xxl" lines={["A frontier of", <Em key="o">opportunity.</Em>]} />
          <p>
            The Harper Basin is one of the last undrilled West African margin basins — and it contains the
            prolific deepwater basin floor fan play.
          </p>
        </div>
      </div>

      <div className="journal wrap grid">
        <aside className="journal__index" aria-label="Journal entries">
          <SectionLabel>Exploration journal</SectionLabel>
          <ol>
            {ENTRIES.map((e, i) => (
              <li key={e.id}>
                <a href={`#${e.id}`} className={active === i ? "is-active" : ""}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {e.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="journal__entries">
          {/* 01 — Licence */}
          <article id="licence" className="entry">
            <div className="entry__head label"><span>Entry 01 — The licence</span><span>Offshore Liberia</span></div>
            <h3>Reconnaissance License <Em>{HARPER.licenceShort}</Em></h3>
            <Rise className="body">
              <p>
                BluEnergies holds a <strong>35% interest</strong> and TotalEnergies a <strong>65% interest</strong> in
                {" "}{HARPER.licence} in the Harper basin, offshore Liberia — issued by the {HARPER.regulator} for a
                duration up to June 30, 2027.
              </p>
            </Rise>
            <dl className="specs specs--4">
              <div><dt>Blocks</dt><dd>{HARPER.blocks.join(" · ")}</dd></div>
              <div><dt>Area</dt><dd className="tabular">{HARPER.areaKm2} km²</dd></div>
              <div><dt>Basin coverage</dt><dd>~40%</dd></div>
              <div><dt>Distance to shore</dt><dd className="tabular">~{HARPER.shoreKm} km</dd></div>
            </dl>
          </article>

          {/* 02 — Play */}
          <article id="play" className="entry">
            <div className="entry__head label"><span>Entry 02 — The play</span><span>Cretaceous</span></div>
            <h3>A deepwater fan play on a <Em>proven</Em> margin.</h3>
            <Rise className="body">
              <p>
                The Harper basin contains a Cretaceous deepwater fan play. It shares the same source rocks and
                depositional environment as the 16+ billion barrel Stabroek Block in Guyana, on the conjugate margin.
              </p>
            </Rise>
            <div className="analogues">
              <table>
                <caption>Analogue discoveries cited by BluEnergies. boe — barrels of oil equivalent.</caption>
                <thead>
                  <tr><th scope="col">Discovery</th><th scope="col">Country</th><th scope="col" style={{ textAlign: "right" }}>Volume</th></tr>
                </thead>
                <tbody>
                  {ANALOGUES.map((a) => (
                    <tr key={a.name}>
                      <td>{a.name}</td>
                      <td>{a.country}</td>
                      <td>{a.volume}{a.note && <span className="muted"> ({a.note})</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* 03 — Evidence */}
          <article id="evidence" className="entry">
            <div className="entry__head label"><span>Entry 03 — The evidence</span><span>3D seismic</span></div>
            <h3><span className="tabular">{HARPER.seismicKm2}</span> km² of 3D seismic, <Em>interpreted.</Em></h3>
            <Rise className="body">
              <p>
                Regional subsurface work and interpretation of {HARPER.seismicKm2} km² of 3D seismic data has
                recognised significant independently certified unrisked recoverable prospective resource potential in
                <strong> six deepwater fans</strong> so far — all in Blocks LB-30 and LB-31. An assessment of Block
                LB-26 is underway.
              </p>
              <p>
                A 1 billion boe recoverable discovery in the Harper basin would rank among offshore Africa’s top 5% by
                volume in the past decade (Westwood, 2024).
              </p>
            </Rise>
            <figure className="entry__figure">
              <ImageReveal
                src="/site/Fan_Play_image_v2.jpg"
                alt="3D seismic image of the Cretaceous fan systems in BluEnergies' Harper Basin licence, showing reservoir sands in red"
                from="left"
                parallax={0}
                sizes="(max-width: 1023px) 100vw, 60vw"
              />
              <figcaption className="figcap"><span>Fig. 02 — Relative acoustic impedance, Cenomanian top</span><span>Data property of TGS</span></figcaption>
            </figure>
          </article>

          {/* 04 — Partnership */}
          <article id="partnership" className="entry">
            <div className="entry__head label"><span>Entry 04 — The partnership</span><span>January 2026</span></div>
            <h3>Partnered with <Em>TotalEnergies.</Em></h3>
            <Rise className="body">
              <p>
                In January 2026 BluEnergies partnered with TotalEnergies in RL-003, covering all three blocks. Through
                2026 the partners are working to build the portfolio, mitigate and diversify risk, and accelerate the
                selection and drilling of the initial test of the Harper basin deepwater fan play.
              </p>
            </Rise>
            <dl className="specs">
              <div><dt>BluEnergies</dt><dd className="tabular">35%</dd></div>
              <div><dt>TotalEnergies</dt><dd className="tabular">65%</dd></div>
            </dl>
          </article>

          {/* 05 — Louisiana */}
          <article id="louisiana" className="entry">
            <div className="entry__head label"><span>Entry 05 — Additional asset</span><span>Gulf of America</span></div>
            <h3>{LOUISIANA.title.split(",")[0]}, <Em>USA.</Em></h3>
            <Rise className="body">
              <p>The {LOUISIANA.play}, shallow water, Gulf of America.</p>
              {LOUISIANA.facts.map((f) => <p key={f}>{f}</p>)}
            </Rise>
            <div style={{ marginTop: "2.5rem" }}>
              <EditorialButton href="/assets-and-operations/overview/">Assets &amp; Operations</EditorialButton>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
