"use client"

import { motion } from "framer-motion"
import Section from "./Section"
import Image from "next/image"

const experiences = [
  {
    title: "Research Assistant",
    company: "Stanford University",
    location: "Stanford, CA",
    description: [
      "Developing socially intelligent agent systems for non-competitive non-collaborative goals under Prof. Diyi Yang",
      "Building LLM systems for detecting corpus-level inconsistencies with Prof. Monica Lam",
      "Enhancing transformers with relational positional embeddings for relational databases with Prof. Jure Leskovec"
    ],
    date: "Sep 2024 - Present",
    icon: "/stanford.png",
  },
  {
    title: "Software Engineer IC4",
    company: "Meta Inc.",
    location: "Menlo Park, CA",
    description: [
      "Built new onboarding flows for admins and members leading to increased daily active group creations by 3%",
      "Streamlined privacy changes and built framework to promote new admins to admin-less groups",
      "Worked with GenAI in FB Groups to create post summaries and answer agents"
    ],
    date: "Jan 2023 - Sep 2024",
    icon: "/meta.png",
  },
  {
    title: "Software Engineering Intern",
    company: "Meta Inc.",
    location: "New York, NY",
    description: [
      "Created infinite scroll comments, polls, and overview tab resulting in stat-sig increase in FB watch time",
      "Simplified E2E testing framework and documentation for internal languages used by 50+ teams",
      "Received highest intern rating of 'greatly exceeds expectation (GE)'"
    ],
    date: "May 2022 - Aug 2022",
    icon: "/meta.png",
  }
]

export default function Experience() {
  return (
    <Section id="Experience">
      <div className="max-w-[75rem] mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">Experience</h2>
        
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-start gap-8">
                {/* Company logo */}
                <div className="flex-shrink-0 mt-1">
                  <Image
                    src={experience.icon}
                    alt={experience.company}
                    width={40}
                    height={40}
                    className="grayscale group-hover:grayscale-0 transition rounded-full"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{experience.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {experience.company} • {experience.location}
                      </p>
                    </div>
                    <time className="text-sm text-gray-500 whitespace-nowrap">{experience.date}</time>
                  </div>
                  <ul className="list-disc text-gray-700 dark:text-gray-300 ml-4 space-y-2">
                    {experience.description.map((point, idx) => (
                      <li key={idx} className="text-base">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
} 