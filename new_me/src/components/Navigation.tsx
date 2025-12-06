"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 100);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-[65rem] mx-auto w-full flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <motion.div
            initial={false}
            animate={{ opacity: isScrolled ? 1 : 0, x: isScrolled ? 0 : -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
            style={{ visibility: isScrolled ? 'visible' : 'hidden', pointerEvents: isScrolled ? 'auto' : 'none' }}
          >
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/me-transparent.png"
                alt="Arpan"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span
                className="text-sm font-semibold text-foreground"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Arpan
              </span>
            </Link>
          </motion.div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted ml-auto overflow-x-auto">
          <Link
            href="/research"
            className="link-underline hover:text-foreground whitespace-nowrap"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Research
          </Link>
          <Link
            href="/experience"
            className="link-underline hover:text-foreground whitespace-nowrap"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Experience
          </Link>
          <Link
            href="/blog"
            className="link-underline hover:text-foreground whitespace-nowrap"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}

