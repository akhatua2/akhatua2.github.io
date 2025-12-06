"use client";

import { motion } from "framer-motion";

export default function Newspaper() {
  const newsItems = [
    {
      date: "Nov 2025",
      dateSort: "2025-11",
      headline: "Study Reveals 3.3% of Wikipedia Facts Contradict Each Other",
      content: "Stanford researchers have discovered that at least 3.3 percent of English Wikipedia facts contradict other information in the corpus. This amounts to millions of inconsistent statements across the encyclopedia. The team introduced CLAIRE, an AI system that helps Wikipedia editors identify 64.7 percent more inconsistencies than traditional methods.",
      authors: "Semnani, S. J., Burapacheep, J., Khatua, A., Atchariyachanvanit, T., Wang, Z., & Lam, M. S.",
      paperTitle: "Detecting Corpus-Level Knowledge Inconsistencies in Wikipedia with Large Language Models",
      venue: "EMNLP 2025",
      link: "#",
      codeLink: "#",
      category: "Research",
    },
    {
      date: "Oct 2025",
      dateSort: "2025-10",
      headline: "Video Understanding System Achieves 3% Improvement Without Architecture Changes",
      content: "A data-centric approach for efficient video understanding achieved 3 percent absolute improvement on VideoMME benchmarks under identical compute constraints, without requiring architectural modifications. The method splices short captioned videos into synthetic long-context training samples.",
      authors: "Durante, Z., Singh, S., Khatua, A., Agarwal, S., Tan, R., Lee, Y. J., Gao, J., Adeli, E., & Fei-Fei, L.",
      paperTitle: "VideoWeave: A Data-Centric Approach for Efficient Video Understanding",
      venue: "NeurIPS 2025 Workshop (Oral)",
      link: "#",
      codeLink: "#",
      category: "Research",
    },
    {
      date: "Apr 2025",
      dateSort: "2025-04",
      headline: "Multi-Agent Video QA System Improves Zero-Shot Performance by 6%",
      content: "A multi-agent framework for video question answering with role specialization improved zero-shot performance by up to 6 percent over prior state-of-the-art methods through collaborative reasoning and information aggregation.",
      authors: "Kugo, N., Li, X., Li, Z., Gupta, A., Khatua, A., Jain, N., Patel, C., Kyuragi, Y., Ishii, Y., Tanabiki, M., Kozuka, K., & Adeli, E.",
      paperTitle: "VideoMultiAgents: A Multi-Agent Framework for Video Question Answering",
      venue: "Panasonic",
      link: "#",
      codeLink: "#",
      category: "Research",
    },
    {
      date: "Aug 2023",
      dateSort: "2023-08",
      headline: "Largest Academic Graph Dataset Created: 162× Larger Than Prior Benchmarks",
      content: "Researchers created the Illinois Graph Benchmark (IGB), the largest academic GNN dataset with 260 million nodes, 4 billion edges, and 220 million labels. The dataset is 162 times larger than prior datasets and has been adopted as an MLPerf industry standard for GNN benchmarking.",
      authors: "Khatua, A., Mailthody, V., Taleka, B., Song, X., Ma, T., Bigaj, P. & Hwu, W.",
      paperTitle: "IGB: Addressing The Gaps In Labeling, Features, Heterogeneity, and Size of Public Graph Datasets for Deep Learning Research",
      venue: "KDD 2023",
      link: "#",
      codeLink: "#",
      category: "Research",
    },
  ].sort((a, b) => b.dateSort.localeCompare(a.dateSort));

  return (
    <section id="news" className="max-w-[65rem] mx-auto px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-background border-2 border-foreground shadow-[8px_8px_0px_0px_rgb(0,0,0)]"
      >
        {/* Newspaper Header */}
        <div className="border-b-2 border-foreground px-6 py-4 text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "var(--font-space)" }}
          >
            THE DISPATCH
          </h1>
          <div className="flex justify-between items-center text-xs sm:text-sm text-muted border-t border-foreground pt-2 mt-2">
            <span>Vol. 1, No. 1</span>
            <span className="font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>All the News Fit to Print</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Headline Story */}
          {newsItems.length > 0 && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-b-2 border-foreground pb-3 mb-6"
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted bg-foreground text-background px-2 py-1">
                  {newsItems[0].venue || newsItems[0].category}
                </span>
              </div>
              {/* Ad Section 1 - Floating on the right, text wraps around */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="float-right md:w-[180px] w-full md:ml-4 mb-3 border-2 border-foreground p-3 bg-background"
              >
                <p className="font-bold uppercase text-[8px] sm:text-[9px] tracking-wider mb-1.5 text-foreground border-b border-foreground pb-1">CLASSIFIED AD</p>
                <p className="font-bold uppercase text-[7px] sm:text-[8px] tracking-wider mb-1 text-foreground">WANTED</p>
                <p className="text-[8px] sm:text-[9px] leading-tight text-foreground mb-1.5">More GPU hours. Will trade sanity. Contact: desperate@stanford.edu</p>
                <p className="text-[8px] sm:text-[9px] leading-tight text-foreground mb-1.5">Seeking: A100s, H100s, or any GPU that doesn't crash during training. Willing to negotiate: firstborn child, coffee supply, or eternal gratitude.</p>
                <p className="text-[8px] sm:text-[9px] leading-tight text-foreground mb-1.5">Current situation: Running experiments on a potato. Results may vary. Desperation level: Critical.</p>
                <p className="text-[8px] sm:text-[9px] leading-tight text-foreground mb-2">References available upon request. Previous GPU owners: please don't ask.</p>
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-[7px] sm:text-[8px] font-bold uppercase tracking-wider border-2 border-foreground px-2 py-1.5 transition no-underline"
                  style={{ color: 'white', backgroundColor: 'black' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'black';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Click for Details
                </a>
              </motion.div>
              <div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  {newsItems[0].headline}
                </h2>
                {newsItems[0].authors && (
                  <p className="text-xs text-muted mb-3 italic">{newsItems[0].authors}</p>
                )}
                <p className="text-sm sm:text-base leading-relaxed text-foreground mb-3 text-justify">
                  {newsItems[0].content}
                </p>
                {newsItems[0].paperTitle && (
                  <div className="text-xs text-muted mb-0">
                    <p className="font-semibold mb-1">Paper:</p>
                    <p className="italic mb-2">{newsItems[0].paperTitle}</p>
                    <div className="flex gap-2 mb-0">
                      {newsItems[0].link && (
                        <a 
                          href={newsItems[0].link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[10px] border-2 border-foreground px-2 py-1 transition font-bold no-underline"
                          style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'black' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'black';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'black';
                            e.currentTarget.style.color = 'white';
                          }}
                        >
                          PAPER
                        </a>
                      )}
                      {newsItems[0].codeLink && (
                        <a 
                          href={newsItems[0].codeLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[10px] border border-foreground px-2 py-1 transition no-underline font-bold"
                          style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'white' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'black';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'black';
                          }}
                        >
                          CODE
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          )}

          {/* Other Stories - 3 Column Layout */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {newsItems.slice(1).map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="border-b-2 border-foreground pb-2 flex flex-col"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted bg-foreground text-background px-1.5 py-0.5">
                    {item.venue || item.category}
                  </span>
                </div>
                {(item as any).image && (
                  <div className="mb-2">
                    <img 
                      src={(item as any).image} 
                      alt={item.headline}
                      className="w-full h-auto object-cover border-2 border-foreground"
                    />
                  </div>
                )}
                <h3
                  className="text-base sm:text-lg font-bold mb-1 leading-tight"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  {item.headline}
                </h3>
                {item.authors && (
                  <p className="text-[9px] text-muted mb-2 italic leading-tight">{item.authors}</p>
                )}
                <p className="text-xs leading-relaxed text-foreground mb-2 text-justify">
                  {item.content}
                </p>
                {item.paperTitle && (
                  <div className="text-[9px] text-muted mt-auto mb-0">
                    <p className="font-semibold mb-0.5">Paper:</p>
                    <p className="italic leading-tight mb-1.5">{item.paperTitle}</p>
                    <div className="flex gap-1.5 mb-0">
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[8px] border-2 border-foreground px-1.5 py-0.5 transition no-underline font-bold"
                          style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'black' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'black';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'black';
                            e.currentTarget.style.color = 'white';
                          }}
                        >
                          PAPER
                        </a>
                      )}
                      {item.codeLink && (
                        <a 
                          href={item.codeLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[8px] border border-foreground px-1.5 py-0.5 transition no-underline font-bold"
                          style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'white' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'black';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'black';
                          }}
                        >
                          CODE
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>

        {/* Research Stock Ticker */}
        <div className="border-t-2 border-foreground bg-foreground text-background overflow-hidden">
          <div className="flex items-center border-b border-background/20">
            <div className="bg-background/10 px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
              RESEARCH MARKET
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap text-[10px] sm:text-xs font-mono py-1.5">
                <span className="mx-3">COFFEE ↑ 247%</span>
                <span className="mx-3">•</span>
                <span className="mx-3">SLEEP ↓ 62%</span>
                <span className="mx-3">•</span>
                <span className="mx-3">REJECTIONS: 12</span>
                <span className="mx-3">•</span>
                <span className="mx-3">GPU HOURS: ∞</span>
                <span className="mx-3">•</span>
                <span className="mx-3">BUGS FIXED: 47</span>
                <span className="mx-3">•</span>
                <span className="mx-3">BUGS CREATED: 52</span>
                <span className="mx-3">•</span>
                <span className="mx-3">TO READ PILE ↑ 340%</span>
                <span className="mx-3">•</span>
                <span className="mx-3">REVIEWER 2: N/A</span>
                <span className="mx-3">•</span>
                {/* Duplicate for seamless loop */}
                <span className="mx-3">COFFEE ↑ 247%</span>
                <span className="mx-3">•</span>
                <span className="mx-3">SLEEP ↓ 62%</span>
                <span className="mx-3">•</span>
                <span className="mx-3">REJECTIONS: 12</span>
                <span className="mx-3">•</span>
                <span className="mx-3">GPU HOURS: ∞</span>
                <span className="mx-3">•</span>
                <span className="mx-3">BUGS FIXED: 47</span>
                <span className="mx-3">•</span>
                <span className="mx-3">BUGS CREATED: 52</span>
                <span className="mx-3">•</span>
                <span className="mx-3">TO READ PILE ↑ 340%</span>
                <span className="mx-3">•</span>
                <span className="mx-3">REVIEWER 2: N/A</span>
                <span className="mx-3">•</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

