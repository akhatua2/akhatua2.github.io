"use client"

import { motion } from "framer-motion"
import Section from "./Section"
import Image from "next/image"
import { BsPinAngle } from "react-icons/bs"

const hobbies = [
  {
    title: "Painting",
    caption: "Oil on canvas - my latest work",
    imageUrl: "/hobbies/painting.jpg",
    rotate: "-8deg",
    scale: "1.1",
    position: { top: "0%", left: "0%" },
    width: "32%",
    zIndex: 5
  },
  {
    title: "Debating",
    caption: "President @ Toastmasters International Gavel Club",
    imageUrl: "/hobbies/debate.jpg",
    rotate: "6deg",
    scale: "1.0",
    position: { top: "5%", left: "35%" },
    width: "32%",
    zIndex: 4
  },
  {
    title: "Hiking",
    caption: "Looking forward to recreate the macOS wallpaper pictures",
    imageUrl: "/hobbies/hiking.jpg",
    rotate: "-5deg",
    scale: "1.0",
    position: { top: "5%", right: "0%" },
    width: "32%",
    zIndex: 3
  },
  {
    title: "Cooking",
    caption: "Trying out new recipes every weekend!",
    imageUrl: "/hobbies/cooking.jpg",
    rotate: "7deg",
    scale: "1.0",
    position: { bottom: "5%", left: "18%" },
    width: "32%",
    zIndex: 2
  },
  {
    title: "Entertainment",
    caption: '"If I can\'t scuba what\'s this all about?"',
    imageUrl: "/hobbies/entertainment.jpg",
    rotate: "-6deg",
    scale: "1.0",
    position: { bottom: "5%", right: "18%" },
    width: "32%",
    zIndex: 1
  }
]

export default function Hobbies() {
  return (
    <Section id="Hobbies" className="relative">
      <motion.h2
        className="text-3xl font-bold mb-24 text-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Recreational Interests
      </motion.h2>

      <div className="relative min-h-[800px] w-full">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={index}
            className="absolute group"
            style={{
              transform: `rotate(${hobby.rotate}) scale(${hobby.scale})`,
              transformOrigin: "center",
              width: hobby.width,
              ...hobby.position,
              zIndex: hobby.zIndex
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ 
              rotate: "0deg", 
              scale: 1.05,
              zIndex: 10,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-gray-400 opacity-70 z-10 group-hover:text-blue-400 transition-colors duration-300">
              <BsPinAngle size={24} />
            </div>
            <div className="h-fit rounded-sm border border-gray-100 bg-gradient-to-br from-yellow-50 to-yellow-100/90 p-3 shadow-[2px_3px_8px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:shadow-[3px_5px_12px_rgba(0,0,0,0.2)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={hobby.imageUrl}
                  alt={hobby.title}
                  fill
                  className="h-full object-cover object-center transition duration-500"
                />
              </div>
              
              <p className="h-fit p-1 py-2 text-left font-mono text-xs text-neutral-600">
                {hobby.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
} 