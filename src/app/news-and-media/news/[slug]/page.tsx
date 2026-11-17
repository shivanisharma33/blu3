import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell, PageHeader, Prose } from "@/components/page/PageParts";
import { EditorialButton } from "@/components/Editorial";
import { RELEASES, releaseByKey } from "@/content/pages";
import { CONTACT } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return RELEASES.map((r) => ({ slug: r.key }));
}

const fmt = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = releaseByKey(slug);
  if (!r) return {};
  return {
    title: r.title,
    description: `${fmt(r.iso)} — ${r.title}. News release from BluEnergies Ltd. (TSXV: BLU).`,
    alternates: { canonical: `/news-and-media/news/${r.key}/` },
    openGraph: { type: "article", publishedTime: r.iso, title: r.title },
  };
}

export default async function ReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = RELEASES.findIndex((r) => r.key === slug);
  if (i < 0) notFound();
  const r = RELEASES[i];
  const newer = RELEASES[i - 1];
  const older = RELEASES[i + 1];

  return (
    <PageShell>
      <PageHeader
        section="News & Media"
        current="News"
        title={[r.title]}
        size="xl"
        meta={
          <>
            <span className="label" style={{ color: "var(--teal)" }}>{r.category}</span>
            <time className="label" dateTime={r.iso}>{fmt(r.iso)}</time>
          </>
        }
      />
      <article className="surface-ivory wrap" data-nav-theme="light">
        <div className="grid article__grid">
          <aside className="article__aside">
            <dl>
              <div><dt>Published</dt><dd><time dateTime={r.iso}>{fmt(r.iso)}</time></dd></div>
              <div><dt>Topic</dt><dd>{r.category}</dd></div>
              <div><dt>Issuer</dt><dd>BluEnergies Ltd. — TSXV: BLU</dd></div>
              <div><dt>Media enquiries</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
            </dl>
            <EditorialButton href="/news-and-media/news/">All news releases</EditorialButton>
          </aside>
          <div className="article__body">
            <Prose html={r.html} className="prose--release" />
          </div>
        </div>
        <nav className="article__pager" aria-label="More releases">
          {older ? (
            <Link href={older.slug}>
              <small className="label">← Previous release</small>
              <span>{older.title}</span>
            </Link>
          ) : <span />}
          {newer ? (
            <Link href={newer.slug}>
              <small className="label">Next release →</small>
              <span>{newer.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </article>
    </PageShell>
  );
}
