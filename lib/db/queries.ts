import "server-only"
import { asc, desc, eq } from "drizzle-orm"
import { db } from "./index"
import * as schema from "./schema"
import type {
  NewsItem,
  PhotoItem,
  VideoItem,
  MassChurchItem,
  MassScheduleRow,
  SpecialMassItem,
  Yanabi3Item,
  ServiceRequest,
  ServiceSlug,
  RequestStatus,
  ChurchItem,
  ChurchType,
  ChannelItem,
  ChannelType,
  ContactInfo,
  ContactSubmission,
  ContactSubmissionStatus,
  NotificationItem,
  NotificationType,
  UserProfile,
  UserPreferences,
  Status,
} from "@/components/admin/admin-data"

// ---------------------------------------------------------------------------
// Row -> domain mappers (snake_case columns -> camelCase types used in the UI)
// ---------------------------------------------------------------------------

function mapNews(r: typeof schema.news.$inferSelect): NewsItem {
  return {
    id: r.id,
    title: r.title,
    titleAr: r.titleAr,
    excerpt: r.excerpt,
    content: r.content ?? undefined,
    author: r.author ?? undefined,
    category: r.category,
    date: r.date,
    image: r.image,
    featured: r.featured,
    status: r.status as Status,
  }
}

function mapPhoto(r: typeof schema.photos.$inferSelect): PhotoItem {
  return { id: r.id, title: r.title, album: r.album, image: r.image, date: r.date }
}

function mapVideo(r: typeof schema.videos.$inferSelect): VideoItem {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    url: r.url,
    thumbnail: r.thumbnail,
    date: r.date,
    status: r.status as Status,
  }
}

function mapMassChurch(r: typeof schema.massChurches.$inferSelect): MassChurchItem {
  return {
    id: r.id,
    church: r.church,
    churchAr: r.churchAr,
    location: r.location,
    schedule: (r.schedule as MassScheduleRow[]) ?? [],
    confession: r.confession,
  }
}

function mapSpecialMass(r: typeof schema.specialMasses.$inferSelect): SpecialMassItem {
  return {
    id: r.id,
    title: r.title,
    date: r.date,
    description: r.description,
    location: r.location,
  }
}

function mapYanabi3(r: typeof schema.yanabi3.$inferSelect): Yanabi3Item {
  return {
    id: r.id,
    title: r.title,
    titleAr: r.titleAr,
    season: r.season,
    date: r.date,
    year: r.year,
    fileUrl: r.fileUrl,
    status: r.status as Status,
  }
}

function mapServiceRequest(r: typeof schema.serviceRequests.$inferSelect): ServiceRequest {
  return {
    id: r.id,
    service: r.service as ServiceSlug,
    subjectName: r.subjectName,
    requesterName: r.requesterName,
    phone: r.phone,
    email: r.email,
    date: r.date,
    status: r.status as RequestStatus,
    notes: r.notes,
  }
}

function mapChurch(r: typeof schema.churches.$inferSelect): ChurchItem {
  return {
    id: r.id,
    name: r.name,
    nameAr: r.nameAr,
    location: r.location,
    type: r.type as ChurchType,
    patronSaint: r.patronSaint,
    patronSaintAr: r.patronSaintAr,
    description: r.description,
    massSchedule: r.massSchedule,
    image: r.image,
    slug: r.slug,
    featured: r.featured,
  }
}

function mapChannel(r: typeof schema.channels.$inferSelect): ChannelItem {
  return {
    id: r.id,
    name: r.name,
    nameAr: r.nameAr,
    slug: r.slug,
    description: r.description,
    descriptionAr: r.descriptionAr,
    type: r.type as ChannelType,
    logo: r.logo,
    cover: r.cover,
    streamUrl: r.streamUrl,
    websiteUrl: r.websiteUrl,
    socialFacebook: r.socialFacebook,
    socialYoutube: r.socialYoutube,
    socialInstagram: r.socialInstagram,
    status: r.status as Status,
    featured: r.featured,
  }
}

function mapContactSubmission(
  r: typeof schema.contactSubmissions.$inferSelect,
): ContactSubmission {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    subject: r.subject,
    message: r.message,
    date: r.date,
    status: r.status as ContactSubmissionStatus,
  }
}

function mapNotification(r: typeof schema.notifications.$inferSelect): NotificationItem {
  return {
    id: r.id,
    title: r.title,
    message: r.message,
    type: r.type as NotificationType,
    date: r.date,
    read: r.read,
    href: r.href ?? undefined,
  }
}

// ---------------------------------------------------------------------------
// Page-singleton defaults (used if a page_content row is missing)
// ---------------------------------------------------------------------------

export const defaultContactInfo: ContactInfo = {
  phone: "+961 6 660 230",
  email: "info@ehdenz.com",
  address: "Ehden-Zgharta, North Lebanon",
  addressAr: "إهدن-زغرتا، شمال لبنان",
  officeHours: "Mon-Sat: 9AM - 5PM",
  socialFacebook: "https://facebook.com/ehdenzgharta",
  socialInstagram: "https://instagram.com/ehdenzgharta",
}

