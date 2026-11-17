import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader, Block, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import { MEDIA } from "@/content/pages";

export const metadata: Metadata = {
  title: "In the Media",
  description: "BluEnergies Ltd. and the Harper Basin in the media — interviews, podcasts and coverage.",
  alternates: { canonical: "/news-and-media/in-the-media/" },
};

const fmt = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function InTheMediaPage() {
  return (
    <PageShell>
      <PageHeader section="News & Media" current="In the Media" title={["In the", <Em key="m">media.</Em>]} />
      <Block tone="ivory" label="Coverage" index="01" heading={<>Interviews &amp; <Em>coverage.</Em></>} first>
        <ul className="rlist">
          {MEDIA.map((m) => {
            const internal = m.href.startsWith("/");
            const inner = (
              <>
                <time dateTime={m.iso}>{fmt(m.iso)}</time>
                <span className="cat">{m.type}</span>
                <span className="ttl">
                  {m.title}
                  <small>{m.source}</small>
                </span>
                <i aria-hidden="true">{internal ? "→" : "↗"}</i>
              </>
            );
            return (
              <li key={m.href}>
                {internal ? (
                  <Link href={m.href}>{inner}</Link>
                ) : (
                  <a href={m.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </Block>
      <NextPage href="/contact/contact-details/" label="Contact" />
    </PageShell>
  );
}
