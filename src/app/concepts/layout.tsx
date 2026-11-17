import type { Metadata } from "next";
import ConceptBar from "./ConceptBar";

export const metadata: Metadata = { title: "Hero concepts", robots: { index: false, follow: false } };

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ConceptBar />
    </>
  );
}
