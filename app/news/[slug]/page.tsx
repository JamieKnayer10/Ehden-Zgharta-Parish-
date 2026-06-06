import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Share2, Facebook, Clock } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Easter Celebrations Begin This Sunday",
    titleAr: "احتفالات عيد الفصح تبدأ هذا الأحد",
    excerpt: "Join us for the holy celebrations of Easter week with special masses and processions throughout Ehden and Zgharta.",
    content: `
      <p>The holy season of Easter is upon us, and our parish is preparing for a week of profound spiritual celebrations that will bring together the faithful from across Ehden and Zgharta.</p>
      
      <h2>Schedule of Celebrations</h2>
      <p>Palm Sunday will mark the beginning of our Holy Week celebrations with a traditional procession starting from Mar Mama Church at 9:00 AM. The procession will wind through the streets of Ehden, with participants carrying palm branches and singing traditional hymns.</p>
      
      <p>Throughout the week, special masses and services will be held at various churches:</p>
      <ul>
        <li>Monday-Wednesday: Evening prayers at 6:00 PM at St. George Cathedral</li>
        <li>Holy Thursday: Mass of the Lord's Supper at 7:00 PM</li>
        <li>Good Friday: Stations of the Cross at 3:00 PM, Burial Service at 7:00 PM</li>
        <li>Holy Saturday: Easter Vigil at 10:00 PM</li>
        <li>Easter Sunday: Masses at 8:00 AM, 10:00 AM, and 12:00 PM</li>
      </ul>
      
      <h2>Community Gatherings</h2>
      <p>After the Easter Sunday morning masses, the parish will host a community breakfast in the church courtyard. All parishioners and their families are invited to join in this celebration of our risen Lord.</p>
      
      <p>We encourage all families to participate in these sacred celebrations and experience the joy of Easter together as a community of faith.</p>
    `,
    category: "Parish News",
    date: "April 7, 2026",
    image: "/images/mar-mama-church.jpg",
    slug: "easter-celebrations-2026",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "New Youth Ministry Program Launches",
    titleAr: "إطلاق برنامج جديد لخدمة الشباب",
    excerpt: "The parish introduces a comprehensive program for young parishioners focusing on faith formation and community service.",
    content: `
      <p>We are excited to announce the launch of our new Youth Ministry Program, designed to engage young parishioners in meaningful faith formation and community service activities.</p>
      
      <h2>Program Overview</h2>
      <p>The program is open to youth ages 13-25 and includes weekly meetings, retreats, community service projects, and leadership development opportunities.</p>
      
      <h2>Weekly Activities</h2>
      <ul>
        <li>Sunday afternoons: Youth Mass followed by discussion groups</li>
        <li>Wednesday evenings: Bible study and fellowship</li>
        <li>Monthly service projects in the community</li>
      </ul>
      
      <p>For registration and more information, please contact the parish office.</p>
    `,
    category: "Announcements",
    date: "April 5, 2026",
    image: "/images/ehden-landscape.jpg",
    slug: "youth-ministry-program",
    readTime: "2 min read",
  },
  {
    id: 3,
    title: "Restoration of Historic Church Completed",
    titleAr: "اكتمال ترميم الكنيسة التاريخية",
    excerpt: "After two years of careful restoration work, the historic church of Saint George has been fully restored to its original glory.",
    content: `
      <p>We are delighted to announce the completion of the restoration project at St. George Cathedral in Zgharta. This landmark project has preserved one of our most treasured religious and architectural heritage sites.</p>
      
      <h2>Restoration Highlights</h2>
      <p>The two-year project included:</p>
      <ul>
        <li>Restoration of the original frescoes and religious artwork</li>
        <li>Structural reinforcement of the bell tower</li>
        <li>Conservation of historic wooden elements</li>
        <li>Installation of new lighting to highlight the architecture</li>
        <li>Preservation of the original stone facade</li>
      </ul>
      
      <h2>Thanksgiving Mass</h2>
      <p>A special thanksgiving mass will be celebrated on the first Sunday of next month to mark the completion of this important project. All parishioners are invited to attend.</p>
    `,
    category: "Church News",
    date: "April 3, 2026",
    image: "/images/st-george-cathedral.jpg",
    slug: "historic-church-restoration",
    readTime: "2 min read",
  },
]

const categoryColors: Record<string, string> = {
  "Parish News": "bg-primary text-primary-foreground",
  "Announcements": "bg-secondary text-secondary-foreground",
  "Church News": "bg-chart-3 text-white",
  "Events": "bg-chart-2 text-white",
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = newsArticles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = newsArticles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[40vh] min-h-[300px] lg:h-[50vh]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="mx-auto max-w-4xl">
              <Link 
                href="/news"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Link>
              <Badge className={categoryColors[article.category] || "bg-primary text-primary-foreground"}>
                {article.category}
              </Badge>
              <h1 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {article.title}
              </h1>
              <p className="mt-2 text-xl text-white/80" dir="rtl">{article.titleAr}</p>
              <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <p className="text-lg text-muted-foreground">{article.excerpt}</p>
              <Button variant="outline" size="sm" className="shrink-0 ml-4">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="font-semibold text-foreground mb-4">Share this article</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://ehdenz.com/news/${article.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 bg-muted/50">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Card key={related.id} className="group overflow-hidden border-none shadow-lg">
                    <Link href={`/news/${related.slug}`}>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={categoryColors[related.category] || "bg-primary text-primary-foreground"}>
                            {related.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{related.date}</p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
