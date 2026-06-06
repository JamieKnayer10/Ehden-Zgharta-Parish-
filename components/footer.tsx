import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Mass Times", href: "/mass-times" },
  { name: "Yanabi3", href: "/yanabi3" },
  { name: "News", href: "/news" },
  { name: "Churches", href: "/churches" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
]

const mediaLinks = [
  { name: "Zgharta Channel", href: "/zgharta-channel" },
  { name: "Radio Ehden", href: "/radio-ehden" },
  { name: "Photo Gallery", href: "/media/gallery" },
  { name: "Videos", href: "/media/videos" },
]

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/EhdenZghartaParishOfficial", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/ehdenzghartaparish?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: Instagram },
  // { name: "YouTube", href: "http://www.youtube.com/@ZghartaChannelHD", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Parish Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parish%20logo%202-GQnfE9BeZQCviAkTifBUZIW21fgdDk.jpg"
                alt="Parish Logo"
                width={64}
                height={64}
                className="h-16 w-auto rounded-full bg-white p-1"
              />
              <div>
                <h3 className="font-serif text-lg font-semibold">Ehden-Zgharta Parish</h3>
                <p className="text-sm text-primary-foreground/80">Maronite Patriarchal Eparchy</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              A spiritual home for faith and community in the heart of Lebanon, serving the faithful of Ehden and Zgharta.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media Platforms */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Media Platforms</h3>
            <ul className="space-y-2">
              {mediaLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zgharta%20channel%20logo-rPVGuQhyx5iXVzOiX2ItOUKodL3gmo.jpg"
                alt="Zgharta Channel"
                width={48}
                height={48}
                className="h-12 w-auto rounded bg-white p-1"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/radio%20ehden%20logo-b7zXcUIR3maHfovbEt0keF4lm9v1L8.jpg"
                alt="Radio Ehden"
                width={48}
                height={48}
                className="h-12 w-auto rounded bg-white p-1"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ehden-Zgharta%2C+North+Lebanon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Ehden-Zgharta, North Lebanon
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:+96106660230" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                  +961 6 660 230
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:info@ehdenz.com" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                  info@ehdenz.com
                </a>
              </li>
            </ul>
            <Button
              variant="secondary"
              className="mt-4 w-full"
              asChild
            >
              <a
                href="https://wa.me/96106660230"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-primary-foreground/60">
              &copy; {new Date().getFullYear()} Maronite Patriarchal Eparchy, Vicariate of Ehden-Zgharta. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-primary-foreground/60 hover:text-primary-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-primary-foreground/60 hover:text-primary-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
