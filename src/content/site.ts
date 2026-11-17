/**
 * Single source of truth for site content.
 * Every fact here is taken from blu-energies.com (audited 2026-11-17) or the
 * BluEnergies Fact Sheet (November 2026). Nothing is invented — see docs/phase-1-audit.md.
 */

export type NavGroup = {
  label: string;
  href: string;
  children: { label: string; href: string }[];
};

export const NAV: NavGroup[] = [
  {
    label: "Corporate",
    href: "/corporate/about-us/",
    children: [
      { label: "About Us", href: "/corporate/about-us/" },
      { label: "Board & Management", href: "/corporate/board-management/" },
      { label: "Corporate Governance", href: "/corporate/corporate-governance/" },
    ],
  },
  {
    label: "Assets & Operations",
    href: "/assets-and-operations/overview/",
    children: [{ label: "Overview", href: "/assets-and-operations/overview/" }],
  },
  {
    label: "Investors",
    href: "/investors/outlook/",
    children: [
      { label: "Outlook", href: "/investors/outlook/" },
      { label: "Stock Information", href: "/investors/stock-information/" },
      { label: "Financials", href: "/investors/financials/" },
      { label: "Presentations", href: "/investors/presentations/" },
      { label: "AGM", href: "/investors/agm/" },
    ],
  },
  {
    label: "News & Media",
    href: "/news-and-media/news/",
    children: [
      { label: "News", href: "/news-and-media/news/" },
      { label: "In the Media", href: "/news-and-media/in-the-media/" },
    ],
  },
  {
    label: "Contact",
    href: "/contact/contact-details/",
    children: [
      { label: "Contact Details", href: "/contact/contact-details/" },
      { label: "Request for Information", href: "/contact/request-for-information/" },
    ],
  },
];

/** Documents are served from the original /_resources paths so existing links keep working. */
const R = "https://www.blu-energies.com/_resources";
export const DOCS = {
  corporatePresentation: { label: "Corporate Presentation", href: `${R}/presentations/corporate-presentation.pdf` },
  factSheet: { label: "Fact Sheet", href: `${R}/factsheets/Blu-Energies-Fact-Sheet.pdf` },
  researchReport: { label: "Research Report", href: `${R}/reports/research-report.pdf` },
  researchMar2026: {
    label: "Research Report — March 30, 2026",
    href: `${R}/reports/Granite-Point-BluEnergies-In-Pursui-of-a-Giant-Resource-in-Offshore-Liberia.pdf`,
  },
  researchJun2026: {
    label: "Research Report — June 1, 2026",
    href: `${R}/reports/Granite-Point-Tectonic-Shift-FOCUS-Report-20260601-C.pdf`,
  },
  antiBribery: { label: "Anti-Bribery & Corruption Policy", href: `${R}/governance/Anti-Bribery_and_Corruption_Policy_Blu_Energies.pdf` },
  codeOfConduct: { label: "Code of Conduct and Ethics", href: `${R}/governance/Code_of_Conduct_and_Ethics_BluEnergies.pdf` },
  estma2025: { label: "2025 ESTMA Report", href: `${R}/estma/BLU-ESTMA-Reporting-Jan-3-2026.pdf` },
  agmCircular: { label: "Notice of Meeting & Information Circular", href: `${R}/agm/BLU-NOM-Information-Circular.pdf` },
  agmProxy: { label: "Proxy", href: `${R}/agm/BLU-Proxy.pdf` },
  agmReturnCard: { label: "Financial Statement Return Card", href: `${R}/agm/BLU-Return-Card.pdf` },
} as const;

export const CORPORATE_VIDEO = "https://www.youtube.com/watch?v=-ZmxXdsUQsU";

export const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bluenergies-ltd" },
  { label: "YouTube", href: "https://www.youtube.com/@BluEnergies" },
  { label: "X", href: "https://x.com/bluenergiesltd" },
];

export const CONTACT = {
  email: "info@blu-energies.com",
  offices: [
    { city: "Vancouver", country: "Canada", lines: ["Suite 2200 – 885 West Georgia Street", "Vancouver, BC V6C 3E8"] },
    { city: "London", country: "United Kingdom", lines: ["Level 1, Devonshire House", "One Mayfair Place", "London W1J 8AJ"] },
  ],
};

export const TICKERS = [
  { exchange: "TSXV", symbol: "BLU" },
  { exchange: "OTCQX", symbol: "BLUGF" },
  { exchange: "FSE", symbol: "E66" },
];

