"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

export type Status = "published" | "draft"

export interface NewsItem {
  id: string
  title: string
  titleAr: string
  excerpt: string
  category: string
  date: string
  image: string
  status: Status
}

export interface PhotoItem {
  id: string
  title: string
  album: string
  image: string
  date: string
}

export interface VideoItem {
  id: string
  title: string
  category: string
  url: string
  thumbnail: string
  date: string
  status: Status
}

export const newsCategories = [
  "Parish News",
  "Church News",
  "Events",
  "Announcements",
]

export const photoAlbums = [
  "Churches",
  "Landscapes",
  "Events",
  "Celebrations",
  "Heritage",
]

export const videoCategories = [
  "Liturgy",
  "Documentary",
  "Community",
  "Broadcast",
]

const seedNews: NewsItem[] = [
  {
    id: "n1",
    title: "Easter Celebrations Begin This Sunday",
    titleAr: "احتفالات عيد الفصح تبدأ هذا الأحد",
    excerpt:
      "Join us for the holy celebrations of Easter week with special masses and processions throughout Ehden and Zgharta.",
    category: "Parish News",
    date: "2026-04-07",
    image: "/images/mar-mama-church.jpg",
    status: "published",
  },
  {
    id: "n2",
    title: "New Youth Ministry Program Launches",
    titleAr: "إطلاق برنامج جديد لخدمة الشباب",
    excerpt:
      "The parish introduces a comprehensive program for young parishioners focusing on faith formation and leadership.",
    category: "Announcements",
    date: "2026-04-05",
    image: "/images/ehden-landscape.jpg",
    status: "published",
  },
  {
    id: "n3",
    title: "Restoration of Historic Church Completed",
    titleAr: "اكتمال ترميم الكنيسة التاريخية",
    excerpt:
      "After two years of careful restoration work, the historic church of Saint George has been fully restored.",
    category: "Church News",
    date: "2026-04-03",
    image: "/images/st-george-cathedral.jpg",
    status: "draft",
  },
]

const seedPhotos: PhotoItem[] = [
  {
    id: "p1",
    title: "Ehden Mountain Landscape",
    album: "Landscapes",
    image: "/images/ehden-landscape.jpg",
    date: "2026-03-30",
  },
  {
    id: "p2",
    title: "Mar Mama Church",
    album: "Churches",
    image: "/images/mar-mama-church.jpg",
    date: "2026-03-28",
  },
  {
    id: "p3",
    title: "Mountain Sunset",
    album: "Landscapes",
    image: "/images/mountain-sunset.jpg",
    date: "2026-03-25",
  },
  {
    id: "p4",
    title: "Our Lady of Zgharta",
    album: "Churches",
    image: "/images/our-lady-zgharta.jpg",
    date: "2026-03-20",
  },
]

const seedVideos: VideoItem[] = [
  {
    id: "v1",
    title: "Sunday Holy Mass - Live Broadcast",
    category: "Liturgy",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/mar-sarkis-monastery.jpg",
    date: "2026-04-06",
    status: "published",
  },
  {
    id: "v2",
    title: "Heritage of Ehden Documentary",
    category: "Documentary",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/mountain-sunset.jpg",
    date: "2026-03-15",
    status: "published",
  },
]

interface AdminStore {
  news: NewsItem[]
  photos: PhotoItem[]
  videos: VideoItem[]
  addNews: (item: Omit<NewsItem, "id">) => void
  updateNews: (id: string, item: Omit<NewsItem, "id">) => void
  deleteNews: (id: string) => void
  addPhoto: (item: Omit<PhotoItem, "id">) => void
  updatePhoto: (id: string, item: Omit<PhotoItem, "id">) => void
  deletePhoto: (id: string) => void
  addVideo: (item: Omit<VideoItem, "id">) => void
  updateVideo: (id: string, item: Omit<VideoItem, "id">) => void
  deleteVideo: (id: string) => void
}

const AdminDataContext = createContext<AdminStore | null>(null)

const uid = () => Math.random().toString(36).slice(2, 10)

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(seedNews)
  const [photos, setPhotos] = useState<PhotoItem[]>(seedPhotos)
  const [videos, setVideos] = useState<VideoItem[]>(seedVideos)

  const addNews = useCallback(
    (item: Omit<NewsItem, "id">) =>
      setNews((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateNews = useCallback(
    (id: string, item: Omit<NewsItem, "id">) =>
      setNews((prev) => prev.map((n) => (n.id === id ? { ...item, id } : n))),
    [],
  )
  const deleteNews = useCallback(
    (id: string) => setNews((prev) => prev.filter((n) => n.id !== id)),
    [],
  )

  const addPhoto = useCallback(
    (item: Omit<PhotoItem, "id">) =>
      setPhotos((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updatePhoto = useCallback(
    (id: string, item: Omit<PhotoItem, "id">) =>
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...item, id } : p))),
    [],
  )
  const deletePhoto = useCallback(
    (id: string) => setPhotos((prev) => prev.filter((p) => p.id !== id)),
    [],
  )

  const addVideo = useCallback(
    (item: Omit<VideoItem, "id">) =>
      setVideos((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateVideo = useCallback(
    (id: string, item: Omit<VideoItem, "id">) =>
      setVideos((prev) => prev.map((v) => (v.id === id ? { ...item, id } : v))),
    [],
  )
  const deleteVideo = useCallback(
    (id: string) => setVideos((prev) => prev.filter((v) => v.id !== id)),
    [],
  )

  return (
    <AdminDataContext.Provider
      value={{
        news,
        photos,
        videos,
        addNews,
        updateNews,
        deleteNews,
        addPhoto,
        updatePhoto,
        deletePhoto,
        addVideo,
        updateVideo,
        deleteVideo,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) {
    throw new Error("useAdminData must be used within an AdminDataProvider")
  }
  return ctx
}
