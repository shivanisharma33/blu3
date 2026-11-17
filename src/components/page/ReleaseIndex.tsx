"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { NewsItem } from "@/content/site";

const fmt = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** News releases with year + category filters (preserves the original 2026 / 2025 year tabs). */
export default function ReleaseIndex({ items }: { items: NewsItem[] }) {
  const years = useMemo(() => Array.from(new Set(items.map((i) => i.iso.slice(0, 4)))), [items]);
  const cats = useMemo(() => Array.from(new Set(items.map((i) => i.category))).sort(), [items]);
  const [year, setYear] = useState<string>("all");
  const [cat, setCat] = useState<string>("all");
  const shown = items.filter((i) => (year === "all" || i.iso.startsWith(year)) && (cat === "all" || i.category === cat));

  return (
    <div>
      <div className="filters" role="group" aria-label="Filter by year">
        {["all", ...years].map((y) => (
          <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)}>
            {y === "all" ? "All years" : y}
          </button>
        ))}
        <span aria-hidden="true" style={{ width: "1.5rem" }} />
        {["all", ...cats].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c === "all" ? "All topics" : c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{shown.length} releases shown</p>
      <ul className="rlist">
        {shown.map((n) => (
          <li key={n.slug}>
            <Link href={n.slug}>
              <time dateTime={n.iso}>{fmt(n.iso)}</time>
              <span className="cat">{n.category}</span>
              <span className="ttl">{n.title}</span>
              <i aria-hidden="true">→</i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