/** Original About copy (homepage + /corporate/about-us/). */
export const ABOUT_LEAD =
  "BluEnergies Ltd. is a West Africa Deepwater Oil and Gas explorer. High success rates in basin floor fan plays have sparked an exploration boom along the West African Margin.";

export const CEO_QUOTE = {
  text:
    "We believe that as a junior public company partnered with TotalEnergies, in a deep-water basin floor fan play, Blu is unique.",
  name: "Craig Steinke",
  role: "CEO & Director",
  source: "Fact Sheet, November 2026",
};

/** Harper Basin — Assets & Operations / Overview + Fact Sheet. */
export const HARPER = {
  licence: "Reconnaissance License LPRA-003",
  licenceShort: "RL-003",
  regulator: "Liberia Petroleum Regulatory Authority",
  term: "Valid to June 30, 2027",
  blocks: ["LB-26", "LB-30", "LB-31"],
  areaKm2: "8,924",
  areaAcres: "2.2 million acres",
  basinShare: "~40% of the Harper basin",
  interest: { blu: 35, tte: 65 },
  seismicKm2: "6,167",
  shoreKm: "50",
  screening: "30 sedimentary basins in 42 countries over 15 months",
};

export const FANS = [
  { name: "Saturn", interval: "Turonian" },
  { name: "Neptune", interval: "Turonian" },
  { name: "Thea", interval: "Top Cenomanian" },
  { name: "Diana", interval: "Top Cenomanian" },
  { name: "Apollo", interval: "Upper Cenomanian" },
  { name: "Zeus", interval: "Upper Cenomanian" },
] as const;

export const ANALOGUES = [
  { name: "Calao", country: "Côte d’Ivoire", volume: "1–1.5 bn boe", note: "in place" },
  { name: "Jubilee", country: "Ghana", volume: "0.8 bn boe", note: "" },
  { name: "Venus", country: "Namibia", volume: "4+ bn boe", note: "" },
  { name: "Mopane", country: "Namibia", volume: "10 bn boe", note: "in place" },
];

export const LOUISIANA = {
  title: "Offshore Louisiana, USA",
  play: "“Crown Royal” play",
  facts: [
    "100% of 5,000 acres, directly offsetting the Texaco 1987 discovery.",
    "Texaco well tested 1,398 bbl/d and 5.5 mmcf/d from only 2 of 5 discovered horizons.",
  ],
  source: "Fact Sheet, November 2026",
};

/** Capital markets — Fact Sheet, November 2026 (cap table dated Nov 5, 2026; cash dated Sept 2, 2026). */
export const MARKET = {
  asOf: "Nov 5, 2026",
  price: 2.0,
  low52: 0.55,
  high52: 3.5,
  sharesOutstandingM: "82.58",
  marketCapM: "165.2",
  cashM: "20",
  cashAsOf: "Sept 2, 2026",
  placementM: "20.7",
  source: "BluEnergies Fact Sheet, November 2026",
};

export type NewsItem = { date: string; iso: string; title: string; slug: string; category: string };

const n = (date: string, title: string, slug: string, category: string): NewsItem => {
  const [m, d, y] = date.split(".");
  return { date, iso: `20${y}-${m}-${d}`, title, slug: `/news-and-media/news/${slug}/`, category };
};

