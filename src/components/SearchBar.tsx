"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Section = {
  id: string;
  title: string;
  content: string;
  level: number;
  parentId?: string;
};

type SearchEntry = {
  title: string;
  url: string;
  description?: string;
  category: "Blog" | "Page" | "Research";
  content?: string;
  sections?: Section[];
};

type SearchResult = {
  entry: SearchEntry;
  section?: Section;
  breadcrumb?: string[];
};

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Load search index from JSON file
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: SearchEntry[]) => setSearchIndex(data))
      .catch((err) => {
        console.error("Failed to load search index:", err);
        setSearchIndex([]);
      });
  }, []);

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (prev) {
            setQuery("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter results based on query - searches title, description, content, and sections
  const filteredResults: SearchResult[] = query.trim()
    ? (() => {
        const queryLower = query.toLowerCase();
        const results: SearchResult[] = [];

        for (const entry of searchIndex) {
          // Check if main entry matches
          const titleMatch = entry.title.toLowerCase().includes(queryLower);
          const descMatch = entry.description?.toLowerCase().includes(queryLower);
          const contentMatch = entry.content?.toLowerCase().includes(queryLower);

          if (titleMatch || descMatch || contentMatch) {
            results.push({ entry });
          }

          // Check sections if they exist
          if (entry.sections) {
            for (const section of entry.sections) {
              const sectionTitleMatch = section.title.toLowerCase().includes(queryLower);
              const sectionContentMatch = section.content.toLowerCase().includes(queryLower);

              if (sectionTitleMatch || sectionContentMatch) {
                // Build breadcrumb
                const breadcrumb: string[] = [entry.title];
                if (section.level === 3 && section.parentId) {
                  // Find parent h2 section
                  const parentSection = entry.sections.find((s) => s.id === section.parentId);
                  if (parentSection) {
                    breadcrumb.push(parentSection.title);
                  }
                }
                breadcrumb.push(section.title);

                results.push({
                  entry,
                  section,
                  breadcrumb,
                });
              }
            }
          }
        }

        return results;
      })()
    : searchIndex.filter((entry) => entry.category === "Page").map((entry) => ({ entry }));

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    }
  };

  const handleSelect = (result: SearchResult) => {
    const url = result.section ? `${result.entry.url}#${result.section.id}` : result.entry.url;
    router.push(url);
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  return (
    <>
      {/* Search Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-muted border border-foreground/20 rounded-md hover:border-foreground/40 hover:text-foreground transition-colors"
        style={{ fontFamily: "var(--font-space)" }}
        aria-label="Search"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="hidden md:inline">Search</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold text-muted rounded bg-background">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Search Modal - Rendered via Portal at body level */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    setSelectedIndex(0);
                  }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                  style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
                />
                {/* Modal */}
                <div
                  className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
                  style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="w-full max-w-2xl mx-4 pointer-events-auto"
                  >
                    <div className="bg-background border-2 border-foreground shadow-[8px_8px_0px_0px_rgb(0,0,0)] rounded-lg overflow-hidden">
                      {/* Search Input */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-foreground bg-background">
                        <label htmlFor="search-input" className="sr-only">
                          Search articles and pages
                        </label>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted"
                          aria-hidden="true"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                          id="search-input"
                          ref={inputRef}
                          type="text"
                          value={query}
                          onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                          }}
                          onKeyDown={handleKeyDown}
                          placeholder="Search articles, pages..."
                          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted focus:outline-none focus:ring-0"
                          style={{ fontFamily: "var(--font-space)" }}
                          aria-label="Search articles and pages"
                          aria-autocomplete="list"
                          aria-controls="search-results"
                          aria-expanded={isOpen}
                          role="combobox"
                        />
                        <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-semibold text-muted rounded bg-background">
                          <span>⌘</span>K
                        </kbd>
                      </div>

                      {/* Results */}
                      <div
                        id="search-results"
                        className="max-h-[400px] overflow-y-auto bg-background"
                        role="listbox"
                      >
                        {filteredResults.length > 0 ? (
                          <ul className="py-2">
                            {filteredResults.map((result, index) => {
                              const url = result.section
                                ? `${result.entry.url}#${result.section.id}`
                                : result.entry.url;
                              // Use title + section id to ensure unique keys
                              const uniqueKey = result.section
                                ? `${result.entry.title}-${result.section.id}`
                                : result.entry.title;
                              return (
                                <li key={uniqueKey}>
                                  <button
                                    role="option"
                                    aria-selected={index === selectedIndex}
                                    type="button"
                                    onClick={() => handleSelect(result)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`w-full text-left px-4 py-3 hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset ${
                                      index === selectedIndex ? "bg-foreground/10" : ""
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span
                                            className="text-sm font-semibold text-foreground"
                                            style={{ fontFamily: "var(--font-space)" }}
                                          >
                                            {result.section
                                              ? result.section.title
                                              : result.entry.title}
                                          </span>
                                          <span className="text-[10px] uppercase tracking-wider text-muted bg-foreground/10 px-1.5 py-0.5 rounded">
                                            {result.entry.category}
                                          </span>
                                        </div>
                                        {result.breadcrumb && result.breadcrumb.length > 1 && (
                                          <div className="flex items-center gap-1 text-[10px] text-muted mb-1">
                                            {result.breadcrumb.map((crumb, i) => (
                                              <span key={crumb}>
                                                {i > 0 && <span className="mx-1">›</span>}
                                                <span>{crumb}</span>
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                        {result.section ? (
                                          <p className="text-xs text-muted line-clamp-2">
                                            {result.section.content}
                                          </p>
                                        ) : result.entry.description ? (
                                          <p className="text-xs text-muted line-clamp-1">
                                            {result.entry.description}
                                          </p>
                                        ) : null}
                                        <p className="text-[10px] text-muted mt-1">{url}</p>
                                      </div>
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-muted flex-shrink-0"
                                        aria-hidden="true"
                                      >
                                        <path d="m9 18 6-6-6-6" />
                                      </svg>
                                    </div>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <div className="px-4 py-8 text-center text-muted">
                            <p className="text-sm">No results found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
