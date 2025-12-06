"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Calendar from "@/components/Calendar";

export default function Home() {
  const [windowHeight, setWindowHeight] = useState("100vh");
  const [showRealImage, setShowRealImage] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(`${window.innerHeight}px`);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <main>
      <Navigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Hero Section */}
        <div
          className="flex flex-col justify-center relative"
          style={{ minHeight: windowHeight }}
        >
          <div className="max-w-[65rem] mx-auto w-full px-4 sm:px-6 space-y-8 sm:space-y-12">
            <div className="grid md:grid-cols-[3fr_2fr] gap-6 sm:gap-10 lg:gap-12 items-center">
              {/* Left side - Name and Bio */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center"
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                      style={{ fontFamily: "var(--font-space)" }}
                    >
                      Hi I&apos;m Arpan
                    </h1>
                    <div className="text-sm sm:text-base text-foreground leading-relaxed space-y-3 sm:space-y-4">
                      <p>
                        I broadly work on problems related to language agents, model evaluation, and making LLMs play nice with humans and each other. I&apos;m a MSCS student at Stanford <span className="text-xl inline-block">🌲</span>, where I&apos;m blessed with amazing advisors <a href="https://cs.stanford.edu/~diyiy/" target="_blank" rel="noopener noreferrer" className="text-accent no-underline">Prof. Diyi Yang</a>, <a href="https://cs.stanford.edu/people/jure/" target="_blank" rel="noopener noreferrer" className="text-accent no-underline">Prof. Jure Leskovec</a>, and <a href="https://suif.stanford.edu/~lam/" target="_blank" rel="noopener noreferrer" className="text-accent no-underline">Prof. Monica Lam</a>.
                      </p>
                      <div className="my-4 sm:my-8"></div>
                      <p>
                        Before that I was at <img src="/meta.png" alt="Meta" className="h-3 inline mx-1 object-contain" /> where I helped people around the world connect on Facebook groups. I built systems to keep groups safe and friendly and LLM agents to answer people&apos;s questions. I completed my BS in Computer Engineering from UIUC <span className="text-xl inline-block">🌽</span>, where I worked on large-scale graph systems with the amazing <a href="https://msharmavikram.github.io/" target="_blank" rel="noopener noreferrer" className="text-accent no-underline">Vikram Sharma Mailthody</a> and <a href="https://research.nvidia.com/person/wen-mei-hwu" target="_blank" rel="noopener noreferrer" className="text-accent no-underline">Prof. Wen-Mei Hwu</a>.
                      </p>
                    </div>
                    
                    {/* Pixelated Links */}
                    <div className="flex flex-wrap gap-3 mt-6">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-button"
                    >
                      CV
                    </a>
                    <a
                      href="https://github.com/akhatua2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-button"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="https://x.com/ArpandeepKhatua"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-button"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </a>
                    <a
                      href="https://www.linkedin.com/in/arpandeepkhatua/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-button"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href="https://scholar.google.com/citations?user=hOo4TBcAAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-button"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
                        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                      </svg>
                      Scholar
                    </a>
                    <a
                      href="mailto:arpan@stanford.edu"
                      className="pixel-button"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                      </svg>
                      Email
                    </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full flex justify-center md:justify-end"
              >
                <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80">
                  <motion.img
                    key={showRealImage ? "real" : "transparent"}
                    src={showRealImage ? "/me_real.png" : "/me-transparent.png"}
                    alt="Arpan Khatua"
                    className="absolute inset-0 h-full w-full rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setShowRealImage(!showRealImage)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <Calendar />
      </motion.div>
    </main>
  );
}
