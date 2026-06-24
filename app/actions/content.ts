"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import * as schema from "@/lib/db/schema"
import type {
  NewsItem,
  PhotoItem,
  VideoItem,
  MassChurchItem,
  SpecialMassItem,
  Yanabi3Item,
  ServiceRequest,
  RequestStatus,
  ChurchItem,
  ChannelItem,
  ContactInfo,
  ContactSubmission,
  ContactSubmissionStatus,
  UserProfile,
  UserPreferences,
} from "@/components/admin/admin-data"

const uid = () => Math.random().toString(36).slice(2, 10)

// Revalidate both the admin dashboard and the public site so edits show up
// everywhere immediately.
function revalidateAll() {
  revalidatePath("/", "layout")
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------
export async function createNews(item: Omit<NewsItem, "id">) {
  const id = uid()
  await db.insert(schema.news).values({
    id,
    title: item.title,
    titleAr: item.titleAr,
    excerpt: item.excerpt,
    content: item.content ?? null,
    author: item.author ?? null,
    category: item.category,
    date: item.date,
    image: item.image,
    featured: item.featured ?? false,
    status: item.status,
  })
  revalidateAll()
  return id
}
export async function updateNews(id: string, item: Omit<NewsItem, "id">) {
  await db
    .update(schema.news)
    .set({
      title: item.title,
      titleAr: item.titleAr,
      excerpt: item.excerpt,
      content: item.content ?? null,
      author: item.author ?? null,
      category: item.category,
      date: item.date,
      image: item.image,
      featured: item.featured ?? false,
      status: item.status,
      updatedAt: new Date(),
    })
    .where(eq(schema.news.id, id))
  revalidateAll()
}
export async function deleteNews(id: string) {
  await db.delete(schema.news).where(eq(schema.news.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Photos
// ---------------------------------------------------------------------------
export async function createPhoto(item: Omit<PhotoItem, "id">) {
  const id = uid()
  await db.insert(schema.photos).values({ id, ...item })
  revalidateAll()
  return id
}
export async function updatePhoto(id: string, item: Omit<PhotoItem, "id">) {
  await db
    .update(schema.photos)
    .set({ ...item, updatedAt: new Date() })
    .where(eq(schema.photos.id, id))
  revalidateAll()
}
export async function deletePhoto(id: string) {
  await db.delete(schema.photos).where(eq(schema.photos.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Videos
// ---------------------------------------------------------------------------
export async function createVideo(item: Omit<VideoItem, "id">) {
  const id = uid()
  await db.insert(schema.videos).values({ id, ...item })
  revalidateAll()
  return id
}
export async function updateVideo(id: string, item: Omit<VideoItem, "id">) {
  await db
    .update(schema.videos)
    .set({ ...item, updatedAt: new Date() })
    .where(eq(schema.videos.id, id))
  revalidateAll()
}
export async function deleteVideo(id: string) {
  await db.delete(schema.videos).where(eq(schema.videos.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Mass churches
// ---------------------------------------------------------------------------
export async function createMassChurch(item: Omit<MassChurchItem, "id">) {
  const id = uid()
  await db.insert(schema.massChurches).values({
    id,
    church: item.church,
    churchAr: item.churchAr,
    location: item.location,
    schedule: item.schedule,
    confession: item.confession,
  })
  revalidateAll()
  return id
}
export async function updateMassChurch(
  id: string,
  item: Omit<MassChurchItem, "id">,
) {
  await db
    .update(schema.massChurches)
    .set({
      church: item.church,
      churchAr: item.churchAr,
      location: item.location,
      schedule: item.schedule,
      confession: item.confession,
      updatedAt: new Date(),
    })
    .where(eq(schema.massChurches.id, id))
  revalidateAll()
}
export async function deleteMassChurch(id: string) {
  await db.delete(schema.massChurches).where(eq(schema.massChurches.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Special masses
// ---------------------------------------------------------------------------
export async function createSpecialMass(item: Omit<SpecialMassItem, "id">) {
  const id = uid()
  await db.insert(schema.specialMasses).values({ id, ...item })
  revalidateAll()
  return id
}
export async function updateSpecialMass(
  id: string,
  item: Omit<SpecialMassItem, "id">,
) {
  await db
    .update(schema.specialMasses)
    .set({ ...item, updatedAt: new Date() })
    .where(eq(schema.specialMasses.id, id))
  revalidateAll()
}
export async function deleteSpecialMass(id: string) {
  await db.delete(schema.specialMasses).where(eq(schema.specialMasses.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Yanabi3 bulletins
// ---------------------------------------------------------------------------
export async function createYanabi3(item: Omit<Yanabi3Item, "id">) {
  const id = uid()
  await db.insert(schema.yanabi3).values({ id, ...item })
  revalidateAll()
  return id
}
export async function updateYanabi3(id: string, item: Omit<Yanabi3Item, "id">) {
  await db
    .update(schema.yanabi3)
    .set({ ...item, updatedAt: new Date() })
    .where(eq(schema.yanabi3.id, id))
  revalidateAll()
}
export async function deleteYanabi3(id: string) {
  await db.delete(schema.yanabi3).where(eq(schema.yanabi3.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Churches
// ---------------------------------------------------------------------------
export async function createChurch(item: Omit<ChurchItem, "id">) {
  const id = uid()
  await db.insert(schema.churches).values({ id, ...item })
  revalidateAll()
  return id
}
export async function updateChurch(id: string, item: Omit<ChurchItem, "id">) {
  await db
    .update(schema.churches)
    .set({ ...item, updatedAt: new Date() })
    .where(eq(schema.churches.id, id))
  revalidateAll()
}
export async function deleteChurch(id: string) {
  await db.delete(schema.churches).where(eq(schema.churches.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Service requests
// ---------------------------------------------------------------------------
export async function createServiceRequest(item: Omit<ServiceRequest, "id">) {
  const id = uid()
  await db.insert(schema.serviceRequests).values({ id, ...item })
  revalidateAll()
  return id
}
export async function updateServiceRequest(
  id: string,
  item: Omit<ServiceRequest, "id">,
) {
  await db
    .update(schema.serviceRequests)
    .set({ ...item, updatedAt: new Date() })
    .where(eq(schema.serviceRequests.id, id))
  revalidateAll()
}
export async function updateServiceRequestStatus(
  id: string,
  status: RequestStatus,
) {
  await db
    .update(schema.serviceRequests)
    .set({ status, updatedAt: new Date() })
    .where(eq(schema.serviceRequests.id, id))
  revalidateAll()
}
export async function deleteServiceRequest(id: string) {
  await db.delete(schema.serviceRequests).where(eq(schema.serviceRequests.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Channels
// ---------------------------------------------------------------------------
export async function createChannel(item: Omit<ChannelItem, "id">) {
  const id = uid()
  await db.insert(schema.channels).values({ id, ...item })
  revalidateAll()
  return id
}
export async function updateChannel(id: string, item: Omit<ChannelItem, "id">) {
  await db
    .update(schema.channels)
    .set({ ...item, updatedAt: new Date() })
    .where(eq(schema.channels.id, id))
  revalidateAll()
}
export async function deleteChannel(id: string) {
  await db.delete(schema.channels).where(eq(schema.channels.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Contact submissions
// ---------------------------------------------------------------------------
export async function createContactSubmission(
  item: Omit<ContactSubmission, "id">,
) {
  const id = uid()
  await db.insert(schema.contactSubmissions).values({ id, ...item })
  revalidateAll()
  return id
}
export async function updateContactSubmission(
  id: string,
  item: Omit<ContactSubmission, "id">,
) {
  await db
    .update(schema.contactSubmissions)
    .set({ ...item, updatedAt: new Date() })
    .where(eq(schema.contactSubmissions.id, id))
  revalidateAll()
}
export async function updateContactSubmissionStatus(
  id: string,
  status: ContactSubmissionStatus,
) {
  await db
    .update(schema.contactSubmissions)
    .set({ status, updatedAt: new Date() })
    .where(eq(schema.contactSubmissions.id, id))
  revalidateAll()
}
export async function deleteContactSubmission(id: string) {
  await db
    .delete(schema.contactSubmissions)
    .where(eq(schema.contactSubmissions.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------
export async function createNotification(item: {
  title: string
  message: string
  type: string
  date: string
  read?: boolean
  href?: string
}) {
  const id = uid()
  await db.insert(schema.notifications).values({
    id,
    title: item.title,
    message: item.message,
    type: item.type,
    date: item.date,
    read: item.read ?? false,
    href: item.href ?? null,
  })
  revalidateAll()
  return id
}
export async function markNotificationRead(id: string) {
  await db
    .update(schema.notifications)
    .set({ read: true })
    .where(eq(schema.notifications.id, id))
  revalidateAll()
}
export async function markAllNotificationsRead() {
  await db.update(schema.notifications).set({ read: true })
  revalidateAll()
}
export async function deleteNotification(id: string) {
  await db.delete(schema.notifications).where(eq(schema.notifications.id, id))
  revalidateAll()
}

// ---------------------------------------------------------------------------
// Page singletons (key/value JSON)
// ---------------------------------------------------------------------------
async function upsertPageContent(key: string, content: unknown) {
  await db
    .insert(schema.pageContent)
    .values({ key, content: content as object, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: schema.pageContent.key,
      set: { content: content as object, updatedAt: new Date() },
    })
  revalidateAll()
}

export async function updateContactInfo(info: ContactInfo) {
  await upsertPageContent("contactInfo", info)
}
export async function updateUserProfile(profile: UserProfile) {
  await upsertPageContent("userProfile", profile)
}
export async function updateUserPreferences(prefs: UserPreferences) {
  await upsertPageContent("userPreferences", prefs)
}
export async function updateHomeContent(content: {
  verseEn: string
  verseAr: string
  verseReference: string
}) {
  await upsertPageContent("home", content)
}
export async function updatePageContent(key: string, content: unknown) {
  await upsertPageContent(key, content)
}
