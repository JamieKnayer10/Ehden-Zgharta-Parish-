"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

export type Status = "published" | "draft"

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

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

export interface GalleryPhoto {
  id: string
  title: string
  titleAr: string
  location: string
  category: string
  date: string
  description: string
  image: string
}

export interface MediaVideo {
  id: string
  title: string
  titleAr: string
  category: string
  url: string
  thumbnail: string
  duration: string
  views: string
  date: string
  description: string
  featured: boolean
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

/** Rich church/holy-site profile shown on the /churches page (independent of mass schedules). */
export interface ChurchProfile {
  id: string
  name: string
  nameAr: string
  location: string
  type: "church" | "monastery" | "chapel"
  patronSaint: string
  patronSaintAr: string
  description: string
  massSchedule: string
  image: string
  featured: boolean
}

export interface Bulletin {
  id: string
  title: string
  titleAr: string
  season: string
  date: string
  year: number
  fileUrl: string
}

/* ---- Generic editable page content (for informational pages) ---- */

export interface SiteItem {
  id: string
  [key: string]: string
}

export interface SiteSection {
  id: string
  title: string
  /** Field keys present on each item, e.g. ["title", "titleAr", "description"]. */
  fields: string[]
  items: SiteItem[]
}

export interface SitePage {
  slug: string
  name: string
  path: string
  hero: {
    badge: string
    title: string
    titleAr: string
    description: string
    image: string
  }
  sections: SiteSection[]
}

/* ------------------------------------------------------------------ */
/* Option lists                                                        */
/* ------------------------------------------------------------------ */

export const massLocations = ["Ehden", "Zgharta"]
export const newsCategories = ["Parish News", "Church News", "Events", "Announcements"]
export const galleryCategories = ["Churches", "Landscapes", "Events", "Heritage", "Seasons"]
export const videoCategories = ["Liturgy", "Documentary", "Events", "Nature & Heritage", "Special Event"]
export const churchTypes = ["church", "monastery", "chapel"] as const
export const bulletinSeasons = ["resurrection", "pentecost", "cross", "christmas", "epiphany", "lent"]

/* ------------------------------------------------------------------ */
/* Seed data (mirrors current website content)                         */
/* ------------------------------------------------------------------ */

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

const seedChurches: ChurchProfile[] = [
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
    featured: false,
  },
]

const seedGallery: GalleryPhoto[] = [
  { id: "g1", title: "Mar Mama Church", titleAr: "كنيسة مار ماما", location: "Ehden", category: "Churches", date: "2026", description: "One of the oldest churches in Ehden, dating back to 749 AD", image: "/images/mar-mama-church.jpg" },
  { id: "g2", title: "St. George Cathedral", titleAr: "كاتدرائية مار جرجس", location: "Zgharta", category: "Churches", date: "2026", description: "The main cathedral of Zgharta, a spiritual center of the town", image: "/images/st-george-cathedral.jpg" },
  { id: "g3", title: "Horsh Ehden Nature Reserve", titleAr: "محمية حرش إهدن", location: "Ehden", category: "Landscapes", date: "2025", description: "The famous cedar forest and nature reserve with stunning autumn colors", image: "/images/horsh-ehden.jpg" },
  { id: "g4", title: "Old Town Streets", titleAr: "شوارع البلدة القديمة", location: "Ehden", category: "Heritage", date: "2025", description: "Traditional stone houses and narrow streets of old Ehden", image: "/images/ehden-old-town.jpg" },
  { id: "g5", title: "Zgharta Panoramic View", titleAr: "إطلالة بانورامية على زغرتا", location: "Zgharta", category: "Landscapes", date: "2025", description: "Stunning view of Zgharta city with its churches and traditional architecture", image: "/images/zgharta-panorama.jpg" },
  { id: "g6", title: "Easter Procession", titleAr: "موكب عيد الفصح", location: "Ehden", category: "Events", date: "2025", description: "Traditional Easter religious procession through the streets", image: "/images/easter-procession.jpg" },
  { id: "g7", title: "Church Interior", titleAr: "داخل الكنيسة", location: "Zgharta", category: "Churches", date: "2025", description: "Beautiful interior of a historic Maronite church with ornate altar", image: "/images/church-interior.jpg" },
  { id: "g8", title: "Qadisha Valley", titleAr: "وادي قاديشا", location: "Near Ehden", category: "Landscapes", date: "2025", description: "UNESCO World Heritage site with ancient monasteries", image: "/images/qadisha-valley.jpg" },
  { id: "g9", title: "Saydet el Hosn", titleAr: "سيدة الحصن", location: "Ehden", category: "Churches", date: "2026", description: "The iconic shrine overlooking the mountains of North Lebanon", image: "/images/saydet-el-hosn.jpg" },
  { id: "g10", title: "Mar Sarkis Monastery", titleAr: "دير مار سركيس", location: "Ehden", category: "Churches", date: "2026", description: "Ancient monastery dating to the 8th century with panoramic views", image: "/images/mar-sarkis-monastery.jpg" },
  { id: "g11", title: "Winter in Ehden", titleAr: "الشتاء في إهدن", location: "Ehden", category: "Seasons", date: "2025", description: "Snow-covered streets and rooftops during winter season", image: "/images/ehden-winter.jpg" },
  { id: "g12", title: "Summer Festival", titleAr: "مهرجان الصيف", location: "Ehden", category: "Events", date: "2025", description: "Annual summer festival with traditional music and dance", image: "/images/summer-festival.jpg" },
  { id: "g13", title: "Mountain Sunset", titleAr: "غروب الشمس الجبلي", location: "Ehden", category: "Landscapes", date: "2025", description: "Breathtaking sunset over Mount Lebanon from Ehden viewpoint", image: "/images/mountain-sunset.jpg" },
  { id: "g14", title: "Our Lady of Zgharta", titleAr: "سيدة زغرتا", location: "Zgharta", category: "Churches", date: "2026", description: "Beautiful church dedicated to the Virgin Mary", image: "/images/our-lady-zgharta.jpg" },
  { id: "g15", title: "Ehden Village", titleAr: "قرية إهدن", location: "Ehden", category: "Landscapes", date: "2026", description: "Panoramic view of Ehden village nestled in the mountains", image: "/images/ehden-landscape.jpg" },
]

