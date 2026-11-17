import type { Metadata } from "next";
import { PageShell, PageHeader, Block, DocList, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import { Rise } from "@/components/Reveal";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Financials",
  description: "BluEnergies Ltd. financial statements and regulatory filings (SEDAR+) and insider filings (SEDI).",
  alternates: { canonical: "/investors/financials/" },
};

export default function FinancialsPage() {
  return (
    <PageShell>
      <PageHeader
        section="Investors"
        current="Financials"
        title={["Reports &", <Em key="f">filings.</Em>]}
        standfirst="All company reports and financial statements of BluEnergies Ltd. have been approved by the Board of Directors of the Company."
      />
      <Block tone="ivory" label="Financial reporting" index="01" heading={<>Prepared under <Em>IFRS.</Em></>} first>
        <Rise className="prose">
          <p data-rise>
            The consolidated financial statements have been prepared by management in accordance with International Financial
            Reporting Standards (IFRS).
          </p>
          <p data-rise>
            BluEnergies’ regulatory filings can be found on SEDAR+ or by contacting Investor Relations. Insider filings can be
            found on the System for Electronic Disclosure by Insiders (“SEDI”) by searching the Company or specific insiders.
          </p>
        </Rise>
        <div style={{ marginTop: "2.5rem" }}>
          <DocList
            docs={[
              { label: "BluEnergies Company Reports", meta: "sedarplus.ca", href: "https://www.sedarplus.ca/", tag: "EXT" },
              { label: "System for Electronic Disclosure by Insiders (“SEDI”)", meta: "sedi.ca", href: "https://www.sedi.ca/sedi/", tag: "EXT" },
            ]}
          />
        </div>
      </Block>
      <Block tone="ivory" label="Investor Relations" index="02" heading={<>Investor Relations <Em>contact.</Em></>}>
        <a className="email-xl" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </Block>
      <NextPage href="/investors/presentations/" label="Presentations" />
    </PageShell>
  );
}
