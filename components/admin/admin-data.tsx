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
  content?: string
  author?: string
  category: string
  date: string
  image: string
  featured?: boolean
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

export interface MassScheduleRow {
  day: string
  times: string[]
}

export interface MassChurchItem {
  id: string
  church: string
  churchAr: string
  location: string
  schedule: MassScheduleRow[]
  confession: string
}

export interface SpecialMassItem {
  id: string
  title: string
  date: string
  description: string
  location: string
}

export interface Yanabi3Item {
  id: string
  title: string
  titleAr: string
  season: string
  date: string
  year: number
  fileUrl: string
  status: Status
}

export type ChurchType = "church" | "monastery" | "chapel"

export interface ChurchItem {
  id: string
  name: string
  nameAr: string
  location: string
  type: ChurchType
  patronSaint: string
  patronSaintAr: string
  description: string
  massSchedule: string
  image: string
  slug: string
  featured: boolean
}

export type ServiceIconName =
  | "baby"
  | "heart"
  | "award"
  | "file-text"

export interface ServiceItem {
  id: string
  slug: string
  title: string
  titleAr: string
  description: string
  icon: ServiceIconName
  processingTime: string
  requiredDocuments: string[]
  contactNote: string
  href: string
  status: Status
}

export const massLocations = ["Ehden", "Zgharta"]

export const churchTypes: { value: ChurchType; label: string }[] = [
  { value: "church", label: "Church" },
  { value: "monastery", label: "Monastery" },
  { value: "chapel", label: "Chapel" },
]

export const yanabi3Seasons = [
  { value: "resurrection", label: "Resurrection", labelAr: "زمن القيامة" },
  { value: "pentecost", label: "Pentecost", labelAr: "زمن العنصرة" },
  { value: "cross", label: "Cross", labelAr: "زمن الصليب" },
  { value: "christmas", label: "Christmas", labelAr: "زمن الميلاد" },
  { value: "epiphany", label: "Epiphany", labelAr: "زمن الدنح" },
  { value: "lent", label: "Lent", labelAr: "زمن الصوم" },
]

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

const seedMassChurches: MassChurchItem[] = [
  {
    id: "m1",
    church: "Mar Mama Church",
    churchAr: "كنيسة مار ماما",
    location: "Ehden",
    schedule: [
      { day: "Sunday", times: ["8:00 AM", "10:30 AM"] },
      { day: "Monday - Friday", times: ["7:00 AM"] },
      { day: "Saturday", times: ["7:00 AM", "6:00 PM"] },
    ],
    confession: "Saturday 5:00 PM - 6:00 PM",
  },
  {
    id: "m2",
    church: "St. George Cathedral",
    churchAr: "كاتدرائية مار جرجس",
    location: "Zgharta",
    schedule: [
      { day: "Sunday", times: ["9:00 AM", "11:00 AM"] },
      { day: "Monday - Friday", times: ["6:30 AM", "6:00 PM"] },
      { day: "Saturday", times: ["6:30 AM", "6:00 PM"] },
    ],
    confession: "Saturday 4:30 PM - 5:30 PM",
  },
  {
    id: "m3",
    church: "Our Lady of Zgharta",
    churchAr: "سيدة زغرتا",
    location: "Zgharta",
    schedule: [
      { day: "Sunday", times: ["10:00 AM"] },
      { day: "Saturday", times: ["6:00 PM (Vigil)"] },
    ],
    confession: "Before Sunday Mass",
  },
  {
    id: "m4",
    church: "Mar Sarkis Monastery",
    churchAr: "دير مار سركيس",
    location: "Ehden",
    schedule: [
      { day: "Sunday", times: ["8:00 AM"] },
      { day: "Daily", times: ["6:00 AM"] },
    ],
    confession: "By appointment",
  },
  {
    id: "m5",
    church: "St. Anthony Church",
    churchAr: "كنيسة مار أنطونيوس",
    location: "Ehden",
    schedule: [
      { day: "Sunday", times: ["9:30 AM"] },
      { day: "Monday - Friday", times: ["7:30 AM"] },
    ],
    confession: "Saturday 5:00 PM - 6:00 PM",
  },
]

const seedSpecialMasses: SpecialMassItem[] = [
  {
    id: "s1",
    title: "Easter Triduum",
    date: "April 17-20, 2026",
    description: "Holy Thursday, Good Friday, and Easter Vigil services",
    location: "All Churches",
  },
  {
    id: "s2",
    title: "Feast of Mar Mama",
    date: "August 2, 2026",
    description: "Special celebration at Mar Mama Church",
    location: "Mar Mama Church, Ehden",
  },
  {
    id: "s3",
    title: "Assumption of Mary",
    date: "August 15, 2026",
    description: "Celebration of the Assumption of the Virgin Mary",
    location: "Our Lady of Zgharta",
  },
]

