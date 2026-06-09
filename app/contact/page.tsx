"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Facebook,
  Instagram,
  ArrowLeft,
  CheckCircle
} from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+961 6 660 230",
    href: "tel:+96106660230",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@ehdenz.com",
    href: "mailto:info@ehdenz.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Ehden-Zgharta, North Lebanon",
    href: "#map",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon-Sat: 9AM - 5PM",
    href: null,
  },
]

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "mass", label: "Mass & Sacraments" },
  { value: "baptism", label: "Baptism Request" },
  { value: "wedding", label: "Wedding Request" },
  { value: "funeral", label: "Funeral Services" },
  { value: "certificate", label: "Certificate Request" },
  { value: "donation", label: "Donations" },
  { value: "volunteer", label: "Volunteer" },
  { value: "other", label: "Other" },
]

export default function ContactPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20">
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center text-primary-foreground">
            <Badge variant="secondary" className="mb-4">Get in Touch</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="mt-2 text-2xl font-light text-primary-foreground/80" dir="rtl">
              تواصل معنا
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {"We're"} here to help. Reach out to us for any inquiries about mass times, 
              sacraments, or parish activities.
            </p>
          </div>
        </section>

        {/* Back Navigation */}
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                
                {isSubmitted ? (
                  <Card className="border-none shadow-lg">
                    <CardContent className="py-16 text-center">
                      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground">Message Sent!</h3>
                      <p className="text-muted-foreground mt-2">
                        Thank you for contacting us. We will get back to you as soon as possible.
                      </p>
                      <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">
                              First Name *
                            </label>
                            <Input id="firstName" placeholder="John" required />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">
                              Last Name *
                            </label>
                            <Input id="lastName" placeholder="Doe" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address *
                          </label>
                          <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input id="phone" type="tel" placeholder="+961 XX XXX XXX" />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            Subject *
                          </label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject.value} value={subject.value}>
                                  {subject.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message *
                          </label>
                          <Textarea 
                            id="message" 
                            placeholder="How can we help you?" 
                            rows={5}
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>Sending...</>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                
                <div className="space-y-4 mb-8">
                  {contactInfo.map((item, index) => (
                    <Card key={index} className="border-none shadow-md">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          {item.href ? (
                            <a 
                              href={item.href}
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-medium text-foreground">{item.value}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* WhatsApp Button */}
                <Card className="border-none shadow-lg bg-green-600 text-white mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-white/20">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Chat on WhatsApp</h3>
                        <p className="text-sm text-white/80">Quick response guaranteed</p>
                      </div>
                      <Button 
                        variant="secondary" 
                        className="bg-white text-green-600 hover:bg-white/90"
                        asChild
                      >
                        <a 
                          href="https://wa.me/96106660230" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Chat Now
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    <a 
                      href="https://www.facebook.com/EhdenZghartaParishOfficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://www.instagram.com/ehdenzghartaparish?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-8" id="map">
                  <h3 className="font-semibold text-foreground mb-4">Location</h3>
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26407.76851987459!2d35.940123!3d34.305678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f76cd4fb3f87%3A0x1cb5b11f9a0c99f!2sEhden%2C%20Lebanon!5e0!3m2!1sen!2slb!4v1712678400000!5m2!1sen!2slb"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Parish Location - Ehden, North Lebanon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}