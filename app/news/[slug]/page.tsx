import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Share2, Facebook, Clock } from "lucide-react"
import { getNewsBySlug, getPublishedNews } from "@/lib/db/public"

export const dynamic = "force-dynamic"

const categoryColors: Record<string, string> = {
  "Parish News": "bg-primary text-primary-foreground",
  Announcements: "bg-secondary text-secondary-foreground",
  "Church News": "bg-chart-3 text-white",
  Events: "bg-chart-2 text-white",
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)

  if (!article) {
    notFound()
  }

  const all = await getPublishedNews()
  const relatedArticles = all.filter((a) => a.slug !== slug).slice(0, 2)

  const contentHtml =
    article.content && article.content.trim().length > 0
      ? article.content
      : `<p>${article.excerpt}</p>`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="relative h-[40vh] min-h-[300px] lg:h-[50vh]">
          <Image
            src={article.image || "/placeholder.svg"}
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
              <Badge
                className={
                  categoryColors[article.category] ||
                  "bg-primary text-primary-foreground"
                }
              >
                {article.category}
              </Badge>
              <h1 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {article.title}
              </h1>
              {article.titleAr && (
                <p className="mt-2 text-xl text-white/80" dir="rtl">
                  {article.titleAr}
                </p>
              )}
              <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </span>
                {article.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

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
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <div className="mt-12 pt-8 border-t">
              <h3 className="font-semibold text-foreground mb-4">
                Share this article
              </h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `https://ehdenz.com/news/${article.slug}`,
                    )}`}
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

        {relatedArticles.length > 0 && (
          <section className="py-12 bg-muted/50">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Card
                    key={related.id}
                    className="group overflow-hidden border-none shadow-lg"
                  >
                    <Link href={`/news/${related.slug}`}>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={related.image || "/placeholder.svg"}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge
                            className={
                              categoryColors[related.category] ||
                              "bg-primary text-primary-foreground"
                            }
                          >
                            {related.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {related.date}
                        </p>
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
