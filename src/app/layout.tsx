import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AskApplevilleLauncher } from "@/components/ask-appleville-launcher";
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
  title: {
    default: "Appleville | Build Your Life in Himachal",
    template: "%s | Appleville",
  },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.name,
    url: siteMetadata.url,
    description: "Find the Himachal town that fits your lifestyle, budget, and work needs.",
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="page-shell">
          <SiteHeader />
          <div className="min-h-[calc(100vh-92px)] pt-3 md:min-h-[calc(100vh-104px)] md:pt-4">
            {children}
          </div>
          <div className="mt-10 md:mt-14">
            <SiteFooter />
          </div>
          <AskApplevilleLauncher />
        </div>
      </body>
    </html>
  );
}
