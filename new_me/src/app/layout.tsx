import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk as SpaceGrotesk,
  Fraunces,
  Caveat,
  Press_Start_2P,
} from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

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

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Arpan",
  description:
    "A personal blog-inspired space for ML, engineering, and thoughtful notes.",
  icons: {
    icon: "/mango.png",
    shortcut: "/mango.png",
    apple: "/mango.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${caveat.variable} ${pressStart2P.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
