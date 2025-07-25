"use client"

import { createContext, useContext, useState } from "react"

export type SectionName =
  | "About"
  | "Experience"
  | "Education"
  | "Publications"
  | "Projects"
  | "Hobbies"
  | "Contact"

type ActiveSectionContextType = {
  activeSection: SectionName
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>
  timeOfLastClick: number
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>
}

export const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null)

export default function ActiveSectionContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeSection, setActiveSection] = useState<SectionName>("About")
  const [timeOfLastClick, setTimeOfLastClick] = useState(() => {
    if (typeof window !== "undefined") {
      return Date.now()
    }
    return 0
  })

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext)

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    )
  }

  return context
} 