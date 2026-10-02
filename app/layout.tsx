import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

// next/font downloads these at build time and serves them from this site,
// so visitors' browsers never contact Google.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} | Phones, Fashion & Beauty Delivered in Ghana`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ZenPen",
    "Zen Pen Enterprise",
    "online shop Ghana",
    "phone accessories Ghana",
    "earbuds Ghana",
    "power banks Accra",
    "fashion online Ghana",
    "African print clothing",
    "beauty products Ghana",
    "skincare Ghana",
    "shea butter",
    "pay with MoMo",
    "delivery Accra",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
    locale: "en_GH",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  // Preview builds contain red-ink proposals, so keep them out of search results until confirmed.
  robots: site.isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c1326",
  colorScheme: "light dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
  email: "zenpengh@gmail.com",
  telephone: "+233243506373",
  areaServed: { "@type": "Country", name: "Ghana" },
  currenciesAccepted: "GHS",
  paymentAccepted: "Mobile Money, Credit Card, Cash",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={`${bricolage.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-coral-400 px-5 py-3 font-semibold text-ink-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
