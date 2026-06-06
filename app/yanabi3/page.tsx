"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, Search, BookOpen, Calendar, Filter } from "lucide-react"

const seasons = [
  { value: "all", label: "All Seasons", labelAr: "كل المواسم" },
  { value: "resurrection", label: "Resurrection", labelAr: "زمن القيامة", color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30" },
  { value: "pentecost", label: "Pentecost", labelAr: "زمن العنصرة", color: "bg-red-500/10 text-red-700 border-red-500/30" },
  { value: "cross", label: "Cross", labelAr: "زمن الصليب", color: "bg-green-500/10 text-green-700 border-green-500/30" },
  { value: "christmas", label: "Christmas", labelAr: "زمن الميلاد", color: "bg-amber-500/10 text-amber-700 border-amber-500/30" },
  { value: "epiphany", label: "Epiphany", labelAr: "زمن الدنح", color: "bg-blue-500/10 text-blue-700 border-blue-500/30" },
  { value: "lent", label: "Lent", labelAr: "زمن الصوم", color: "bg-purple-500/10 text-purple-700 border-purple-500/30" },
]

const bulletins = [
  { id: 1, title: "Third Sunday of Resurrection", titleAr: "الأحد الثالث من القيامة", season: "resurrection", date: "April 6, 2026", year: 2026 },
  { id: 2, title: "Second Sunday of Resurrection", titleAr: "الأحد الثاني من القيامة", season: "resurrection", date: "March 30, 2026", year: 2026 },
  { id: 3, title: "Easter Sunday", titleAr: "أحد الفصح", season: "resurrection", date: "March 23, 2026", year: 2026 },
  { id: 4, title: "Palm Sunday", titleAr: "أحد الشعانين", season: "lent", date: "March 16, 2026", year: 2026 },
  { id: 5, title: "Fifth Sunday of Lent", titleAr: "الأحد الخامس من الصوم", season: "lent", date: "March 9, 2026", year: 2026 },
  { id: 6, title: "Fourth Sunday of Lent", titleAr: "الأحد الرابع من الصوم", season: "lent", date: "March 2, 2026", year: 2026 },
  { id: 7, title: "Third Sunday of Lent", titleAr: "الأحد الثالث من الصوم", season: "lent", date: "February 23, 2026", year: 2026 },
  { id: 8, title: "Second Sunday of Lent", titleAr: "الأحد الثاني من الصوم", season: "lent", date: "February 16, 2026", year: 2026 },
  { id: 9, title: "First Sunday of Lent", titleAr: "الأحد الأول من الصوم", season: "lent", date: "February 9, 2026", year: 2026 },
  { id: 10, title: "Sunday of the Faithful Departed", titleAr: "أحد الموتى المؤمنين", season: "epiphany", date: "February 2, 2026", year: 2026 },
  { id: 11, title: "Sunday of the Priests", titleAr: "أحد الكهنة", season: "epiphany", date: "January 26, 2026", year: 2026 },
  { id: 12, title: "Feast of Epiphany", titleAr: "عيد الدنح", season: "epiphany", date: "January 6, 2026", year: 2026 },
]

const years = [2026, 2025, 2024, 2023]

export default function Yanabi3Page() {
  const [selectedSeason, setSelectedSeason] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBulletins = bulletins.filter((bulletin) => {
    const matchesSeason = selectedSeason === "all" || bulletin.season === selectedSeason
    const matchesYear = selectedYear === "all" || bulletin.year === parseInt(selectedYear)
    const matchesSearch = bulletin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bulletin.titleAr.includes(searchQuery)
    return matchesSeason && matchesYear && matchesSearch
  })

  const getSeasonColor = (season: string) => {
    return seasons.find(s => s.value === season)?.color || ""
  }

  const getSeasonLabel = (season: string) => {
    return seasons.find(s => s.value === season)?.labelAr || ""
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20 text-primary-foreground">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <BookOpen className="absolute right-10 top-10 h-64 w-64 rotate-12" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4">Weekly Bulletins</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Yanabi3 Archive
            </h1>
            {/* Arabic text centered under Yanabi3 Archive */}
            <p className="mt-4 text-3xl font-light text-primary-foreground/80 text-center" dir="rtl">
              نشرة الينابيع الرعوية
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Access our complete collection of weekly pastoral bulletins with spiritual guidance, 
              liturgical readings, and parish announcements
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="border-b bg-muted/50 sticky top-16 z-40">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bulletins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season.value} value={season.value}>
                        {season.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full md:w-[140px] bg-background">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredBulletins.length}</span> bulletins
              </p>
              {(selectedSeason !== "all" || selectedYear !== "all" || searchQuery) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedSeason("all")
                    setSelectedYear("all")
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Bulletins Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBulletins.map((bulletin) => (
                <Card key={bulletin.id} className="group border-none shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={`text-xs ${getSeasonColor(bulletin.season)}`}>
                            {getSeasonLabel(bulletin.season)}
                          </Badge>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {bulletin.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1" dir="rtl">
                          {bulletin.titleAr}
                        </p>
                        <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {bulletin.date}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                          <Link href={`/yanabi3/${bulletin.id}`}>
                            <BookOpen className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBulletins.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No bulletins found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </section>

        {/* Season Legend - Arabic text centered in boxes */}
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-center mb-8">Liturgical Seasons</h2>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {seasons.filter(s => s.value !== "all").map((season) => (
                <button
                  key={season.value}
                  onClick={() => setSelectedSeason(season.value)}
                  className={`p-4 rounded-lg border text-center transition-all hover:scale-105 ${
                    selectedSeason === season.value ? "ring-2 ring-primary" : ""
                  } ${season.color}`}
                >
                  <p className="font-semibold text-center">{season.label}</p>
                  {/* Arabic text centered */}
                  <p className="text-sm mt-1 text-center" dir="rtl">{season.labelAr}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
