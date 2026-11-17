"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export type SearchDoc = { title: string; href: string; kind: string; text: string };

/** Client-side search over pages and releases (preserves the original /search/?s= behaviour). */
export default function SiteSearch({ index }: { index: SearchDoc[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("s") ?? "");
  useEffect(() => { setQ(params.get("s") ?? ""); }, [params]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return [];
    return index
      .map((d) => {
        const hay = (d.title + " " + d.text).toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return null;
        const score = terms.reduce((s, t) => s + (d.title.toLowerCase().includes(t) ? 5 : 0) + 1, 0);
        const pos = hay.indexOf(terms[0]) - d.title.length - 1;
        const snippet = pos >= 0 ? "…" + d.text.slice(Math.max(0, pos - 80), pos + 160).trim() + "…" : d.text.slice(0, 200) + "…";
        return { ...d, score, snippet };
      })
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score) as (SearchDoc & { snippet: string })[];
  }, [q, index]);

  return (
    <div>
      <form
        role="search"
        className="search-box"
        onSubmit={(e) => { e.preventDefault(); router.replace(`/search/?s=${encodeURIComponent(q)}`, { scroll: false }); }}
      >
        <label htmlFor="site-q" className="sr-only">Search BluEnergies</label>
        <input id="site-q" name="s" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the site…" autoFocus />
        <button type="submit" className="ebtn"><span className="ebtn__text">Search</span></button>
      </form>
      <p className="search-count" role="status" aria-live="polite">
        {q.trim().length > 1 ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q.trim()}”` : "Type at least two characters."}
      </p>
      <ul className="rlist">
        {results.map((r) => (
          <li key={r.href}>
            <Link href={r.href}>
              <span className="cat">{r.kind}</span>
              <span className="ttl" style={{ gridColumn: "span 2" }}>
                {r.title}
                <small>{r.snippet}</small>
              </span>
              <i aria-hidden="true">→</i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
