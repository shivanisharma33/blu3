
# BluEnergies — Phase 1: Project Audit

Audit date: 2026-11-17 · Source: live site https://www.blu-energies.com/ (local project folder was empty — no existing codebase)

---

## 1. Technical observations

| Item | Finding |
|---|---|
| Local codebase | **None.** `C:\Users\user\Desktop\blu3` was empty. There is no framework to preserve; the redesign is a new build. |
| Current platform | Proprietary CMS from **Blender Media** (an agency for public companies). Server-rendered HTML, `/_templates/{n}/` themes, `/_resources/` file store, `?v=111705` cache-busting. |
| Front-end stack | jQuery 3.4.1, WOW.js + Animate.css (fade-ins), Featherlight (lightbox), Font Awesome 5 Pro kit, Adobe Typekit font **"Aller"** (single family) |
| Third-party scripts | Google reCAPTCHA v3 (forms), GA4 `G-9DCKCJR5BF`, TermsFeed cookie consent 4.2.0 (scripts gated by consent category) |
| SEO | `<title>` = "BluEnergies Ltd. - {Page}". **One identical meta description on every page.** Empty keywords. OG + Twitter tags present but `og:image` = `/favicon/OG.jpg` (relative URL, 1200×1200). `twitter:card` = summary. |
| sitemap.xml | 21 URLs, made with a free generator, last updated **April 2025**. Missing all 2026 news, AGM page and every In-the-Media item; lists a page that 404s. |
| robots.txt | **404**, so it is missing |
| Favicons | `/favicon/` set (apple-touch, 16, 32, safari-pinned-tab, webmanifest) |

**Recommendation for the build (to be confirmed in Phase 7):** there is no existing architecture to keep, so I propose **Next.js (App Router) + TypeScript + GSAP/ScrollTrigger + Lenis**, statically generated. News, people and documents would live as typed content files so the routes stay 1:1 with the current site.

---

## 2. Sitemap (complete)

Legend: ✅ live · ⚠️ issue · ❌ broken

```
/                                         ✅ Home
├── /corporate/
│   ├── about-us/                         ✅
│   ├── board-management/                 ✅  (7 people, bio modal via bio.js)
│   └── corporate-governance/             ✅  (3 PDFs)
├── /assets-and-operations/
│   ├── overview/                         ✅  (the main asset page)
│   └── resource-definitions/             ❌ 404 (still listed in sitemap.xml)
├── /investors/
│   ├── outlook/                          ✅
│   ├── stock-information/                ✅  (quote widget)
│   ├── financials/                       ✅  (links out to SEDAR+/SEDI)
│   ├── presentations/                    ✅  (3 PDFs)
│   └── agm/                              ⚠️ meeting date 23 Jun 2026 has passed
├── /news-and-media/
│   ├── news/                             ✅  (18 releases, 2026/2025 tabs via tabs.js)
│   │   └── {slug}                        ✅  ×18 article pages
│   └── in-the-media/                     ✅  (7 items, 6 external)
│       ├── oil-majors-snap-up-west-african-blocks-in-hunt-for-next-brazil   (internal)
│       └── deepwater-development-conference-mcedd-2025                     ⚠️ empty page, not listed
├── /contact/
│   ├── contact-details/                  ✅
│   └── request-for-information/          ✅  (form)
└── /legal/                               ✅  (Privacy Policy + Terms of Use; footer only)
```

**Navigation:** Corporate · Assets & Operations · Investors · News & Media · Contact, each with a dropdown. Legal appears in the footer only. A utility bar on every page holds "TSXV BLU", "Newsletter Signup" and a "Corporate Presentation" PDF link.

---

## 3. Page-by-page content inventory

### Home `/`
- **Hero H1:** "A West Africa Deepwater Oil & Gas Explorer"; ticker "TSXV BLU"
- **Hero buttons:** Corporate Presentation (PDF) · Corporate Video (YouTube `-ZmxXdsUQsU`) · Fact Sheet (PDF) · Research Report (PDF)
- **About:** "BluEnergies Ltd. is a West Africa Deepwater Oil and Gas explorer. High success rates in basin floor fan plays have sparked an exploration boom along the West African Margin." Links to About Us.
- **Stock box:** Open / Vol / High / Low (live quote). Quick links: Assets & Operations, Our Team, Investors.
- **Latest 3 news items**, newsletter signup, footer.
- **Background imagery** (CSS only): `banners/hero_home.jpg` (drillship), `bgs/feature_project_bg.jpg`, `bgs/feature_team_bg.jpg`, `bgs/investors_bg.jpg`

