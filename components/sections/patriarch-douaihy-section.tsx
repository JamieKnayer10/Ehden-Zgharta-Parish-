"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Star } from "lucide-react"

const newsUpdates = [
  {
    id: 1,
    title: "Anniversary of Beatification Celebration",
    titleAr: "الاحتفال بذكرى التطويب",
    date: "August 2, 2025",
    description: "Join us for the first anniversary celebration of Blessed Patriarch Douaihy's beatification at the Maronite Patriarchate.",
    type: "event",
  },
  {
    id: 2,
    title: "New Documentary Released",
    titleAr: "إصدار فيلم وثائقي جديد",
    date: "March 15, 2025",
    description: "A new documentary exploring the life and legacy of Blessed Patriarch Stephane Douaihy has been released.",
    type: "media",
  },
  {
    id: 3,
    title: "Pilgrimage to Qannobin",
    titleAr: "الحج إلى قنوبين",
    date: "Monthly",
    description: "Monthly pilgrimage to visit the resting place of Blessed Patriarch Douaihy at the Patriarchal Convent of Qannobin.",
    type: "pilgrimage",
  },
]

export function PatriarchDouaihySection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div>
            <Badge className="bg-secondary text-secondary-foreground mb-4">
              <Star className="h-3 w-3 mr-1" />
              From Our Parish
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Blessed Patriarch Stephane Douaihy
            </h2>
            <p className="text-2xl font-light text-secondary mt-2" dir="rtl">
              الطوباوي البطريرك إسطفان الدويهي
            </p>
            
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Born in Ehden in 1630, Patriarch Stephane Douaihy served as the Maronite Patriarch 
                from 1670 until his death in 1704. He is considered a pillar of the Maronite Church 
                and was beatified on August 2, 2024.
              </p>
              <p>
                Known for organizing the Maronite Church and his extensive scholarly work on 
                Maronite history, his body rests at the Patriarchal Convent of Qannobin in the 
                Holy Valley.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/patriarch-douaihy" className="flex items-center gap-2">
                  Learn His Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/patriarch-douaihy#pilgrimage">
                  Plan a Pilgrimage
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Image & News */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parish%20logo%202-GQnfE9BeZQCviAkTifBUZIW21fgdDk.jpg"
                alt="Blessed Patriarch Stephane Douaihy"
                fill
                className="object-contain bg-white p-8"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <Badge className="bg-secondary text-secondary-foreground">
                  Beatified August 2, 2024
                </Badge>
              </div>
            </div>

            {/* News Updates */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-secondary" />
                Latest Updates
              </h3>
              {newsUpdates.map((news) => (
                <Card key={news.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{news.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{news.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {news.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