const seedYanabi3: Yanabi3Item[] = [
  {
    id: "y1",
    title: "Third Sunday of Resurrection",
    titleAr: "الأحد الثالث من القيامة",
    season: "resurrection",
    date: "2026-04-06",
    year: 2026,
    fileUrl: "/bulletins/yanabi3-2026-04-06.pdf",
    status: "published",
  },
  {
    id: "y2",
    title: "Easter Sunday",
    titleAr: "أحد الفصح",
    season: "resurrection",
    date: "2026-03-23",
    year: 2026,
    fileUrl: "/bulletins/yanabi3-2026-03-23.pdf",
    status: "published",
  },
  {
    id: "y3",
    title: "Palm Sunday",
    titleAr: "أحد الشعانين",
    season: "lent",
    date: "2026-03-16",
    year: 2026,
    fileUrl: "/bulletins/yanabi3-2026-03-16.pdf",
    status: "published",
  },
  {
    id: "y4",
    title: "Feast of Epiphany",
    titleAr: "عيد الدنح",
    season: "epiphany",
    date: "2026-01-06",
    year: 2026,
    fileUrl: "/bulletins/yanabi3-2026-01-06.pdf",
    status: "draft",
  },
]

const seedChurches: ChurchItem[] = [
  {
    id: "c1",
    name: "Mar Mama Church",
    nameAr: "كنيسة مار ماما",
    location: "Ehden",
    type: "church",
    patronSaint: "St. Mama",
    patronSaintAr: "القديس ماما",
    description:
      "One of the oldest churches in Ehden, dating back to 749 AD. Features Greek and Syriac inscriptions and is of great historical significance.",
    massSchedule: "Sunday: 8:00 AM, 10:30 AM | Weekdays: 7:00 AM",
    image: "/images/mar-mama-church.jpg",
    slug: "mar-mama",
    featured: true,
  },
  {
    id: "c2",
    name: "St. George Cathedral",
    nameAr: "كاتدرائية مار جرجس",
    location: "Zgharta",
    type: "church",
    patronSaint: "St. George",
    patronSaintAr: "القديس جرجس",
    description:
      "The main cathedral of Zgharta, serving as the spiritual center of the town. Features stunning religious artwork and architecture.",
    massSchedule: "Sunday: 9:00 AM, 11:00 AM | Weekdays: 6:30 AM",
    image: "/images/st-george-cathedral.jpg",
    slug: "st-george-cathedral",
    featured: true,
  },
  {
    id: "c3",
    name: "Our Lady of Zgharta",
    nameAr: "سيدة زغرتا",
    location: "Zgharta",
    type: "church",
    patronSaint: "Virgin Mary",
    patronSaintAr: "العذراء مريم",
    description:
      "A beautiful church dedicated to the Virgin Mary, featuring traditional Maronite architecture and sacred iconography.",
    massSchedule: "Sunday: 10:00 AM | Saturday: 6:00 PM",
    image: "/images/our-lady-zgharta.jpg",
    slug: "our-lady-zgharta",
    featured: false,
  },
  {
    id: "c4",
    name: "Mar Sarkis Monastery",
    nameAr: "دير مار سركيس",
    location: "Ehden",
    type: "monastery",
    patronSaint: "St. Sergius & St. Bacchus",
    patronSaintAr: "القديس سركيس وباخوس",
    description:
      "An ancient monastery dating to the 8th century, perched on mountains above Ehden with panoramic views of the valley.",
    massSchedule: "Sunday: 8:00 AM | Daily: 6:00 AM",
    image: "/images/mar-sarkis-monastery.jpg",
    slug: "mar-sarkis-monastery",
    featured: true,
  },
  {
    id: "c5",
    name: "Saydet el Hosn",
    nameAr: "سيدة الحصن",
    location: "Ehden",
    type: "church",
    patronSaint: "Virgin Mary",
    patronSaintAr: "العذراء مريم",
    description:
      "A historic pilgrimage site with a modern church and iconic white Virgin Mary statue offering panoramic mountain views.",
    massSchedule: "Sunday: 9:30 AM | Weekdays: 7:30 AM",
    image: "/images/saydet-el-hosn.jpg",
    slug: "saydet-el-hosn",
    featured: false,
  },
  {
    id: "c6",
    name: "Mar Doumit Chapel",
    nameAr: "كنيسة مار ضومط",
    location: "Ehden",
    type: "chapel",
    patronSaint: "St. Doumit",
    patronSaintAr: "القديس ضومط",
    description:
      "A small historic chapel in the heart of old Ehden, representing the rich religious heritage of the region.",
    massSchedule: "Feast days only",
    image: "/images/mar-mama-church.jpg",
    slug: "mar-doumit",
    featured: false,
  },
]

