import { NewsListClient } from "@/components/public/news-list-client"
import { getPublishedNews } from "@/lib/db/public"

export const dynamic = "force-dynamic"

export default async function NewsPage() {
  const articles = await getPublishedNews()
  return <NewsListClient articles={articles} />
}
