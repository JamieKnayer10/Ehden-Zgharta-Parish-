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

export type ServiceSlug =
  | "first-sacrifice"
  | "marriage-certificate"
  | "confirmation-certificate"
  | "death-certificate"

export type RequestStatus = "pending" | "approved" | "completed" | "rejected"

export interface ServiceRequest {
  id: string
  service: ServiceSlug
  subjectName: string
  requesterName: string
  phone: string
  email: string
  date: string
  status: RequestStatus
  notes: string
}

export interface ServiceInfo {
  slug: ServiceSlug
  title: string
  titleAr: string
  description: string
  href: string
}

export const serviceCatalog: ServiceInfo[] = [
  {
    slug: "first-sacrifice",
    title: "The First Sacrifice",
    titleAr: "القربانة الأولى",
    description:
      "First Holy Communion registrations and certificate requests.",
    href: "/admin/dashboard/services/first-sacrifice",
  },
  {
    slug: "marriage-certificate",
    title: "Marriage Certificate",
    titleAr: "شهادة زواج",
    description: "Marriage certificate requests from parish records.",
    href: "/admin/dashboard/services/marriage-certificate",
  },
  {
    slug: "confirmation-certificate",
    title: "Certificate of Confirmation",
    titleAr: "شهادة تثبيت",
    description: "Sacrament of Confirmation certificate requests.",
    href: "/admin/dashboard/services/confirmation-certificate",
  },
  {
    slug: "death-certificate",
    title: "Death Certificate",
    titleAr: "شهادة وفاة",
    description: "Death certificate requests from parish records.",
    href: "/admin/dashboard/services/death-certificate",
  },
]

export const requestStatuses: { value: RequestStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
]

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

export type ChannelType = "tv" | "radio"

export interface ChannelItem {
  id: string
  name: string
  nameAr: string
  slug: string
  description: string
  descriptionAr: string
  type: ChannelType
  logo: string
  cover: string
  streamUrl: string
  websiteUrl: string
  socialFacebook: string
  socialYoutube: string
  socialInstagram: string
  status: Status
  featured: boolean
}

export const channelTypes: { value: ChannelType; label: string }[] = [
  { value: "tv", label: "Television" },
  { value: "radio", label: "Radio" },
]

export interface ContactInfo {
  phone: string
  email: string
  address: string
  addressAr: string
  officeHours: string
  socialFacebook: string
  socialInstagram: string
}

export type ContactSubmissionStatus = "new" | "read" | "replied" | "archived"

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  date: string
  status: ContactSubmissionStatus
}

export const contactSubmissionStatuses: {
  value: ContactSubmissionStatus
  label: string
}[] = [
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "archived", label: "Archived" },
]

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "request"
  | "contact"

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: NotificationType
  date: string
  read: boolean
  href?: string
}

export interface UserProfile {
  name: string
  email: string
  role: string
  avatar: string
  phone: string
  bio: string
}

export interface UserPreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  publishImmediately: boolean
  showArabicFields: boolean
  weeklyDigest: boolean
}

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

const seedServiceRequests: ServiceRequest[] = [
  {
    id: "sr1",
    service: "first-sacrifice",
    subjectName: "Maroun Estephan",
    requesterName: "Estephan Estephan",
    phone: "+961 70 123 456",
    email: "estephan@example.com",
    date: "2026-04-05",
    status: "pending",
    notes: "First Holy Communion registration for spring program.",
  },
  {
    id: "sr2",
    service: "marriage-certificate",
    subjectName: "Georges & Rita Khoury",
    requesterName: "Georges Khoury",
    phone: "+961 71 987 654",
    email: "g.khoury@example.com",
    date: "2026-04-02",
    status: "approved",
    notes: "Replacement copy for immigration purposes.",
  },
  {
    id: "sr3",
    service: "confirmation-certificate",
    subjectName: "Joseph Frangieh",
    requesterName: "Joseph Frangieh",
    phone: "+961 76 222 333",
    email: "j.frangieh@example.com",
    date: "2026-03-28",
    status: "completed",
    notes: "Confirmed at St. George Cathedral.",
  },
  {
    id: "sr4",
    service: "death-certificate",
    subjectName: "Late Boutros Obeid",
    requesterName: "Marie Obeid",
    phone: "+961 03 444 555",
    email: "m.obeid@example.com",
    date: "2026-03-20",
    status: "pending",
    notes: "Requested for inheritance documentation.",
  },
  {
    id: "sr5",
    service: "first-sacrifice",
    subjectName: "Tia Sleiman",
    requesterName: "Sleiman Sleiman",
    phone: "+961 78 111 222",
    email: "sleiman@example.com",
    date: "2026-03-15",
    status: "completed",
    notes: "",
  },
]

