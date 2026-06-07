import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Quote, Mail, Phone, Calendar, GraduationCap, Church, Heart } from "lucide-react"

const biography = [
  {
    year: "1958",
    title: "Born in Ehden",
    description: "Born to a devout Maronite family in Ehden, North Lebanon.",
  },
  {
    year: "1976",
    title: "Seminary Studies",
    description: "Entered the Maronite Seminary to pursue theological and philosophical studies.",
  },
  {
    year: "1984",
    title: "Ordination",
    description: "Ordained to the priesthood, beginning his lifelong service to the Maronite Church.",
  },
  {
    year: "1984-1995",
    title: "Parish Ministry",
    description: "Served faithfully in various parishes, dedicating himself to pastoral care and spiritual guidance.",
  },
  {
    year: "1995-2010",
    title: "Administrative Service",
    description: "Held various administrative positions within the Maronite Patriarchal Eparchy.",
  },
  {
    year: "2010",
    title: "Appointed Vicar",
    description: "Appointed as Patriarchal Vicar of Ehden-Zgharta, leading the faithful in this historic region.",
  },
]

const priorities = [
  {
    icon: Church,
    title: "Liturgical Life",
    description: "Ensuring vibrant and reverent celebration of the Holy Mysteries in all our churches.",
  },
  {
    icon: Heart,
    title: "Charitable Works",
    description: "Expanding our outreach to those in need throughout the region.",
  },
  {
    icon: GraduationCap,
    title: "Faith Formation",
    description: "Strengthening catechesis programs for all ages, from children to adults.",
  },
]

export default function VicarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20 overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="text-primary-foreground">
                <Badge variant="secondary" className="mb-4">Our Spiritual Leader</Badge>
                <h1 className="font-serif text-4xl md:text-5xl font-bold">
                  Meet Our Vicar
                </h1>
                <p className="mt-4 text-2xl font-light text-primary-foreground/80 text-center" dir="rtl">
                  النائب البطريركي
                </p>
                <p className="mt-6 text-xl text-primary-foreground/90">
                  Reverend Monsignor Joseph Naffah
                </p>
                <p className="mt-2 text-primary-foreground/80">
                  Patriarchal Vicar of Ehden-Zgharta
                </p>
                <p className="mt-6 text-primary-foreground/80 leading-relaxed">
                  Serving our community with dedication and love, Monsignor Naffah leads our vicariate 
                  in faith, worship, and service to those in need.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-white">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parish%20logo%202-GQnfE9BeZQCviAkTifBUZIW21fgdDk.jpg"
                    alt="Reverend Monsignor Joseph Naffah"
                    fill
                    className="object-contain p-8"
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
              {"\"Our mission is to be a beacon of faith and hope, serving God's people with love and humility, just as our Lord Jesus Christ taught us.\""}
            </blockquote>
            <p className="mt-4 text-muted-foreground">- Msgr. Joseph Naffah</p>
          </div>
        </section>

        {/* Biography Timeline */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground">Biography</h2>
              <p className="mt-2 text-muted-foreground">A life dedicated to service</p>
            </div>
            
            <div className="relative ml-6 border-l-2 border-secondary/30 pl-8 space-y-8">
              {biography.map((event, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-secondary border-4 border-background" />
                  <Card className="border-none shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-secondary" />
                        <Badge variant="secondary">{event.year}</Badge>
                      </div>
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pastoral Priorities */}
        <section className="py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground">Pastoral Priorities</h2>
              <p className="mt-2 text-muted-foreground">
                The key areas of focus for our vicariate under Monsignor Naffah&apos;s leadership
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {priorities.map((priority, index) => (
                <Card key={index} className="border-none shadow-lg text-center">
                  <CardContent className="p-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <priority.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{priority.title}</h3>
                    <p className="text-muted-foreground mt-2">{priority.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold">Contact the Vicar&apos;s Office</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
              For pastoral matters, appointments, or inquiries, please reach out to the vicar&apos;s office.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 rounded-full bg-primary-foreground/10">
                  <Phone className="h-5 w-5" />
                </div>
                <a href="tel:+96106660230" className="hover:text-secondary transition-colors">
                  +961 6 660 230
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 rounded-full bg-primary-foreground/10">
                  <Mail className="h-5 w-5" />
                </div>
                <a href="mailto:info@ehdenz.com" className="hover:text-secondary transition-colors">
                info@ehdenz.com
                </a>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link href="/contact">Schedule an Appointment</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
