import "server-only"
import { db } from "./index"
import {
  photos,
  videos,
  massChurches,
  specialMasses,
  yanabi3,
  channels,
} from "./schema"
import { asc, desc, eq, sql } from "drizzle-orm"

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// ---- News (raw SQL: includes slug/read_time/content columns) ----
function mapNews(r: Record<string, unknown>) {
  const title = String(r.title ?? "")
  const slug = String(r.slug ?? "")
  return {
    id: String(r.id),
    title,
    titleAr: String(r.title_ar ?? ""),
    excerpt: String(r.excerpt ?? ""),
    content: String(r.content ?? ""),
    author: String(r.author ?? ""),
    category: String(r.category ?? ""),
    date: String(r.date ?? ""),
    image: String(r.image ?? ""),
    featured: Boolean(r.featured),
    status: String(r.status ?? ""),
    readTime: String(r.read_time ?? ""),
    slug: slug.length > 0 ? slug : slugify(title),
  }
}
export type PublicNews = ReturnType<typeof mapNews>

export async function getPublishedNews(): Promise<PublicNews[]> {
  const result = await db.execute(
    sql`SELECT * FROM news WHERE status = 'published' ORDER BY date DESC`,
  )
  return (result.rows as Record<string, unknown>[]).map(mapNews)
}

export async function getNewsBySlug(slug: string): Promise<PublicNews | null> {
  const all = await getPublishedNews()
  return all.find((n) => n.slug === slug) ?? null
}

// ---- Churches (raw SQL for slug column) ----
function mapChurch(r: Record<string, unknown>) {
  const name = String(r.name ?? "")
  const slug = String(r.slug ?? "")
  return {
    id: String(r.id),
    name,
    nameAr: String(r.name_ar ?? ""),
    location: String(r.location ?? ""),
    type: String(r.type ?? "church"),
    patronSaint: String(r.patron_saint ?? ""),
    patronSaintAr: String(r.patron_saint_ar ?? ""),
    description: String(r.description ?? ""),
    massSchedule: String(r.mass_schedule ?? ""),
    image: String(r.image ?? ""),
    featured: Boolean(r.featured),
    slug: slug.length > 0 ? slug : slugify(name),
  }
}
export async function getChurches() {
  const result = await db.execute(
    sql`SELECT * FROM churches ORDER BY sort_order ASC`,
  )
  return (result.rows as Record<string, unknown>[]).map(mapChurch)
}
export async function getChurchBySlug(slug: string) {
  const all = await getChurches()
  return all.find((c) => c.slug === slug) ?? null
}

// ---- Photos ----
export async function getPhotos() {
  return db.select().from(photos).orderBy(desc(photos.date))
}

// ---- Videos ----
export async function getPublishedVideos() {
  return db
    .select()
    .from(videos)
    .where(eq(videos.status, "published"))
    .orderBy(desc(videos.date))
}

// ---- Mass schedule ----
export async function getMassChurches() {
  return db.select().from(massChurches).orderBy(asc(massChurches.sortOrder))
}
export async function getSpecialMasses() {
  return db.select().from(specialMasses).orderBy(asc(specialMasses.date))
}

// ---- Yanabi3 ----
export async function getPublishedYanabi3() {
  return db
    .select()
    .from(yanabi3)
    .where(eq(yanabi3.status, "published"))
    .orderBy(desc(yanabi3.year))
}

// ---- Channels ----
export async function getPublishedChannels() {
  return db
    .select()
    .from(channels)
    .where(eq(channels.status, "published"))
    .orderBy(asc(channels.sortOrder))
}
