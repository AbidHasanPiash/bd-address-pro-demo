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
  title: {
    default:
      "BD Address Pro Demo v1.1.2 - Complete Bangladesh Location Database",
    template: "%s | BD Address Pro",
  },
  description:
    "Explore the comprehensive Bangladesh location database with BD Address Pro. Access detailed information on divisions, districts, upazilas, unions, and postcodes. Powerful search, validation, and address management features for developers.",
  keywords: [
    "BD Address Pro",
    "Bangladesh address",
    "Bangladesh location database",
    "divisions",
    "districts",
    "upazilas",
    "unions",
    "postcodes",
    "address validation",
    "address management",
    "Bangladesh API",
    "location picker",
    "geocoding Bangladesh",
  ],
  authors: [
    {
      name: "Abid Hasan",
      url: "https://abidhasan.vercel.app",
    },
  ],
  creator: "Abid Hasan",
  publisher: "Abid Hasan",
  metadataBase: new URL("https://bd-address-pro.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bd-address-pro.vercel.app",
    title: "BD Address Pro - Complete Bangladesh Location Database",
    description:
      "Comprehensive Bangladesh location database with divisions, districts, upazilas, unions & postcodes. Built for developers by Abid Hasan.",
    siteName: "BD Address Pro",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "BD Address Pro - Bangladesh Location Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Address Pro - Bangladesh Location Database",
    description:
      "Complete Bangladesh address database with powerful search & validation. Built by Abid Hasan.",
    creator: "@abidhasan",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
