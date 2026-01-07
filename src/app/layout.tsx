import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  // --- CORE IDENTITY ---
  title: "MostLabz | Blink Infrastructure for Solana",
  description: "Convert Twitter hype into instant liquidity. MostLabz builds high-performance, validated Solana Blinks for the next generation of community growth.",

  // --- THEME COLORS ---
  themeColor: "#0a0206",

  // --- OPEN GRAPH (Facebook, Discord, etc.) ---
  openGraph: {
    title: "MostLabz. Infrastructure Redefined.",
    description: "Launch your custom, revenue-generating Solana Blink in 24 hours.",
    url: "https://www.mostlabz.xyz",
    siteName: "MostLabz",
    images: [
      {
        url: "https://www.mostlabz.xyz/og-image.png", // Make sure to add this image later
        width: 1200,
        height: 630,
        alt: "MostLabz Blink Terminal",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- TWITTER CARD (Essential for your business) ---
  twitter: {
    card: "summary_large_image",
    title: "MostLabz | Solana Blink Store",
    description: "1-Click buy terminals for your X community. Vetted by Superteam.",
    creator: "@YOUR_TWITTER_HANDLE",
    images: ["https://www.mostlabz.xyz/og-image.png"],
  },

  // --- ICONS ---
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0206]`}
      >
        {children}
      </body>
    </html>
  );
}