"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  MapPin, 
  BookOpen, 
  Star, 
  Church, 
  ArrowLeft,
  ArrowRight,
  Quote,
  Users
} from "lucide-react"

const timeline = [
  {
    year: "1630",
    title: "Birth in Ehden",
    titleAr: "الولادة في إهدن",
    description: "Stephane Douaihy was born in the village of Ehden in North Lebanon to a devout Maronite family.",
  },
  {
    year: "1656",
    title: "Ordained Priest",
    titleAr: "الرسامة الكهنوتية",
    description: "After completing his studies in Rome at the Maronite College, he was ordained a priest.",
  },
  {
    year: "1668",
    title: "Bishop of Cyprus",
    titleAr: "أسقف قبرص",
    description: "Appointed as the Archbishop of the Maronites in Cyprus, serving the diaspora community.",
  },
  {
    year: "1670",
    title: "Elected Patriarch",
    titleAr: "انتخابه بطريركاً",
    description: "Elected as the 57th Patriarch of Antioch and All the East, serving for 34 years.",
  },
  {
    year: "1704",
    title: "Death at Qannobin",
    titleAr: "الوفاة في قنوبين",
    description: "Passed away at the Patriarchal Convent of Qannobin in the Holy Valley, where his body still rests.",
  },
  {
    year: "2008",
    title: "Declared Venerable",
    titleAr: "إعلانه مكرماً",
    description: "Pope Benedict XVI declared him Venerable, recognizing his heroic virtues.",
  },
  {
    year: "2024",
    title: "Beatification",
    titleAr: "التطويب",
    description: "Beatified on August 2, 2024, at Bkerke following the authentication of a miracle attributed to his intercession.",
  },
]

const achievements = [
  {
    icon: Church,
    title: "Church Organization",
    description: "Unified and organized the Maronite Church, establishing consistent customs and references.",
  },
  {
    icon: BookOpen,
    title: "Historical Works",
    description: "Authored extensive works on Maronite history and the role of Christians in the East.",
  },
  {
    icon: Users,
    title: "Education",
    description: "Founded numerous schools and convents, transforming Mount Lebanon from illiterate to prosperous.",
  },
]

const newsUpdates = [
  {
    id: 1,
    date: "August 2, 2025",
    title: "First Anniversary of Beatification",
    description: "Grand celebration planned at Bkerke and Ehden to commemorate one year since the beatification.",
    type: "event",
  },
  {
    id: 2,
    date: "Monthly",
    title: "Pilgrimage to Qannobin",
    description: "Join the monthly pilgrimage to visit the resting place of Blessed Patriarch Douaihy.",
    type: "pilgrimage",
  },
  {
    id: 3,
    date: "Ongoing",
    title: "Prayer Novena",
    description: "Nine-day prayer novena seeking the intercession of Blessed Patriarch Douaihy.",
    type: "prayer",
  },
]

export default function PatriarchDouaihyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Star className="absolute right-10 top-10 h-64 w-64 rotate-12" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="text-primary-foreground">
                <Badge variant="secondary" className="mb-4">
                  <Star className="h-3 w-3 mr-1" />
                  Blessed - Beatified August 2, 2024
                </Badge>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
                  Patriarch Stephane Douaihy
                </h1>
                {/* Arabic text aligned with title */}
                <p className="mt-4 text-3xl font-light text-secondary" dir="rtl">
                  الطوباوي البطريرك إسطفان الدويهي
                </p>
                <p className="mt-4 text-lg text-primary-foreground/80">
                  1630 - 1704 | Born in Ehden, Lebanon
                </p>
                <p className="mt-6 text-primary-foreground/90 text-lg leading-relaxed">
                  The 57th Patriarch of Antioch and All the East, a pillar of the Maronite Church, 
                  prolific historian, and devoted servant of God. Now beatified and on the path to sainthood.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="#pilgrimage" className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Plan a Pilgrimage
                    </a>
                  </Button>
                  {/* Fixed button - text visible before hover */}
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white bg-transparent text-white hover:bg-white hover:text-primary" 
                    asChild
                  >
                    <a href="#timeline" className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      View Timeline
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/Estephan doueihy1.png"
                    alt="Blessed Patriarch Stephane Douaihy"
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back Navigation */}
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <Button variant="ghost" asChild>
              <Link href="/about" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to About
              </Link>
            </Button>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-12 bg-secondary/10">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <Quote className="h-12 w-12 text-secondary mx-auto mb-4" />
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground italic">
              {"\"The land of holiness offers saints to the whole world; through their intercession we will resist.\""}
            </blockquote>
            <p className="mt-4 text-muted-foreground">- Said about the beatification</p>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                His Legacy
              </h2>
              <p className="text-muted-foreground mt-2">
                The lasting contributions of Blessed Patriarch Douaihy to the Maronite Church
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-none shadow-lg text-center">
                  <CardContent className="p-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{achievement.title}</h3>
                    <p className="text-muted-foreground mt-2">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="py-16 lg:py-24 bg-muted/50">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Life Timeline
              </h2>
              <p className="text-muted-foreground mt-2">
                Key moments in the life of Blessed Patriarch Douaihy
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary/30" />
              
              <div className="space-y-8">
                {timeline.map((event, index) => (
                  <div key={index} className="relative flex gap-6 md:gap-10">
                    <div className="shrink-0 w-16 text-right">
                      <span className="font-serif text-xl font-bold text-secondary">{event.year}</span>
                    </div>
                    <div className="shrink-0 w-4 h-4 mt-1.5 rounded-full bg-secondary ring-4 ring-background relative z-10" />
                    <Card className="flex-1 border-none shadow-md">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <p className="text-sm text-secondary" dir="rtl">{event.titleAr}</p>
                        <p className="text-muted-foreground mt-2 text-sm">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News & Updates */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                News & Upcoming Events
              </h2>
              <p className="text-muted-foreground mt-2">
                Stay updated on celebrations and events related to Blessed Patriarch Douaihy
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {newsUpdates.map((news) => (
                <Card key={news.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{news.type}</Badge>
                      <span className="text-sm text-muted-foreground">{news.date}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">{news.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">{news.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pilgrimage Section */}
        <section id="pilgrimage" className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <MapPin className="h-3 w-3 mr-1" />
                  Visit His Resting Place
                </Badge>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">
                  Pilgrimage to Qannobin
                </h2>
                <p className="mt-4 text-primary-foreground/80 text-lg">
                  The body of Blessed Patriarch Stephane Douaihy rests at the Patriarchal Convent 
                  of Qannobin in the Holy Valley (Wadi Qadisha), a UNESCO World Heritage Site.
                </p>
                <p className="mt-4 text-primary-foreground/80">
                  The convent, nestled in the cliffs of the sacred valley, offers a profound 
                  spiritual experience. Pilgrims can visit his tomb, attend mass, and walk 
                  in the footsteps of countless saints who lived in this holy place.
                </p>
                <div className="mt-8">
                  <h3 className="font-semibold mb-4">How to Visit:</h3>
                  <ul className="space-y-2 text-primary-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">1.</span>
                      Contact the parish office to join an organized pilgrimage
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">2.</span>
                      Monthly pilgrimages are organized from Ehden and Zgharta
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">3.</span>
                      The convent is accessible by car with a short hike
                    </li>
                  </ul>
                </div>
                <Button size="lg" variant="secondary" className="mt-8" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    Contact for Pilgrimage Info
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-church.jpg"
                  alt="Qannobin Monastery in Wadi Qadisha"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold">Qannobin Monastery</p>
                  <p className="text-white/80 text-sm">Wadi Qadisha, Holy Valley</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
