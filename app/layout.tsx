import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "Ein Bio — ساخت بایو هوشمند با هوش مصنوعی",
  description:
    "با چند کلیک ساده، بایویی شخصی‌سازی شده و جذاب برای شبکه‌های اجتماعی بساز.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ein Bio — ساخت بایو هوشمند با هوش مصنوعی",
    description:
      "با چند کلیک ساده، بایویی شخصی‌سازی شده و جذاب برای شبکه‌های اجتماعی بساز.",
    images: [
      {
        url: "https://bio.eindev.ir/einbio.png",
        width: 300,
        height: 300,
        alt: "Ein Bio - ساخت بایو با هوش مصنوعی",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex flex-col min-h-screen antialiased">
        {children}
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
