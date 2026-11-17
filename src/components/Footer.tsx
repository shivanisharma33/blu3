import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Em } from "@/components/Editorial";
import { NAV, CONTACT, SOCIAL, TICKERS } from "@/content/site";

/** SECTION 08 — Minimal editorial footer. */
export default function Footer() {
  const [corporate, assets, investors, news, contact] = NAV;
  const cols = [
    { title: "Company", links: [...corporate.children, ...contact.children] },
    { title: "Operations", links: [...assets.children, ...news.children] },
    { title: "Investors", links: investors.children },
  ];
  return (
    <footer className="footer surface-ink wrap" data-nav-theme="dark">
      <div className="grid footer__top">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-white.svg" alt="BluEnergies Ltd." width={180} height={34} />
          <p>A West Africa deepwater oil and gas explorer. {TICKERS.map((t) => `${t.exchange}: ${t.symbol}`).join(" · ")}</p>
        </div>
        <div className="footer__news">
          <h2>Stay updated on BluEnergies’ <Em>development journey.</Em></h2>
          <NewsletterSignup />
        </div>
      </div>

      <div className="grid footer__cols">
        {cols.map((c) => (
          <nav className="footer__col" key={c.title} aria-label={c.title}>
            <h3>{c.title}</h3>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
        {CONTACT.offices.map((o) => (
          <div className="footer__col footer__col--wide" key={o.city}>
            <h3>{o.city}</h3>
            <address>
              {o.lines.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}
              <span style={{ display: "block" }}>{o.country}</span>
            </address>
          </div>
        ))}
      </div>

      <div className="footer__bottom">
        <span>©{new Date().getFullYear()} BluEnergies Ltd.</span>
        <nav aria-label="Legal and social">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
          <Link href="/legal/">Legal</Link>
          <a href="#" id="open_preferences_center">Update cookie preferences</a>
        </nav>
      </div>
    </footer>
  );
}
