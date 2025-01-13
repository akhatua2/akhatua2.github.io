"use client"

import { motion } from "framer-motion"
import Section from "./Section"
import { BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs"
import { SiGooglescholar } from "react-icons/si"
import { HiOutlineDocumentText } from "react-icons/hi"

export default function Contact() {
  return (
    <Section id="Contact" className="pt-16 pb-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <motion.div
        className="max-w-[75rem] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-medium mb-8 text-center">Get in Touch</h2>

        <div className="flex flex-col items-center gap-8">
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-center">
            I&apos;m always open to discussing research collaborations, AI/ML projects, or opportunities in tech. Feel free to reach out!
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:arpandeepk@gmail.com"
              className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <BsEnvelope className="text-xl" />
              <span>Email</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/arpandeepkhatua/"
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <BsLinkedin className="text-xl" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/akhatua2"
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <BsGithub className="text-xl" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://scholar.google.com/citations?user=YOUR_ID"
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <SiGooglescholar className="text-xl" />
              <span>Scholar</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <HiOutlineDocumentText className="text-xl" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  )
} 