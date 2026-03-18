import type { Metadata, Viewport } from "next";
import { Playfair_Display, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-baskerville",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const ibmPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "The AI Edge Lab | The Doctrine of the Future Workplace",
  description:
    "A structural framework for understanding how AI is reshaping work — and where individual professionals sit relative to the compression line. By Nitin Nahata.",
  keywords: [
    "AI",
    "future of work",
    "career",
    "assessment",
    "diagnostic",
    "edge score",
  ],
  authors: [{ name: "Nitin Nahata", url: "https://axionindex.org" }],
  openGraph: {
    title: "The AI Edge Lab",
    description:
      "The Doctrine of the Future Workplace — AI Edge Diagnostic by Nitin Nahata",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0806",
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
      className={`${playfair.variable} ${baskerville.variable} ${ibmPlex.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
