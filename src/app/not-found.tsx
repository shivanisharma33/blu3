import Link from "next/link";
import Contours from "@/components/Contours";
import { EditorialButton, Em } from "@/components/Editorial";
import { NAV } from "@/content/site";

export default function NotFound() {
  return (
    <main id="main" className="nf surface-ink wrap" data-nav-theme="dark" style={{ position: "relative", overflow: "hidden" }}>
      <Contours className="phead__contours" seed={9} rings={22} color="#65B8C4" opacity={0.2} />
      <div className="grid" style={{ width: "100%", rowGap: "2.5rem", position: "relative" }}>
        <p className="label" style={{ gridColumn: "1 / -1", color: "var(--teal)" }}>Error 404</p>
        <h1 className="display h-xxl" style={{ gridColumn: "1 / span 9" }}>
          Nothing found <Em>at this depth.</Em>
        </h1>
        <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          <EditorialButton href="/">Return home</EditorialButton>
          {NAV.map((g) => (
            <Link key={g.href} href={g.href} className="ebtn"><span className="ebtn__text">{g.label}</span></Link>
          ))}
        </div>
      </div>
    </main>
  );
}
