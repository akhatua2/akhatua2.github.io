"use client"

import { motion } from "framer-motion"
import Section from "./Section"

const experiences = [
  {
    title: "Research Assistant",
    company: "Stanford AI Lab",
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
  },
  {
    title: "Undergraduate Researcher",
    company: "IMPACT Lab, UIUC",
    location: "Champaign, IL",
    description: [
      "Generated the largest publicly available graph dataset - Illinois Graph Benchmark (IGB)",
      "Combined Microsoft Academic Graph (MAG) and Semantic Scholar databases to annotate 162× more data",
      "Published paper at KDD '23 on massive GNN datasets"
    ],
    date: "Sep 2021 - Dec 2022",
    icon: "/c3sr_logo.png",
  },
]

export default function Experience() {
  return (
    <Section id="Experience">
      <div>
        <motion.h2
          className="text-4xl font-medium capitalize mb-16 text-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Experience
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-8 rounded-xl dark:bg-white/10 dark:hover:bg-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-start gap-6">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={experience.icon}
                    alt={experience.company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold">{experience.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {experience.company} • {experience.location}
                  </p>
                  <p className="text-gray-500 text-base mb-6">{experience.date}</p>
                  <ul className="list-disc list-inside space-y-3">
                    {experience.description.map((point, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300 text-lg">
                        {point}
                      </li>
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