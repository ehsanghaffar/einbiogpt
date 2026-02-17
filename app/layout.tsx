import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const siteUrl = "https://bio.eindev.ir";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f1f5" },
    { media: "(prefers-color-scheme: dark)", color: "#121520" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ein Bio — ساخت بایو هوشمند با هوش مصنوعی",
    template: "%s | Ein Bio",
  },
  description:
    "با چند کلیک ساده، بایویی حرفه‌ای و شخصی‌سازی شده برای اینستاگرام، توییتر، لینکدین و تلگرام بسازید. رایگان و سریع با هوش مصنوعی.",
  keywords: [
    "بایو اینستاگرام",
    "بایو ساز",
    "ساخت بایو با هوش مصنوعی",
    "بایو حرفه‌ای",
    "bio generator",
    "AI bio",
    "بایو توییتر",
    "بایو لینکدین",
    "بایو تلگرام",
    "بایو فارسی",
    "Ein Bio",
  ],
  authors: [{ name: "Ehsan Ghaffar", url: "https://github.com/ehsanghaffar" }],
  creator: "Ehsan Ghaffar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "Ein Bio",
    title: "Ein Bio — ساخت بایو هوشمند با هوش مصنوعی",
    description:
      "با چند کلیک ساده، بایویی حرفه‌ای و شخصی‌سازی شده برای شبکه‌های اجتماعی بسازید.",
    images: [
      {
        url: "/einbio.png",
        width: 300,
        height: 300,
        alt: "Ein Bio - ساخت بایو با هوش مصنوعی",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ein Bio — ساخت بایو هوشمند با هوش مصنوعی",
    description:
      "بایویی حرفه‌ای و شخصی‌سازی شده برای شبکه‌های اجتماعی بسازید.",
    images: ["/einbio.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ein Bio",
  url: siteUrl,
  description:
    "ابزار ساخت بایو حرفه‌ای با هوش مصنوعی برای شبکه‌های اجتماعی",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IRR",
  },
  author: {
    "@type": "Person",
    name: "Ehsan Ghaffar",
    url: "https://github.com/ehsanghaffar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
