import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: "Appleville | Build Your Life in Himachal",
  description:
    "Find the Himachal town that fits your lifestyle, budget, and work needs.",
  openGraph: {
    siteName: siteMetadata.name,
    type: "website",
    images: [
      {
        url: siteMetadata.defaultImage,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteMetadata.defaultImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="page-shell">
          <SiteHeader />
          <div className="min-h-[calc(100vh-64px)]">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
