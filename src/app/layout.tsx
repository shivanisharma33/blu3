import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import "./pages.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";

const manrope = Manrope({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600"], variable: "--font-manrope", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const DESCRIPTION =
  "BluEnergies Ltd. (TSXV: BLU, OTCQX: BLUGF) is a West Africa deepwater oil and gas explorer, partnered with TotalEnergies in the Harper Basin, offshore Liberia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blu-energies.com"),
  title: { default: "BluEnergies Ltd. — West Africa Deepwater Oil & Gas Explorer", template: "%s — BluEnergies Ltd." },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BluEnergies Ltd.",
    description: DESCRIPTION,
    images: [{ url: "/favicon/OG.jpg", width: 1200, height: 1200 }],
  },
  twitter: { card: "summary_large_image", description: DESCRIPTION },
  icons: {
    icon: [
      { url: "https://www.blu-energies.com/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "https://www.blu-energies.com/favicon/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "https://www.blu-energies.com/favicon/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#071923" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SmoothScroll />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
