"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/concepts/cinematic/", label: "A — Cinematic Deepwater" },
  { href: "/concepts/geological/", label: "B — Geological Intelligence" },
  { href: "/concepts/editorial/", label: "C — Luxury Editorial" },
  { href: "/", label: "Homepage →" },
];

export default function ConceptBar() {
  const path = usePathname();
  return (
    <nav className="concept-bar" aria-label="Concept previews">
      {ITEMS.map((i) => (
        <Link key={i.href} href={i.href} aria-current={path === i.href || path + "/" === i.href ? "page" : undefined}>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
