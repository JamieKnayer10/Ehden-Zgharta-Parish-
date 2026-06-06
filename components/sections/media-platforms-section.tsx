"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Radio, Tv, Volume2 } from "lucide-react"

export function MediaPlatformsSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Watch & Listen</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold">Our Media Platforms</h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Stay connected with live broadcasts, religious programming, and spiritual content from our community
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Zgharta Channel Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <Tv className="h-48 w-48 -rotate-12 translate-x-8 -translate-y-8" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zgharta%20channel%20logo-rPVGuQhyx5iXVzOiX2ItOUKodL3gmo.jpg"
                  alt="Zgharta Channel"
                  width={80}
                  height={80}
                  className="h-20 w-auto rounded-lg bg-white p-2"
                />
                <div className="flex items-center gap-2 bg-destructive/90 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span className="text-sm font-semibold text-white">LIVE</span>
                </div>
              </div>
              
              <h3 className="font-serif text-2xl font-bold mb-2">Zgharta Channel</h3>
              <p className="text-white/70 mb-6">
                Watch live church broadcasts, religious programs, and community events from the churches of Ehden and Zgharta.
              </p>
              
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-white/60 mb-1">Now Playing</p>
                <p className="font-semibold">Sunday Morning Mass - Mar Mama Church</p>
              </div>
              
              <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-white/90" asChild>
                <Link href="/zgharta-channel" className="flex items-center justify-center gap-2">
                  <Play className="h-5 w-5" />
                  Watch Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Radio Ehden Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-700 to-sky-900 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <Radio className="h-48 w-48 -rotate-12 translate-x-8 -translate-y-8" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/radio%20ehden%20logo-b7zXcUIR3maHfovbEt0keF4lm9v1L8.jpg"
                  alt="Radio Ehden"
                  width={80}
                  height={80}
                  className="h-20 w-auto rounded-lg bg-white p-2"
                />
                <div className="flex items-center gap-2 bg-green-500/90 px-3 py-1.5 rounded-full">
                  <Volume2 className="h-4 w-4 text-white animate-pulse" />
                  <span className="text-sm font-semibold text-white">ON AIR</span>
                </div>
              </div>
              
              <h3 className="font-serif text-2xl font-bold mb-2">Radio Ehden</h3>
              <p className="text-sm text-white/70 mb-1">Voice of Wisdom & Faith</p>
              <p className="text-white/70 mb-6">
                Listen to live news, religious content, music, and inspiring talk shows broadcasting to our community worldwide.
              </p>
              
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-white/60 mb-1">Now Playing</p>
                <p className="font-semibold">Morning Reflections with Fr. Georges</p>
              </div>
              
              <Button size="lg" className="w-full bg-white text-sky-900 hover:bg-white/90" asChild>
                <Link href="/radio-ehden" className="flex items-center justify-center gap-2">
                  <Radio className="h-5 w-5" />
                  Listen Live
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
