import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Church, MapPin, Info } from "lucide-react"

const massSchedule = [
  {
    church: "Mar Mama Church",
    churchAr: "كنيسة مار ماما",
    location: "Ehden",
    schedule: [
      { day: "Sunday", times: ["8:00 AM", "10:30 AM"], type: "regular" },
      { day: "Monday - Friday", times: ["7:00 AM"], type: "regular" },
      { day: "Saturday", times: ["7:00 AM", "6:00 PM"], type: "regular" },
    ],
    confession: "Saturday 5:00 PM - 6:00 PM",
  },
  {
    church: "St. George Cathedral",
    churchAr: "كاتدرائية مار جرجس",
    location: "Zgharta",
    schedule: [
      { day: "Sunday", times: ["9:00 AM", "11:00 AM"], type: "regular" },
      { day: "Monday - Friday", times: ["6:30 AM", "6:00 PM"], type: "regular" },
      { day: "Saturday", times: ["6:30 AM", "6:00 PM"], type: "regular" },
    ],
    confession: "Saturday 4:30 PM - 5:30 PM",
  },
  {
    church: "Our Lady of Zgharta",
    churchAr: "سيدة زغرتا",
    location: "Zgharta",
    schedule: [
      { day: "Sunday", times: ["10:00 AM"], type: "regular" },
      { day: "Saturday", times: ["6:00 PM (Vigil)"], type: "regular" },
    ],
    confession: "Before Sunday Mass",
  },
  {
    church: "Mar Sarkis Monastery",
    churchAr: "دير مار سركيس",
    location: "Ehden",
    schedule: [
      { day: "Sunday", times: ["8:00 AM"], type: "regular" },
      { day: "Daily", times: ["6:00 AM"], type: "regular" },
    ],
    confession: "By appointment",
  },
  {
    church: "St. Anthony Church",
    churchAr: "كنيسة مار أنطونيوس",
    location: "Ehden",
    schedule: [
      { day: "Sunday", times: ["9:30 AM"], type: "regular" },
      { day: "Monday - Friday", times: ["7:30 AM"], type: "regular" },
    ],
    confession: "Saturday 5:00 PM - 6:00 PM",
  },
]

const specialMasses = [
  {
    title: "Easter Triduum",
    date: "April 17-20, 2026",
    description: "Holy Thursday, Good Friday, and Easter Vigil services",
    location: "All Churches",
  },
  {
    title: "Feast of Mar Mama",
    date: "August 2, 2026",
    description: "Special celebration at Mar Mama Church",
    location: "Mar Mama Church, Ehden",
  },
  {
    title: "Assumption of Mary",
    date: "August 15, 2026",
    description: "Celebration of the Assumption of the Virgin Mary",
    location: "Our Lady of Zgharta",
  },
]

export default function MassTimesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Clock className="absolute right-10 top-10 h-64 w-64 rotate-12" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center text-primary-foreground">
            <Badge variant="secondary" className="mb-4">Join Us in Prayer</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Mass Schedule</h1>
            {/* Arabic text centered under Mass Schedule */}
            <p className="mt-4 text-2xl font-light text-primary-foreground/80 text-center" dir="rtl">
              مواعيد القداس
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Find mass times for all churches in Ehden and Zgharta. Everyone is welcome to join us in worship.
            </p>
          </div>
        </section>

        {/* Quick Info */}
        <section className="bg-secondary/10 border-b">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <div className="flex items-center gap-3 text-sm">
              <Info className="h-4 w-4 text-secondary" />
              <span className="text-muted-foreground">
                Confession is available before each Mass and during scheduled times. Contact the parish office for special arrangements.
              </span>
            </div>
          </div>
        </section>

        {/* Mass Schedule Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Regular Mass Schedule</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {massSchedule.map((church, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-serif text-xl">{church.church}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1" dir="rtl">{church.churchAr}</p>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {church.location}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {church.schedule.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{item.day}</span>
                          </div>
                          <div className="text-right">
                            {item.times.map((time, tidx) => (
                              <Badge key={tidx} variant="secondary" className="ml-1 mb-1">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-dashed">
                        <div className="flex items-center gap-2 text-sm">
                          <Church className="h-4 w-4 text-secondary" />
                          <span className="text-muted-foreground">Confession:</span>
                          <span className="font-medium">{church.confession}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Masses */}
        <section className="py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Upcoming Special Celebrations</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {specialMasses.map((mass, index) => (
                <Card key={index} className="border-none shadow-md bg-card">
                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-secondary text-secondary-foreground">Special Mass</Badge>
                    <h3 className="font-serif text-lg font-semibold">{mass.title}</h3>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {mass.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {mass.location}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{mass.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Note Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <Church className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <h3 className="font-serif text-2xl font-bold mb-4">All Are Welcome</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Whether you are a regular parishioner or visiting our community for the first time, 
              you are welcome to join us in celebrating the Holy Mass. Please arrive a few minutes 
              early and feel free to approach any of our parishioners or staff if you need assistance.
            </p>
            {/* Arabic text centered under the English paragraph */}
            <p className="mt-6 text-primary-foreground/80 text-center" dir="rtl">
              أهلاً وسهلاً بكم في رعيّتنا. نرحب بالجميع للمشاركة في القداس الإلهي.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
