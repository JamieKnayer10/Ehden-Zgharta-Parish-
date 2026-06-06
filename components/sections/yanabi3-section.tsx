import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, ArrowRight, Calendar } from "lucide-react"

const currentBulletin = {
  title: "Third Sunday of Resurrection",
  titleAr: "الأحد الثالث من القيامة",
  season: "Resurrection",
  seasonAr: "زمن القيامة",
  date: "April 6, 2026",
  excerpt: "This week's bulletin focuses on the appearance of Christ to His disciples and the strengthening of their faith...",
  pdfUrl: "#",
}

const recentBulletins = [
  {
    id: 1,
    title: "Second Sunday of Resurrection",
    titleAr: "الأحد الثاني من القيامة",
    season: "Resurrection",
    date: "March 30, 2026",
  },
  {
    id: 2,
    title: "Easter Sunday",
    titleAr: "أحد الفصح",
    season: "Resurrection",
    date: "March 23, 2026",
  },
  {
    id: 3,
    title: "Palm Sunday",
    titleAr: "أحد الشعانين",
    season: "Lent",
    date: "March 16, 2026",
  },
]

const seasonColors: Record<string, string> = {
  "Resurrection": "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
  "Lent": "bg-purple-500/10 text-purple-700 border-purple-500/30",
  "Christmas": "bg-amber-500/10 text-amber-700 border-amber-500/30",
  "Pentecost": "bg-red-500/10 text-red-700 border-red-500/30",
  "Cross": "bg-green-500/10 text-green-700 border-green-500/30",
  "Epiphany": "bg-blue-500/10 text-blue-700 border-blue-500/30",
}

export function Yanabi3Section() {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Weekly Bulletins</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-foreground">
              Yanabi3 <span className="text-muted-foreground" dir="rtl">نشرة الينابيع</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Our weekly pastoral bulletin offering spiritual guidance, liturgical readings, and parish announcements
            </p>
          </div>
          <Button variant="ghost" asChild className="self-start md:self-auto">
            <Link href="/yanabi3" className="flex items-center gap-2">
              Browse Archive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Current Bulletin - Featured */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-none shadow-xl bg-card">
              <div className="grid md:grid-cols-2">
                {/* Visual Side */}
                <div className="relative bg-gradient-to-br from-primary to-primary/80 p-8 flex flex-col justify-between min-h-[300px]">
                  <div className="absolute inset-0 opacity-10">
                    <BookOpen className="absolute right-4 top-4 h-32 w-32 rotate-12" />
                  </div>
                  <div className="relative z-10">
                    <Badge variant="secondary" className="mb-4">
                      This Week
                    </Badge>
                    <Badge className={`ml-2 border ${seasonColors[currentBulletin.season] || ""}`}>
                      {currentBulletin.seasonAr}
                    </Badge>
                  </div>
                  <div className="relative z-10 text-white">
                    <p className="text-sm text-white/70 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {currentBulletin.date}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-bold">{currentBulletin.title}</h3>
                    <p className="mt-1 text-lg text-white/80" dir="rtl">{currentBulletin.titleAr}</p>
                  </div>
                </div>
                
                {/* Content Side */}
                <CardContent className="p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">In This Issue:</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {currentBulletin.excerpt}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        Gospel Reading & Reflection
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        Parish Announcements
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        Weekly Prayer Intentions
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button asChild className="flex-1">
                      <Link href="/yanabi3/current">
                        Read Online
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={currentBulletin.pdfUrl} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Recent Bulletins List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground mb-4">Recent Bulletins</h3>
            {recentBulletins.map((bulletin) => (
              <Card key={bulletin.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Badge variant="outline" className={`text-xs mb-2 ${seasonColors[bulletin.season] || ""}`}>
                        {bulletin.season}
                      </Badge>
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">{bulletin.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1" dir="rtl">{bulletin.titleAr}</p>
                      <p className="text-xs text-muted-foreground mt-2">{bulletin.date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/yanabi3">
                View All Bulletins
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
