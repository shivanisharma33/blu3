"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";
import { RevealLines, Rise } from "@/components/Reveal";
import { SectionLabel, Em, EditorialButton } from "@/components/Editorial";
import { MARKET, HARPER, DOCS, TICKERS } from "@/content/site";

const FIGURES = [
  { label: "Participating interest", meta: "RL-003", value: 35, decimals: 0, prefix: "", suffix: "%", desc: "Harper Basin, offshore Liberia — partnered with TotalEnergies (65%)." },
  { label: "Private placement", meta: "Jul 2026", value: 20.7, decimals: 1, prefix: "C$", suffix: "M", desc: "Gross proceeds of the closed, non-brokered private placement of units." },
  { label: "Shares outstanding", meta: MARKET.asOf, value: 82.58, decimals: 2, prefix: "", suffix: "M", desc: "Basic shares outstanding per the November 2026 cap table." },
  { label: "Licence area", meta: "km²", value: 8924, decimals: 0, prefix: "", suffix: "", desc: `Blocks LB-26, LB-30 and LB-31 — ${HARPER.areaAcres}.` },
];

const fmt = (v: number, d: number) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

const INVESTOR_DOCS = [
  { label: DOCS.corporatePresentation.label, href: DOCS.corporatePresentation.href, tag: "PDF" },
  { label: "Fact Sheet — November 2026", href: DOCS.factSheet.href, tag: "PDF" },
  { label: DOCS.researchJun2026.label, href: DOCS.researchJun2026.href, tag: "PDF" },
  { label: DOCS.researchMar2026.label, href: DOCS.researchMar2026.href, tag: "PDF" },
  { label: "Regulatory filings — SEDAR+", href: "https://www.sedarplus.ca/", tag: "EXT" },
];

/** SECTION 05 — Investment & company facts as a premium annual-report spread. */
export default function InvestorSection() {
  const root = useRef<HTMLElement>(null);
  const pricePct = ((MARKET.price - MARKET.low52) / (MARKET.high52 - MARKET.low52)) * 100;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      /* signature moment: figures count up as the report "prints" */
      q(".figure").forEach((el) => {
        const num = el.querySelector("[data-value]") as HTMLElement;
        const target = Number(num.dataset.value);
        const d = Number(num.dataset.decimals);
        const obj = { v: 0 };
        gsap.fromTo(el, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, ease: EASE.out, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => { num.textContent = fmt(obj.v, d); },
        });
      });
      gsap.fromTo(q(".figures"), { borderTopColor: "rgba(7,25,35,0)" }, { borderTopColor: "rgba(7,25,35,1)", duration: 1.2, scrollTrigger: { trigger: q(".figures")[0], start: "top 85%", once: true } });
      gsap.fromTo(q(".split__seg"), { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: EASE.inOut, stagger: 0.15, scrollTrigger: { trigger: q(".split")[0], start: "top 85%", once: true } });
      gsap.fromTo(q(".range__fill"), { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: EASE.inOut, scrollTrigger: { trigger: q(".range")[0], start: "top 85%", once: true } });
      gsap.fromTo(q(".range__mark"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 1.1, scrollTrigger: { trigger: q(".range")[0], start: "top 85%", once: true } });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="invest surface-ivory wrap" data-nav-theme="light" aria-labelledby="invest-title">
      <div className="grid">
        <div className="invest__head">
          <SectionLabel index="04">Investors</SectionLabel>
          <RevealLines id="invest-title" className="display h-xl" lines={["The investment case,", <>in <Em>figures.</Em></>]} />
        </div>
        <Rise className="invest__aside muted">
          <p data-rise>
            Listed on the TSX Venture Exchange since April 2025 and on the OTCQX Best Market since March 2026.
          </p>
        </Rise>

        <div className="figures">
          {FIGURES.map((f) => (
            <div className="figure" key={f.label}>
              <p className="figure__label"><span>{f.label}</span><span>{f.meta}</span></p>
              <p className="figure__value" aria-label={`${f.prefix}${fmt(f.value, f.decimals)}${f.suffix}`}>
                {f.prefix && <small aria-hidden="true">{f.prefix}</small>}
                <span data-value={f.value} data-decimals={f.decimals} aria-hidden="true">{fmt(f.value, f.decimals)}</span>
                {f.suffix && <sup aria-hidden="true">{f.suffix}</sup>}
              </p>
              <p className="figure__desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="invest__viz">
          <div>
            <p className="viz__title"><span>Participating interest — RL-003</span><span>Harper Basin</span></p>
            <div className="split" role="img" aria-label="BluEnergies 35 percent, TotalEnergies 65 percent">
              <div className="split__seg split__seg--blu" style={{ flex: HARPER.interest.blu }}>BluEnergies 35%</div>
              <div className="split__seg split__seg--tte" style={{ flex: HARPER.interest.tte, transformOrigin: "100% 50%" }}>TotalEnergies 65%</div>
            </div>
          </div>
          <div>
            <p className="viz__title"><span>52-week range — TSXV: BLU (C$)</span><span>As at {MARKET.asOf}</span></p>
            <div
              className="range"
              role="img"
              aria-label={`Price C$${MARKET.price.toFixed(2)} within a 52-week range of C$${MARKET.low52.toFixed(2)} to C$${MARKET.high52.toFixed(2)}`}
            >
              <div className="range__fill" style={{ width: `${pricePct}%` }} />
              <div className="range__mark" style={{ left: `${pricePct}%` }}>C${MARKET.price.toFixed(2)}</div>
            </div>
            <div className="range__ends"><span>{MARKET.low52.toFixed(2)} low</span><span>{MARKET.high52.toFixed(2)} high</span></div>
          </div>
        </div>

        <div className="invest__docs">
          <p className="viz__title"><span>Investor documents</span></p>
          <ul className="doclist">
            {INVESTOR_DOCS.map((d, i) => (
              <li key={d.label}>
                <a href={d.href} target="_blank" rel="noopener noreferrer">
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <span>{d.label}<span className="sr-only"> (opens in a new tab)</span></span>
                  <i>{d.tag} {d.tag === "PDF" ? "↓" : "↗"}</i>
                </a>
              </li>
            ))}
          </ul>
          <p className="tickers">
            {TICKERS.map((t) => (
              <span key={t.symbol}>{t.exchange}: <b>{t.symbol}</b></span>
            ))}
          </p>
          <div style={{ marginTop: "2rem" }}>
            <EditorialButton href="/investors/outlook/">Investor centre</EditorialButton>
          </div>
        </div>

        <p className="sources">
          Sources: BluEnergies Fact Sheet, November 2026 (share data as at {MARKET.asOf}); news release of July 23, 2026
          (private placement); Assets &amp; Operations overview (licence). Market data is indicative and not a
          recommendation; see filings on SEDAR+ for forward-looking statements and risk factors.
        </p>
      </div>
    </section>
  );
}
