"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";
import { RevealLines } from "@/components/Reveal";
import { SectionLabel, Em } from "@/components/Editorial";

/** SECTION 07 — Editorial closing. Image settles from 1.3× as it enters; the CTA underline draws last. */
export default function ClosingCTA() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.fromTo(q(".closing__bg img"), { scale: 1.3, yPercent: -6 }, {
        scale: 1, yPercent: 6, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: q(".closing__title")[0], start: "top 80%", once: true } });
      tl.fromTo(q(".closing__title .rl-inner"), { yPercent: 115 }, { yPercent: 0, duration: 1.1, ease: EASE.out, stagger: 0.12 })
        .fromTo(q(".closing__side > *"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.6")
        .fromTo(q(".closing__cta"), { "--ul": 0 }, { "--ul": 1, duration: 1.1, ease: EASE.inOut }, "-=0.3");
    },
    { scope: root }
  );

  return (
    <section ref={root} className="closing surface-ink wrap" data-nav-theme="dark" aria-labelledby="closing-title">
      <div className="closing__bg">
        <Image src="/images/underwater.jpg" alt="" fill sizes="100vw" quality={78} style={{ objectFit: "cover", objectPosition: "50% 60%" }} />
      </div>
      <div className="closing__inner grid">
        <SectionLabel index="06">Connect</SectionLabel>
        <RevealLines
          as="h2"
          id="closing-title"
          trigger="manual"
          className="display h-mega closing__title"
          lines={["The next frontier", <>starts <Em>here.</Em></>]}
        />
        <div className="closing__side">
          <p>Explore the opportunities shaping tomorrow’s energy landscape.</p>
          <Link className="closing__cta" href="/contact/request-for-information/">
            Connect with BluEnergies <i aria-hidden="true">→</i>
          </Link>
        </div>
      </div>
    </section>
  );
}
