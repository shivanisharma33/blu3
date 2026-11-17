# BluEnergies — Phases 2–7: Direction, Concepts, Wireframe, Motion, Homepage

Preview: `npm run build && npm start` → http://localhost:3000
Concepts: `/concepts/cinematic/` · `/concepts/geological/` · `/concepts/editorial/`

---

## Phase 2 — Visual direction

**Research note:** I did not browse Awwwards, Godly, Muzli or Pinterest in this session. The principles below come from general knowledge of editorial and award-winning web design, not from references inspected here.

**Principles applied**
1. **Type carries the identity.** Headlines are set in light-weight sans with an italic serif accent word. Photography supports the type rather than standing behind it.
2. **Alternating grounds.** Section backgrounds run ink → ivory → navy → ink → ivory → mist → ink, so the page reads as a sequence of spreads.
3. **One signature motion per section.** Everything else stays still.
4. **The company's own data is the most ownable visual.** That means the licence map, the seismic image and the analogue table.
5. **Technical labelling.** Section indices, figure numbers and sources work like a printed annual report and support credibility.

**Typography**
| Role | Font | Treatment |
|---|---|---|
| Display | Manrope 200–300 | −4.5% tracking, 0.92 leading |
| Accent | Instrument Serif Italic | One word per headline, in teal |
| Body | Inter | — |
| Labels | Inter 500 | 11px, +16% tracking, uppercase |

**Palette**
- As briefed.
- Added `--teal-deep #1F6B77`, because the brief's teal (#65B8C4) fails contrast as text on ivory.

**Image treatment**
- Sharp corners and cinematic crops.
- Deep-blue subjects only. Warm sunset shots were rejected as off-palette.
- Captioned "Representative" wherever a photo is stock.

**Grid**
- 12 columns, with fluid margins (`clamp(1.25rem, 4vw, 4rem)`) and gutters.
- Hairline separators throughout; no cards.

## Phase 3 — Three hero concepts (built as live routes)

| | A — Cinematic Deepwater | B — Geological Intelligence | C — Luxury Editorial |
|---|---|---|---|
| Ground | Full-bleed photograph, letterboxed | Mist with generative contour field | Deep ink with 12-column hairlines |
| Type | Manrope 200 uppercase, film-credit labels | Instrument Serif headline, data strip | Light sans with serif accent, staggered indents |
| Image | Rigs at dusk, slow Ken Burns drift | The company's 3D seismic as hero image | Aerial vessel, portrait, asymmetric |
| Motion | Letterbox bars close from black | Contours draw, data counts | Brand wipe, image unmask, line reveals |
| Risk | Depends entirely on photo quality, which we don't own | Can read as academic or cold to investors | Needs strict typographic discipline |

## Phase 4 — Selection: **C, Luxury Editorial**, borrowing from A and B

**Why C**
- It is the only concept that doesn't depend on photography we don't own.
- It has the strongest hierarchy for investors (the ticker and documents are visible above the fold).
- It looks the most original next to oil-and-gas peers.

**What it borrows**
- From A: the full-bleed cinematic moments in Section 03 and Section 07.
- From B: the contour field and the data-led map in Section 04, and the seismic figure in Section 03.

## Phase 5 — Homepage wireframe (desktop, 12 columns)

```
01 HERO (ink, 100svh)
  [meta labels c1–6]
  [kicker + 3-line headline c1–8, indented 0 / 8% / 33%] overlapping [portrait image c7–12]
  [intro + CTA c1–4]                    [4 documents rail c7–12]

02 WHO WE ARE (ivory)
  [label + 2-line headline c1–10]
  ─────────── divider draws ───────────
  [4:5 image c1–4]        [lead + body + link c6–10]
                          [CEO quote c6–11]

03 EXPLORATION JOURNAL (navy)
  [100vh photo plate → full bleed, title bottom-left, note c10–12]
  [sticky index c1–3]     [entries 01–05 c5–12: licence specs · analogue table ·
                           seismic figure · partnership · Louisiana]

04 GEOGRAPHIC INTELLIGENCE (ink + contour field)
  [headline c1–7]
  [info panel + fan legend + source note c1–4]   [SVG licence map c5–12]

05 INVESTORS (ivory, annual report)
  [headline c1–8]                                [listing note c10–12]
  [4 oversized figures, hairline columns ─────────────────────── c1–12]
  [interest split bar + 52-week range c1–7]      [document index + tickers c9–12]
  [sources footnote]

06 ENERGY JOURNAL (mist)
  [headline]                                     [all news · in the media]
  [feature 5:4 c1–7]                             [2 × 16:10 stories c9–12]
                                                 [3 more as text list]

07 CLOSING (ink, 115svh underwater photo)
  [2-line mega headline c1–10]  [copy + CTA c1–4]

08 FOOTER (ink): brand · newsletter + consent / 3 nav columns + 2 offices / legal row
```

