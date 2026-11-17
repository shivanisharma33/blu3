import type { Metadata } from "next";
import { PageShell, PageHeader, Prose } from "@/components/page/PageParts";
import { EditorialButton } from "@/components/Editorial";
import { OIL_MAJORS_HTML } from "@/content/pages";

const TITLE = "Oil majors snap up West African blocks in hunt for next Brazil";

export const metadata: Metadata = {
  title: TITLE,
  description: "Reuters, February 4, 2026 — Oil majors snap up West African blocks in hunt for next Brazil.",
  alternates: { canonical: "/news-and-media/in-the-media/oil-majors-snap-up-west-african-blocks-in-hunt-for-next-brazil/" },
};

// The article heading/byline are part of the extracted body; strip the duplicated <h2> title.
const BODY = OIL_MAJORS_HTML.replace(/^\s*<h2>[\s\S]*?<\/h2>/, "");

export default function OilMajorsPage() {
  return (
    <PageShell>
      <PageHeader
        section="News & Media"
        current="In the Media"
        title={[TITLE]}
        size="xl"
        meta={<><span className="label" style={{ color: "var(--teal)" }}>Reuters</span><time className="label" dateTime="2026-02-04">February 4, 2026</time></>}
      />
      <article className="surface-ivory wrap" data-nav-theme="light">
        <div className="grid article__grid">
          <aside className="article__aside">
            <dl>
              <div><dt>Source</dt><dd>Reuters</dd></div>
              <div><dt>Published</dt><dd>February 4, 2026</dd></div>
            </dl>
            <EditorialButton href="/news-and-media/in-the-media/">In the Media</EditorialButton>
          </aside>
          <div className="article__body">
            <Prose html={BODY} className="prose--release" />
          </div>
        </div>
      </article>
    </PageShell>
  );
}
