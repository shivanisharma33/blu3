import type { Metadata } from "next";
import { PageShell, PageHeader, Block, NextPage } from "@/components/page/PageParts";
import { Em, EditorialButton } from "@/components/Editorial";
import { CONTACT, SOCIAL } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Details",
  description: "Contact BluEnergies Ltd. — offices in Vancouver, Canada and London, United Kingdom.",
  alternates: { canonical: "/contact/contact-details/" },
};

const mapLink = (lines: string[]) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lines.join(", "))}`;

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader section="Contact" current="Contact Details" title={["Get in", <Em key="t">touch.</Em>]} />
      <Block tone="ivory" label="Offices" index="01" heading={<>Vancouver &amp; <Em>London.</Em></>} first>
        <div className="offices">
          {CONTACT.offices.map((o) => (
            <div className="office" key={o.city}>
              <p className="label">{o.country}</p>
              <h3>{o.city}</h3>
              <address>
                {o.lines.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}
                <span style={{ display: "block" }}>{o.country}</span>
              </address>
              <EditorialButton href={mapLink([...o.lines, o.country])} external>View on map</EditorialButton>
            </div>
          ))}
        </div>
      </Block>
      <Block tone="ivory" label="Email" index="02" heading={<>General &amp; investor <Em>enquiries.</Em></>}>
        <a className="email-xl" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "3rem" }}>
          <EditorialButton href="/contact/request-for-information/">Request for information</EditorialButton>
          {SOCIAL.map((s) => <EditorialButton key={s.label} href={s.href} external>{s.label}</EditorialButton>)}
        </div>
      </Block>
      <NextPage href="/contact/request-for-information/" label="Request for Information" />
    </PageShell>
  );
}
