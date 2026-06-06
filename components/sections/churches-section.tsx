"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowRight, MapPin } from "lucide-react"

const churches = [
  {
    id: 1,
    name: "Mar Mama Church",
    nameAr: "كنيسة مار ماما",
    location: "Ehden",
    image: "/images/mar-mama-church.jpg",
    slug: "mar-mama",
  },
  {
    id: 2,
    name: "St. George Cathedral",
    nameAr: "كاتدرائية مار جرجس",
    location: "Zgharta",
    image: "/images/st-george-cathedral.jpg",
    slug: "st-george-cathedral",
  },
  {
    id: 3,
    name: "Our Lady of Zgharta",
    nameAr: "سيدة زغرتا",
    location: "Zgharta",
    image: "/images/our-lady-zgharta.jpg",
    slug: "our-lady-zgharta",
  },
  {
    id: 4,
    name: "Mar Sarkis Monastery",
    nameAr: "دير مار سركيس",
    location: "Ehden",
    image: "/images/mar-sarkis-monastery.jpg",
    slug: "mar-sarkis-monastery",
  },
  {
    id: 5,
    name: "Saydet el Hosn",
    nameAr: "سيدة الحصن",
    location: "Ehden",
    image: "/images/saydet-el-hosn.jpg",
    slug: "saydet-el-hosn",
  },
]

export function ChurchesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Our Heritage</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-foreground">
              Churches & Holy Sites
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover the historic churches and monasteries of Ehden and Zgharta
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Churches Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {churches.map((church) => (
            <Card
              key={church.id}
              className="shrink-0 w-[280px] md:w-[320px] border-none shadow-lg overflow-hidden group snap-start"
            >
              <Link href={`/churches/${church.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={church.image}
                    alt={church.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {church.location}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {church.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1" dir="rtl">
                    {church.nameAr}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/churches" className="flex items-center gap-2">
              Explore All Churches
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
