"use client"

import { useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import { useActiveSectionContext } from "@/context/active-section-context"
import { SectionName } from "@/lib/data"

type SectionProps = {
  children: React.ReactNode
  id: SectionName
  className?: string
}

export default function Section({ children, id, className = "" }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext()
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
  })

  useEffect(() => {
    if (isInView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(id)
    }
  }, [isInView, setActiveSection, id, timeOfLastClick])

  return (
    <section
      ref={ref}
      id={id.toLowerCase()}
      className={`scroll-mt-28 mb-12 max-w-[1100px] mx-auto px-8 sm:px-12 lg:px-16 ${className}`}
    >
      {children}
    </section>
  )
} 