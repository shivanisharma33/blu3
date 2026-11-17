import Link from "next/link";
import Image from "next/image";
import { RevealLines, Rise } from "@/components/Reveal";
import { SectionLabel, EditorialButton, Em } from "@/components/Editorial";
import { NEWS, type NewsItem } from "@/content/site";

const pick = (iso: string) => NEWS.find((n) => n.iso === iso)!;
const FEATURE = { item: pick("2026-07-06"), img: "/images/rig-sunlit.jpg", alt: "Jack-up rig serviced by a supply vessel at sunrise" };
const SIDE = [
  { item: NEWS[0], img: "/images/rig-mono.jpg", alt: "Offshore platform in rough water, black and white" },
  { item: pick("2026-07-23"), img: "/images/sea-aerial.jpg", alt: "Aerial view of dark open sea" },
];
const usedSlugs = new Set([FEATURE.item.slug, ...SIDE.map((s) => s.item.slug)]);
const MORE = NEWS.filter((n) => !usedSlugs.has(n.slug)).slice(0, 3);

const fmtDate = (n: NewsItem) =>
  new Date(n.iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function Story({ item, img, alt, variant, sizes }: { item: NewsItem; img: string; alt: string; variant: "feature" | "side"; sizes: string }) {
  return (
    <article className={`story--${variant}`}>
      <Link href={item.slug} className="story" aria-label={item.title}>
        <div className="story__media">
          <Image src={img} alt={alt} fill sizes={sizes} style={{ objectFit: "cover" }} />
        </div>
        <p className="story__meta">
          <span>{item.category}</span>
          <time dateTime={item.iso}>{fmtDate(item)}</time>
        </p>
        <h3 className="story__title"><span>{item.title}</span></h3>
        <span className="story__cta" aria-hidden="true">Read release <i>→</i></span>
      </Link>
    </article>
  );
}

/** SECTION 06 — The Energy Journal: asymmetric editorial news layout. */
export default function NewsSection() {
  return (
    <section className="news surface-mist wrap" data-nav-theme="light" aria-labelledby="news-title">
      <div className="grid">
        <div className="news__head">
          <div>
            <SectionLabel index="05">News &amp; Media</SectionLabel>
            <RevealLines id="news-title" className="display h-xl" lines={[<>The Energy <Em>Journal.</Em></>]} />
          </div>
          <div className="news__links">
            <EditorialButton href="/news-and-media/news/">All news releases</EditorialButton>
            <EditorialButton href="/news-and-media/in-the-media/">In the media</EditorialButton>
          </div>
        </div>

        <Story {...FEATURE} variant="feature" sizes="(max-width: 1023px) 100vw, 58vw" />
        {SIDE.map((s) => (
          <Story key={s.item.slug} {...s} variant="side" sizes="(max-width: 575px) 100vw, (max-width: 1023px) 50vw, 33vw" />
        ))}

        <Rise as="ul" className="news__list">
          {MORE.map((n) => (
            <li key={n.slug} data-rise>
              <Link href={n.slug}>
                <time dateTime={n.iso}>{n.date}</time>
                <span>{n.title}</span>
              </Link>
            </li>
          ))}
        </Rise>
      </div>
    </section>
  );
}
