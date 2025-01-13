"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const images = [
  {
    src: "/profile.jpg",
    alt: "Arpan at UIUC",
    caption: "Research Poster @ KDD"
  },
  {
    src: "/stanford.jpg",
    alt: "Stanford Campus",
    caption: "Stanford Campus"
  },
  {
    src: "/meta.jpg",
    alt: "Meta Office",
    caption: "Meta HQ"
  }
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-[500px] w-full">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors shadow-lg"
      >
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors shadow-lg"
      >
      </button>

      <AnimatePresence mode="popLayout">
        {images.map((image, index) => {
          const position = (index - currentIndex + images.length) % images.length
          return (
            <motion.div
              key={image.src}
              className="absolute w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
              style={{
                zIndex: position === 0 ? 3 : position === 1 ? 2 : 1,
              }}
              initial={false}
              animate={{
                scale: position === 0 ? 1 : 0.9,
                y: position === 0 ? 0 : position === 1 ? 40 : 80,
                opacity: position === 0 ? 1 : position === 1 ? 0.6 : 0.3,
                rotateX: position === 0 ? 0 : -10,
                rotateY: position === 0 ? 0 : position === 1 ? 5 : -5,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              onClick={handleNext}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  quality={95}
                  priority={true}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
} 