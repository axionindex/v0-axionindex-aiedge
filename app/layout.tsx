import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Axion Index — Instruments for the Structural Economy",
  description:
    "Research-grade diagnostic instruments and strategic frameworks for individuals and institutions navigating structural economic shifts. Built by Nitin Nahata.",
  keywords: [
    "structural economics",
    "AI",
    "future of work",
    "career",
    "assessment",
    "diagnostic",
    "governance",
    "capital alignment",
  ],
  authors: [{ name: "Nitin Nahata" }],
  openGraph: {
    title: "Axion Index",
    description:
      "Instruments for the Structural Economy — Research-grade diagnostics by Nitin Nahata",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
