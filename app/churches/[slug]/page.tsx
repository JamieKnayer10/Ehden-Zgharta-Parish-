import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Calendar, Church, Phone, ArrowRight } from "lucide-react"

const churches = [
  {
    id: 1,
    name: "Mar Mama Church",
    nameAr: "كنيسة مار ماما",
    location: "Ehden",
    type: "church",
    patronSaint: "St. Mama",
    patronSaintAr: "القديس ماما",
    description: "One of the oldest churches in Ehden, dating back to 749 AD. Features Greek and Syriac inscriptions and is of great historical significance to the Maronite heritage.",
    history: "Mar Mama Church stands as one of the oldest and most historically significant churches in Ehden, with origins dating back to 749 AD. The church is dedicated to Saint Mama, a shepherd martyr from Caesarea. The building features remarkable Greek and Syriac inscriptions that have been preserved over the centuries, making it an important site for historical and religious studies.",
    architecture: "The church showcases traditional Lebanese mountain architecture with thick stone walls designed to withstand the harsh mountain winters. The interior features ancient frescoes and religious iconography that have been carefully preserved.",
    massSchedule: [
      { day: "Sunday", times: ["8:00 AM", "10:30 AM"] },
      { day: "Weekdays", times: ["7:00 AM"] },
      { day: "Saturday", times: ["6:00 PM"] },
    ],
    image: "/images/mar-mama-church.jpg",
    slug: "mar-mama",
    phone: "+961 6 660 230",
  },
  {
    id: 2,
    name: "St. George Cathedral",
    nameAr: "كاتدرائية مار جرجس",
    location: "Zgharta",
    type: "church",
    patronSaint: "St. George",
    patronSaintAr: "القديس جرجس",
    description: "The main cathedral of Zgharta, serving as the spiritual center of the town. Features stunning religious artwork and impressive Maronite architecture.",
    history: "St. George Cathedral has served as the main parish church and spiritual center of Zgharta for centuries. Dedicated to Saint George, the great martyr, the cathedral has been witness to countless baptisms, weddings, and funerals of the faithful. It underwent major restoration in recent years to preserve its architectural heritage.",
    architecture: "The cathedral features impressive twin bell towers that dominate the Zgharta skyline. The interior is adorned with beautiful religious artwork, including paintings depicting scenes from the life of Saint George and traditional Maronite iconography.",
    massSchedule: [
      { day: "Sunday", times: ["9:00 AM", "11:00 AM"] },
      { day: "Weekdays", times: ["6:30 AM"] },
      { day: "Saturday", times: ["7:00 PM"] },
    ],
    image: "/images/st-george-cathedral.jpg",
    slug: "st-george-cathedral",
    phone: "+961 6 660 231",
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
    history: "Our Lady of Zgharta Church is dedicated to the Blessed Virgin Mary and serves as an important place of Marian devotion in the region. The church hosts special celebrations during May (the month of Mary) and on Marian feast days throughout the liturgical year.",
    architecture: "The church features traditional Maronite architecture with beautiful stained glass windows depicting scenes from the life of Mary. The altar area is adorned with a stunning icon of Our Lady.",
    massSchedule: [
      { day: "Sunday", times: ["10:00 AM"] },
      { day: "Saturday", times: ["6:00 PM"] },
    ],
    image: "/images/our-lady-zgharta.jpg",
    slug: "our-lady-zgharta",
    phone: "+961 6 660 232",
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
    history: "Mar Sarkis Monastery is an ancient monastery with origins in the 8th century, dedicated to Saints Sarkis (Sergius) and Bacchus, Roman soldiers who were martyred for their Christian faith. The monastery has served as a center of monastic life, prayer, and spiritual retreat for over a millennium.",
    architecture: "The monastery complex is dramatically positioned on the mountainside above Ehden, offering breathtaking panoramic views. The architecture reflects centuries of construction and renovation, with ancient stone walls, a chapel, and monastic quarters.",
    massSchedule: [
      { day: "Sunday", times: ["8:00 AM"] },
      { day: "Daily", times: ["6:00 AM"] },
    ],
    image: "/images/mar-sarkis-monastery.jpg",
    slug: "mar-sarkis-monastery",
    phone: "+961 6 660 233",
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
    history: "Saydet el Hosn (Our Lady of the Fortress) is a beloved pilgrimage site overlooking Ehden. The site features a historic church and a prominent white statue of the Virgin Mary that serves as a landmark visible from throughout the region. The site holds special significance for the faithful and attracts pilgrims throughout the year.",
    architecture: "The modern church building features clean white architecture that complements the iconic Virgin Mary statue. The viewing platform offers panoramic views of the mountains of North Lebanon, making it both a spiritual and scenic destination.",
    massSchedule: [
      { day: "Sunday", times: ["9:30 AM"] },
      { day: "Weekdays", times: ["7:30 AM"] },
    ],
    image: "/images/saydet-el-hosn.jpg",
    slug: "saydet-el-hosn",
    phone: "+961 6 660 234",
  },
]

const typeLabels: Record<string, string> = {
  church: "Church",
  monastery: "Monastery",
  chapel: "Chapel",
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ChurchDetailPage({ params }: Props) {
  const { slug } = await params
  const church = churches.find((c) => c.slug === slug)

  if (!church) {
    notFound()
  }

  const otherChurches = churches.filter((c) => c.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px] lg:h-[60vh]">
          <Image
            src={church.image}
            alt={church.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="mx-auto max-w-6xl">
              <Link 
                href="/churches"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                All Churches
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-secondary text-secondary-foreground">
                  {typeLabels[church.type]}
                </Badge>
                <Badge variant="outline" className="border-white/50 text-white">
                  <MapPin className="h-3 w-3 mr-1" />
                  {church.location}
                </Badge>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {church.name}
              </h1>
              <p className="mt-2 text-2xl text-white/80" dir="rtl">{church.nameAr}</p>
              <p className="mt-4 text-lg text-white/70">
                Patron: {church.patronSaint} | {church.patronSaintAr}
              </p>
            </div>
          </div>
        </div>

        {/* Church Details */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{church.description}</p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">History</h2>
                  <p className="text-muted-foreground leading-relaxed">{church.history}</p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Architecture</h2>
                  <p className="text-muted-foreground leading-relaxed">{church.architecture}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Mass Schedule */}
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-secondary" />
                      Mass Schedule
                    </h3>
                    <div className="space-y-3">
                      {church.massSchedule.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                          <span className="font-medium text-foreground">{schedule.day}</span>
                          <span className="text-muted-foreground">{schedule.times.join(", ")}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" asChild>
                      <Link href="/mass-times">
                        <Calendar className="h-4 w-4 mr-2" />
                        Full Schedule
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Church className="h-5 w-5 text-secondary" />
                      Contact
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{church.location}, North Lebanon</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <a href={`tel:${church.phone}`} className="text-primary hover:underline">
                          {church.phone}
                        </a>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link href="/contact">Get Directions</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Other Churches */}
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground">Other Holy Sites</h2>
              <Button variant="ghost" asChild>
                <Link href="/churches" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {otherChurches.map((other) => (
                <Card key={other.id} className="group overflow-hidden border-none shadow-lg">
                  <Link href={`/churches/${other.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={other.image}
                        alt={other.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-background/90 text-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {other.location}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {other.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1" dir="rtl">{other.nameAr}</p>
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
