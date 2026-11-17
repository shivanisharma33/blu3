import Link from "next/link";
import type { ReactNode } from "react";

/** Small uppercase technical label: "01 / WHO WE ARE". */
export function SectionLabel({ index, children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className}`}>
      {index && <span className="label__index">{index}</span>}
      {index && <span className="label__slash" aria-hidden="true">/</span>}
      <span>{children}</span>
    </p>
  );
}

/** Text link with an underline that draws on hover; arrow nudges. */
export function EditorialButton({
  href,
  children,
  external,
  download,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span className="ebtn__text">{children}</span>
      <span className="ebtn__arrow" aria-hidden="true">
        {download ? "↓" : "→"}
      </span>
    </>
  );
  const cls = `ebtn ${className}`;
  if (external || download || href.startsWith("http")) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}

/** Italic serif accent inside sans headlines. */
export function Em({ children }: { children: ReactNode }) {
  return <em className="serif-em">{children}</em>;
}
