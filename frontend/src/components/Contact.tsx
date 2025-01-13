"use client"

import { motion } from "framer-motion"
import { BsLinkedin } from "react-icons/bs"
import { HiMail } from "react-icons/hi"
import Section from "./Section"

export default function Contact() {
  return (
    <Section id="Contact">
      <motion.h2
        className="text-4xl font-medium capitalize mb-16 text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact Me
      </motion.h2>

      <motion.div
        className="max-w-3xl mx-auto space-y-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xl text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          I'm always interested in collaborating on exciting AI/ML projects. Feel free to reach out if you'd like to work together or just want to connect!
        </p>

        <div className="flex justify-center gap-8">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center gap-3 text-lg font-medium hover:text-gray-950 dark:hover:text-gray-200 transition-colors"
          >
            <HiMail className="text-2xl" />
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg font-medium hover:text-gray-950 dark:hover:text-gray-200 transition-colors"
          >
            <BsLinkedin className="text-2xl" />
            LinkedIn
          </a>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">References</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-medium">Dr. John Doe</h4>
              <p className="text-lg text-gray-600 dark:text-gray-400">Professor of Computer Science</p>
              <p className="text-lg text-gray-600 dark:text-gray-400">Stanford University</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-medium">Jane Smith</h4>
              <p className="text-lg text-gray-600 dark:text-gray-400">Senior Research Scientist</p>
              <p className="text-lg text-gray-600 dark:text-gray-400">Meta AI Research</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
} 