const seedVideos: MediaVideo[] = [
  { id: "v1", title: "Easter Celebration 2025 - Ehden Parish", titleAr: "احتفالات عيد الفصح 2025 - رعية إهدن", category: "Liturgy", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/images/easter-procession.jpg", duration: "45:32", views: "12.5K", date: "April 2025", description: "Full coverage of the Easter celebrations at the Maronite Parish of Ehden, including the Holy Week processions and Easter Sunday Mass.", featured: true, status: "published" },
  { id: "v2", title: "Horsh Ehden Nature Reserve - Drone Tour", titleAr: "محمية حرش إهدن - جولة جوية", category: "Nature & Heritage", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/images/horsh-ehden.jpg", duration: "12:45", views: "28.3K", date: "October 2025", description: "Breathtaking aerial footage of the famous Horsh Ehden nature reserve, showcasing the ancient cedar forests and stunning autumn colors.", featured: true, status: "published" },
  { id: "v3", title: "History of Mar Mama Church", titleAr: "تاريخ كنيسة مار ماما", category: "Documentary", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/images/mar-mama-church.jpg", duration: "22:18", views: "8.7K", date: "March 2025", description: "Documentary exploring the rich history of Mar Mama Church, one of the oldest churches in Lebanon dating back to 749 AD.", featured: false, status: "published" },
  { id: "v4", title: "Summer Festival Ehden 2025", titleAr: "مهرجان إهدن الصيفي 2025", category: "Events", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/images/summer-festival.jpg", duration: "1:15:42", views: "45.2K", date: "August 2025", description: "Highlights from the annual Ehden Summer Festival featuring traditional Lebanese music, dabke performances, and cultural celebrations.", featured: true, status: "published" },
  { id: "v5", title: "Christmas Mass - St. George Cathedral", titleAr: "قداس عيد الميلاد - كاتدرائية مار جرجس", category: "Liturgy", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/images/st-george-cathedral.jpg", duration: "1:32:15", views: "21.4K", date: "December 2024", description: "Full Christmas Mass celebration from St. George Cathedral in Zgharta with traditional Maronite hymns and carols.", featured: false, status: "published" },
  { id: "v6", title: "Qadisha Valley - Sacred Heritage", titleAr: "وادي قاديشا - التراث المقدس", category: "Documentary", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/images/qadisha-valley.jpg", duration: "35:20", views: "32.1K", date: "May 2025", description: "Explore the UNESCO World Heritage site of Qadisha Valley, home to ancient monasteries and the spiritual heart of Maronite Christianity.", featured: true, status: "published" },
  { id: "v7", title: "Blessed Patriarch Douaihy Documentary", titleAr: "وثائقي البطريرك المطوّب اسطفان الدويهي", category: "Documentary", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/images/church-interior.jpg", duration: "48:55", views: "25.6K", date: "August 2024", description: "Documentary about the life and legacy of Blessed Patriarch Stephane Douaihy, the son of Ehden who was beatified in 2024.", featured: true, status: "published" },
]

const seedMassChurches: MassChurchItem[] = [
  { id: "m1", church: "Mar Mama Church", churchAr: "كنيسة مار ماما", location: "Ehden", schedule: [{ day: "Sunday", times: ["8:00 AM", "10:30 AM"] }, { day: "Monday - Friday", times: ["7:00 AM"] }, { day: "Saturday", times: ["7:00 AM", "6:00 PM"] }], confession: "Saturday 5:00 PM - 6:00 PM" },
  { id: "m2", church: "St. George Cathedral", churchAr: "كاتدرائية مار جرجس", location: "Zgharta", schedule: [{ day: "Sunday", times: ["9:00 AM", "11:00 AM"] }, { day: "Monday - Friday", times: ["6:30 AM", "6:00 PM"] }, { day: "Saturday", times: ["6:30 AM", "6:00 PM"] }], confession: "Saturday 4:30 PM - 5:30 PM" },
  { id: "m3", church: "Our Lady of Zgharta", churchAr: "سيدة زغرتا", location: "Zgharta", schedule: [{ day: "Sunday", times: ["10:00 AM"] }, { day: "Saturday", times: ["6:00 PM (Vigil)"] }], confession: "Before Sunday Mass" },
  { id: "m4", church: "Mar Sarkis Monastery", churchAr: "دير مار سركيس", location: "Ehden", schedule: [{ day: "Sunday", times: ["8:00 AM"] }, { day: "Daily", times: ["6:00 AM"] }], confession: "By appointment" },
  { id: "m5", church: "St. Anthony Church", churchAr: "كنيسة مار أنطونيوس", location: "Ehden", schedule: [{ day: "Sunday", times: ["9:30 AM"] }, { day: "Monday - Friday", times: ["7:30 AM"] }], confession: "Saturday 5:00 PM - 6:00 PM" },
]

const seedSpecialMasses: SpecialMassItem[] = [
  { id: "s1", title: "Easter Triduum", date: "April 17-20, 2026", description: "Holy Thursday, Good Friday, and Easter Vigil services", location: "All Churches" },
  { id: "s2", title: "Feast of Mar Mama", date: "August 2, 2026", description: "Special celebration at Mar Mama Church", location: "Mar Mama Church, Ehden" },
  { id: "s3", title: "Assumption of Mary", date: "August 15, 2026", description: "Celebration of the Assumption of the Virgin Mary", location: "Our Lady of Zgharta" },
]

const seedBulletins: Bulletin[] = [
  { id: "b1", title: "Third Sunday of Resurrection", titleAr: "الأحد الثالث من القيامة", season: "resurrection", date: "April 6, 2026", year: 2026, fileUrl: "" },
  { id: "b2", title: "Second Sunday of Resurrection", titleAr: "الأحد الثاني من القيامة", season: "resurrection", date: "March 30, 2026", year: 2026, fileUrl: "" },
  { id: "b3", title: "Easter Sunday", titleAr: "أحد الفصح", season: "resurrection", date: "March 23, 2026", year: 2026, fileUrl: "" },
  { id: "b4", title: "Palm Sunday", titleAr: "أحد الشعانين", season: "lent", date: "March 16, 2026", year: 2026, fileUrl: "" },
  { id: "b5", title: "Fifth Sunday of Lent", titleAr: "الأحد الخامس من الصوم", season: "lent", date: "March 9, 2026", year: 2026, fileUrl: "" },
  { id: "b6", title: "Feast of Epiphany", titleAr: "عيد الدنح", season: "epiphany", date: "January 6, 2026", year: 2026, fileUrl: "" },
]

const seedPages: SitePage[] = [
  {
    slug: "home",
    name: "Home Page",
    path: "/",
    hero: {
      badge: "Welcome",
      title: "Maronite Parish of Ehden & Zgharta",
      titleAr: "رعية إهدن وزغرتا المارونية",
      description: "A spiritual home preserving centuries of Maronite faith and heritage in North Lebanon.",
      image: "/images/hero-church.jpg",
    },
    sections: [
      {
        id: "home-verse",
        title: "Verse of the Day",
        fields: ["text", "reference"],
        items: [
          { id: "hv1", text: "I am the way, the truth, and the life.", reference: "John 14:6" },
        ],
      },
    ],
  },
  {
    slug: "about",
    name: "About",
    path: "/about",
    hero: {
      badge: "About Us",
      title: "Maronite Patriarchal Eparchy",
      titleAr: "الأبرشية البطريركية المارونية - نيابة إهدن زغرتا",
      description: "Vicariate of Ehden-Zgharta",
      image: "",
    },
    sections: [
      {
        id: "about-values",
        title: "Our Values",
        fields: ["title", "titleAr", "description"],
        items: [
          { id: "av1", title: "Faith", titleAr: "الإيمان", description: "Rooted in the Maronite tradition, we celebrate our faith through the Holy Liturgy and sacraments." },
          { id: "av2", title: "Community", titleAr: "المجتمع", description: "Building strong bonds between families and generations, creating a supportive faith community." },
          { id: "av3", title: "Service", titleAr: "الخدمة", description: "Serving those in need through charitable works and outreach programs in our region." },
          { id: "av4", title: "Education", titleAr: "التعليم", description: "Nurturing faith formation for all ages through catechesis and religious education." },
        ],
      },
      {
        id: "about-milestones",
        title: "Timeline Milestones",
        fields: ["year", "event"],
        items: [
          { id: "am1", year: "749 AD", event: "Founding of the first church in Ehden" },
          { id: "am2", year: "1283", event: "Establishment of Mar Mama Church" },
          { id: "am3", year: "1516", event: "Construction of St. George Cathedral in Zgharta" },
          { id: "am4", year: "1900", event: "Formation of the modern parish structure" },
          { id: "am5", year: "2000", event: "Launch of Radio Ehden" },
          { id: "am6", year: "2015", event: "Establishment of Zgharta Channel" },
        ],
      },
    ],
  },
  {
    slug: "history",
    name: "History",
    path: "/about/history",
    hero: {
      badge: "Our Heritage",
      title: "Our History",
      titleAr: "تاريخنا العريق",
      description: "A journey through centuries of faith, resilience, and devotion in the heart of North Lebanon.",
      image: "",
    },
    sections: [
      {
        id: "history-stats",
        title: "Statistics",
        fields: ["number", "label", "labelAr"],
        items: [
          { id: "hs1", number: "1,200+", label: "Years of Faith", labelAr: "سنة من الإيمان" },
          { id: "hs2", number: "12", label: "Historic Churches", labelAr: "كنيسة تاريخية" },
          { id: "hs3", number: "6", label: "Monasteries", labelAr: "أديرة" },
          { id: "hs4", number: "50,000+", label: "Faithful Served", labelAr: "مؤمن" },
        ],
      },
      {
        id: "history-events",
        title: "Historical Events",
        fields: ["year", "title", "description"],
        items: [
          { id: "he1", year: "400 AD", title: "First Christian Communities", description: "Christianity spreads to the mountains of North Lebanon." },
          { id: "he2", year: "749 AD", title: "First Church in Ehden", description: "The first documented church is established in Ehden." },
          { id: "he3", year: "1283", title: "Mar Mama Church Founded", description: "The historic Mar Mama Church is established in Ehden." },
          { id: "he4", year: "1516", title: "St. George Cathedral Built", description: "The magnificent St. George Cathedral is constructed in Zgharta." },
          { id: "he5", year: "2024", title: "Beatification of Patriarch Douaihy", description: "Patriarch Stephane Douaihy is beatified on August 2, 2024." },
        ],
      },
    ],
  },
  {
    slug: "vicar",
    name: "The Vicar",
    path: "/about/vicar",
    hero: {
      badge: "Our Spiritual Leader",
      title: "Reverend Monsignor Joseph Naffah",
      titleAr: "النائب البطريركي",
      description: "Patriarchal Vicar of Ehden-Zgharta, serving our community with dedication and love.",
      image: "",
    },
    sections: [
      {
        id: "vicar-bio",
        title: "Biography",
        fields: ["year", "title", "description"],
        items: [
          { id: "vb1", year: "1958", title: "Born in Ehden", description: "Born to a devout Maronite family in Ehden, North Lebanon." },
          { id: "vb2", year: "1984", title: "Ordination", description: "Ordained to the priesthood, beginning his lifelong service to the Maronite Church." },
          { id: "vb3", year: "2010", title: "Appointed Vicar", description: "Appointed as Patriarchal Vicar of Ehden-Zgharta." },
        ],
      },
      {
        id: "vicar-priorities",
        title: "Pastoral Priorities",
        fields: ["title", "description"],
        items: [
          { id: "vp1", title: "Liturgical Life", description: "Ensuring vibrant and reverent celebration of the Holy Mysteries in all our churches." },
          { id: "vp2", title: "Charitable Works", description: "Expanding our outreach to those in need throughout the region." },
          { id: "vp3", title: "Faith Formation", description: "Strengthening catechesis programs for all ages, from children to adults." },
        ],
      },
    ],
  },
  {
    slug: "patriarch",
    name: "Patriarch Douaihy",
    path: "/patriarch-douaihy",
    hero: {
      badge: "Blessed - Beatified August 2, 2024",
      title: "Patriarch Stephane Douaihy",
      titleAr: "الطوباوي البطريرك إسطفان الدويهي",
      description: "The 57th Patriarch of Antioch and All the East, 1630 - 1704, born in Ehden, Lebanon.",
      image: "/images/Estephan doueihy1.png",
    },
    sections: [
      {
        id: "patriarch-timeline",
        title: "Life Timeline",
        fields: ["year", "title", "titleAr", "description"],
        items: [
          { id: "pt1", year: "1630", title: "Birth in Ehden", titleAr: "الولادة في إهدن", description: "Stephane Douaihy was born in the village of Ehden in North Lebanon." },
          { id: "pt2", year: "1670", title: "Elected Patriarch", titleAr: "انتخابه بطريركاً", description: "Elected as the 57th Patriarch of Antioch and All the East, serving for 34 years." },
          { id: "pt3", year: "1704", title: "Death at Qannobin", titleAr: "الوفاة في قنوبين", description: "Passed away at the Patriarchal Convent of Qannobin in the Holy Valley." },
          { id: "pt4", year: "2024", title: "Beatification", titleAr: "التطويب", description: "Beatified on August 2, 2024, at Bkerke." },
        ],
      },
      {
        id: "patriarch-achievements",
        title: "His Legacy",
        fields: ["title", "description"],
        items: [
          { id: "pa1", title: "Church Organization", description: "Unified and organized the Maronite Church, establishing consistent customs and references." },
          { id: "pa2", title: "Historical Works", description: "Authored extensive works on Maronite history and the role of Christians in the East." },
          { id: "pa3", title: "Education", description: "Founded numerous schools and convents." },
        ],
      },
    ],
  },
  {
    slug: "services",
    name: "Services",
    path: "/services",
    hero: {
      badge: "Parish Services",
      title: "Services",
      titleAr: "خدمات الرعية",
      description: "Request certificates and documents from the parish.",
      image: "",
    },
    sections: [
      {
        id: "services-list",
        title: "Available Services",
        fields: ["title", "titleAr", "description", "href"],
        items: [
          { id: "sv1", title: "The First Sacrifice", titleAr: "القربانة الأولى", description: "Request a certificate or registration for the First Holy Communion sacrament.", href: "/services/first-sacrifice" },
          { id: "sv2", title: "Marriage Certificate", titleAr: "شهادة زواج", description: "Request a marriage certificate from parish records.", href: "/services/marriage-certificate" },
          { id: "sv3", title: "Certificate of Accreditation and Confirmation", titleAr: "شهادة تثبيت", description: "Request a certificate for the Sacrament of Confirmation.", href: "/services/confirmation-certificate" },
          { id: "sv4", title: "Death Certificate", titleAr: "شهادة وفاة", description: "Request a death certificate from parish records.", href: "/services/death-certificate" },
        ],
      },
    ],
  },
  {
    slug: "contact",
    name: "Contact",
    path: "/contact",
    hero: {
      badge: "Get in Touch",
      title: "Contact Us",
      titleAr: "تواصل معنا",
      description: "We're here to help. Reach out for any inquiries about mass times, sacraments, or parish activities.",
      image: "",
    },
    sections: [
      {
        id: "contact-info",
        title: "Contact Information",
        fields: ["label", "value"],
        items: [
          { id: "ci1", label: "Phone", value: "+961 6 660 230" },
          { id: "ci2", label: "Email", value: "info@ehdenz.com" },
          { id: "ci3", label: "Address", value: "Ehden-Zgharta, North Lebanon" },
          { id: "ci4", label: "Office Hours", value: "Mon-Sat: 9AM - 5PM" },
        ],
      },
      {
        id: "contact-social",
        title: "Social Links",
        fields: ["label", "url"],
        items: [
          { id: "cs1", label: "Facebook", url: "https://www.facebook.com/EhdenZghartaParishOfficial" },
          { id: "cs2", label: "Instagram", url: "https://www.instagram.com/ehdenzghartaparish" },
        ],
      },
    ],
  },
  {
    slug: "media",
    name: "Media Center",
    path: "/media",
    hero: {
      badge: "Media Center",
      title: "Media",
      titleAr: "الوسائط",
      description: "Discover photos, videos, broadcasts, and radio from the Maronite Parish of Ehden and Zgharta.",
      image: "/images/ehden-landscape.jpg",
    },
    sections: [
      {
        id: "media-sections",
        title: "Media Sections",
        fields: ["title", "titleAr", "description", "href", "image"],
        items: [
          { id: "ms1", title: "Photo Gallery", titleAr: "معرض الصور", description: "Explore the beauty of Ehden and Zgharta through our curated collection of photographs.", href: "/media/gallery", image: "/images/ehden-landscape.jpg" },
          { id: "ms2", title: "Video Gallery", titleAr: "معرض الفيديوهات", description: "Watch liturgical broadcasts, documentaries, and community events from our parish.", href: "/media/videos", image: "/images/mountain-sunset.jpg" },
          { id: "ms3", title: "Zgharta Channel", titleAr: "قناة زغرتا", description: "Our official channel broadcasting Mass, parish news, and special celebrations.", href: "/zgharta-channel", image: "/images/zgharta channel logo.jpg" },
          { id: "ms4", title: "Radio Ehden", titleAr: "إذاعة إهدن", description: "Listen to spiritual programs, hymns, and live broadcasts from Radio Ehden.", href: "/radio-ehden", image: "/images/radio ehden logo.jpg" },
        ],
      },
    ],
  },
  {
    slug: "radio",
    name: "Radio Ehden",
    path: "/radio-ehden",
    hero: {
      badge: "On Air",
      title: "Radio Ehden",
      titleAr: "صوت الحكمة والإيمان",
      description: "Voice of Wisdom & Faith",
      image: "",
    },
    sections: [
      {
        id: "radio-schedule",
        title: "Daily Schedule",
        fields: ["time", "program", "programAr"],
        items: [
          { id: "rs1", time: "06:00", program: "Morning Prayer", programAr: "صلاة الصباح" },
          { id: "rs2", time: "08:00", program: "Religious Music", programAr: "موسيقى دينية" },
          { id: "rs3", time: "12:00", program: "Ehden News", programAr: "أخبار إهدن" },
          { id: "rs4", time: "16:00", program: "Youth Corner", programAr: "ركن الشباب" },
          { id: "rs5", time: "20:00", program: "Evening Hymns", programAr: "ترانيم المساء" },
          { id: "rs6", time: "22:00", program: "Night Prayer", programAr: "صلاة الليل" },
        ],
      },
      {
        id: "radio-podcasts",
        title: "Podcast Archive",
        fields: ["title", "host", "category", "duration", "date"],
        items: [
          { id: "rp1", title: "Holy Week Reflections 2026", host: "Fr. Georges Kamal", category: "Spiritual", duration: "45 min", date: "April 2026" },
          { id: "rp2", title: "History of Ehden Churches", host: "Dr. Antoine Khoury", category: "Documentary", duration: "1 hr 20 min", date: "March 2026" },
          { id: "rp3", title: "Christmas Hymns Collection", host: "Mar Mama Choir", category: "Music", duration: "1 hr 5 min", date: "December 2025" },
        ],
      },
    ],
  },
  {
    slug: "channel",
    name: "Zgharta Channel",
    path: "/zgharta-channel",
    hero: {
      badge: "Live",
      title: "Zgharta Channel",
      titleAr: "قناة زغرتا",
      description: "Our official channel broadcasting Mass, parish news, and special celebrations.",
      image: "",
    },
    sections: [
      {
        id: "channel-schedule",
        title: "Daily Schedule",
        fields: ["time", "program", "programAr"],
        items: [
          { id: "cls1", time: "07:00", program: "Morning Prayer", programAr: "صلاة الصباح" },
          { id: "cls2", time: "08:00", program: "Daily Mass", programAr: "القداس اليومي" },
          { id: "cls3", time: "12:00", program: "Angelus", programAr: "صلاة التبشير الملائكي" },
          { id: "cls4", time: "18:00", program: "Evening Mass", programAr: "قداس المساء" },
          { id: "cls5", time: "22:00", program: "Night Prayer", programAr: "صلاة الليل" },
        ],
      },
      {
        id: "channel-archive",
        title: "Video Archive",
        fields: ["title", "titleAr", "category", "duration", "date"],
        items: [
          { id: "ca1", title: "Palm Sunday Mass 2026", titleAr: "قداس أحد الشعانين ٢٠٢٦", category: "Mass", duration: "1 hr 45 min", date: "April 6, 2026" },
          { id: "ca2", title: "The Saints of Ehden", titleAr: "قديسو إهدن", category: "Documentary", duration: "52 min", date: "March 15, 2026" },
          { id: "ca3", title: "Easter Vigil 2025", titleAr: "سهرة الفصح ٢٠٢٥", category: "Special Event", duration: "2 hr 30 min", date: "April 19, 2025" },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

interface AdminStore {
  news: NewsItem[]
  churches: ChurchProfile[]
  galleryPhotos: GalleryPhoto[]
  videos: MediaVideo[]
  massChurches: MassChurchItem[]
  specialMasses: SpecialMassItem[]
  bulletins: Bulletin[]
  pages: SitePage[]

  addNews: (item: Omit<NewsItem, "id">) => void
  updateNews: (id: string, item: Omit<NewsItem, "id">) => void
  deleteNews: (id: string) => void

  addChurch: (item: Omit<ChurchProfile, "id">) => void
  updateChurch: (id: string, item: Omit<ChurchProfile, "id">) => void
  deleteChurch: (id: string) => void

  addPhoto: (item: Omit<GalleryPhoto, "id">) => void
  updatePhoto: (id: string, item: Omit<GalleryPhoto, "id">) => void
  deletePhoto: (id: string) => void

  addVideo: (item: Omit<MediaVideo, "id">) => void
  updateVideo: (id: string, item: Omit<MediaVideo, "id">) => void
  deleteVideo: (id: string) => void

  addMassChurch: (item: Omit<MassChurchItem, "id">) => void
  updateMassChurch: (id: string, item: Omit<MassChurchItem, "id">) => void
  deleteMassChurch: (id: string) => void

  addSpecialMass: (item: Omit<SpecialMassItem, "id">) => void
  updateSpecialMass: (id: string, item: Omit<SpecialMassItem, "id">) => void
  deleteSpecialMass: (id: string) => void

  addBulletin: (item: Omit<Bulletin, "id">) => void
  updateBulletin: (id: string, item: Omit<Bulletin, "id">) => void
  deleteBulletin: (id: string) => void

  updatePageHero: (slug: string, hero: SitePage["hero"]) => void
  addSectionItem: (slug: string, sectionId: string, item: SiteItem) => void
  updateSectionItem: (slug: string, sectionId: string, item: SiteItem) => void
  deleteSectionItem: (slug: string, sectionId: string, itemId: string) => void
}

const AdminDataContext = createContext<AdminStore | null>(null)

const uid = () => Math.random().toString(36).slice(2, 10)

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(seedNews)
  const [churches, setChurches] = useState<ChurchProfile[]>(seedChurches)
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(seedGallery)
  const [videos, setVideos] = useState<MediaVideo[]>(seedVideos)
  const [massChurches, setMassChurches] = useState<MassChurchItem[]>(seedMassChurches)
  const [specialMasses, setSpecialMasses] = useState<SpecialMassItem[]>(seedSpecialMasses)
  const [bulletins, setBulletins] = useState<Bulletin[]>(seedBulletins)
  const [pages, setPages] = useState<SitePage[]>(seedPages)

  /* News */
  const addNews = useCallback((item: Omit<NewsItem, "id">) => setNews((p) => [{ ...item, id: uid() }, ...p]), [])
  const updateNews = useCallback((id: string, item: Omit<NewsItem, "id">) => setNews((p) => p.map((n) => (n.id === id ? { ...item, id } : n))), [])
  const deleteNews = useCallback((id: string) => setNews((p) => p.filter((n) => n.id !== id)), [])

  /* Churches */
  const addChurch = useCallback((item: Omit<ChurchProfile, "id">) => setChurches((p) => [{ ...item, id: uid() }, ...p]), [])
  const updateChurch = useCallback((id: string, item: Omit<ChurchProfile, "id">) => setChurches((p) => p.map((c) => (c.id === id ? { ...item, id } : c))), [])
  const deleteChurch = useCallback((id: string) => setChurches((p) => p.filter((c) => c.id !== id)), [])

  /* Gallery */
  const addPhoto = useCallback((item: Omit<GalleryPhoto, "id">) => setGalleryPhotos((p) => [{ ...item, id: uid() }, ...p]), [])
  const updatePhoto = useCallback((id: string, item: Omit<GalleryPhoto, "id">) => setGalleryPhotos((p) => p.map((x) => (x.id === id ? { ...item, id } : x))), [])
  const deletePhoto = useCallback((id: string) => setGalleryPhotos((p) => p.filter((x) => x.id !== id)), [])

  /* Videos */
  const addVideo = useCallback((item: Omit<MediaVideo, "id">) => setVideos((p) => [{ ...item, id: uid() }, ...p]), [])
  const updateVideo = useCallback((id: string, item: Omit<MediaVideo, "id">) => setVideos((p) => p.map((x) => (x.id === id ? { ...item, id } : x))), [])
  const deleteVideo = useCallback((id: string) => setVideos((p) => p.filter((x) => x.id !== id)), [])

  /* Mass churches */
  const addMassChurch = useCallback((item: Omit<MassChurchItem, "id">) => setMassChurches((p) => [{ ...item, id: uid() }, ...p]), [])
  const updateMassChurch = useCallback((id: string, item: Omit<MassChurchItem, "id">) => setMassChurches((p) => p.map((m) => (m.id === id ? { ...item, id } : m))), [])
  const deleteMassChurch = useCallback((id: string) => setMassChurches((p) => p.filter((m) => m.id !== id)), [])

  /* Special masses */
  const addSpecialMass = useCallback((item: Omit<SpecialMassItem, "id">) => setSpecialMasses((p) => [{ ...item, id: uid() }, ...p]), [])
  const updateSpecialMass = useCallback((id: string, item: Omit<SpecialMassItem, "id">) => setSpecialMasses((p) => p.map((s) => (s.id === id ? { ...item, id } : s))), [])
  const deleteSpecialMass = useCallback((id: string) => setSpecialMasses((p) => p.filter((s) => s.id !== id)), [])

  /* Bulletins */
  const addBulletin = useCallback((item: Omit<Bulletin, "id">) => setBulletins((p) => [{ ...item, id: uid() }, ...p]), [])
  const updateBulletin = useCallback((id: string, item: Omit<Bulletin, "id">) => setBulletins((p) => p.map((b) => (b.id === id ? { ...item, id } : b))), [])
  const deleteBulletin = useCallback((id: string) => setBulletins((p) => p.filter((b) => b.id !== id)), [])

  /* Page content */
  const updatePageHero = useCallback(
    (slug: string, hero: SitePage["hero"]) =>
      setPages((p) => p.map((pg) => (pg.slug === slug ? { ...pg, hero } : pg))),
    [],
  )
  const addSectionItem = useCallback(
    (slug: string, sectionId: string, item: SiteItem) =>
      setPages((p) =>
        p.map((pg) =>
          pg.slug === slug
            ? { ...pg, sections: pg.sections.map((s) => (s.id === sectionId ? { ...s, items: [...s.items, item] } : s)) }
            : pg,
        ),
      ),
    [],
  )
  const updateSectionItem = useCallback(
    (slug: string, sectionId: string, item: SiteItem) =>
      setPages((p) =>
        p.map((pg) =>
          pg.slug === slug
            ? { ...pg, sections: pg.sections.map((s) => (s.id === sectionId ? { ...s, items: s.items.map((it) => (it.id === item.id ? item : it)) } : s)) }
            : pg,
        ),
      ),
    [],
  )
  const deleteSectionItem = useCallback(
    (slug: string, sectionId: string, itemId: string) =>
      setPages((p) =>
        p.map((pg) =>
          pg.slug === slug
            ? { ...pg, sections: pg.sections.map((s) => (s.id === sectionId ? { ...s, items: s.items.filter((it) => it.id !== itemId) } : s)) }
            : pg,
        ),
      ),
    [],
  )

  return (
    <AdminDataContext.Provider
      value={{
        news,
        churches,
        galleryPhotos,
        videos,
        massChurches,
        specialMasses,
        bulletins,
        pages,
        addNews,
        updateNews,
        deleteNews,
        addChurch,
        updateChurch,
        deleteChurch,
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
        addBulletin,
        updateBulletin,
        deleteBulletin,
        updatePageHero,
        addSectionItem,
        updateSectionItem,
        deleteSectionItem,
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
