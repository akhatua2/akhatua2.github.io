"use client"

import { motion } from "framer-motion"
import Section from "./Section"

const projects = [
  {
    title: "Illinois Graph Benchmark (IGB)",
    description: "Created the largest public graph dataset with 600M nodes and 6B edges for testing GNN models at scale. Published at KDD '23.",
    tags: ["Graph Neural Networks", "Deep Learning", "Python", "PyTorch"],
    imageUrl: "/igb.png",
    link: "https://github.com/IllinoisGraphBenchmark/IGB260M-Datasets",
  },
  {
    title: "Socially Intelligent Agents",
    description: "Developing AI systems for non-competitive non-collaborative goals, focusing on natural language understanding and generation.",
    tags: ["NLP", "Machine Learning", "PyTorch", "Transformers"],
    imageUrl: "/stanford.png",
    link: "https://ai.stanford.edu",
  },
  {
    title: "Meta Groups AI",
    description: "Built AI-driven features for Facebook Groups, including post summaries and answer agents, improving user engagement.",
    tags: ["React", "TypeScript", "Machine Learning", "PHP"],
    imageUrl: "/meta.png",
    link: "https://www.facebook.com/groups",
  },
]

export default function Projects() {
  return (
    <Section id="Projects">
      <motion.h2
        className="text-4xl font-medium capitalize mb-16 text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 rounded-xl p-8 dark:bg-white/10 dark:hover:bg-white/20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="relative aspect-video mb-8">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-black/[0.7] px-4 py-2 text-white rounded-full text-base dark:bg-white/[0.1]"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                View Project →
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
} 