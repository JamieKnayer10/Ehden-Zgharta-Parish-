import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Church, BookOpen, Users, MapPin } from "lucide-react"

const historicalPeriods = [
  {
    era: "Early Christianity (4th - 7th Century)",
    eraAr: "المسيحية المبكرة",
    events: [
      {
        year: "400 AD",
        title: "First Christian Communities",
        description: "Christianity spreads to the mountains of North Lebanon, with early believers establishing small communities in Ehden and surrounding areas.",
      },
      {
        year: "685 AD",
        title: "Maronite Presence Established",
        description: "Maronite monks and faithful, following the tradition of Saint Maron, settle in the region and begin organizing religious life.",
      },
      {
        year: "749 AD",
        title: "First Church in Ehden",
        description: "The first documented church is established in Ehden, marking the beginning of organized parish life in the region.",
      },
    ],
  },
  {
    era: "Medieval Period (8th - 15th Century)",
    eraAr: "العصور الوسطى",
    events: [
      {
        year: "1283",
        title: "Mar Mama Church Founded",
        description: "The historic Mar Mama Church is established in Ehden, becoming a center of faith and community for generations.",
      },
      {
        year: "1440",
        title: "Expansion of Monasteries",
        description: "Several monasteries are founded in the region, including those that would later become important pilgrimage sites.",
      },
    ],
  },
  {
    era: "Ottoman Era (16th - 19th Century)",
    eraAr: "العهد العثماني",
    events: [
      {
        year: "1516",
        title: "St. George Cathedral Built",
        description: "The magnificent St. George Cathedral is constructed in Zgharta, showcasing the skill of local craftsmen and the devotion of the faithful.",
      },
      {
        year: "1630",
        title: "Birth of Patriarch Douaihy",
        description: "Stephane Douaihy, future Patriarch and now Blessed, is born in Ehden, destined to become one of the most important figures in Maronite history.",
      },
      {
        year: "1670",
        title: "Douaihy Becomes Patriarch",
        description: "Patriarch Stephane Douaihy begins his 34-year leadership, organizing the Church and preserving its heritage through extensive writings.",
      },
      {
        year: "1860",
        title: "Rebuilding After Conflict",
        description: "Following regional conflicts, the community comes together to rebuild and strengthen their churches and institutions.",
      },
    ],
  },
  {
    era: "Modern Era (20th - 21st Century)",
    eraAr: "العصر الحديث",
    events: [
      {
        year: "1900",
        title: "Modern Parish Structure",
        description: "The Vicariate of Ehden-Zgharta is formally organized under the Maronite Patriarchal Eparchy, establishing the current administrative structure.",
      },
      {
        year: "1975-1990",
        title: "Perseverance During Hardship",
        description: "The parish maintains its mission throughout the Lebanese civil war, providing spiritual support and humanitarian aid to the community.",
      },
      {
        year: "2000",
        title: "Launch of Radio Ehden",
        description: "Radio Ehden begins broadcasting, bringing the voice of the parish to homes throughout Lebanon and the diaspora.",
      },
      {
        year: "2015",
        title: "Zgharta Channel Established",
        description: "The parish expands its media presence with Zgharta Channel, broadcasting liturgies, news, and cultural programs.",
      },
      {
        year: "2024",
        title: "Beatification of Patriarch Douaihy",
        description: "Patriarch Stephane Douaihy is beatified on August 2, 2024, a historic moment for Ehden and the entire Maronite Church.",
      },
    ],
  },
]

const stats = [
  { number: "1,200+", label: "Years of Faith", labelAr: "سنة من الإيمان" },
  { number: "12", label: "Historic Churches", labelAr: "كنيسة تاريخية" },
  { number: "6", label: "Monasteries", labelAr: "أديرة" },
  { number: "50,000+", label: "Faithful Served", labelAr: "مؤمن" },
]

export default function HistoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <BookOpen className="absolute right-10 top-10 h-64 w-64 rotate-12" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center text-primary-foreground">
            <Badge variant="secondary" className="mb-4">Our Heritage</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Our History
            </h1>
            <p className="mt-4 text-2xl font-light text-primary-foreground/80 text-center" dir="rtl">
              تاريخنا العريق
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              A journey through centuries of faith, resilience, and devotion in the heart of North Lebanon
            </p>
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

        {/* Stats */}
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-serif text-4xl md:text-5xl font-bold text-primary">{stat.number}</p>
                  <p className="text-foreground font-medium mt-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground" dir="rtl">{stat.labelAr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="space-y-16">
              {historicalPeriods.map((period, periodIndex) => (
                <div key={periodIndex}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                        {period.era}
                      </h2>
                      <p className="text-muted-foreground" dir="rtl">{period.eraAr}</p>
                    </div>
                  </div>
                  
                  <div className="relative ml-6 border-l-2 border-secondary/30 pl-8 space-y-8">
                    {period.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="relative">
                        <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-secondary border-4 border-background" />
                        <Card className="border-none shadow-md">
                          <CardContent className="p-6">
                            <Badge variant="secondary" className="mb-2">{event.year}</Badge>
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                              {event.title}
                            </h3>
                            <p className="text-muted-foreground mt-2">{event.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Churches Section */}
        <section className="py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground">Historic Churches</h2>
              <p className="mt-2 text-muted-foreground">
                Our vicariate is home to some of the oldest churches in the Maronite world
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <Church className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold">Mar Mama Church</h3>
                  <p className="text-sm text-muted-foreground mt-1" dir="rtl">كنيسة مار ماما</p>
                  <p className="text-muted-foreground mt-3 text-sm">
                    Founded in 1283, one of the oldest churches in Ehden
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-3 text-sm text-secondary">
                    <MapPin className="h-4 w-4" />
                    <span>Ehden</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <Church className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold">St. George Cathedral</h3>
                  <p className="text-sm text-muted-foreground mt-1" dir="rtl">كاتدرائية مار جرجس</p>
                  <p className="text-muted-foreground mt-3 text-sm">
                    Built in 1516, the main cathedral of Zgharta
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-3 text-sm text-secondary">
                    <MapPin className="h-4 w-4" />
                    <span>Zgharta</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <Church className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold">Our Lady of Zgharta</h3>
                  <p className="text-sm text-muted-foreground mt-1" dir="rtl">سيدة زغرتا</p>
                  <p className="text-muted-foreground mt-3 text-sm">
                    A beloved Marian shrine in the heart of Zgharta
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-3 text-sm text-secondary">
                    <MapPin className="h-4 w-4" />
                    <span>Zgharta</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/churches">
                  View All Churches
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <h2 className="font-serif text-3xl font-bold">Be Part of Our Story</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
              Our history continues to be written by the faithful who gather each week to worship, 
              serve, and build community. Join us and become part of this living tradition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/mass-times">Join Us for Mass</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
