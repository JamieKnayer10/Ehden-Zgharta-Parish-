import {
  pgTable,
  text,
  boolean,
  integer,
  serial,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core"

// ----------------------------------------------------------------------------
// Better Auth tables (used to gate admin access). Column names are camelCase to
// match Better Auth defaults — do not rename them.
// ----------------------------------------------------------------------------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

// ----------------------------------------------------------------------------
// Parish CMS content tables. Content is global/shared across all admins, so it
// is NOT scoped per user — auth only gates who can edit.
// ----------------------------------------------------------------------------
export const news = pgTable("news", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  titleAr: text("title_ar").notNull().default(""),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content"),
  author: text("author"),
  category: text("category").notNull().default(""),
  date: text("date").notNull().default(""),
  image: text("image").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  status: text("status").notNull().default("draft"),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const photos = pgTable("photos", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  album: text("album").notNull().default(""),
  image: text("image").notNull().default(""),
  date: text("date").notNull().default(""),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const videos = pgTable("videos", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  category: text("category").notNull().default(""),
  url: text("url").notNull().default(""),
  thumbnail: text("thumbnail").notNull().default(""),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("draft"),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const massChurches = pgTable("mass_churches", {
  id: text("id").primaryKey(),
  church: text("church").notNull().default(""),
  churchAr: text("church_ar").notNull().default(""),
  location: text("location").notNull().default(""),
  schedule: jsonb("schedule").notNull().default([]),
  confession: text("confession").notNull().default(""),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const specialMasses = pgTable("special_masses", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  date: text("date").notNull().default(""),
  description: text("description").notNull().default(""),
  location: text("location").notNull().default(""),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const yanabi3 = pgTable("yanabi3", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  titleAr: text("title_ar").notNull().default(""),
  season: text("season").notNull().default(""),
  date: text("date").notNull().default(""),
  year: integer("year").notNull().default(0),
  fileUrl: text("file_url").notNull().default(""),
  status: text("status").notNull().default("draft"),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const serviceRequests = pgTable("service_requests", {
  id: text("id").primaryKey(),
  service: text("service").notNull().default(""),
  subjectName: text("subject_name").notNull().default(""),
  requesterName: text("requester_name").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("pending"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const churches = pgTable("churches", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  nameAr: text("name_ar").notNull().default(""),
  location: text("location").notNull().default(""),
  type: text("type").notNull().default("church"),
  patronSaint: text("patron_saint").notNull().default(""),
  patronSaintAr: text("patron_saint_ar").notNull().default(""),
  description: text("description").notNull().default(""),
  massSchedule: text("mass_schedule").notNull().default(""),
  image: text("image").notNull().default(""),
  slug: text("slug").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const channels = pgTable("channels", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  nameAr: text("name_ar").notNull().default(""),
  slug: text("slug").notNull().default(""),
  description: text("description").notNull().default(""),
  descriptionAr: text("description_ar").notNull().default(""),
  type: text("type").notNull().default("tv"),
  logo: text("logo").notNull().default(""),
  cover: text("cover").notNull().default(""),
  streamUrl: text("stream_url").notNull().default(""),
  websiteUrl: text("website_url").notNull().default(""),
  socialFacebook: text("social_facebook").notNull().default(""),
  socialYoutube: text("social_youtube").notNull().default(""),
  socialInstagram: text("social_instagram").notNull().default(""),
  status: text("status").notNull().default("draft"),
  featured: boolean("featured").notNull().default(false),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const contactSubmissions = pgTable("contact_submissions", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull().default(""),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  message: text("message").notNull().default(""),
  type: text("type").notNull().default("info"),
  date: text("date").notNull().default(""),
  read: boolean("read").notNull().default(false),
  href: text("href"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

// Key-value store for page singletons (home verse, about pages, contact info,
// site settings, profile, preferences, etc.). One row per logical "page".
export const pageContent = pgTable("page_content", {
  key: text("key").primaryKey(),
  content: jsonb("content").notNull().default({}),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
