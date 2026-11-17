"use client";

import { useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, useGSAP, EASE, DUR, prefersReducedMotion } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* RevealLines — line-by-line masked heading reveal (ScrollTrigger)    */
/* Lines are authored explicitly so breaks are art-directed, not       */
/* left to the browser.                                                */
/* ------------------------------------------------------------------ */
type RevealLinesProps = {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** "scroll" = reveal when scrolled into view; "manual" = parent timeline controls `.rl-inner` */
  trigger?: "scroll" | "manual";
  id?: string;
  style?: CSSProperties;
};

export function RevealLines({
  as: Tag = "h2",
  lines,
  className,
  delay = 0,
  stagger = 0.09,
  trigger = "scroll",
  id,
  style,
}: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (trigger !== "scroll" || prefersReducedMotion()) return;
      const inner = ref.current!.querySelectorAll(".rl-inner");
      gsap.fromTo(
        inner,
        { yPercent: 115, rotate: 2.5 },
        {
          yPercent: 0,
          rotate: 0,
          duration: DUR.text,
          ease: EASE.out,
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: ref }
  );
  return (
    <Tag ref={ref} className={className} id={id} style={style}>
      {lines.map((l, i) => (
        <span className="rl-line" key={i}>
          <span className="rl-inner">{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* ImageReveal — clip-path reveal with counter-scale and optional      */
/* scrubbed parallax on the inner image.                               */
/* ------------------------------------------------------------------ */
type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  from?: "bottom" | "top" | "left" | "right";
  parallax?: number;
  sizes?: string;
  priority?: boolean;
  position?: string;
  children?: ReactNode;
  quality?: number;
  unoptimized?: boolean;
};

const CLIP: Record<NonNullable<ImageRevealProps["from"]>, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

export function ImageReveal({
  src,
  alt,
  className = "",
  from = "bottom",
  parallax = 8,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  position = "50% 50%",
  children,
  quality,
  unoptimized,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const img = ref.current!.querySelector("img");
      gsap.fromTo(
        ref.current,
        { clipPath: CLIP[from] },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: DUR.image,
          ease: EASE.inOut,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(img, { scale: 1.14 }, {
        scale: 1,
        duration: DUR.image + 0.4,
        ease: EASE.out,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
      if (parallax) {
        gsap.fromTo(
          img,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={`img-reveal ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality ?? 100}
        unoptimized={unoptimized}
        style={{ objectFit: "cover", objectPosition: position }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AnimatedDivider — a hairline that draws across on enter.            */
/* ------------------------------------------------------------------ */
export function AnimatedDivider({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: EASE.inOut,
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        }
      );
    },
    { scope: ref }
  );
  return <div ref={ref} className={`divider divider--${tone} ${className}`} role="presentation" />;
}

/* ------------------------------------------------------------------ */
/* Rise — restrained reveal for small supporting text blocks only.     */
/* ------------------------------------------------------------------ */
export function Rise({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const kids = ref.current!.querySelectorAll("[data-rise]");
      const targets = kids.length ? kids : [ref.current];
      gsap.fromTo(
        targets,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: EASE.soft,
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    },
    { scope: ref }
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
