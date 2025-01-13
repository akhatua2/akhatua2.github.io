"use client"

import { motion } from "framer-motion"
import Section from "./Section"
import Link from "next/link"
import Image from "next/image"
import { BsGithub } from "react-icons/bs"
import { HiOutlineDocument } from "react-icons/hi"

const publications = [
  {
    title: "IGB: An Immense Graph Dataset for Machine Learning Workloads",
    authors: [
      { name: "Arpandeep Khatua", isMe: true },
      { name: "Vikram Sharma Mailthody", isMe: false },
      { name: "Bhagyashree Taleka", isMe: false },
      { name: "Xiang Song", isMe: false },
      { name: "Tengfei Ma", isMe: false },
      { name: "Piotr Bigaj", isMe: false },
      { name: "Wen-mei Hwu", isMe: false }
    ],
    venue: "Submitted at KDD 2023",
    description: "Largest public graph dataset for testing GNN models at scale and sytem optimization.",
    image: "/igb.png",
    links: {
      code: "https://github.com/IllinoisGraphBenchmark/IGB260M-Datasets",
      paper: "https://arxiv.org/abs/2302.13522"
    }
  },
  {
    title: "Detection, Categorization, and Comparison of Needs Expressed on Twitter during Crises",
    authors: [
      { name: "Pingjing Yang", isMe: false },
      { name: "Ly Dinh", isMe: false },
      { name: "Hamiz Anjum", isMe: false },
      { name: "Alex Stratton", isMe: false },
      { name: "Arpandeep Khatua", isMe: true },
      { name: "Jana Diesner", isMe: false },
      { name: "Richard Sowers", isMe: false }
    ],
    venue: "Submitted at ICWSM 2023",
    description: "In this study, we use Twitter data to automatically identify who needs what and how types of needs, that we categorized and standardized, have evolved throughout the Ukraine-Russia conflict.",
    image: "/ukraine_icwsm.png",
    links: {
      code: "https://github.com/akhatua2/ukraine-russia-conflict",
      paper: "/data/ukraine_icwsm23.pdf"
    }
  },
  {
    title: "Generating High-Level Article Structure Based on Topic Using Two-stage Seq2seq Model",
    authors: [
      { name: "Arpandeep Khatua", isMe: true },
      { name: "Adit Agarwal", isMe: false },
      { name: "Kevin CC Chang", isMe: false }
    ],
    venue: "In Prep for ACL 2023",
    description: "Multi-stage subtopic generator for long text generation and richer search results.",
    image: "/baselinecomp.png",
    links: {
      code: "https://github.com/NextGenSearchEngine"
    }
  }
]

export default function Publications() {
  return (
    <Section id="Publications" className="pt-16 pb-16">
      <div className="max-w-[75rem] mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">Publications</h2>
        
        <div className="space-y-12">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-[1fr,3fr] gap-8 group"
            >
              {/* Publication Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={pub.image}
                  alt={pub.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                    {pub.title}
                  </h3>
                  
                  <p className="text-base">
                    {pub.authors.map((author, idx) => (
                      <span key={idx}>
                        {author.isMe ? (
                          <strong className="text-purple-600 dark:text-purple-400">{author.name}</strong>
                        ) : (
                          author.name
                        )}
                        {idx < pub.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {pub.venue}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mt-3 mb-3">
                  {pub.description}
                </p>

                <div className="flex gap-4">
                  {pub.links.code && (
                    <Link 
                      href={pub.links.code}
                      target="_blank"
                      className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                    >
                      <BsGithub />
                      <span>Code</span>
                    </Link>
                  )}
                  {pub.links.paper && (
                    <Link 
                      href={pub.links.paper}
                      target="_blank"
                      className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                    >
                      <HiOutlineDocument />
                      <span>Paper</span>
                    </Link>
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