const seedChannels: ChannelItem[] = [
  {
    id: "ch1",
    name: "Zgharta Channel",
    nameAr: "قناة زغرتا",
    slug: "zgharta-channel",
    description:
      "The official television channel of the Ehden-Zgharta parish, broadcasting live masses, documentaries, and spiritual content.",
    descriptionAr:
      "القناة التلفزيونية الرسمية لرعية إهدن-زغرتا، تبث القداسات المباشرة والأفلام الوثائقية والمحتوى الروحي.",
    type: "tv",
    logo: "/images/st-george-cathedral.jpg",
    cover: "/images/mar-mama-church.jpg",
    streamUrl: "https://www.youtube.com/embed/live_stream?channel=UCexample",
    websiteUrl: "/zgharta-channel",
    socialFacebook: "https://facebook.com/zghartachannel",
    socialYoutube: "https://youtube.com/zghartachannel",
    socialInstagram: "",
    status: "published",
    featured: true,
  },
  {
    id: "ch2",
    name: "Radio Ehden",
    nameAr: "راديو إهدن",
    slug: "radio-ehden",
    description:
      "The parish radio station serving the Ehden-Zgharta community with spiritual programs, hymns, and live broadcasts since 2000.",
    descriptionAr:
      "محطة الرادio الرعوية التي تخدم مجتمع إهدن-زغرتا ببرامج روحية وترانيم وبث مباشر منذ عام 2000.",
    type: "radio",
    logo: "/images/ehden-landscape.jpg",
    cover: "/images/mountain-sunset.jpg",
    streamUrl: "https://stream.radioehden.lb/live",
    websiteUrl: "/radio-ehden",
    socialFacebook: "https://facebook.com/radioehden",
    socialYoutube: "",
    socialInstagram: "https://instagram.com/radioehden",
    status: "published",
    featured: true,
  },
]

const defaultContactInfo: ContactInfo = {
  phone: "+961 6 660 230",
  email: "info@ehdenz.com",
  address: "Ehden-Zgharta, North Lebanon",
  addressAr: "إهدن-زغرتا، شمال لبنان",
  officeHours: "Mon-Sat: 9AM - 5PM",
  socialFacebook: "https://facebook.com/ehdenzgharta",
  socialInstagram: "https://instagram.com/ehdenzgharta",
}

const seedContactSubmissions: ContactSubmission[] = [
  {
    id: "cs1",
    name: "Maria Khoury",
    email: "maria.k@example.com",
    phone: "+961 70 111 222",
    subject: "general",
    message:
      "I would like to inquire about the Easter schedule for all churches in the parish.",
    date: "2026-04-06",
    status: "new",
  },
  {
    id: "cs2",
    name: "Georges Frangieh",
    email: "g.frangieh@example.com",
    phone: "+961 71 333 444",
    subject: "baptism",
    message:
      "We are planning a baptism for our son in June. Could you provide available dates?",
    date: "2026-04-04",
    status: "read",
  },
  {
    id: "cs3",
    name: "Rita Obeid",
    email: "rita.obeid@example.com",
    phone: "+961 76 555 666",
    subject: "donation",
    message:
      "I would like to make a donation to the church restoration fund. Please advise on the process.",
    date: "2026-04-02",
    status: "replied",
  },
  {
    id: "cs4",
    name: "Tony Moawad",
    email: "tony.m@example.com",
    phone: "+961 78 777 888",
    subject: "volunteer",
    message:
      "I am interested in volunteering with the youth ministry program.",
    date: "2026-03-28",
    status: "archived",
  },
]

const seedNotifications: NotificationItem[] = [
  {
    id: "notif1",
    title: "New contact submission",
    message: "Maria Khoury submitted a general inquiry about Easter schedule.",
    type: "contact",
    date: "2026-04-06T10:30:00",
    read: false,
    href: "/admin/dashboard/contact",
  },
  {
    id: "notif2",
    title: "Service request pending",
    message: "First Holy Communion request from Maroun Estephan needs review.",
    type: "request",
    date: "2026-04-05T14:15:00",
    read: false,
    href: "/admin/dashboard/services/first-sacrifice",
  },
  {
    id: "notif3",
    title: "Article published",
    message: "Easter Celebrations Begin This Sunday is now live on the website.",
    type: "success",
    date: "2026-04-05T09:00:00",
    read: false,
    href: "/admin/dashboard/news",
  },
  {
    id: "notif4",
    title: "Draft article reminder",
    message: "Restoration of Historic Church Completed is still in draft status.",
    type: "warning",
    date: "2026-04-04T16:45:00",
    read: true,
    href: "/admin/dashboard/news",
  },
  {
    id: "notif5",
    title: "New photo uploaded",
    message: "Ehden Mountain Landscape was added to the Landscapes album.",
    type: "info",
    date: "2026-04-03T11:20:00",
    read: true,
    href: "/admin/dashboard/gallery",
  },
  {
    id: "notif6",
    title: "Contact form reply sent",
    message: "Reply sent to Rita Obeid regarding donation inquiry.",
    type: "success",
    date: "2026-04-02T13:00:00",
    read: true,
    href: "/admin/dashboard/contact",
  },
]

const defaultUserProfile: UserProfile = {
  name: "Parish Administrator",
  email: "admin@ehden-zgharta.org",
  role: "Content Administrator",
  avatar: "",
  phone: "+961 6 660 230",
  bio: "Managing content and communications for the Ehden-Zgharta parish website.",
}

