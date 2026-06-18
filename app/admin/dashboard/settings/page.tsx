"use client"

import { toast } from "sonner"
import { Globe, Mail, Phone, MapPin, Palette, Shield, Database, Bell } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Settings saved")
  }

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Dashboard Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage website-wide configuration and preferences.
        </p>
      </div>

      {/* General Site Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">General Site Settings</CardTitle>
          </div>
          <CardDescription>Basic website information and contact details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" defaultValue="Ehden Zgharta Parish" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="siteEmail">Site Email</Label>
                <Input
                  id="siteEmail"
                  type="email"
                  defaultValue="contact@ehden-zgharta.org"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="sitePhone">Phone Number</Label>
                <Input id="sitePhone" defaultValue="+961 XX XXX XXX" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="siteAddress">Address</Label>
                <Input id="siteAddress" defaultValue="Ehden, Zgharta, Lebanon" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                rows={3}
                defaultValue="Official website of the Ehden Zgharta Parish. Find mass times, news, events, and more."
              />
            </div>
            <div>
              <Button type="submit">Save General Settings</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Appearance & Theme */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">Appearance & Theme</CardTitle>
          </div>
          <CardDescription>Customize the website look and feel.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Dark mode</p>
              <p className="text-sm text-muted-foreground">
                Enable dark theme for the website.
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Show Arabic by default</p>
              <p className="text-sm text-muted-foreground">
                Display Arabic content as primary language.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Bilingual content</p>
              <p className="text-sm text-muted-foreground">
                Enable both English and Arabic content sections.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">System Settings</CardTitle>
          </div>
          <CardDescription>Configure system-wide options.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Maintenance mode</p>
              <p className="text-sm text-muted-foreground">
                Temporarily disable the website for maintenance.
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Allow user registration</p>
              <p className="text-sm text-muted-foreground">
                Enable new users to register on the website.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Enable analytics</p>
              <p className="text-sm text-muted-foreground">
                Track website visitors and usage statistics.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">Notification Settings</CardTitle>
          </div>
          <CardDescription>Configure automated notifications and alerts.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Email notifications</p>
              <p className="text-sm text-muted-foreground">
                Send email notifications for new submissions.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Admin alerts</p>
              <p className="text-sm text-muted-foreground">
                Notify administrators of important events.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Mass time reminders</p>
              <p className="text-sm text-muted-foreground">
                Send reminders before scheduled masses.
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Data & Backup */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">Data & Backup</CardTitle>
          </div>
          <CardDescription>Manage data backups and exports.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-foreground">Last backup</p>
            <p className="text-sm text-muted-foreground">
              June 17, 2026 at 11:30 PM
            </p>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Create Backup</Button>
            <Button variant="outline">Export Data</Button>
            <Button variant="outline">Import Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
