"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { NAV, CONTACT, DOCS, SOCIAL } from "@/content/site";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";

type Lenisish = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: Lenisish }).__lenis;

export default function Navigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* Scroll state: background, hide-on-scroll-down, and light/dark detection */
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > window.innerHeight * 0.9);
      lastY = y;
      const probe = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => (el as HTMLElement).closest?.("[data-nav-theme]"));
      const section = probe ? (probe as HTMLElement).closest("[data-nav-theme]") : null;
      setOnLight(section?.getAttribute("data-nav-theme") === "light");
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [pathname]);

  /* Overlay timeline */
  useEffect(() => {
    const menu = menuRef.current!;
    const reduce = prefersReducedMotion();
    const t = gsap.timeline({ paused: true });
    t.set(menu, { visibility: "visible" })
      .fromTo(menu, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0 : 0.9, ease: EASE.inOut })
      .fromTo(
        menu.querySelectorAll(".menu__group"),
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: reduce ? 0 : 0.8, ease: EASE.out, stagger: 0.06 },
        reduce ? 0 : "-=0.35"
      )
      .fromTo(menu.querySelector(".menu__foot"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, "-=0.4");
    tl.current = t;
    return () => { t.kill(); };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      lenis()?.stop();
      document.documentElement.style.overflow = "hidden";
      t.timeScale(1).play();
      const first = menuRef.current!.querySelector("a") as HTMLAnchorElement | null;
      first?.focus({ preventScroll: true });
    } else {
      lenis()?.start();
      document.documentElement.style.overflow = "";
      t.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
      if (e.key === "Tab") {
        const focusables = [btnRef.current!, ...Array.from(menuRef.current!.querySelectorAll<HTMLElement>("a"))];
        const i = focusables.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
        else if (!e.shiftKey && i === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const light = onLight && !open;
  const cls = ["nav", scrolled && "is-scrolled", hidden && !open && "is-hidden", light && "on-light", open && "is-open"].filter(Boolean).join(" ");

  return (
    <>
      <header ref={navRef} className={cls}>
        <div className="nav__brand">
          <Link href="/" aria-label="BluEnergies Ltd. — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={light ? "/brand/logo.svg" : "/brand/logo-white.svg"} alt="BluEnergies Ltd." width={161} height={30} />
          </Link>
          <span className="nav__ticker" aria-label="Listed on the TSX Venture Exchange as BLU">
            TSXV <b>BLU</b>
          </span>
        </div>

        <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: "clamp(1.5rem, 3vw, 3rem)" }}>
          <ul className="nav__links">
            {NAV.map((g) => (
              <li key={g.label}>
                <Link className="nav__link" href={g.href} aria-current={pathname.startsWith(g.href.split("/").slice(0, 2).join("/") + "/") ? "page" : undefined}>
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            ref={btnRef}
            className="nav__menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span>{open ? "Close" : "Index"}</span>
            <span className="nav__burger" aria-hidden="true"><span /><span /></span>
          </button>
        </nav>
      </header>

      <div ref={menuRef} id="site-menu" className="menu" role="dialog" aria-modal="true" aria-label="Site index" aria-hidden={!open}>
        <div className="grid menu__grid">
          {NAV.map((g, i) => (
            <div className="menu__group" key={g.label}>
              <Link href={g.href} className="menu__group-title" onClick={close}>
                <small>0{i + 1}</small>
                {g.label}
              </Link>
              <ul className="menu__sub">
                {g.children.map((c) => (
                  <li key={c.href}><Link href={c.href} onClick={close}>{c.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="menu__foot">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <Link href="/search/" onClick={close}>Search the site</Link>
          <a href={DOCS.corporatePresentation.href} target="_blank" rel="noopener noreferrer">Corporate Presentation ↓</a>
          <span style={{ display: "flex", gap: "1.25rem" }}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
            <Link href="/legal/" onClick={close}>Legal</Link>
          </span>
        </div>
      </div>
    </>
  );
}
