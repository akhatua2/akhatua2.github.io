"use client";

import Navigation from "@/components/Navigation";
import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface BlogPostLayoutProps {
  title: string;
  date: string;
  readingTime: string;
  summary?: string;
  tocItems: TocItem[];
  children: ReactNode;
}

export default function BlogPostLayout({
  title,
  date,
  readingTime,
  summary,
  tocItems,
  children,
}: BlogPostLayoutProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const headings = document.querySelectorAll("h2[id], h3[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <Navigation />
      <div className="flex gap-8 pt-20 pb-14">
        {/* Table of Contents Sidebar - Flush left, sticky */}
        <aside className="hidden lg:block flex-shrink-0 w-64 pl-6">
          <nav className="border-2 border-foreground bg-background p-4 pb-6 shadow-[4px_4px_0px_0px_rgb(0,0,0)] sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            {/* Back to Blog Button */}
            <Link 
              href="/blog" 
              className="text-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 mb-4 block"
              style={{ fontFamily: "var(--font-space)" }}
            >
              <span>←</span>
              <span>Blog</span>
            </Link>
            
            <p className="text-xs uppercase tracking-widest text-muted mb-4 font-bold" style={{ fontFamily: "var(--font-space)" }}>
              Contents
            </p>
            <ul className="space-y-2 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`text-left w-full transition-colors ${
                      item.level === 3 ? "pl-4" : ""
                    } ${
                      activeId === item.id
                        ? "text-foreground font-semibold"
                        : "text-muted hover:text-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content - Centered, matching header width */}
        <article className="flex-1 min-w-0 max-w-[65rem] mx-auto px-6 sm:px-10">
          {/* Header */}
          <header className="mb-12">
            <h1
              className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-space)" }}
            >
              {title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted mb-6">
              <time dateTime={date}>{date}</time>
              <span>•</span>
              <span>{readingTime}</span>
            </div>
            {summary && (
              <p className="text-xl text-muted leading-relaxed">
                {summary}
              </p>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </article>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-foreground text-background border-2 border-foreground shadow-[4px_4px_0px_0px_rgb(0,0,0)] hover:shadow-[2px_2px_0px_0px_rgb(0,0,0)] transition-all flex items-center justify-center z-50"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}
    </main>
  );
}

