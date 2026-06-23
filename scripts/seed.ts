import { db } from "../lib/db"
import {
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
  pageContent,
} from "../lib/db/schema"

async function main() {
  console.log("[seed] starting...")

  await db
    .insert(news)
    .values([
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
    ])
    .onConflictDoNothing()

  await db
    .insert(photos)
    .values([
      { id: "p1", title: "Ehden Mountain Landscape", album: "Landscapes", image: "/images/ehden-landscape.jpg", date: "2026-03-30" },
      { id: "p2", title: "Mar Mama Church", album: "Churches", image: "/images/mar-mama-church.jpg", date: "2026-03-28" },
      { id: "p3", title: "Mountain Sunset", album: "Landscapes", image: "/images/mountain-sunset.jpg", date: "2026-03-25" },
      { id: "p4", title: "Our Lady of Zgharta", album: "Churches", image: "/images/our-lady-zgharta.jpg", date: "2026-03-20" },
    ])
    .onConflictDoNothing()

  await db
    .insert(videos)
    .values([
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
    ])
    .onConflictDoNothing()

  await db
    .insert(massChurches)
    .values([
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
    ])
    .onConflictDoNothing()

  await db
    .insert(specialMasses)
    .values([
      { id: "s1", title: "Easter Triduum", date: "April 17-20, 2026", description: "Holy Thursday, Good Friday, and Easter Vigil services", location: "All Churches" },
      { id: "s2", title: "Feast of Mar Mama", date: "August 2, 2026", description: "Special celebration at Mar Mama Church", location: "Mar Mama Church, Ehden" },
      { id: "s3", title: "Assumption of Mary", date: "August 15, 2026", description: "Celebration of the Assumption of the Virgin Mary", location: "Our Lady of Zgharta" },
    ])
    .onConflictDoNothing()

  await db
    .insert(yanabi3)
    .values([
      { id: "y1", title: "Third Sunday of Resurrection", titleAr: "الأحد الثالث من القيامة", season: "resurrection", date: "2026-04-06", year: 2026, fileUrl: "/bulletins/yanabi3-2026-04-06.pdf", status: "published" },
      { id: "y2", title: "Easter Sunday", titleAr: "أحد الفصح", season: "resurrection", date: "2026-03-23", year: 2026, fileUrl: "/bulletins/yanabi3-2026-03-23.pdf", status: "published" },
      { id: "y3", title: "Palm Sunday", titleAr: "أحد الشعانين", season: "lent", date: "2026-03-16", year: 2026, fileUrl: "/bulletins/yanabi3-2026-03-16.pdf", status: "published" },
      { id: "y4", title: "Feast of Epiphany", titleAr: "عيد الدنح", season: "epiphany", date: "2026-01-06", year: 2026, fileUrl: "/bulletins/yanabi3-2026-01-06.pdf", status: "draft" },
    ])
    .onConflictDoNothing()

  await db
    .insert(churches)
    .values([
      { id: "c1", name: "Mar Mama Church", nameAr: "كنيسة مار ماما", location: "Ehden", type: "church", patronSaint: "St. Mama", patronSaintAr: "القديس ماما", description: "One of the oldest churches in Ehden, dating back to 749 AD. Features Greek and Syriac inscriptions and is of great historical significance.", massSchedule: "Sunday: 8:00 AM, 10:30 AM | Weekdays: 7:00 AM", image: "/images/mar-mama-church.jpg", slug: "mar-mama", featured: true },
      { id: "c2", name: "St. George Cathedral", nameAr: "كاتدرائية مار جرجس", location: "Zgharta", type: "church", patronSaint: "St. George", patronSaintAr: "القديس جرجس", description: "The main cathedral of Zgharta, serving as the spiritual center of the town. Features stunning religious artwork and architecture.", massSchedule: "Sunday: 9:00 AM, 11:00 AM | Weekdays: 6:30 AM", image: "/images/st-george-cathedral.jpg", slug: "st-george-cathedral", featured: true },
      { id: "c3", name: "Our Lady of Zgharta", nameAr: "سيدة زغرتا", location: "Zgharta", type: "church", patronSaint: "Virgin Mary", patronSaintAr: "العذراء مريم", description: "A beautiful church dedicated to the Virgin Mary, featuring traditional Maronite architecture and sacred iconography.", massSchedule: "Sunday: 10:00 AM | Saturday: 6:00 PM", image: "/images/our-lady-zgharta.jpg", slug: "our-lady-zgharta", featured: false },
      { id: "c4", name: "Mar Sarkis Monastery", nameAr: "دير مار سركيس", location: "Ehden", type: "monastery", patronSaint: "St. Sergius & St. Bacchus", patronSaintAr: "القديس سركيس وباخوس", description: "An ancient monastery dating to the 8th century, perched on mountains above Ehden with panoramic views of the valley.", massSchedule: "Sunday: 8:00 AM | Daily: 6:00 AM", image: "/images/mar-sarkis-monastery.jpg", slug: "mar-sarkis-monastery", featured: true },
      { id: "c5", name: "Saydet el Hosn", nameAr: "سيدة الحصن", location: "Ehden", type: "church", patronSaint: "Virgin Mary", patronSaintAr: "العذراء مريم", description: "A historic pilgrimage site with a modern church and iconic white Virgin Mary statue offering panoramic mountain views.", massSchedule: "Sunday: 9:30 AM | Weekdays: 7:30 AM", image: "/images/saydet-el-hosn.jpg", slug: "saydet-el-hosn", featured: false },
      { id: "c6", name: "Mar Doumit Chapel", nameAr: "كنيسة مار ضومط", location: "Ehden", type: "chapel", patronSaint: "St. Doumit", patronSaintAr: "القديس ضومط", description: "A small historic chapel in the heart of old Ehden, representing the rich religious heritage of the region.", massSchedule: "Feast days only", image: "/images/mar-mama-church.jpg", slug: "mar-doumit", featured: false },
    ])
    .onConflictDoNothing()

  await db
    .insert(serviceRequests)
    .values([
      { id: "sr1", service: "first-sacrifice", subjectName: "Maroun Estephan", requesterName: "Estephan Estephan", phone: "+961 70 123 456", email: "estephan@example.com", date: "2026-04-05", status: "pending", notes: "First Holy Communion registration for spring program." },
      { id: "sr2", service: "marriage-certificate", subjectName: "Georges & Rita Khoury", requesterName: "Georges Khoury", phone: "+961 71 987 654", email: "g.khoury@example.com", date: "2026-04-02", status: "approved", notes: "Replacement copy for immigration purposes." },
      { id: "sr3", service: "confirmation-certificate", subjectName: "Joseph Frangieh", requesterName: "Joseph Frangieh", phone: "+961 76 222 333", email: "j.frangieh@example.com", date: "2026-03-28", status: "completed", notes: "Confirmed at St. George Cathedral." },
      { id: "sr4", service: "death-certificate", subjectName: "Late Boutros Obeid", requesterName: "Marie Obeid", phone: "+961 03 444 555", email: "m.obeid@example.com", date: "2026-03-20", status: "pending", notes: "Requested for inheritance documentation." },
      { id: "sr5", service: "first-sacrifice", subjectName: "Tia Sleiman", requesterName: "Sleiman Sleiman", phone: "+961 78 111 222", email: "sleiman@example.com", date: "2026-03-15", status: "completed", notes: "" },
    ])
    .onConflictDoNothing()

  await db
    .insert(channels)
    .values([
      { id: "ch1", name: "Zgharta Channel", nameAr: "قناة زغرتا", slug: "zgharta-channel", description: "The official television channel of the Ehden-Zgharta parish, broadcasting live masses, documentaries, and spiritual content.", descriptionAr: "القناة التلفزيونية الرسمية لرعية إهدن-زغرتا، تبث القداسات المباشرة والأفلام الوثائقية والمحتوى الروحي.", type: "tv", logo: "/images/st-george-cathedral.jpg", cover: "/images/mar-mama-church.jpg", streamUrl: "https://www.youtube.com/embed/live_stream?channel=UCexample", websiteUrl: "/zgharta-channel", socialFacebook: "https://facebook.com/zghartachannel", socialYoutube: "https://youtube.com/zghartachannel", socialInstagram: "", status: "published", featured: true },
      { id: "ch2", name: "Radio Ehden", nameAr: "راديو إهدن", slug: "radio-ehden", description: "The parish radio station serving the Ehden-Zgharta community with spiritual programs, hymns, and live broadcasts since 2000.", descriptionAr: "محطة الراديو الرعوية التي تخدم مجتمع إهدن-زغرتا ببرامج روحية وترانيم وبث مباشر منذ عام 2000.", type: "radio", logo: "/images/ehden-landscape.jpg", cover: "/images/mountain-sunset.jpg", streamUrl: "https://stream.radioehden.lb/live", websiteUrl: "/radio-ehden", socialFacebook: "https://facebook.com/radioehden", socialYoutube: "", socialInstagram: "https://instagram.com/radioehden", status: "published", featured: true },
    ])
    .onConflictDoNothing()

  await db
    .insert(contactSubmissions)
    .values([
      { id: "cs1", name: "Maria Khoury", email: "maria.k@example.com", phone: "+961 70 111 222", subject: "general", message: "I would like to inquire about the Easter schedule for all churches in the parish.", date: "2026-04-06", status: "new" },
      { id: "cs2", name: "Georges Frangieh", email: "g.frangieh@example.com", phone: "+961 71 333 444", subject: "baptism", message: "We are planning a baptism for our son in June. Could you provide available dates?", date: "2026-04-04", status: "read" },
      { id: "cs3", name: "Rita Obeid", email: "rita.obeid@example.com", phone: "+961 76 555 666", subject: "donation", message: "I would like to make a donation to the church restoration fund. Please advise on the process.", date: "2026-04-02", status: "replied" },
      { id: "cs4", name: "Tony Moawad", email: "tony.m@example.com", phone: "+961 78 777 888", subject: "volunteer", message: "I am interested in volunteering with the youth ministry program.", date: "2026-03-28", status: "archived" },
    ])
    .onConflictDoNothing()

  await db
    .insert(notifications)
    .values([
      { id: "notif1", title: "New contact submission", message: "Maria Khoury submitted a general inquiry about Easter schedule.", type: "contact", date: "2026-04-06T10:30:00", read: false, href: "/admin/dashboard/contact" },
      { id: "notif2", title: "Service request pending", message: "First Holy Communion request from Maroun Estephan needs review.", type: "request", date: "2026-04-05T14:15:00", read: false, href: "/admin/dashboard/services/first-sacrifice" },
      { id: "notif3", title: "Article published", message: "Easter Celebrations Begin This Sunday is now live on the website.", type: "success", date: "2026-04-05T09:00:00", read: false, href: "/admin/dashboard/news" },
      { id: "notif4", title: "Draft article reminder", message: "Restoration of Historic Church Completed is still in draft status.", type: "warning", date: "2026-04-04T16:45:00", read: true, href: "/admin/dashboard/news" },
      { id: "notif5", title: "New photo uploaded", message: "Ehden Mountain Landscape was added to the Landscapes album.", type: "info", date: "2026-04-03T11:20:00", read: true, href: "/admin/dashboard/gallery" },
      { id: "notif6", title: "Contact form reply sent", message: "Reply sent to Rita Obeid regarding donation inquiry.", type: "success", date: "2026-04-02T13:00:00", read: true, href: "/admin/dashboard/contact" },
    ])
    .onConflictDoNothing()

  // Page singletons (home verse, contact info, profile, preferences).
  await db
    .insert(pageContent)
    .values([
      {
        key: "home",
        content: {
          verseEn:
            "I am the resurrection and the life. The one who believes in me will live, even though they die.",
          verseAr: "أَنَا القِيَامَةُ وَالحَيَاة. مَنْ آمَنَ بِي وَلَوْ مَاتَ فَسَيَحْيَا.",
          verseReference: "John 11:25 | يوحنا 11:25",
        },
      },
      {
        key: "contactInfo",
        content: {
          phone: "+961 6 660 230",
          email: "info@ehdenz.com",
          address: "Ehden-Zgharta, North Lebanon",
          addressAr: "إهدن-زغرتا، شمال لبنان",
          officeHours: "Mon-Sat: 9AM - 5PM",
          socialFacebook: "https://facebook.com/ehdenzgharta",
          socialInstagram: "https://instagram.com/ehdenzgharta",
        },
      },
      {
        key: "userProfile",
        content: {
          name: "Parish Administrator",
          email: "admin@ehden-zgharta.org",
          role: "Content Administrator",
          avatar: "",
          phone: "+961 6 660 230",
          bio: "Managing content and communications for the Ehden-Zgharta parish website.",
        },
      },
      {
        key: "userPreferences",
        content: {
          emailNotifications: true,
          pushNotifications: true,
          publishImmediately: false,
          showArabicFields: true,
          weeklyDigest: true,
        },
      },
    ])
    .onConflictDoNothing()

  console.log("[seed] done.")
  process.exit(0)
}

main().catch((err) => {
  console.error("[seed] failed:", err)
  process.exit(1)
})
