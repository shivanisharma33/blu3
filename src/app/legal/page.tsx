import type { Metadata } from "next";
import { PageShell, PageHeader, Prose } from "@/components/page/PageParts";
import { SectionLabel, Em } from "@/components/Editorial";
import { LEGAL_HTML } from "@/content/pages";

export const metadata: Metadata = {
  title: "Legal",
  description: "BluEnergies Ltd. Privacy Policy and Terms of Use.",
  alternates: { canonical: "/legal/" },
};

const html = LEGAL_HTML.replace("<h2>PRIVACY POLICY</h2>", '<h2 id="privacy-policy">Privacy Policy</h2>').replace(
  "<h2>TERMS OF USE</h2>",
  '<h2 id="terms-of-use">Terms of Use</h2>'
);

export default function LegalPage() {
  return (
    <PageShell>
      <PageHeader section="Legal" current="Privacy & Terms" title={["Privacy &", <Em key="t">terms.</Em>]} />
      <section className="block block--first surface-ivory wrap" data-nav-theme="light">
        <div className="grid block__grid">
          <aside className="block__side">
            <SectionLabel index="01">Contents</SectionLabel>
            <nav className="toc" aria-label="Legal contents">
              <a href="#privacy-policy">Privacy Policy</a>
              <a href="#terms-of-use">Terms of Use</a>
            </nav>
          </aside>
          <div className="block__body">
            <Prose html={html} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
