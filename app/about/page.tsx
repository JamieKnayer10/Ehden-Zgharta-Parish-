"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Church, Heart, BookOpen, ArrowRight, ArrowLeft, Calendar, Star } from "lucide-react"

const values = [
  {
    icon: Church,
    title: "Faith",
    titleAr: "الإيمان",
    description: "Rooted in the Maronite tradition, we celebrate our faith through the Holy Liturgy and sacraments.",
  },
  {
    icon: Users,
    title: "Community",
    titleAr: "المجتمع",
    description: "Building strong bonds between families and generations, creating a supportive faith community.",
  },
  {
    icon: Heart,
    title: "Service",
    titleAr: "الخدمة",
    description: "Serving those in need through charitable works and outreach programs in our region.",
  },
  {
    icon: BookOpen,
    title: "Education",
    titleAr: "التعليم",
    description: "Nurturing faith formation for all ages through catechesis and religious education.",
  },
]

const milestones = [
  { year: "749 AD", event: "Founding of the first church in Ehden" },
  { year: "1283", event: "Establishment of Mar Mama Church" },
  { year: "1516", event: "Construction of St. George Cathedral in Zgharta" },
  { year: "1900", event: "Formation of the modern parish structure" },
  { year: "2000", event: "Launch of Radio Ehden" },
  { year: "2015", event: "Establishment of Zgharta Channel" },
]

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parish%20logo%202-GQnfE9BeZQCviAkTifBUZIW21fgdDk.jpg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center text-primary-foreground">
            <Badge variant="secondary" className="mb-4">About Us</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Maronite Patriarchal Eparchy
            </h1>
            <p className="mt-2 text-2xl font-light text-primary-foreground/80">
              Vicariate of Ehden-Zgharta
            </p>
            <p className="mt-4 text-xl text-secondary text-center" dir="rtl">
              الأبرشية البطريركية المارونية - نيابة إهدن زغرتا
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

        {/* Introduction */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  A Spiritual Home for Faith and Community
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Maronite Patriarchal Eparchy, Vicariate of Ehden-Zgharta, serves as the spiritual 
                    center for the faithful communities of Ehden and Zgharta in North Lebanon. Our parish 
                    has been a beacon of faith, preserving the rich Maronite heritage for generations.
                  </p>
                  <p>
                    Under the guidance of our dedicated clergy and with the support of our vibrant community, 
                    we continue to celebrate the Holy Mysteries, serve those in need, and pass on our 
                    traditions to future generations.
                  </p>
                  <p>
                    Our vicariate encompasses numerous historic churches and monasteries, each with its 
                    own unique history and spiritual significance. Together, they form a network of faith 
                    that has sustained our community through centuries.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/about/history">
                      Our History
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about/vicar">Meet Our Vicar</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parish%20logo%201-mitgiaYfxx03is83NrGSsXlCSCa0Ao.jpg"
                    alt="Parish Emblem"
                    fill
                    className="object-contain bg-white p-8"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg">
                  <p className="font-serif text-4xl font-bold">1200+</p>
                  <p className="text-sm">Years of Faith</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground">Our Values</h2>
              <p className="mt-2 text-muted-foreground">The pillars that guide our community</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-lg text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1" dir="rtl">{value.titleAr}</p>
                    <p className="text-sm text-muted-foreground mt-3">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground">Our Journey Through Time</h2>
              <p className="mt-2 text-muted-foreground">Key moments in our parish history</p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <Card className="inline-block border-none shadow-md">
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2">{milestone.year}</Badge>
                          <p className="text-sm text-foreground">{milestone.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background shadow" />
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="/about/history">
                  Read Full History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-center mb-8">Learn More About Us</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/about/vicar" className="group">
                <Card className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary-foreground/10">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">The Vicar</h3>
                      <p className="text-sm text-primary-foreground/70">Meet our spiritual leader</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/about/history" className="group">
                <Card className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary-foreground/10">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Our History</h3>
                      <p className="text-sm text-primary-foreground/70">Centuries of faith</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/patriarch-douaihy" className="group">
                <Card className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary-foreground/10">
                      <Star className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Blessed Patriarch Douaihy</h3>
                      <p className="text-sm text-primary-foreground/70">Our patron blessed</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
