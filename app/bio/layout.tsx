import type { Metadata } from "next";

const siteUrl = "https://bio.eindev.ir";
const bioUrl = `${siteUrl}/bio`;
const ogImage = "/bio-eindev-og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ساخت بایو با هوش مصنوعی",
  description:
    "برای اینستاگرام، ایکس، لینکدین یا تلگرام یک بایوی حرفه‌ای و شخصی‌سازی‌شده بسازید؛ فقط چند کلمه درباره خودتان بنویسید.",
  keywords: [
    "ساخت بایو",
    "بایو ساز هوش مصنوعی",
    "تولید بایو اینستاگرام",
    "ساخت بایو لینکدین",
    "بایو توییتر",
    "بایو تلگرام",
    "بایو فارسی",
    "bio generator",
    "AI bio generator",
  ],
  applicationName: "Ein Bio",
  authors: [{ name: "Ehsan Ghaffar", url: "https://github.com/ehsanghaffar" }],
  creator: "Ehsan Ghaffar",
  publisher: "Ein Bio",
  category: "technology",
  classification: "AI social media bio generator",
  alternates: {
    canonical: "/bio",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: bioUrl,
    siteName: "Ein Bio",
    title: "ساخت بایو با هوش مصنوعی | Ein Bio",
    description:
      "چند کلمه درباره خودتان بنویسید و برای هر شبکه اجتماعی یک بایوی حرفه‌ای و ماندگار بسازید.",
    images: [
      {
        url: ogImage,
        width: 300,
        height: 300,
        alt: "Ein Bio - ابزار ساخت بایو با هوش مصنوعی",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ساخت بایو با هوش مصنوعی | Ein Bio",
    description:
      "برای شبکه‌های اجتماعی یک بایوی حرفه‌ای و شخصی‌سازی‌شده بسازید.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function BioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
