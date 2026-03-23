import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Instrument_Sans, DM_Mono, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Axion Index — Operating Intelligence for Unfinished Organisations",
  description:
    "Codified energy for the unfinished. We help founders diagnose, redesign, and control the system underneath work before it breaks. Research-grade diagnostics by Nitin Nahata.",
  keywords: [
    "operating intelligence",
    "HR architecture",
    "people systems",
    "AI work redesign",
    "labour codes",
    "founder dependency",
    "governance",
    "Nitin Nahata",
  ],
  authors: [{ name: "Nitin Nahata" }],
  openGraph: {
    title: "Axion Index — Codified Energy for the Unfinished",
    description:
      "Operating intelligence for unfinished organisations. Diagnostic instruments and strategic frameworks by Nitin Nahata.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0B09",
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
      className={`${cormorant.variable} ${instrumentSans.variable} ${dmMono.variable} ${lora.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
