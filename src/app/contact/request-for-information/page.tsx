import type { Metadata } from "next";
import { PageShell, PageHeader, Block } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import RequestForm from "@/components/page/RequestForm";

export const metadata: Metadata = {
  title: "Request for Information",
  description: "Request information from BluEnergies Ltd. — investors, analysts, shareholders, journalists and industry professionals.",
  alternates: { canonical: "/contact/request-for-information/" },
};

export default function RfiPage() {
  return (
    <PageShell>
      <PageHeader section="Contact" current="Request for Information" title={["Request for", <Em key="i">information.</Em>]} />
      <Block tone="ivory" label="Enquiry" index="01" heading={<>Tell us how we can <Em>help.</Em></>} first>
        <RequestForm />
      </Block>
    </PageShell>
  );
}
