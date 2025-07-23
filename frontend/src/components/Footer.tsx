"use client"

import { useState, useEffect } from "react"

export default function Footer() {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[75rem] mx-auto py-6 px-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {year || 2024} Arpandeep Khatua. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Last updated: March 2024
        </p>
      </div>
    </footer>
  )
} 