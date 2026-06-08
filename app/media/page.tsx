import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Camera, Video, Tv, Radio } from "lucide-react"

const mediaSections = [
  {
    id: "gallery",
    title: "Photo Gallery",
    titleAr: "معرض الصور",
    description:
      "Explore the beauty of Ehden and Zgharta through our curated collection of photographs.",
    icon: Camera,
    image: "/images/ehden-landscape.jpg",
    href: "/media/gallery",
    cta: "Browse Photos",
  },
  {
    id: "videos",
    title: "Video Gallery",
    titleAr: "معرض الفيديوهات",
    description:
      "Watch liturgical broadcasts, documentaries, and community events from our parish.",
    icon: Video,
    image: "/images/mountain-sunset.jpg",
    href: "/media/videos",
    cta: "Watch Videos",
  },
  {
    id: "zgharta-channel",
    title: "Zgharta Channel",
    titleAr: "قناة زغرتا",
    description:
      "Our official channel broadcasting Mass, parish news, and special celebrations.",
    icon: Tv,
    image: "/images/zgharta channel logo.jpg",
    href: "/zgharta-channel",
    cta: "Visit Channel",
  },
  {
    id: "radio-ehden",
    title: "Radio Ehden",
    titleAr: "إذاعة إهدن",
    description:
      "Listen to spiritual programs, hymns, and live broadcasts from Radio Ehden.",
    icon: Radio,
    image: "/images/radio ehden logo.jpg",
    href: "/radio-ehden",
    cta: "Listen Live",
  },
]

export default function MediaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20">
          <div className="absolute inset-0 bg-[url('/images/ehden-landscape.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center text-primary-foreground">
            <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
              <Camera className="mr-2 h-4 w-4" />
              Media Center
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">Media</h1>
            <p className="mt-2 text-2xl font-light text-primary-foreground/80" dir="rtl">
              الوسائط
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
              Discover photos, videos, broadcasts, and radio from the Maronite Parish of Ehden and
              Zgharta.
            </p>
          </div>
        </section>

        {/* Media Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {mediaSections.map((section) => (
                <Card
                  key={section.id}
                  className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href={section.href}>
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-xl bg-primary p-3 text-primary-foreground shadow-lg">
                        <section.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-secondary mt-1" dir="rtl">
                        {section.titleAr}
                      </p>
                      <p className="text-muted-foreground mt-2">{section.description}</p>
                      <p className="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        {section.cta}
                        <ArrowRight className="h-4 w-4" />
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
