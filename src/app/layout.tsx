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
  title: "Adyen Next.js Demo",
  description: "Adyen Web Drop-in integration with Next.js - A secure payment processing demonstration",
  keywords: ["Adyen", "Next.js", "payments", "e-commerce", "checkout"],
  authors: [{ name: "Adyen Next.js Demo" }],
  creator: "Adyen Next.js Demo",
  publisher: "Adyen Next.js Demo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  other: {
    "Content-Security-Policy": "frame-ancestors 'self' https://*.adyen.com https://*.adyenpayments.com; frame-src 'self' https://*.adyen.com https://*.adyenpayments.com https://*.adyenpayments.com https://pay.google.com https://*.google.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.adyen.com https://*.adyenpayments.com; connect-src 'self' https://*.adyen.com https://*.adyenpayments.com https://checkoutanalytics-test.adyen.com https://checkoutanalytics-live.adyen.com;"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
