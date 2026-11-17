/**
 * Deterministic topographic contour field (pure SVG, no runtime cost).
 * Concentric closed curves perturbed by low-frequency harmonics — bathymetric in feel,
 * explicitly decorative (it does not represent real survey data).
 */
type Props = { className?: string; seed?: number; rings?: number; color?: string; cx?: number; cy?: number; opacity?: number };

function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export function contourPaths({ seed = 7, rings = 22, cx = 720, cy = 450 }: Omit<Props, "className" | "color">) {
  const r = rand(seed);
  const harmonics = Array.from({ length: 4 }, (_, i) => ({ k: i + 2, a: 0.05 + r() * 0.09, p: r() * Math.PI * 2 }));
  const paths: string[] = [];
  for (let ring = 1; ring <= rings; ring++) {
    const base = 26 * ring + ring * ring * 0.9;
    const pts: [number, number][] = [];
    const N = 96;
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      let m = 1;
      for (const h of harmonics) m += h.a * Math.sin(h.k * t + h.p + ring * 0.07);
      pts.push([cx + Math.cos(t) * base * 1.55 * m, cy + Math.sin(t) * base * 0.82 * m]);
    }
    // Catmull-Rom → cubic Bézier for smooth closed curve
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < N; i++) {
      const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    paths.push(d + "Z");
  }
  return paths;
}

export default function Contours({ className, seed, rings, color = "currentColor", cx, cy, opacity = 0.35 }: Props) {
  const paths = contourPaths({ seed, rings, cx, cy });
  return (
    <svg className={className} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke={color} strokeWidth={0.8} opacity={opacity}>
        {paths.map((d, i) => (
          <path key={i} d={d} className="contour" pathLength={1} strokeOpacity={i % 5 === 4 ? 1 : 0.55} />
        ))}
      </g>
    </svg>
  );
}
