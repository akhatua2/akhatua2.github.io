"use client"

import { useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import { useActiveSectionContext } from "@/context/active-section-context"
import { SectionName } from "@/context/active-section-context"

export default function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode
  id: SectionName
  className?: string
}) {
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
      className={`scroll-mt-28 mb-28 max-w-[75rem] w-[90%] text-center sm:mb-40 ${className}`}
    >
      {children}
    </section>
  )
} 