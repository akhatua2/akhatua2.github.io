"use client";

import { motion } from "framer-motion";

export default function News() {
  const newsItems = [
    {
      date: "Jan 2025",
      title: "New paper accepted to EMNLP 2025",
      description: "Our work on detecting corpus-level knowledge inconsistencies in Wikipedia with LLMs was accepted.",
    },
    {
      date: "Dec 2024",
      title: "Started at Stanford AI Lab",
      description: "Excited to begin research on socially intelligent agent systems and human-AI interaction.",
    },
    {
      date: "Sep 2024",
      title: "Joined Stanford as MSCS student",
      description: "Beginning my graduate studies at Stanford University.",
    },
  ];

  return (
    <section id="news" className="max-w-[65rem] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h2
        className="text-2xl sm:text-3xl font-bold mb-8 text-foreground"
        style={{ fontFamily: "var(--font-space)" }}
      >
        News
      </h2>
      <div className="space-y-6">
        {newsItems.map((item, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-b border-border pb-6 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted whitespace-nowrap min-w-[80px]">
                {item.date}
              </p>
              <div className="flex-1">
                <h3
                  className="text-lg sm:text-xl font-semibold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}


