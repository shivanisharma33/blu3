# Phase 8 — Inner pages

## How content was preserved

- Raw HTML of every live page and all 18 news releases was downloaded on 2026-11-17.
- `#content` was extracted and sanitised: only safe tags are kept, and the only attributes kept are `href`, `src` and `alt`.
- The output is in `src/content/generated/*.json`.
- **The copy is verbatim.** Corrections are applied only in `src/content/pages.ts`, and each one is commented there.

## Routes (URLs unchanged, with trailing slashes)

| Route | Template | Content source |
|---|---|---|
| `/corporate/about-us/` | Header + photo band, approach, video, milestones | Original lead, plus facts from releases and the Fact Sheet (each milestone cites its source) |
| `/corporate/board-management/` | Roster rows with a slide-in biography drawer (`<dialog>`) | All 7 bios, verbatim; 5 photos (localised), monograms for the 2 people without photos |
| `/corporate/corporate-governance/` | Document index | 2 policies + 2025 ESTMA report |
| `/assets-and-operations/overview/` | Interactive map + full original text and figures + Louisiana | Verbatim page; Louisiana from the Fact Sheet |
| `/investors/outlook/` | Prose + key facts | Verbatim |
| `/investors/stock-information/` | Exchange quote links + dated market snapshot | Fact Sheet, November 2026 |
| `/investors/financials/` | Prose + SEDAR+/SEDI + IR email | Verbatim |
| `/investors/presentations/` | Document index | Same 3 documents, plus the Fact Sheet |
| `/investors/agm/` | Meeting details + materials | Verbatim |
| `/news-and-media/news/` | Archive with year filter (preserved) and topic filter (new) | 18 releases |
| `/news-and-media/news/[slug]/` ×18 | Article with sticky details panel and previous/next links | Verbatim release bodies |
| `/news-and-media/in-the-media/` | Coverage list | 7 items |
| `/news-and-media/in-the-media/oil-majors…/` | Article | Verbatim (Reuters reprint, as on the live site) |
| `/contact/contact-details/` | Offices + email | Verbatim |
| `/contact/request-for-information/` | Form: same fields and options, plus CASL text | Verbatim |
| `/legal/` | Contents panel + prose | Verbatim Privacy Policy and Terms of Use |
| `/search/?s=` | Client-side search across pages, people and releases | Replaces the original `/search/` |
| `sitemap.xml`, `robots.txt` | Generated | Fixes the stale sitemap and the missing robots.txt |

**Redirects**
- Section roots (for example `/investors/`) go to the first page in that section (temporary redirect).
- `/assets-and-operations/resource-definitions/` (404 on the live site) → Overview (permanent).
- The empty McEDD 2025 page → In the Media (permanent).

## Corrections applied (all flagged; no business information changed)

1. **Legal:** removed the unfilled phone placeholder "[l]".
2. **Financials:** the SEDAR+ link now points to `sedarplus.ca`. The old `sedar.com` deep link redirects to the SEDAR+ homepage anyway.
3. **AGM:** the stale future tense ("will be held") is presented as neutral meeting details (date and time).
4. **Releases:** paragraphs containing only bold text are rendered as `<h3>` subheads (formatting only).

## Verification

- `next build` generates all 45 routes.
- A crawl of every internal link found 0 broken pages. All 51 linked documents on blu-energies.com return 200.
- No horizontal overflow at 390 or 1440px on the pages checked.

## Before launch (unchanged from Phase 7, plus new items)

- Connect `/api/newsletter` and `/api/request-info`. Both are validating stubs that store and send nothing, and they say so to the user.
- Reinstate reCAPTCHA v3, cookie consent (TermsFeed) and GA4.
- Migrate the `/_resources/` PDFs and images. They currently link to the live domain.
- **Stock page:** reconnect a live quote feed. The original provider is unknown, so the page currently links to the TMX and OTC Markets quote pages.
- Replace the representative stock photography with owned imagery.
- **Bio photos:** the source files are 352×230 and too small for larger display. Request high-resolution portraits, plus photos for the CFO and Corporate Secretary.
