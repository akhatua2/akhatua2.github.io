"use client"

import { motion } from "framer-motion"
import Section from "./Section"
import Image from "next/image"
import { BsAward, BsBook, BsCodeSquare, BsLink45Deg } from "react-icons/bs"
import { HiAcademicCap, HiOutlineDocument } from "react-icons/hi"
import Link from "next/link"

const education = [
  {
    school: "Stanford University",
    degree: "MS in Computer Science",
    date: "2023 - Present",
    location: "Stanford, CA",
    gpa: "Current",
    icon: "/stanford.png",
    links: {
      transcript: "/transcript.pdf",
      degree: null // No degree yet as it's ongoing
    },
    achievements: [
      "Research Assistant at Stanford AI Lab (SALT, OVAL, SNAP)",
      "Focus on AI Systems and Human-AI Interaction"
    ],
    coursework: [
      "CS 224N: Natural Language Processing",
      "CS 224U: Natural Language Understanding",
      "CS 234: Reinforcement Learning",
      "CS 330: Deep Multi-task and Meta Learning"
    ],
    research: [
      "Working on large language models and human-AI interaction",
      "Developing AI systems for improved user experience",
      "Collaborating with SALT, OVAL, and SNAP research groups"
    ]
  },
  {
    school: "University of Illinois at Urbana-Champaign",
    degree: "BS in Computer Engineering",
    date: "2019 - 2022",
    location: "Urbana, IL",
    gpa: "4.00/4.00",
    icon: "/uiuc.png",
    links: {
      transcript: "/transcript.pdf",
      degree: "/senior_thesis.pdf"
    },
    achievements: [
      "James Scholar Honors",
      "Dean's List (All Semesters)"
    ],
    teaching: [
      "Course Assistant for ECE 391: Computer Systems Engineering",
      "Course Assistant for ECE 313: Probability with Engineering Applications",
      "Course Assistant for ECE 210: Analog Signal Processing",
      "Honors Lab Instructor for ECE 110H/120H: Intro to Electronics and Computing"
    ],
    coursework: [
      "ECE 391: Computer Systems Engineering",
      "ECE 411: Computer Organization & Design",
      "ECE 374: Algorithms & Models of Computation",
      "ECE 385: Digital Systems Laboratory"
    ],
    honors: [
      "Engineering Open House Best Project Award",
      "Knights of St. Patrick Honor",
      "Outstanding Academic Achievement Award"
    ]
  }
]

export default function Education() {
  return (
    <Section id="Education">
      <div className="max-w-[75rem] mx-auto">
        <h2 className="text-2xl font-medium mb-16 text-center">Education</h2>
        
        <div className="space-y-20">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* School Header */}
              <div className="flex items-start gap-4 mb-8">
                <Image
                  src={edu.icon}
                  alt={edu.school}
                  width={40}
                  height={40}
                  className="grayscale group-hover:grayscale-0 transition rounded-md mt-1"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {edu.school}
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap text-sm text-gray-600 dark:text-gray-400">
                    <span>{edu.degree}</span>
                    {edu.links.degree && (
                      <Link 
                        href={edu.links.degree}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition"
                      >
                        <HiOutlineDocument className="text-sm" />
                        <span>View Thesis</span>
                      </Link>
                    )}
                    {edu.links.transcript && (
                      <Link 
                        href={edu.links.transcript}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition"
                      >
                        <BsLink45Deg className="text-sm" />
                        <span>Transcript</span>
                      </Link>
                    )}
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span>{edu.location}</span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span>{edu.date}</span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span>GPA: {edu.gpa}</span>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Column 1: Achievements and Research */}
                <div className="space-y-8">
                  {edu.achievements.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
                        <BsAward className="text-gray-400" />
                        Achievements
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {edu.research && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
                        <BsCodeSquare className="text-gray-400" />
                        Research
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        {edu.research.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Column 2: Coursework */}
                {edu.coursework && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
                      <BsBook className="text-gray-400" />
                      Notable Coursework
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {edu.coursework.map((course, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Column 3: Teaching and Honors */}
                <div className="space-y-8">
                  {edu.teaching && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
                        <HiAcademicCap className="text-gray-400" />
                        Teaching Experience
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        {edu.teaching.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {edu.honors && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
                        <BsAward className="text-gray-400" />
                        Honors & Awards
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        {edu.honors.map((honor, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span>{honor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
} 