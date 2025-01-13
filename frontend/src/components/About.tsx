"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BsArrowRight, BsLinkedin, BsGithub, BsChevronDown } from "react-icons/bs"
import { HiOutlineDocumentText } from "react-icons/hi"
import { SiGooglescholar } from "react-icons/si"
import Section from "./Section"
import PhotoGallery from "./PhotoGallery"
import { useEffect, useState } from "react"
import Publications from "./Publications"

const newsItems = [
  {
    text: "Starting MS in Computer Science at Stanford University!",
    emoji: "🎓",
    date: "Sep 2023"
  },
  {
    text: "Joined Stanford AI Lab (SALT, OVAL, SNAP) as Research Assistant.",
    emoji: "💻",
    date: "Sep 2023"
  },
  {
    text: "Published paper at KDD '23 on IGB dataset.",
    emoji: "📝",
    date: "Aug 2023"
  },
  {
    text: "Promoted to IC4 at Meta working on AI-Driven Groups.",
    emoji: "🚀",
    date: "Jan 2023"
  },
  {
    text: "Reviewed paper for a conference and submitted papers! @ICWSM '23 and @KDD '23.",
    emoji: "📚",
    date: "Dec 2022"
  },
  {
    text: "Completed BS in Computer Engineering from UIUC with perfect GPA (4.00/4.00).",
    emoji: "🎯",
    date: "Dec 2022"
  },
  {
    text: "Received highest intern rating 'Greatly Exceeds Expectations' at Meta.",
    emoji: "⭐",
    date: "Aug 2022"
  },
  {
    text: "Started internship at Meta in New York.",
    emoji: "🗽",
    date: "May 2022"
  }
]

export default function About() {
  const [windowHeight, setWindowHeight] = useState("100vh")

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(`${window.innerHeight}px`)
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div 
        className="flex flex-col justify-center relative -mt-24"
        style={{ minHeight: windowHeight }}
      >
        <div className="max-w-[90rem] mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center px-4">
          {/* Left side - Value Prop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight">
                  Hi! 👋 <br />I'm Arpan.
                </h1>
                <h2 className="text-3xl sm:text-4xl font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  MS Student at Stanford AI Lab
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  Building socially intelligent AI systems and improving multimodal LLM systems
                </p>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#contact"
                  className="bg-[#1f883d] hover:bg-[#1a7f37] text-white px-8 py-4 flex items-center justify-center gap-2 rounded-xl font-medium transition text-lg"
                >
                  Contact me{" "}
                  <BsArrowRight className="text-lg" />
                </Link>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 flex items-center justify-center gap-2 rounded-xl font-medium transition text-lg"
                >
                  View Resume{" "}
                  <HiOutlineDocumentText className="text-lg" />
                </a>
              </div>

              {/* Professional Links */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/arpandeepkhatua/"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <BsLinkedin className="text-xl" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/akhatua2"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <BsGithub className="text-xl" />
                  GitHub
                </a>
                <a
                  href="https://scholar.google.com/citations?user=YOUR_ID"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <SiGooglescholar className="text-xl" />
                  Scholar
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right side - Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <PhotoGallery />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <BsChevronDown className="text-3xl" />
        </motion.div>
      </div>

      {/* About Section */}
      <Section id="About" className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto scroll-mt-28">
          <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
            {/* Left Column - About Me */}
            <motion.div
              className="prose dark:prose-invert max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                I'm a Computer Science MS student at Stanford University and Research Assistant at Stanford AI Lab.
                I am passionate about building socially intelligent AI systems and improving human-AI interaction.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                Previously, I was a Software Engineer (IC4) at Meta working on AI-driven groups and recommendation systems.
                I completed my BS in Computer Engineering from UIUC with a perfect GPA (4.00/4.00).
              </p>
              <h3 className="text-2xl font-bold mb-4">Research Interests</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                My research interests lie at the intersection of{" "}
                <span className="font-medium text-purple-600 dark:text-purple-400">natural language processing (NLP)</span>,{" "}
                <span className="font-medium text-pink-600 dark:text-pink-400">human-AI interaction</span>, and{" "}
                <span className="font-medium text-indigo-600 dark:text-indigo-400">graph neural networks (GNNs)</span>.
                I focus on developing socially intelligent agents, detecting corpus-level inconsistencies in LLMs,
                and enhancing transformers with relational embeddings.
              </p>
            </motion.div>

            {/* Right Column - News Bulletin */}
            <motion.div
              className="lg:sticky lg:top-32 self-start"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-transparent">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                    Recent Updates
                  </h3>
                </div>
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-4"
                  onWheel={(e) => e.stopPropagation()}
                >
                  <ul className="space-y-6">
                    {newsItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <time className="text-sm text-gray-400 dark:text-gray-500 mb-1 block">
                          {item.date}
                        </time>
                        <p className="text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                          {item.text}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Publications Section */}
      <Publications />
    </>
  )
} 