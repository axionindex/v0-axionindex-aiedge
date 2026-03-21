import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
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
  title: "The AI Edge Lab — The Structural Economics of Work in the AI Era",
  description:
    "A management doctrine for the AI era. When intelligence becomes abundant, judgment becomes the scarce resource. The AI Edge Lab studies that shift — and builds frameworks to redesign roles, decisions, and organisations for an AI-native economy.",
  keywords: [
    "AI",
    "future of work",
    "career",
    "assessment",
    "diagnostic",
    "AI replaceability",
    "judgment",
    "EDGE framework",
  ],
  authors: [{ name: "Nitin Nahata" }],
  openGraph: {
    title: "The AI Edge Lab",
    description:
      "The Structural Economics of Work in the AI Era — AI Edge Diagnostic by Nitin Nahata",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
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
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
