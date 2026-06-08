"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Radio, Tv, Church, Newspaper, BookOpen, Phone, Home, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { FileText } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { 
    name: "About", 
    href: "/about",
    icon: Users,
    children: [
      { name: "The Parish", href: "/about" },
      { name: "History", href: "/about/history" },
      { name: "The Vicar", href: "/about/vicar" },
      { name: "Blessed Patriarch Douaihy", href: "/patriarch-douaihy" },
    ]
  },
  { name: "Mass Times", href: "/mass-times", icon: Clock },
  { name: "Yanabi3", href: "/yanabi3", icon: BookOpen },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Churches", href: "/churches", icon: Church },
  { 
    name: "Services", 
    href: "/services",
    icon: FileText,
    children: [
      { name: "The First Sacrifice", href: "/services/first-sacrifice" },
      { name: "Marriage Certificate", href: "/services/marriage-certificate" },
      { name: "Certificate of Confirmation", href: "/services/confirmation-certificate" },
      { name: "Death Certificate", href: "/services/death-certificate" },
    ]
  },
  { 
    name: "Media", 
    href: "/media",
    icon: Tv,
    children: [
      { name: "Zgharta Channel", href: "/zgharta-channel" },
      { name: "Radio Ehden", href: "/radio-ehden" },
      { name: "Photo Gallery", href: "/media/gallery" },
      { name: "Videos", href: "/media/videos" },
    ]
  },
  { name: "Contact", href: "/contact", icon: Phone },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8" aria-label="Global">
        {/* Logo - moved more to the left */}
        <div className="flex lg:flex-1 -ml-2 lg:-ml-4">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parish%20logo%202-GQnfE9BeZQCviAkTifBUZIW21fgdDk.jpg"
              alt="Parish Logo"
              width={56}
              height={56}
              className="h-14 w-auto"
            />
            <div className="hidden sm:block">
              <p className="font-serif text-lg font-semibold text-primary leading-tight">Ehden-Zgharta</p>
              <p className="text-xs text-muted-foreground">Maronite Parish</p>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-1">
          {navigation.map((item) => (
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <Link href={child.href} className="w-full cursor-pointer">
                        {child.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Desktop CTA buttons - removed LIVE indicator */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/radio-ehden" className="flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Radio
            </Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/zgharta-channel" className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              Watch Live
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[calc(100dvh-4.5rem)] border-t" : "max-h-0"
        )}
      >
        <div className="space-y-1 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain">
          {navigation.map((item) => (
            item.children ? (
              <div key={item.name} className="py-2">
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  {item.name}
                </Link>
                <div className="mt-2 space-y-1 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 text-base font-medium text-foreground hover:bg-muted rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                {item.name}
              </Link>
            )
          ))}
          
          {/* Mobile Live Buttons */}
          <div className="flex gap-2 pt-4 border-t mt-4">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/radio-ehden" className="flex items-center justify-center gap-2">
                <Radio className="h-4 w-4" />
                Radio Ehden
              </Link>
            </Button>
            <Button className="flex-1 bg-primary" asChild>
              <Link href="/zgharta-channel" className="flex items-center justify-center gap-2">
                <Tv className="h-4 w-4" />
                Watch Live
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