export const NEWS: NewsItem[] = [
  n("09.14.26", "BluEnergies Announces Advisory Agreements", "bluenergies-announces-advisory-agreements", "Corporate"),
  n("07.23.26", "BluEnergies Announces Closing of Non-Brokered Private Placement of Units for Gross Proceeds of C$20.7 Million", "bluenergies-announces-closing-of-non-brokered-private-placement-of-units-for-gross-proceeds-of-c207-million", "Financing"),
  n("07.21.26", "BluEnergies Announces Upsize of Non-Brokered Private Placement of Units for Gross Proceeds of Up to C$20,700,000", "bluenergies-announces-upsize-of-non-brokered-private-placement-of-units-for-gross-proceeds-of-up-to-c20700000-", "Financing"),
  n("07.09.26", "BluEnergies Announces Non-Brokered Private Placement is Fully Subscribed", "bluenergies-announces-non-brokered-private-placement-is-fully-subscribed", "Financing"),
  n("07.09.26", "BluEnergies Announces Non-Brokered Private Placement of Units for Gross Proceeds of up to C$10 Million", "bluenergies-announces-non-brokered-private-placement-of-units--gross-proceeds-of-up-to-c10-million", "Financing"),
  n("07.06.26", "BluEnergies and TotalEnergies Progress Operations, Harper Basin, Offshore Liberia", "bluenergies-and-totalenergies-progress-operations-harper-basin-offshore-liberia", "Operations"),
  n("06.26.26", "BluEnergies Provides Details of Investor Relations Engagements", "bluenergies-provides-details-of-investor-relations-engagements", "Corporate"),
  n("04.27.26", "BluEnergies Announces DTC Eligibility, Engagement of Market Maker and Initiation of Research Coverage", "bluenergies-announces-dtc-eligibility-engagement-of-market-maker-and-initiation-of-research-coverage", "Markets"),
  n("04.16.26", "BluEnergies Announces Financial Advisory Agreements With Haywood Securities Inc. and Canaccord Genuity Corp.", "bluenergies-announces-financial-advisory-agreements-with-haywood-securities-inc-and-canaccord-genuity-corp", "Corporate"),
  n("03.30.26", "BluEnergies Announces Trading on OTCQX Best Market Under the Trading Symbol “BLUGF”", "bluenergies-announces-trading-on-otcqx-best-market-under-the-trading-symbol--blugf", "Markets"),
  n("03.19.26", "BluEnergies Secures Top Bid in Gulf of America Lease Sale, Engages Independent Houston Firm for Reserve Evaluation", "bluenergies-secures-top-bid-in-gulf-of-america-lease-sale--engages-independent-houston-firm-for-reserve-evaluation", "Operations"),
  n("03.16.26", "BluEnergies Announces Engagement of Curzio Research, Inc. and Appointment of Doug Allen, Senior Manager of Investor Relations", "bluenergies-announces-engagement-of-curzio-research-inc-and-appointment-of-doug-allen-senior-manager-of-investor-relations", "Corporate"),
  n("03.12.26", "BluEnergies Announces Completion of Warrant Acceleration", "bluenergies-announces-completion-of-warrant-acceleration", "Markets"),
  n("02.10.26", "BluEnergies Announces Warrant Expiry Acceleration", "bluenergies-announces-warrant-expiry-acceleration", "Markets"),
  n("01.16.26", "BluEnergies Announces Shares for Services and Option Grant", "bluenergies-announces-shares-for-services-and-option-grant", "Corporate"),
  n("01.15.26", "TotalEnergies Partners With BluEnergies in Its Harper Basin Fan Play, Offshore Liberia", "totalenergies-partners-with-bluenergies-in-its-harper-basin-fan-play-offshore-liberia", "Operations"),
  n("05.08.25", "BluEnergies Announces CEO Transition", "bluenergies-announces-ceo-transition", "Corporate"),
  n("04.14.25", "BluEnergies Ltd. Announces Commencement of Trading on the TSX Venture Exchange", "bluenergies-ltd-announces-commencement-of-trading-on-the-tsx-venture-exchange", "Markets"),
];

/**
 * Representative photography (Unsplash License) — placeholders until BluEnergies supplies
 * owned operational imagery. None of these depict BluEnergies assets.
 */
export const PHOTO_CREDITS = [
  { file: "hero-platform.jpg", by: "Aerial offshore drilling platform in Harper Basin deepwater", url: "" },
  { file: "seismic-vessel.jpg", by: "Offshore seismic survey exploration vessel", url: "" },
  { file: "rigs-dusk.jpg", by: "Ben Wicks", url: "https://unsplash.com/photos/Ej2FQy1W7z4" },
  { file: "platform-blue.jpg", by: "Arvind Vallabh", url: "https://unsplash.com/photos/kjk90_OSGZU" },
  { file: "fleet.jpg", by: "leonardo mendes", url: "https://unsplash.com/photos/9t2YCrRwNKI" },
  { file: "rig-sunlit.jpg", by: "J.f Manzanero", url: "https://unsplash.com/photos/3J2FB7BItdA" },
  { file: "platform-day.jpg", by: "Sheng Hu", url: "https://unsplash.com/photos/0wsMNnEFaTo" },
  { file: "rig-mono.jpg", by: "Julia Taubitz", url: "https://unsplash.com/photos/kSRgiubbwJw" },
  { file: "sea-aerial.jpg", by: "Ivana Cajina", url: "https://unsplash.com/photos/LlDQPnErFxo" },
  { file: "underwater.jpg", by: "Digital Reach", url: "https://unsplash.com/photos/ZwcCisqoAv4" },
];