**Tablet (≤1023px)**
- The index menu replaces the inline navigation.
- The journal index is hidden.
- The map moves above its panel.
- Figures drop to 2 columns and news to 1 + 2.

**Mobile (≤767px)**
- Fully vertical flow.
- Hero image on the right at 46svh with the headline overlapping it.
- Figures in 1 column, with map labels scaled up.

## Phase 6 — Motion storyboard

| # | Element | Trigger | From → To | Duration / ease | Scroll behaviour | Fallback |
|---|---|---|---|---|---|---|
| 1 | Opening frame | First load per session | Logo wipe (clip), then curtain lifts | 1.0s + 1.0s, `power3.inOut` | — | Skipped on repeat visits and with reduced motion; CSS failsafe at 4s |
| 1 | Nav | Timeline | y −100% → 0 | 1.1s, `expo.out` | Hides on scroll down, returns on scroll up; switches to light theme over ivory | — |
| 1 | Hero image | Timeline | `inset(100% 0 0 0)` → 0, scale 1.35 → 1.08 | 1.5s / 2.2s | Scrub: y +12%, scale 1.12 | Static |
| 1 | Headline | Timeline | Lines y 115% (2.5° tilt) → 0, stagger .11 | 1.15s, `expo.out` | Scrub: y −28% (parallax against image) | Static |
| 1 | Intro and CTA | Timeline | Clip reveal, then underline draws | 0.9s | Fades out by 40% of scroll | Static |
| 2 | Headline, divider, image | Scroll into view at 85% | Masked lines; hairline draws scaleX 0 → 1; image clip from bottom | 1.0s / 1.4s / 1.4s | Image parallax ±4% | Static |
| 3 | **Signature:** photo plate | Scrub | `inset(12% 16%)` → full bleed, scale 1.3 → 1.05 | Scroll-linked | — | Full bleed |
| 3 | Journal | Scroll | Sticky index tracks the active entry; spec cells appear progressively | 0.7s | — | — |
| 4 | **Signature:** map assembly | 75% in view | Land → basin → contours → blocks → survey outline → fans → labels | ~4s sequence | Contour field drifts −8% | Static |
| 4 | Map interaction | Hover, focus or click | Panel updates; other fans dim to 22%; selected fan's marker pulses | 0.4s | — | Keyboard via legend buttons |
| 5 | **Signature:** figures | 85% in view | Count up from 0; split bars and range fill draw | 1.8s / 1.3s / 1.5s | — | Final values shown (also in ARIA labels) |
| 6 | Stories | Hover | Image scale 1.05 and resaturate; title underline sweeps | 1.1s / 0.6s | — | — |
| 7 | **Signature:** closing | Scrub, then reveal | Image scale 1.3 → 1, drifting ±6%; lines masked; CTA underline draws | 1.1s | — | Static |
| — | Index menu | Click or Escape | Clip from top, groups stagger | 0.9s; reverses at 1.6× | Lenis paused; focus trapped | Instant |

Motion stack:
- **GSAP + ScrollTrigger**, via `useGSAP`, which handles cleanup automatically.
- **Lenis** smooth scrolling, driven by the GSAP ticker.
- **No WebGL.**

## Phase 7 — Implementation notes

**Data and sourcing**
- Every figure comes from `src/content/site.ts` and is traceable to the audit or to the Fact Sheet (November 2026).
- Stock photos are listed in `PHOTO_CREDITS` (Unsplash License) and must be replaced with owned photography before launch.
- The map is a schematic traced from the company's own map and is labelled as such. No coordinates are claimed.

**Preserved from the current site**
- The H1 phrase "A West Africa Deepwater Oil & Gas Explorer".
- All four hero documents.
- Ticker display and the newsletter with CASL consent wording.
- Social links, offices, Legal and cookie-preferences links.
- Trailing-slash URLs.

**Still to wire before launch**
- Newsletter provider: `/api/newsletter` is a stub and stores nothing.
- Cookie consent and GA4.
- reCAPTCHA on forms.
- Migrating the `/_resources/` PDFs. They currently link to the live domain.
