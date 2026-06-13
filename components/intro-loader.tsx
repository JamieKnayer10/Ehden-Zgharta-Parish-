"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function IntroLoader() {
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    // Begin fade-out shortly after mount
    const fadeTimer = setTimeout(() => setHidden(true), 1400)
    // Remove from DOM after the fade transition completes
    const removeTimer = setTimeout(() => setMounted(false), 2100)

    // Prevent background scroll while the loader is visible
    document.body.style.overflow = "hidden"

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = ""
    }
  }, [hidden])

  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ease-out ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-28 w-28 animate-[intro-pop_0.7s_ease-out] sm:h-32 sm:w-32">
          <Image
            src="/images/parish logo 2 no background.png"
            alt="Ehden-Zgharta Parish logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full origin-left animate-[intro-bar_1.4s_ease-in-out] bg-primary" />
        </div>
      </div>
    </div>
  )
}
