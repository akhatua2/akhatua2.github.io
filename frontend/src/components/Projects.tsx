"use client"

import { motion } from "framer-motion"
import Section from "./Section"
import { BsTrophy } from "react-icons/bs"
import Image from "next/image"

const projects = [
  {
    title: "CourseLoop",
    description: "Auto-grading on text extracted from PDF assignments with an OCR pipeline, using NLP in python with 98%+ accuracy in 1 week. Reduced auto-grading time by 50% utilizing better algorithms and libraries.",
    achievement: {
      text: "Winner at HackIllinois",
      type: "gold",
      icon: BsTrophy
    },
    tags: ["OCR", "NLP", "Python", "Machine Learning"],
    imageUrl: "/courseloop.png",
    link: "https://devpost.com/software/courseloop",
  },
  {
    title: "Kaizen Journal",
    description: "Built a custom NLP model to classify text based on mental health conditions and a web page for easier access by patients and health-care professionals with an OCR and voice to text functionality.",
    achievement: {
      text: "Winner at HackDuke",
      type: "gold",
      icon: BsTrophy
    },
    tags: ["NLP", "OCR", "Voice-to-Text", "Healthcare"],
    imageUrl: "/kaizen.png",
    link: "https://devpost.com/software/kaizen-journal",
  },
  {
    title: "Mauka - Job Search Portal",
    description: "Job search portal by scraping real time information from Google and LinkedIn to help curb increasing unemployment rates due to COVID-19 in developing countries.",
    achievement: {
      text: "Presented at Hex Cambridge",
      type: "featured",
      icon: BsTrophy
    },
    tags: ["Web Scraping", "React", "Node.js", "Job Search"],
    imageUrl: "/mauka.png",
    link: "https://devpost.com/software/indiid",
  }
]

export default function Projects() {
  return (
    <Section id="Projects">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hackathon Projects
      </motion.h2>

      <div className="grid gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 flex-shrink-0 relative">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover rounded-lg shadow-sm"
                />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-semibold text-[#0969da] dark:text-[#539bf5] hover:underline">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ddf4ff] text-[#0969da] dark:bg-[#388bfd26] dark:text-[#539bf5]">
                    Devpost
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <project.achievement.icon 
                    className={`text-2xl ${
                      project.achievement.type === 'gold' 
                        ? 'text-yellow-500' 
                        : project.achievement.type === 'featured'
                        ? 'text-purple-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <span className={`text-sm font-medium ${
                    project.achievement.type === 'gold'
                      ? 'text-yellow-700 dark:text-yellow-500'
                      : project.achievement.type === 'featured'
                      ? 'text-purple-700 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {project.achievement.text}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-base mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
} 