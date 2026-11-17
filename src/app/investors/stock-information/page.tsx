import type { Metadata } from "next";
import { PageShell, PageHeader, Block, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import { MARKET } from "@/content/site";

export const metadata: Metadata = {
  title: "Stock Information",
  description: "BluEnergies Ltd. trades on the TSX Venture Exchange (BLU), the OTCQX Best Market (BLUGF) and the Frankfurt exchange (E66).",
  alternates: { canonical: "/investors/stock-information/" },
};

/*
 * The live site renders a delayed quote from an unidentified data provider (see docs/phase-1-audit.md §5).
 * Until that feed is reconnected, this page links to the exchanges' own quote pages and shows the
 * dated figures published in the November 2026 Fact Sheet.
 */
const QUOTES = [
  { symbol: "BLU", venue: "TSX Venture Exchange", href: "https://money.tmx.com/en/quote/BLU" },
  { symbol: "BLUGF", venue: "OTCQX Best Market", href: "https://www.otcmarkets.com/stock/BLUGF/quote" },
];

export default function StockPage() {
  return (
    <PageShell>
      <PageHeader section="Investors" current="Stock Information" title={["Stock", <Em key="s">information.</Em>]} />
      <Block tone="ivory" label="Listings" index="01" heading={<>Live <Em>quotes.</Em></>} first>
        <div className="quote-links">
          {QUOTES.map((q) => (
            <a key={q.symbol} className="quote-card" href={q.href} target="_blank" rel="noopener noreferrer">
              <span><em style={{ fontStyle: "normal" }}>{q.venue}</em><i style={{ fontStyle: "normal" }}>↗</i></span>
              <b>{q.symbol}</b>
              <span>View the live quote<span className="sr-only"> (opens in a new tab)</span></span>
            </a>
          ))}
        </div>
        <p className="muted" style={{ marginTop: "1.25rem", fontSize: ".875rem" }}>Also listed in Frankfurt under the symbol E66.</p>
      </Block>
      <Block tone="ivory" label="Capitalisation" index="02" heading={<>Market <Em>snapshot.</Em></>}>
        <dl className="facts" style={{ marginTop: 0 }}>
          <div><dt>Shares outstanding</dt><dd>{MARKET.sharesOutstandingM}M<small>As at {MARKET.asOf}</small></dd></div>
          <div><dt>Market capitalisation</dt><dd>C${MARKET.marketCapM}M<small>At C${MARKET.price.toFixed(2)}, {MARKET.asOf}</small></dd></div>
          <div><dt>Cash</dt><dd>C${MARKET.cashM}M<small>As at {MARKET.cashAsOf}</small></dd></div>
        </dl>
        <dl className="facts">
          <div><dt>52-week low</dt><dd>C${MARKET.low52.toFixed(2)}</dd></div>
          <div><dt>52-week high</dt><dd>C${MARKET.high52.toFixed(2)}</dd></div>
          <div><dt>Source</dt><dd style={{ fontSize: "1.25rem", letterSpacing: "-0.01em" }}>Fact Sheet<small>November 2026</small></dd></div>
        </dl>
        <p className="muted" style={{ marginTop: "2rem", fontSize: ".8125rem", maxWidth: "70ch" }}>
          Stock quotes are delayed at least 20 minutes and are not guaranteed by the TSX Venture Exchange or BluEnergies.
          Figures shown are historical and for information only.
        </p>
      </Block>
      <NextPage href="/investors/financials/" label="Financials" />
    </PageShell>
  );
}
