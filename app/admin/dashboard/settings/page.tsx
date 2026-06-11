"use client"

import { toast } from "sonner"
import { User, Bell, Shield, Globe } from "lucide-react"
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

export default function SettingsPage() {
  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Settings saved")
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your administrator profile and preferences.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">Profile</CardTitle>
          </div>
          <CardDescription>Your administrator account details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Parish Administrator" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@ehden-zgharta.org"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Content Administrator" disabled />
            </div>
            <div>
              <Button type="submit">Save Profile</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">Security</CardTitle>
          </div>
          <CardDescription>Update your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" placeholder="••••••••" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" placeholder="••••••••" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div>
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">Preferences</CardTitle>
          </div>
          <CardDescription>
            Control notifications and publishing defaults.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">Email notifications</p>
              <p className="text-sm text-muted-foreground">
                Get notified when content is published.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="font-medium text-foreground">
                Publish new items immediately
              </p>
              <p className="text-sm text-muted-foreground">
                Skip the draft step for new content.
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div className="pr-4">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Globe className="h-4 w-4" />
                Show Arabic fields
              </p>
              <p className="text-sm text-muted-foreground">
                Display Arabic title fields in editors.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
