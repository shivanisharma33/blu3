import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { RevealLines, Rise, AnimatedDivider } from "@/components/Reveal";
import { SectionLabel } from "@/components/Editorial";
import Footer from "@/components/Footer";
import Contours from "@/components/Contours";
import { NAV } from "@/content/site";

/** Wraps every inner page: main landmark + footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

/**
 * Inner-page header — an editorial "section opener".
 * Section index + label, a two-line masked headline, optional standfirst, and the section's sibling pages
 * as an index on the right. Optional photographic band beneath.
 */
export function PageHeader({
  section,
  current,
  title,
  standfirst,
  image,
  meta,
  size = "xxl",
}: {
  size?: "xxl" | "xl";
  section: string;
  current: string;
  title: ReactNode[];
  standfirst?: ReactNode;
  image?: { src: string; alt: string; position?: string; caption?: string };
  meta?: ReactNode;
}) {
  const groupIndex = NAV.findIndex((g) => g.label === section);
  const group = NAV[groupIndex];
  return (
    <header className="phead surface-ink" data-nav-theme="dark">
      <Contours className="phead__contours" seed={groupIndex + 3} rings={18} color="#65B8C4" cx={1250} cy={120} opacity={0.18} />
      <div className="wrap grid phead__grid">
        <div className="phead__main">
          <nav aria-label="Breadcrumb" className="crumbs label">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            {group ? <Link href={group.href}>{section}</Link> : <span>{section}</span>}
            <span aria-hidden="true">/</span>
            <span aria-current="page">{current}</span>
          </nav>
          <RevealLines as="h1" className={`display h-${size} phead__title`} lines={title} />
          {standfirst && (
            <Rise className="phead__standfirst">
              <div data-rise>{standfirst}</div>
            </Rise>
          )}
          {meta && <div className="phead__meta">{meta}</div>}
        </div>
        {group && group.children.length > 1 && (
          <nav className="phead__sub" aria-label={`${section} pages`}>
            <SectionLabel index={String(groupIndex + 1).padStart(2, "0")}>{section}</SectionLabel>
            <ul>
              {group.children.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} aria-current={c.label === current ? "page" : undefined}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      {image && (
        <figure className="phead__band">
          <div className="phead__band-img">
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: image.position ?? "50% 50%" }} />
          </div>
          {image.caption && <figcaption className="wrap figcap"><span>{image.caption}</span><span>Representative imagery</span></figcaption>}
        </figure>
      )}
    </header>
  );
}

/** Light content section with an optional side heading (left 4 cols) and body (right 8 cols). */
export function Block({
  label,
  index,
  heading,
  children,
  tone = "ivory",
  id,
  first = false,
}: {
  label?: string;
  index?: string;
  heading?: ReactNode;
  children: ReactNode;
  tone?: "ivory" | "mist" | "ink" | "navy";
  id?: string;
  /** First block after the page header: adds top spacing and omits the divider. */
  first?: boolean;
}) {
  const dark = tone === "ink" || tone === "navy";
  return (
    <section id={id} className={`block surface-${tone} wrap ${first ? "block--first" : ""}`} data-nav-theme={dark ? "dark" : "light"}>
      {!first && <AnimatedDivider tone={dark ? "dark" : "light"} />}
      <div className="grid block__grid">
        <div className="block__side">
          {label && <SectionLabel index={index}>{label}</SectionLabel>}
          {heading && <h2 className="block__heading">{heading}</h2>}
        </div>
        <div className="block__body">{children}</div>
      </div>
    </section>
  );
}

/** Renders sanitised, extracted HTML with editorial typography. */
export function Prose({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

export type Doc = { label: string; href: string; meta?: string; tag?: "PDF" | "EXT" | "VIDEO" };

/** Numbered document index (hairline rows). */
export function DocList({ docs, title }: { docs: Doc[]; title?: string }) {
  return (
    <div className="docblock">
      {title && <p className="viz__title"><span>{title}</span><span>{docs.length} item{docs.length > 1 ? "s" : ""}</span></p>}
      <ul className="doclist">
        {docs.map((d, i) => {
          const tag = d.tag ?? (d.href.toLowerCase().includes(".pdf") ? "PDF" : "EXT");
          return (
            <li key={d.href + d.label}>
              <a href={d.href} target="_blank" rel="noopener noreferrer">
                <small>{String(i + 1).padStart(2, "0")}</small>
                <span>
                  {d.label}
                  {d.meta && <em className="doclist__meta">{d.meta}</em>}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <i>{tag} {tag === "PDF" ? "↓" : "↗"}</i>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** "Continue reading" band linking to the next logical page. */
export function NextPage({ href, label, kicker = "Next" }: { href: string; label: string; kicker?: string }) {
  return (
    <section className="nextpage surface-navy wrap" data-nav-theme="dark">
      <Link href={href} className="nextpage__link">
        <span className="label">{kicker}</span>
        <span className="display nextpage__title">{label}</span>
        <i aria-hidden="true">→</i>
      </Link>
    </section>
  );
}