interface AdminStore {
  news: NewsItem[]
  photos: PhotoItem[]
  videos: VideoItem[]
  massChurches: MassChurchItem[]
  specialMasses: SpecialMassItem[]
  yanabi3: Yanabi3Item[]
  churches: ChurchItem[]
  addNews: (item: Omit<NewsItem, "id">) => void
  updateNews: (id: string, item: Omit<NewsItem, "id">) => void
  deleteNews: (id: string) => void
  addPhoto: (item: Omit<PhotoItem, "id">) => void
  updatePhoto: (id: string, item: Omit<PhotoItem, "id">) => void
  deletePhoto: (id: string) => void
  addVideo: (item: Omit<VideoItem, "id">) => void
  updateVideo: (id: string, item: Omit<VideoItem, "id">) => void
  deleteVideo: (id: string) => void
  addMassChurch: (item: Omit<MassChurchItem, "id">) => void
  updateMassChurch: (id: string, item: Omit<MassChurchItem, "id">) => void
  deleteMassChurch: (id: string) => void
  addSpecialMass: (item: Omit<SpecialMassItem, "id">) => void
  updateSpecialMass: (id: string, item: Omit<SpecialMassItem, "id">) => void
  deleteSpecialMass: (id: string) => void
  addYanabi3: (item: Omit<Yanabi3Item, "id">) => void
  updateYanabi3: (id: string, item: Omit<Yanabi3Item, "id">) => void
  deleteYanabi3: (id: string) => void
  addChurch: (item: Omit<ChurchItem, "id">) => void
  updateChurch: (id: string, item: Omit<ChurchItem, "id">) => void
  deleteChurch: (id: string) => void
}

const AdminDataContext = createContext<AdminStore | null>(null)

const uid = () => Math.random().toString(36).slice(2, 10)

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(seedNews)
  const [photos, setPhotos] = useState<PhotoItem[]>(seedPhotos)
  const [videos, setVideos] = useState<VideoItem[]>(seedVideos)
  const [massChurches, setMassChurches] =
    useState<MassChurchItem[]>(seedMassChurches)
  const [specialMasses, setSpecialMasses] =
    useState<SpecialMassItem[]>(seedSpecialMasses)
  const [yanabi3, setYanabi3] = useState<Yanabi3Item[]>(seedYanabi3)
  const [churches, setChurches] = useState<ChurchItem[]>(seedChurches)

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

  const addMassChurch = useCallback(
    (item: Omit<MassChurchItem, "id">) =>
      setMassChurches((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateMassChurch = useCallback(
    (id: string, item: Omit<MassChurchItem, "id">) =>
      setMassChurches((prev) =>
        prev.map((m) => (m.id === id ? { ...item, id } : m)),
      ),
    [],
  )
  const deleteMassChurch = useCallback(
    (id: string) =>
      setMassChurches((prev) => prev.filter((m) => m.id !== id)),
    [],
  )

  const addSpecialMass = useCallback(
    (item: Omit<SpecialMassItem, "id">) =>
      setSpecialMasses((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateSpecialMass = useCallback(
    (id: string, item: Omit<SpecialMassItem, "id">) =>
      setSpecialMasses((prev) =>
        prev.map((s) => (s.id === id ? { ...item, id } : s)),
      ),
    [],
  )
  const deleteSpecialMass = useCallback(
    (id: string) =>
      setSpecialMasses((prev) => prev.filter((s) => s.id !== id)),
    [],
  )

  const addYanabi3 = useCallback(
    (item: Omit<Yanabi3Item, "id">) =>
      setYanabi3((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateYanabi3 = useCallback(
    (id: string, item: Omit<Yanabi3Item, "id">) =>
      setYanabi3((prev) =>
        prev.map((y) => (y.id === id ? { ...item, id } : y)),
      ),
    [],
  )
  const deleteYanabi3 = useCallback(
    (id: string) => setYanabi3((prev) => prev.filter((y) => y.id !== id)),
    [],
  )

  const addChurch = useCallback(
    (item: Omit<ChurchItem, "id">) =>
      setChurches((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateChurch = useCallback(
    (id: string, item: Omit<ChurchItem, "id">) =>
      setChurches((prev) =>
        prev.map((c) => (c.id === id ? { ...item, id } : c)),
      ),
    [],
  )
  const deleteChurch = useCallback(
    (id: string) => setChurches((prev) => prev.filter((c) => c.id !== id)),
    [],
  )

  return (
    <AdminDataContext.Provider
      value={{
        news,
        photos,
        videos,
        massChurches,
        specialMasses,
        yanabi3,
        addNews,
        updateNews,
        deleteNews,
        addPhoto,
        updatePhoto,
        deletePhoto,
        addVideo,
        updateVideo,
        deleteVideo,
        addMassChurch,
        updateMassChurch,
        deleteMassChurch,
        addSpecialMass,
        updateSpecialMass,
        deleteSpecialMass,
        addYanabi3,
        updateYanabi3,
        deleteYanabi3,
        churches,
        addChurch,
        updateChurch,
        deleteChurch,
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
