"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    image: "/images/hero-church.jpg",
    title: "Welcome to Ehden-Zgharta Parish",
    titleAr: "أهلاً بكم في رعيّة إهدن زغرتا",
    subtitle: "A Spiritual Home for Faith and Community",
  },
  {
    image: "/images/mar-sarkis-monastery.jpg",
    title: "Celebrating Our Faith Together",
    titleAr: "نحتفل بإيماننا معاً",
    subtitle: "Join us in prayer and worship",
  },
  {
    image: "/images/saydet-el-hosn.jpg",
    title: "Rich Heritage, Living Tradition",
    titleAr: "تراث غني، تقليد حي",
    subtitle: "Preserving our Maronite legacy for generations",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Images - removed faded logo overlay */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center text-white">
        <div className="max-w-4xl space-y-6">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 absolute"
              }`}
            >
              {index === currentSlide && (
                <>
                  <p className="text-lg md:text-xl text-white/80 font-light tracking-wide">
                    Maronite Patriarchal Eparchy
                  </p>
                  <h1 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                    {slide.title}
                  </h1>
                  {/* Arabic text centered under the title */}
                  <p className="mt-4 text-2xl md:text-3xl font-light text-secondary text-center" dir="rtl">
                    {slide.titleAr}
                  </p>
                  <p className="mt-6 text-lg md:text-xl text-white/90">
                    {slide.subtitle}
                  </p>
                </>
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8" asChild>
              <Link href="/mass-times">
                <Clock className="mr-2 h-5 w-5" />
                Mass Times
              </Link>
            </Button>
            {/* Fixed button - text visible before hover, changes on hover */}
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white bg-transparent text-white hover:bg-white hover:text-primary text-lg px-8" 
              asChild
            >
              <Link href="/yanabi3">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Yanabi3
              </Link>
            </Button>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-secondary" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
