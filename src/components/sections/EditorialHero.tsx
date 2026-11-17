"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";
import { RevealLines } from "@/components/Reveal";
import { EditorialButton, Em } from "@/components/Editorial";
import { DOCS, CORPORATE_VIDEO, HARPER } from "@/content/site";

const HERO_DOCS = [
  { n: "01", label: "Corporate Presentation", href: DOCS.corporatePresentation.href },
  { n: "02", label: "Corporate Video", href: CORPORATE_VIDEO },
  { n: "03", label: "Fact Sheet", href: DOCS.factSheet.href },
  { n: "04", label: "Research Report", href: DOCS.researchReport.href },
];

/**
 * SECTION 01 — Editorial cinematic hero.
 * Timeline: dark opening frame → brand mark wipe → curtain lifts → nav settles →
 * image expands (clip + counter-scale) → headline lines rise → copy + CTA underline draw.
 * Scroll: image slowly scales/drifts while the headline lifts at a different rate.
 */
export default function EditorialHero({ withPreloader = true }: { withPreloader?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) {
        gsap.set(q(".preloader"), { display: "none" });
        return;
      }

      const seen = typeof sessionStorage !== "undefined" && sessionStorage.getItem("blu-intro") === "1";
      const usePre = withPreloader && !seen;
      try { sessionStorage.setItem("blu-intro", "1"); } catch {}

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      if (usePre) {
        tl.to(q(".preloader__mark"), { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: EASE.inOut })
          .to(q(".preloader__count span"), { textContent: 100, duration: 1.0, snap: { textContent: 1 }, ease: "power1.inOut" }, "<")
          .to(q(".preloader"), { clipPath: "inset(0 0 100% 0)", duration: 1.0, ease: EASE.inOut }, "+=0.15")
          .set(q(".preloader"), { display: "none" });
      } else {
        tl.set(q(".preloader"), { display: "none" });
      }

      const nav = document.querySelector(".nav");
      if (nav) tl.fromTo(nav, { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1 }, usePre ? "-=0.55" : 0.1);

      tl.fromTo(q(".hero__media .img-reveal"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: EASE.inOut }, "<")
        .fromTo(q(".hero__media img"), { scale: 1.35 }, { scale: 1.08, duration: 2.2 }, "<")
        .fromTo(q(".hero__kicker"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=1.2")
        .fromTo(q(".hero__headline .rl-inner"), { yPercent: 115, rotate: 2.5 }, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.11 }, "<0.1")
        .fromTo(q(".hero__meta > *, .hero__tag > *"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, "-=0.8")
        .fromTo(q(".hero__intro p"), { clipPath: "inset(0 0 100% 0)", y: 16 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.9 }, "-=0.7")
        .fromTo(q(".hero__intro .ebtn__text"), { "--ul": 0 }, { "--ul": 1, duration: 0.9, ease: EASE.inOut }, "-=0.5")
        .fromTo(q(".hero__intro .ebtn"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, "<")
        .fromTo(q(".hero__docs-list > li"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06 }, "-=0.7")
        .fromTo(q(".hero__docs-list"), { borderTopColor: "rgba(220,230,232,0)" }, { borderTopColor: "rgba(220,230,232,.16)", duration: 0.8 }, "<")
        .fromTo(q(".hero__scroll"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.3");

      /* Scroll choreography */
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q(".hero__media"), { yPercent: 12, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero__media .img-reveal"), { scale: 1.12, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero__title"), { yPercent: -28, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero__foot"), { autoAlpha: 0, y: -40, ease: "none", scrollTrigger: { ...st, end: "40% top" } });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero surface-ink wrap" data-nav-theme="dark" aria-label="Introduction">
      {withPreloader && (
        <div className="preloader" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="preloader__mark" src="/brand/logo-white.svg" alt="" />
          <p className="preloader__count">LOADING — <span>0</span>%</p>
        </div>
      )}

      <div className="hero__rules grid" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="grid">
        <div className="hero__meta">
          <p className="label">West Africa / Offshore Exploration</p>
          <p className="label">Harper Basin — Offshore Liberia</p>
        </div>
      </div>

      <div className="hero__stage">
        <div className="hero__media">
          <div className="img-reveal">
            <Image
              src="/images/hero-platform.jpg"
              alt="Aerial top-down view of an offshore drilling and production platform illuminated in deep ocean water"
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 75vw, 60vw"
              quality={100}
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
          <div className="hero__tag">
            <span className="label">{HARPER.licenceShort}</span>
            <span className="label">{HARPER.blocks.join(" · ")}</span>
          </div>
        </div>

        <h1 className="hero__title">
          <span className="hero__kicker">A West Africa Deepwater Oil &amp; Gas Explorer</span>
          <RevealLines
            as="span"
            trigger="manual"
            className="display hero__headline"
            lines={["The future", <>is <Em>found</Em></>, "below."]}
            style={{ display: "block" }}
          />
        </h1>

        <div className="hero__foot grid">
          <div className="hero__intro">
            <p>Advancing deepwater exploration through intelligence, discipline and opportunity.</p>
            <EditorialButton href="#story">Discover our story</EditorialButton>
          </div>
          <nav className="hero__docs" aria-label="Key documents">
            <ul className="hero__docs-list">
              {HERO_DOCS.map((d) => (
                <li key={d.n}>
                  <a href={d.href} target="_blank" rel="noopener noreferrer">
                    <small>{d.n}</small>
                    {d.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
