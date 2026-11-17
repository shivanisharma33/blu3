"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { RevealLines } from "@/components/Reveal";
import { SectionLabel, Em } from "@/components/Editorial";
import { HARPER } from "@/content/site";

export default function GeographicVisualization({ index = "03", label = "Geographic intelligence" }: { index?: string; label?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const st = { trigger: root.current, start: "top 80%", once: true };

      gsap.fromTo(
        q(".geo__map-frame"),
        { autoAlpha: 0, y: 30, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", scrollTrigger: st }
      );
      gsap.fromTo(
        q(".geo__stat"),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 0.2, scrollTrigger: st }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="geo surface-ink wrap" data-nav-theme="dark" aria-labelledby="geo-title">
      <div className="grid geo__layout">
        {/* Left Column (c1–5): Typography & Key Technical Specs */}
        <div className="geo__content">
          <SectionLabel index={index}>{label}</SectionLabel>
          <RevealLines id="geo-title" className="display h-xl geo__title" lines={["Harper Basin,", <>offshore <Em>Liberia.</Em></>]} />

          <p className="geo__lead">
            Reconnaissance License RL-003 covers {HARPER.areaKm2} km² across Blocks LB-26, LB-30 and LB-31, holding approximately
            40% of the prospective Harper Basin depocenter in partnership with TotalEnergies.
          </p>

          <div className="geo__specs">
            <div className="geo__stat">
              <span className="geo__stat-val">{HARPER.areaKm2} km²</span>
              <span className="geo__stat-lbl">Licence Area ({HARPER.areaAcres})</span>
            </div>
            <div className="geo__stat">
              <span className="geo__stat-val">~40%</span>
              <span className="geo__stat-lbl">Harper Basin Depocenter</span>
            </div>
            <div className="geo__stat">
              <span className="geo__stat-val">{HARPER.seismicKm2} km²</span>
              <span className="geo__stat-lbl">3D Seismic Coverage</span>
            </div>
            <div className="geo__stat">
              <span className="geo__stat-val">6 Fans</span>
              <span className="geo__stat-lbl">Independently Certified Leads</span>
            </div>
          </div>
        </div>

        {/* Right Column (c6–12): High-Resolution Official Map Plate */}
        <figure className="geo__figure">
          <div className="geo__map-frame">
            <Image
              src="/site/MAP_BluEnergies.png"
              alt="Official exploration map of Reconnaissance License RL-003, Harper Basin offshore Liberia"
              width={3300}
              height={2517}
              quality={100}
              unoptimized
              priority
              className="geo__map-img"
            />
          </div>
          <figcaption className="figcap">
            <span>Fig. 03 — Reconnaissance License RL-003 Lead Inventory</span>
            <span>TGS / BluEnergies</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
