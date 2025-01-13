"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function AnimatedText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const text = texts[currentIndex]
    if (isTyping) {
      if (displayedText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        }, 50) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000) // Wait before starting to erase
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30) // Erasing speed
        return () => clearTimeout(timeout)
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      }
    }
  }, [displayedText, currentIndex, isTyping, texts])

  return (
    <div className="h-[60px] relative flex items-center justify-center">
      <motion.div
        key={currentIndex + displayedText}
        className="text-3xl sm:text-4xl font-bold"
      >
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
          {displayedText}
        </span>
        <span className="inline-block w-[3px] h-[1.1em] ml-1 bg-purple-600 animate-blink" />
      </motion.div>
    </div>
  )
} 