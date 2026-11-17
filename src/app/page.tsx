import EditorialHero from "@/components/sections/EditorialHero";
import Intro from "@/components/sections/Intro";
import Exploration from "@/components/sections/Exploration";
import GeographicVisualization from "@/components/sections/GeographicVisualization";
import InvestorSection from "@/components/sections/InvestorSection";
import NewsSection from "@/components/sections/NewsSection";
import ClosingCTA from "@/components/sections/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <EditorialHero />
        <Intro />
        <Exploration />
        <GeographicVisualization />
        <InvestorSection />
        <NewsSection />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
