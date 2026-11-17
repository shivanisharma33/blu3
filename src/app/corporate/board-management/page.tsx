import type { Metadata } from "next";
import { PageShell, PageHeader, Block, NextPage } from "@/components/page/PageParts";
import { Em } from "@/components/Editorial";
import PeopleList from "@/components/page/PeopleList";
import { PEOPLE } from "@/content/pages";

export const metadata: Metadata = {
  title: "Board & Management",
  description: "The Board of Directors and Management team of BluEnergies Ltd. (TSXV: BLU).",
  alternates: { canonical: "/corporate/board-management/" },
};

const HEADINGS: Record<string, React.ReactNode> = {
  "Board of Directors": <>Board of <Em>Directors.</Em></>,
  Management: <>Management <Em>team.</Em></>,
};

export default function BoardPage() {
  let offset = 0;
  return (
    <PageShell>
      <PageHeader
        section="Corporate"
        current="Board & Management"
        title={["The people", <>behind the <Em>basin.</Em></>]}
        standfirst="Decades of international exploration, finance and governance experience — across Africa, the Americas, Europe and Asia."
      />
      {PEOPLE.map((g, i) => {
        const el = (
          <Block key={g.group} tone="ivory" label={g.group} index={String(i + 1).padStart(2, "0")} heading={HEADINGS[g.group] ?? g.group} first={i === 0}>
            <PeopleList people={g.people} group={g.group} offset={offset} />
          </Block>
        );
        offset += g.people.length;
        return el;
      })}
      <NextPage href="/corporate/corporate-governance/" label="Corporate Governance" />
    </PageShell>
  );
}
