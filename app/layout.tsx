import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: "ساخت بایو سریع و آسان با استفاده از هوش مصنوعی",
  description:
      "اینجا می‌تونی با چند کلیک ساده، بایویی شخصی‌سازی شده و جذاب که نمایانگر واقعی شخصیت توه، بسازی.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ساخت بایو سریع و آسان با استفاده از هوش مصنوعی",
    description:
      "اینجا می‌تونی با چند کلیک ساده، بایویی شخصی‌سازی شده و جذاب که نمایانگر واقعی شخصیت توه، بسازی.",
    images: [
      {
        url: "https://bio.eindev.ir/einbio.png",
        width: "300",
        height: "300",
        alt: "با استفاده از جدیدترین فناوری هوش مصنوعی، ما به شما کمک می‌کنیم تا بایویی ایجاد کنید که همه را مجذوب خود کند.",
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
      <body className="flex flex-col">
        {children}
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
