import Image from "next/image";
import { EditorialButton } from "@/components/Editorial";

/**
 * CONCEPT A — CINEMATIC DEEPWATER
 * Full-bleed letterboxed photograph, film-credit typography, slow Ken Burns drift.
 * Motion: letterbox bars close from full black to a 2.39:1-style frame on load.
 */
export default function ConceptCinematic() {
  return (
    <main id="main" className="cA" data-nav-theme="dark">
      <div className="cA__img">
        <Image src="/images/rigs-dusk.jpg" alt="Offshore rigs silhouetted at dusk" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "60% 50%" }} />
      </div>
      <div className="cA__bar cA__bar--top" aria-hidden="true" />
      <div className="cA__bar cA__bar--bot">
        <span className="label" style={{ color: "var(--mist-60)" }}>Harper Basin — Offshore Liberia</span>
        <span className="label" style={{ color: "var(--mist-60)" }}>Water depth contours 1,000 — 3,000 m</span>
      </div>
      <div className="cA__title">
        <h1>
          <span>Below</span>
          <span>the surface</span>
        </h1>
        <div className="cA__sub">
          <p>A West Africa deepwater oil &amp; gas explorer — advancing the Harper Basin fan play with TotalEnergies.</p>
          <EditorialButton href="/">Discover our story</EditorialButton>
        </div>
      </div>
    </main>
  );
}
