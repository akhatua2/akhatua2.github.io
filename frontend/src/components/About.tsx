"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { BsArrowRight, BsLinkedin } from "react-icons/bs"
import { HiDownload } from "react-icons/hi"
import { FaGithubSquare } from "react-icons/fa"
import Section from "./Section"

export default function About() {
  return (
    <Section id="About">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <Image
              src="/profile.jpg"
              alt="Arpan's portrait"
              width="400"
              height="400"
              quality="95"
              priority={true}
              className="h-48 w-48 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
            />
          </motion.div>
        </div>

        <motion.h1
          className="mb-10 mt-4 px-4 text-3xl font-medium !leading-[1.5] sm:text-5xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-bold">Hi, I'm Arpan.</span> I'm a{" "}
          <span className="font-bold">Computer Science MS student</span> at{" "}
          <span className="font-bold">Stanford University</span> and Research Assistant at{" "}
          <span className="font-bold">Stanford AI Lab</span>.
        </motion.h1>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href="#contact"
            className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition text-xl"
          >
            Contact me here{" "}
            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
          </Link>

          <a
            className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 text-xl"
            href="/resume.pdf"
            download
          >
            Download CV{" "}
            <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
          </a>

          <div className="flex gap-4">
            <a
              className="bg-white p-5 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
              href="https://www.linkedin.com/in/arpandeepkhatua/"
              target="_blank"
            >
              <BsLinkedin className="text-2xl" />
            </a>

            <a
              className="bg-white p-5 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
              href="https://github.com/akhatua2"
              target="_blank"
            >
              <FaGithubSquare className="text-2xl" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 space-y-6 text-gray-600 dark:text-gray-400 text-lg max-w-4xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="leading-relaxed">
            I am passionate about building socially intelligent AI systems and improving human-AI interaction. 
            Previously, I was a Software Engineer (IC4) at Meta working on AI-driven groups and recommendation systems. 
            I completed my BS in Computer Engineering from UIUC with a perfect GPA (4.00/4.00).
          </p>
          <p className="leading-relaxed">
            My research interests lie at the intersection of{" "}
            <span className="font-medium">natural language processing (NLP)</span>,{" "}
            <span className="font-medium">human-AI interaction</span>, and{" "}
            <span className="font-medium">graph neural networks (GNNs)</span>. 
            I focus on developing socially intelligent agents, detecting corpus-level inconsistencies in LLMs, 
            and enhancing transformers with relational embeddings.
          </p>
        </motion.div>
      </div>
    </Section>
  )
} 