const defaultUserPreferences: UserPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  publishImmediately: false,
  showArabicFields: true,
  weeklyDigest: true,
}

interface AdminStore {
  news: NewsItem[]
  photos: PhotoItem[]
  videos: VideoItem[]
  massChurches: MassChurchItem[]
  specialMasses: SpecialMassItem[]
  yanabi3: Yanabi3Item[]
  churches: ChurchItem[]
  serviceRequests: ServiceRequest[]
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
  addServiceRequest: (item: Omit<ServiceRequest, "id">) => void
  updateServiceRequest: (id: string, item: Omit<ServiceRequest, "id">) => void
  updateServiceRequestStatus: (id: string, status: RequestStatus) => void
  deleteServiceRequest: (id: string) => void
  channels: ChannelItem[]
  addChannel: (item: Omit<ChannelItem, "id">) => void
  updateChannel: (id: string, item: Omit<ChannelItem, "id">) => void
  deleteChannel: (id: string) => void
  contactInfo: ContactInfo
  updateContactInfo: (info: ContactInfo) => void
  contactSubmissions: ContactSubmission[]
  addContactSubmission: (item: Omit<ContactSubmission, "id">) => void
  updateContactSubmission: (
    id: string,
    item: Omit<ContactSubmission, "id">,
  ) => void
  updateContactSubmissionStatus: (
    id: string,
    status: ContactSubmissionStatus,
  ) => void
  deleteContactSubmission: (id: string) => void
  notifications: NotificationItem[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  deleteNotification: (id: string) => void
  userProfile: UserProfile
  updateUserProfile: (profile: UserProfile) => void
  userPreferences: UserPreferences
  updateUserPreferences: (prefs: UserPreferences) => void
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
  const [serviceRequests, setServiceRequests] =
    useState<ServiceRequest[]>(seedServiceRequests)
  const [channels, setChannels] = useState<ChannelItem[]>(seedChannels)
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo)
  const [contactSubmissions, setContactSubmissions] =
    useState<ContactSubmission[]>(seedContactSubmissions)
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(seedNotifications)
  const [userProfile, setUserProfile] =
    useState<UserProfile>(defaultUserProfile)
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences>(defaultUserPreferences)

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

  const addServiceRequest = useCallback(
    (item: Omit<ServiceRequest, "id">) =>
      setServiceRequests((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateServiceRequest = useCallback(
    (id: string, item: Omit<ServiceRequest, "id">) =>
      setServiceRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...item, id } : r)),
      ),
    [],
  )
  const updateServiceRequestStatus = useCallback(
    (id: string, status: RequestStatus) =>
      setServiceRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r)),
      ),
    [],
  )
  const deleteServiceRequest = useCallback(
    (id: string) =>
      setServiceRequests((prev) => prev.filter((r) => r.id !== id)),
    [],
  )

  const addChannel = useCallback(
    (item: Omit<ChannelItem, "id">) =>
      setChannels((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateChannel = useCallback(
    (id: string, item: Omit<ChannelItem, "id">) =>
      setChannels((prev) =>
        prev.map((c) => (c.id === id ? { ...item, id } : c)),
      ),
    [],
  )
  const deleteChannel = useCallback(
    (id: string) => setChannels((prev) => prev.filter((c) => c.id !== id)),
    [],
  )

  const updateContactInfo = useCallback(
    (info: ContactInfo) => setContactInfo(info),
    [],
  )
  const addContactSubmission = useCallback(
    (item: Omit<ContactSubmission, "id">) =>
      setContactSubmissions((prev) => [{ ...item, id: uid() }, ...prev]),
    [],
  )
  const updateContactSubmission = useCallback(
    (id: string, item: Omit<ContactSubmission, "id">) =>
      setContactSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...item, id } : s)),
      ),
    [],
  )
  const updateContactSubmissionStatus = useCallback(
    (id: string, status: ContactSubmissionStatus) =>
      setContactSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s)),
      ),
    [],
  )
  const deleteContactSubmission = useCallback(
    (id: string) =>
      setContactSubmissions((prev) => prev.filter((s) => s.id !== id)),
    [],
  )

  const markNotificationRead = useCallback(
    (id: string) =>
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      ),
    [],
  )
  const markAllNotificationsRead = useCallback(
    () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
    [],
  )
  const deleteNotification = useCallback(
    (id: string) =>
      setNotifications((prev) => prev.filter((n) => n.id !== id)),
    [],
  )

  const updateUserProfile = useCallback(
    (profile: UserProfile) => setUserProfile(profile),
    [],
  )
  const updateUserPreferences = useCallback(
    (prefs: UserPreferences) => setUserPreferences(prefs),
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
        serviceRequests,
        addServiceRequest,
        updateServiceRequest,
        updateServiceRequestStatus,
        deleteServiceRequest,
        channels,
        addChannel,
        updateChannel,
        deleteChannel,
        contactInfo,
        updateContactInfo,
        contactSubmissions,
        addContactSubmission,
        updateContactSubmission,
        updateContactSubmissionStatus,
        deleteContactSubmission,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        userProfile,
        updateUserProfile,
        userPreferences,
        updateUserPreferences,
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
