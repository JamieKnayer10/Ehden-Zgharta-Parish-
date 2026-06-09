"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Church, Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react"

type Church = {
  id: number
  name: string
  nameAr: string
  location: string
  type: string
  patronSaint: string
  patronSaintAr: string
  description: string
  massSchedule: string
  image: string
  slug: string
  featured: boolean
}

const churches: Church[] = [
  {
    id: 1,
    name: "Mar Mama Church",
    nameAr: "كنيسة مار ماما",
    location: "Ehden",
    type: "church",
    patronSaint: "St. Mama",
    patronSaintAr: "القديس ماما",
    description: "One of the oldest churches in Ehden, dating back to 749 AD. Features Greek and Syriac inscriptions and is of great historical significance.",
    massSchedule: "Sunday: 8:00 AM, 10:30 AM | Weekdays: 7:00 AM",
    image: "/images/mar-mama-church.jpg",
    slug: "mar-mama",
    featured: true,
  },
  {
    id: 2,
    name: "St. George Cathedral",
    nameAr: "كاتدرائية مار جرجس",
    location: "Zgharta",
    type: "church",
    patronSaint: "St. George",
    patronSaintAr: "القديس جرجس",
    description: "The main cathedral of Zgharta, serving as the spiritual center of the town. Features stunning religious artwork and architecture.",
    massSchedule: "Sunday: 9:00 AM, 11:00 AM | Weekdays: 6:30 AM",
    image: "/images/st-george-cathedral.jpg",
    slug: "st-george-cathedral",
    featured: true,
  },
  {
    id: 3,
    name: "Our Lady of Zgharta",
    nameAr: "سيدة زغرتا",
    location: "Zgharta",
    type: "church",
    patronSaint: "Virgin Mary",
    patronSaintAr: "العذراء مريم",
    description: "A beautiful church dedicated to the Virgin Mary, featuring traditional Maronite architecture and sacred iconography.",
    massSchedule: "Sunday: 10:00 AM | Saturday: 6:00 PM",
    image: "/images/our-lady-zgharta.jpg",
    slug: "our-lady-zgharta",
    featured: false,
  },
  {
    id: 4,
    name: "Mar Sarkis Monastery",
    nameAr: "دير مار سركيس",
    location: "Ehden",
    type: "monastery",
    patronSaint: "St. Sergius & St. Bacchus",
    patronSaintAr: "القديس سركيس وباخوس",
    description: "An ancient monastery dating to the 8th century, perched on mountains above Ehden with panoramic views of the valley.",
    massSchedule: "Sunday: 8:00 AM | Daily: 6:00 AM",
    image: "/images/mar-sarkis-monastery.jpg",
    slug: "mar-sarkis-monastery",
    featured: true,
  },
  {
    id: 5,
    name: "Saydet el Hosn",
    nameAr: "سيدة الحصن",
    location: "Ehden",
    type: "church",
    patronSaint: "Virgin Mary",
    patronSaintAr: "العذراء مريم",
    description: "A historic pilgrimage site with a modern church and iconic white Virgin Mary statue offering panoramic mountain views.",
    massSchedule: "Sunday: 9:30 AM | Weekdays: 7:30 AM",
    image: "/images/saydet-el-hosn.jpg",
    slug: "saydet-el-hosn",
    featured: false,
  },
  {
    id: 6,
    name: "Mar Doumit Chapel",
    nameAr: "كنيسة مار ضومط",
    location: "Ehden",
    type: "chapel",
    patronSaint: "St. Doumit",
    patronSaintAr: "القديس ضومط",
    description: "A small historic chapel in the heart of old Ehden, representing the rich religious heritage of the region.",
    massSchedule: "Feast days only",
    image: "/images/mar-mama-church.jpg",
    slug: "mar-doumit",
    featured: false,
  },
]

const typeLabels: Record<string, string> = {
  church: "Church",
  monastery: "Monastery",
  chapel: "Chapel",
}

export default function ChurchesPage() {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState("all")

  const filteredChurches = churches.filter((church) =>
    selectedLocation === "all" || church.location.toLowerCase() === selectedLocation
  )

  const featuredChurches = churches.filter((c) => c.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Church className="absolute right-10 top-10 h-64 w-64 rotate-12" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center text-primary-foreground">
            <Badge variant="secondary" className="mb-4">Our Heritage</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Churches & Holy Sites
            </h1>
            <p className="mt-2 text-2xl font-light text-primary-foreground/80" dir="rtl">
              كنائس ومواقع مقدسة
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Discover the historic churches, monasteries, and chapels of Ehden and Zgharta
              that have been centers of faith for generations
            </p>
          </div>
        </section>

        {/* Back Navigation */}
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </section>

        {/* Featured Churches */}
        <section className="py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Featured Holy Sites</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredChurches.map((church) => (
                <Card key={church.id} className="group overflow-hidden border-none shadow-xl">
                  <Link href={`/churches/${church.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={church.image}
                        alt={church.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Badge className="mb-2 bg-secondary text-secondary-foreground">
                          {typeLabels[church.type]}
                        </Badge>
                        <h3 className="font-serif text-2xl font-bold text-white">{church.name}</h3>
                        <p className="text-white/80 mt-1" dir="rtl">{church.nameAr}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
                          <MapPin className="h-4 w-4" />
                          {church.location}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Churches */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedLocation}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">All Holy Sites</h2>
                  <p className="text-muted-foreground mt-1">Explore all churches and monasteries in our region</p>
                </div>
                <TabsList className="bg-muted">
                  <TabsTrigger value="all">All Locations</TabsTrigger>
                  <TabsTrigger value="ehden">Ehden</TabsTrigger>
                  <TabsTrigger value="zgharta">Zgharta</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <ChurchGrid churches={filteredChurches} />
              </TabsContent>
              <TabsContent value="ehden" className="mt-0">
                <ChurchGrid churches={filteredChurches} />
              </TabsContent>
              <TabsContent value="zgharta" className="mt-0">
                <ChurchGrid churches={filteredChurches} />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Mass Times CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <h2 className="font-serif text-3xl font-bold mb-4">Looking for Mass Times?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              View the complete mass schedule for all churches in Ehden and Zgharta
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/mass-times" className="flex items-center gap-2">
                View Mass Schedule
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ChurchGrid({ churches }: { churches: Church[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {churches.map((church) => (
        <Card key={church.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
          <Link href={`/churches/${church.slug}`}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={church.image}
                alt={church.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-background/90 text-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {church.location}
                </Badge>
                <Badge variant="outline" className="bg-background/90 border-secondary text-secondary">
                  {typeLabels[church.type]}
                </Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {church.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1" dir="rtl">{church.nameAr}</p>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{church.description}</p>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span className="truncate">{church.massSchedule}</span>
              </div>
              <p className="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}