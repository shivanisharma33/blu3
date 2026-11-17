"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Person } from "@/content/pages";

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);

/** Editorial roster; each row opens a side drawer (<dialog>) with the full biography. */
export default function PeopleList({ people, group, offset = 0 }: { people: Person[]; group: string; offset?: number }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Person | null>(null);
  const lastBtn = useRef<HTMLButtonElement | null>(null);

  const open = (p: Person, btn: HTMLButtonElement) => {
    lastBtn.current = btn;
    setActive(p);
    requestAnimationFrame(() => dlg.current?.showModal());
    (window as unknown as { __lenis?: { stop(): void } }).__lenis?.stop();
  };
  const onClose = () => {
    (window as unknown as { __lenis?: { start(): void } }).__lenis?.start();
    lastBtn.current?.focus();
  };

  return (
    <>
      <ul className="people">
        {people.map((p, i) => (
          <li className="person" key={p.name}>
            <button className="person__btn" type="button" aria-haspopup="dialog" onClick={(e) => open(p, e.currentTarget)}>
              <span className="person__idx">{String(i + 1 + offset).padStart(2, "0")}</span>
              <span className="person__name">{p.name}</span>
              <span className="person__role">
                {p.title}
                <b>Read biography +</b>
              </span>
              <span className="person__photo" aria-hidden="true">
                {p.image ? (
                  <Image src={p.image} alt="" fill sizes="120px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
                ) : (
                  <span className="person__mono">{initials(p.name)}</span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        className="bio-dialog"
        aria-labelledby="bio-name"
        onClose={onClose}
        onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}
      >
        {active && (
          <div className="bio-dialog__inner">
            <button className="bio-dialog__close" type="button" onClick={() => dlg.current?.close()} autoFocus>
              Close <span aria-hidden="true">✕</span>
            </button>
            {active.image && (
              <div className="bio-dialog__photo">
                <Image src={active.image} alt={`Portrait of ${active.name}`} fill sizes="352px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
              </div>
            )}
            <p className="label">{group}</p>
            <h2 id="bio-name">{active.name}</h2>
            <p style={{ fontSize: "1.0625rem" }}>{active.title}</p>
            <div className="prose" dangerouslySetInnerHTML={{ __html: active.html }} />
          </div>
        )}
      </dialog>
    </>
  );
}
