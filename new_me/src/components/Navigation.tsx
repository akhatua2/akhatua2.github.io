"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

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
            className="flex items-center gap-3 motion-safe:transition-all motion-reduce:transition-none"
            style={{
              visibility: isScrolled ? "visible" : "hidden",
              pointerEvents: isScrolled ? "auto" : "none",
            }}
          >
            <Link href="/" className="flex items-center gap-3" aria-label="Home - Arpan">
              <img
                src="/me-transparent.png"
                alt=""
                className="h-8 w-8 rounded-full object-cover"
                aria-hidden="true"
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
        <ul className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted ml-auto overflow-x-auto list-none">
          <li>
            <Link
              href="/research"
              className="link-underline hover:text-foreground whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ fontFamily: "var(--font-space)" }}
              aria-current={pathname === "/research" ? "page" : undefined}
            >
              Research
            </Link>
          </li>
          <li>
            <Link
              href="/experience"
              className="link-underline hover:text-foreground whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ fontFamily: "var(--font-space)" }}
              aria-current={pathname === "/experience" ? "page" : undefined}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="link-underline hover:text-foreground whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ fontFamily: "var(--font-space)" }}
              aria-current={pathname === "/projects" ? "page" : undefined}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="link-underline hover:text-foreground whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ fontFamily: "var(--font-space)" }}
              aria-current={
                pathname === "/blog" || pathname?.startsWith("/blog/") ? "page" : undefined
              }
            >
              Blog
            </Link>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </div>
    </nav>
  );
}
