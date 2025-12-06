import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk as SpaceGrotesk,
  Fraunces,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = SpaceGrotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arpan Khatua — ML, Engineering, Writing",
  description:
    "A personal blog-inspired space for ML, engineering, and thoughtful notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