### About Us
Contains only the same two-sentence statement plus the Corporate Video link. **The page has very little copy.**

### Board & Management
| Name | Role | Photo |
|---|---|---|
| Craig Steinke | CEO and Director | ✅ |
| Carol Law | Director | ✅ |
| Cyrus Driver | Director and Audit Committee Chair | ✅ |
| Don Crossley | Director | ✅ |
| Vivien Chuang | CFO | ❌ none |
| Michelle Borthwick | Corporate Secretary | ❌ none |
| Sergio Laura | Vice President, Exploration | ✅ |

Full bios exist for all seven people. Photos sit at `/_resources/bios/{Name}.jpg`. The layout is two groups (Board of Directors, Management) and bios open in a modal.

### Corporate Governance
No narrative text. Documents:
- Anti-Bribery Corruption Policy — `/_resources/governance/Anti-Bribery_and_Corruption_Policy_Blu_Energies.pdf`
- Code of Conduct and Ethics — `/_resources/governance/Code_of_Conduct_and_Ethics_BluEnergies.pdf`
- **ESTMA:** "2025 ESTMA Report (Apr 8, 2025 to Sept 30, 2025)" — `/_resources/estma/BLU-ESTMA-Reporting-Jan-3-2026.pdf`

### Assets & Operations — Overview (the core verified facts)
- **Licence:** Reconnaissance License **No. LPRA-003** ("RL"), Harper basin, offshore Liberia. Issued by the Liberia Petroleum Regulatory Authority. **Valid to June 30, 2027.**
- **Interests:** BluEnergies **35%** / TotalEnergies **65%** (partnership dated January 2026)
- **Blocks:** **LB-26, LB-30, LB-31**, totalling **8,924 km² (2.2 million acres)**, which is **~40% of the Harper basin**
- **Play:** Cretaceous deepwater fan play. The page cites these analogues:
  - Calao discovery (Côte d'Ivoire): 1–1.5 billion boe in place
  - Jubilee Field (Ghana): 0.8 billion boe
  - Venus discovery (Namibia): 4+ billion boe
  - Mopane discovery (Namibia): 10 billion boe in place
  - It shares source rocks with the Stabroek Block (Guyana, 16+ billion bbl) on the conjugate margin
- **Selection basis:** evaluation of more than 30 African and South American basins
- **Data:** 6,167 km² of 3D seismic. Independently certified unrisked recoverable prospective resource in **six deepwater fans**, all in LB-30 and LB-31 (report dated March 28, 2025, per Outlook). Assessment of LB-26 is underway.
- **Context:** a 1 billion boe discovery would rank in offshore Africa's top 5% by volume over the past decade (Westwood, 2024)
- **Development factors:** **~50 km from shore**, low break-even, high NPV/boe, benign operating environment, competitive fiscal terms
- **Figures:**
  - `MAP_BluEnergies.png` (3300×2517). Caption: map of RL-003, its blocks and the lead inventory as of April 2025.
  - `Fan_Play_image_v2.jpg` (3D seismic, **"Data property of TGS"**)
  - `Deep_Fan_Play_image_v1.jpg`
- **Named fans (from the map legend):**
  - Turonian: **Saturn, Neptune**
  - Top Cenomanian: **Thea, Diana**
  - Upper Cenomanian: **Apollo, Zeus**
  - The map also shows bathymetric contours at **1,000 / 2,000 / 3,000 m**, the 3D survey outline and a 50 km scale bar.
- Footnote: "*boe - barrels of oil equivalent"

### Investors
- **Outlook:** the Harper basin is "one of the last undrilled West African margin basins". The company is listed as **TSXV: BLU, OTCQX: BLUGF**. The 2026 work programme with TotalEnergies is to build the portfolio and accelerate selection of the first test well.
- **Stock Information:** quote widget (Open, Volume, Last, Day Hi/Lo, Change, timestamp). Per the Terms of Use, quotes are delayed 20 minutes or more. The data provider is not identified.
- **Financials:** states IFRS and Board approval. Links to SEDAR+ (the link URL points to legacy sedar.com) and SEDI. IR contact is info@blu-energies.com. **No statements are hosted on the site.**
- **Presentations:**
  - Corporate Presentation
  - Research Report – March 30, 2026 (Granite Point)
  - Research Report – June 1, 2026 (Granite Point)
- **AGM:** meeting on June 23, 2026, 11:00am PST. Documents:
  - Notice of Meeting & Information Circular
  - Proxy
  - Financial Statement Return Card

### News & Media
- **News:** 18 releases (16 in 2026, 2 in 2025) with year tabs. Each entry shows only a date and title. There are no images or excerpts.
- **Article page:** H1 "News" plus the H2 title. The body is the full wire release (CNW dateline, About, contacts, forward-looking statements). There is no PDF, share button or back link.
- **In the Media:** 7 items:
  - SmithWeekly (YouTube)
  - Wall Street Unplugged (Curzio Research)
  - BNN Bloomberg (video)
  - "Oil majors snap up West African blocks…" (internal page)
  - The Vaultz News
  - African Energy Council
  - FrontPageAfrica

Full release list (date · title):
- 09.14.26 · Advisory Agreements
- 07.23.26 · Closing of Private Placement, C$20.7M
- 07.21.26 · Upsize of Private Placement to C$20.7M
- 07.09.26 · Private Placement Fully Subscribed
- 07.09.26 · Private Placement up to C$10M
- 07.06.26 · BluEnergies and TotalEnergies Progress Operations, Harper Basin
- 06.26.26 · Investor Relations Engagements
- 04.27.26 · DTC Eligibility, Market Maker, Research Coverage
- 04.16.26 · Financial Advisory Agreements with Haywood and Canaccord
- 03.30.26 · Trading on OTCQX as "BLUGF"
- 03.19.26 · Top Bid in Gulf of America Lease Sale
- 03.16.26 · Curzio Research engagement; Doug Allen appointed
- 03.12.26 · Completion of Warrant Acceleration
- 02.10.26 · Warrant Expiry Acceleration
- 01.16.26 · Shares for Services and Option Grant
- 01.15.26 · TotalEnergies Partners With BluEnergies in Harper Basin
- 05.08.25 · CEO Transition
- 04.14.25 · Commencement of Trading on TSXV

### Contact
- **Offices:**
  - **Vancouver:** Suite 2200 – 885 West Georgia Street, Vancouver, BC V6C 3E8
  - **London:** Level 1, Devonshire House, One Mayfair Place, London W1J 8AJ
- **Email:** info@blu-energies.com
- **Phone:** none published
- **Request for Information form:**
  - **I am a:** Potential Investor / Analyst / Shareholder / Journalist / Broker / Investment Advisor / Industry Professional
  - **Full Name*** (required)
  - **Email*** (required)
  - **Comments**
  - **"Sign me up for Email List"** checkbox
  - CASL consent text
  - **Submit** button (protected by reCAPTCHA)

### Legal
- **Privacy Policy:** collection, disclosure, retention, access, cookies, social media, contact
- **Terms of Use:** no solicitation, copyright, disclaimer, indemnity, 20-minute delayed stock quotes, forward-looking information advisory, BC jurisdiction
- **Defect:** the contact phone field renders as a literal **"[l]"** placeholder

### Global (on every page)
- **Newsletter signup:** "Stay Updated on BluEnergies' Development Journey". Email field, followed by a CASL consent modal (I consent → Continue).
- **Cookie consent banner** (TermsFeed) plus an "Update Cookie Preferences" link
- **Social links:**
  - LinkedIn `linkedin.com/company/bluenergies-ltd`
  - YouTube `@BluEnergies`
  - X `@bluenergiesltd`
- **Footer:** "©2026 BluEnergies Ltd." and the Blender Media credit

---

## 4. Downloadable documents (all must be preserved)

| Document | Path |
|---|---|
| Corporate Presentation | `/_resources/presentations/corporate-presentation.pdf` |
| Fact Sheet | `/_resources/factsheets/Blu-Energies-Fact-Sheet.pdf` |
| Research Report (home link) | `/_resources/reports/research-report.pdf` |
| Research Report – Mar 30, 2026 | `/_resources/reports/Granite-Point-BluEnergies-In-Pursui-of-a-Giant-Resource-in-Offshore-Liberia.pdf` |
| Research Report – Jun 1, 2026 | `/_resources/reports/Granite-Point-Tectonic-Shift-FOCUS-Report-20260601-C.pdf` |
| Anti-Bribery & Corruption Policy | `/_resources/governance/Anti-Bribery_and_Corruption_Policy_Blu_Energies.pdf` |
| Code of Conduct & Ethics | `/_resources/governance/Code_of_Conduct_and_Ethics_BluEnergies.pdf` |
| 2025 ESTMA Report | `/_resources/estma/BLU-ESTMA-Reporting-Jan-3-2026.pdf` |
| AGM — Notice & Information Circular | `/_resources/agm/BLU-NOM-Information-Circular.pdf` |
| AGM — Proxy | `/_resources/agm/BLU-Proxy.pdf` |
| AGM — Financial Statement Return Card | `/_resources/agm/BLU-Return-Card.pdf` |

External links to preserve: SEDAR+, SEDI, YouTube corporate video, and the 6 external In-the-Media links.

---

## 5. Functionality that must be preserved

1. Every route above, with the same URLs (or 301 redirects), including all 18 news slugs
2. Newsletter signup with CASL consent (and its back-end / mailing-list integration, **endpoint unknown**)
3. Request for Information form with reCAPTCHA and the email-list opt-in
4. Stock quote widget (**data provider unknown**) with the 20-minute delay disclaimer
5. News year filter (2026 / 2025)
6. Bio modal on Board & Management
7. Lightbox for the asset figures (map and seismic images)
8. Cookie consent, with GA4 and reCAPTCHA gated by consent category
9. All PDF downloads and external links
10. Corporate Video (YouTube)
11. Per-page titles and OG tags

---

## 6. Imagery audit (critical for art direction)

| Asset | Size | Assessment |
|---|---|---|
| `hero_home.jpg`, Transocean *Deepwater Atlas* drillship | 1024×681 | **Too low-res for a full-bleed hero.** It shows third-party branding (Transocean), and it is not BluEnergies' own operation. |
| `feature_project_bg.jpg`, aerial platform over surf | 1000×773 | Strong composition, but low-res and generic stock |
| `feature_team_bg.jpg` / `investors_bg.jpg` | ≤1000px | Low-res background textures |
| `MAP_BluEnergies.png` | 3300×2517 | High-res, accurate source for the geographic visualisation (block outlines, fans, bathymetry) |
| `Fan_Play_image_v2.jpg` (3D seismic) | 1499×826 | Striking, but **"Data property of TGS"**, so reuse terms need checking |
| Bio photos | small | Five of seven people have photos; the CFO and Corporate Secretary do not |

**Conclusion:** the site has **no high-resolution, ownable cinematic photography**. The brief's "cinematic offshore" direction needs one of the following:
- (a) client-supplied high-res photos
- (b) licensed stock (Adobe Stock / Unsplash-class)
- (c) a type- and data-led art direction that relies less on photos

This is the biggest open dependency for Phase 3.

---

## 7. Issues and inconsistencies found

1. **Six vs seven fans:** the Overview body text says *six* fans, the seismic caption says *seven* fan systems, and the map names six.
2. **Gulf of America asset is missing from Assets & Operations.** The 03.19.26 release and the press-release boilerplate mention an acquired shallow-water sand channel play offshore Louisiana, but the Assets page covers only Liberia.
3. `/assets-and-operations/resource-definitions/` returns 404 but is still in the sitemap.
4. The McEDD 2025 In-the-Media page is empty.
5. The AGM page is stale (the meeting date has passed).
6. The Legal phone number field shows a literal "[l]".
7. The SEDAR+ link text and URL disagree (sedarplus.ca vs sedar.com).
8. sitemap.xml is outdated and robots.txt is missing.
9. The same meta description is used on every page, and "publically" is misspelled.
10. The home meta description ("investment across the energy spectrum") does not match the positioning ("West Africa deepwater explorer").
11. About Us has almost no content.
12. Corporate Governance has no introduction text.

## 8. Information not available (flagged; will not be invented)

- Prospective resource volumes (the certified figures exist in a March 28, 2025 report but are **not stated on the site**; they may be in the Corporate Presentation or Fact Sheet PDFs)
- Share structure, market cap, analyst list, transfer agent, auditor
- Water depths per block (only contour lines on the map), and coordinates
- Phone numbers
- Company history or founding narrative beyond "formed in 2021" and "public April 2025"
- Gulf of America asset details
- Quote widget provider, newsletter back-end, form endpoint
