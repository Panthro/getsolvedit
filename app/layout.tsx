import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "../styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
  weight: ["600", "700", "800"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  width: "device-width" as const,
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