export const defaultUserProfile: UserProfile = {
  name: "Parish Administrator",
  email: "admin@ehden-zgharta.org",
  role: "Content Administrator",
  avatar: "",
  phone: "+961 6 660 230",
  bio: "Managing content and communications for the Ehden-Zgharta parish website.",
}

export const defaultUserPreferences: UserPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  publishImmediately: false,
  showArabicFields: true,
  weeklyDigest: true,
}

async function getPageContent<T>(key: string, fallback: T): Promise<T> {
  const rows = await db
    .select()
    .from(schema.pageContent)
    .where(eq(schema.pageContent.key, key))
  if (rows.length === 0) return fallback
  return { ...fallback, ...(rows[0].content as Partial<T>) }
}

// ---------------------------------------------------------------------------
// Individual collection readers (usable by public pages and the admin)
// ---------------------------------------------------------------------------

export async function getNews() {
  const rows = await db.select().from(schema.news).orderBy(asc(schema.news.sortOrder))
  return rows.map(mapNews)
}
export async function getPhotos() {
  const rows = await db.select().from(schema.photos).orderBy(asc(schema.photos.sortOrder))
  return rows.map(mapPhoto)
}
export async function getVideos() {
  const rows = await db.select().from(schema.videos).orderBy(asc(schema.videos.sortOrder))
  return rows.map(mapVideo)
}
export async function getMassChurches() {
  const rows = await db
    .select()
    .from(schema.massChurches)
    .orderBy(asc(schema.massChurches.sortOrder))
  return rows.map(mapMassChurch)
}
export async function getSpecialMasses() {
  const rows = await db
    .select()
    .from(schema.specialMasses)
    .orderBy(asc(schema.specialMasses.sortOrder))
  return rows.map(mapSpecialMass)
}
export async function getYanabi3() {
  const rows = await db
    .select()
    .from(schema.yanabi3)
    .orderBy(asc(schema.yanabi3.sortOrder))
  return rows.map(mapYanabi3)
}
export async function getChurches() {
  const rows = await db
    .select()
    .from(schema.churches)
    .orderBy(asc(schema.churches.sortOrder))
  return rows.map(mapChurch)
}
export async function getServiceRequests() {
  const rows = await db
    .select()
    .from(schema.serviceRequests)
    .orderBy(desc(schema.serviceRequests.createdAt))
  return rows.map(mapServiceRequest)
}
export async function getChannels() {
  const rows = await db
    .select()
    .from(schema.channels)
    .orderBy(asc(schema.channels.sortOrder))
  return rows.map(mapChannel)
}
export async function getContactSubmissions() {
  const rows = await db
    .select()
    .from(schema.contactSubmissions)
    .orderBy(desc(schema.contactSubmissions.createdAt))
  return rows.map(mapContactSubmission)
}
export async function getNotifications() {
  const rows = await db
    .select()
    .from(schema.notifications)
    .orderBy(desc(schema.notifications.date))
  return rows.map(mapNotification)
}
export async function getContactInfo() {
  return getPageContent<ContactInfo>("contactInfo", defaultContactInfo)
}
export async function getUserProfile() {
  return getPageContent<UserProfile>("userProfile", defaultUserProfile)
}
export async function getUserPreferences() {
  return getPageContent<UserPreferences>("userPreferences", defaultUserPreferences)
}
export async function getHomeContent() {
  return getPageContent<{
    verseEn: string
    verseAr: string
    verseReference: string
  }>("home", { verseEn: "", verseAr: "", verseReference: "" })
}

export type AdminData = {
  news: NewsItem[]
  photos: PhotoItem[]
  videos: VideoItem[]
  massChurches: MassChurchItem[]
  specialMasses: SpecialMassItem[]
  yanabi3: Yanabi3Item[]
  churches: ChurchItem[]
  serviceRequests: ServiceRequest[]
  channels: ChannelItem[]
  contactSubmissions: ContactSubmission[]
  notifications: NotificationItem[]
  contactInfo: ContactInfo
  userProfile: UserProfile
  userPreferences: UserPreferences
}

// Single round-trip loader for the admin dashboard.
export async function getAllAdminData(): Promise<AdminData> {
  const [
    news,
    photos,
    videos,
    massChurches,
    specialMasses,
    yanabi3,
    churches,
    serviceRequests,
    channels,
    contactSubmissions,
    notifications,
    contactInfo,
    userProfile,
    userPreferences,
  ] = await Promise.all([
    getNews(),
    getPhotos(),
    getVideos(),
    getMassChurches(),
    getSpecialMasses(),
    getYanabi3(),
    getChurches(),
    getServiceRequests(),
    getChannels(),
    getContactSubmissions(),
    getNotifications(),
    getContactInfo(),
    getUserProfile(),
    getUserPreferences(),
  ])
  return {
    news,
    photos,
    videos,
    massChurches,
    specialMasses,
    yanabi3,
    churches,
    serviceRequests,
    channels,
    contactSubmissions,
    notifications,
    contactInfo,
    userProfile,
    userPreferences,
  }
}
