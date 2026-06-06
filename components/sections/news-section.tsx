import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Easter Celebrations Begin This Sunday",
    titleAr: "احتفالات عيد الفصح تبدأ هذا الأحد",
    excerpt: "Join us for the holy celebrations of Easter week with special masses and processions throughout Ehden and Zgharta.",
    category: "Parish News",
    date: "April 7, 2026",
    image: "/images/mar-mama-church.jpg",
    slug: "easter-celebrations-2026",
  },
  {
    id: 2,
    title: "New Youth Ministry Program Launches",
    titleAr: "إطلاق برنامج جديد لخدمة الشباب",
    excerpt: "The parish introduces a comprehensive program for young parishioners focusing on faith formation and community service.",
    category: "Announcements",
    date: "April 5, 2026",
    image: "/images/ehden-landscape.jpg",
    slug: "youth-ministry-program",
  },
  {
    id: 3,
    title: "Restoration of Historic Church Completed",
    titleAr: "اكتمال ترميم الكنيسة التاريخية",
    excerpt: "After two years of careful restoration work, the historic church of Saint George has been fully restored to its original glory.",
    category: "Church News",
    date: "April 3, 2026",
    image: "/images/st-george-cathedral.jpg",
    slug: "historic-church-restoration",
  },
]

const categoryColors: Record<string, string> = {
  "Parish News": "bg-primary text-primary-foreground",
  "Announcements": "bg-secondary text-secondary-foreground",
  "Church News": "bg-chart-3 text-white",
}

export function NewsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Stay Updated</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-foreground">Latest Parish News</h2>
          </div>
          <Button variant="ghost" asChild className="self-start md:self-auto">
            <Link href="/news" className="flex items-center gap-2">
              View All News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
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
                  <p className="mt-3 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
