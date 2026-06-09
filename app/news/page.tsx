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
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, ArrowRight, ArrowLeft, Newspaper } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Easter Celebrations Begin This Sunday",
    titleAr: "احتفالات عيد الفصح تبدأ هذا الأحد",
    excerpt: "Join us for the holy celebrations of Easter week with special masses and processions throughout Ehden and Zgharta. The celebrations will include traditional hymns, processions, and community gatherings.",
    category: "Parish News",
    date: "April 7, 2026",
    image: "/images/mar-mama-church.jpg",
    slug: "easter-celebrations-2026",
    featured: true,
  },
  {
    id: 2,
    title: "New Youth Ministry Program Launches",
    titleAr: "إطلاق برنامج جديد لخدمة الشباب",
    excerpt: "The parish introduces a comprehensive program for young parishioners focusing on faith formation, community service, and leadership development.",
    category: "Announcements",
    date: "April 5, 2026",
    image: "/images/ehden-landscape.jpg",
    slug: "youth-ministry-program",
    featured: false,
  },
  {
    id: 3,
    title: "Restoration of Historic Church Completed",
    titleAr: "اكتمال ترميم الكنيسة التاريخية",
    excerpt: "After two years of careful restoration work, the historic church of Saint George has been fully restored to its original glory, preserving our heritage for future generations.",
    category: "Church News",
    date: "April 3, 2026",
    image: "/images/st-george-cathedral.jpg",
    slug: "historic-church-restoration",
    featured: true,
  },
  {
    id: 4,
    title: "Charitable Outreach Program Expands",
    titleAr: "توسيع برنامج التواصل الخيري",
    excerpt: "Our parish charitable outreach program has expanded to serve more families in need across the region, providing food, clothing, and essential supplies.",
    category: "Parish News",
    date: "March 28, 2026",
    image: "/images/our-lady-zgharta.jpg",
    slug: "charitable-outreach-expansion",
    featured: false,
  },
  {
    id: 5,
    title: "Lenten Retreat Successfully Concluded",
    titleAr: "اختتام الخلوة الصيامية بنجاح",
    excerpt: "This year's Lenten retreat brought together over 200 parishioners for a weekend of prayer, reflection, and spiritual renewal at Mar Sarkis Monastery.",
    category: "Events",
    date: "March 20, 2026",
    image: "/images/mar-sarkis-monastery.jpg",
    slug: "lenten-retreat-2026",
    featured: false,
  },
  {
    id: 6,
    title: "New Choir Members Welcome",
    titleAr: "الترحيب بأعضاء الجوقة الجدد",
    excerpt: "The parish choir welcomes new members of all ages to join us in praising the Lord through sacred music. Rehearsals are held every Wednesday evening.",
    category: "Announcements",
    date: "March 15, 2026",
    image: "/images/saydet-el-hosn.jpg",
    slug: "choir-new-members",
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  "Parish News": "bg-primary text-primary-foreground",
  "Announcements": "bg-secondary text-secondary-foreground",
  "Church News": "bg-chart-3 text-white",
  "Events": "bg-chart-2 text-white",
}

export default function NewsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticles = newsArticles.filter(a => a.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Newspaper className="absolute right-10 top-10 h-64 w-64 rotate-12" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center text-primary-foreground">
            <Badge variant="secondary" className="mb-4">Stay Informed</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Parish News</h1>
            <p className="mt-4 text-2xl font-light text-primary-foreground/80 text-center" dir="rtl">
              أخبار الرعية
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Stay updated with the latest news, announcements, and events from our parish community
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

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-12 bg-muted/50">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured Stories</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredArticles.slice(0, 2).map((article) => (
                  <Card key={article.id} className="group overflow-hidden border-none shadow-xl">
                    <Link href={`/news/${article.slug}`}>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <Badge className={categoryColors[article.category] || "bg-primary text-primary-foreground"}>
                            {article.category}
                          </Badge>
                          <h3 className="mt-2 font-serif text-2xl font-bold text-white">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-white/80 line-clamp-2">{article.excerpt}</p>
                          <p className="mt-3 text-sm text-white/60">{article.date}</p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="border-b bg-background sticky top-16 z-40">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="Parish News">Parish</TabsTrigger>
                  <TabsTrigger value="Church News">Church</TabsTrigger>
                  <TabsTrigger value="Events">Events</TabsTrigger>
                  <TabsTrigger value="Announcements">Announcements</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredArticles.length}</span> articles
              </p>
              {(searchQuery || selectedCategory !== "all") && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
                  <Link href={`/news/${article.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={categoryColors[article.category] || "bg-primary text-primary-foreground"}>
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>
                      <p className="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <Newspaper className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No articles found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}