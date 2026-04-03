"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase"
import {
  Menu,
  ListTodo,
  BarChart3,
  Flame,
  Brain,
  Settings,
  LogOut,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", icon: ListTodo, label: "Today's Tasks" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/habits", icon: Flame, label: "Habit Tracker" },
  { href: "/modules", icon: Brain, label: "CBT Modules" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [initials, setInitials] = useState("?")

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setEmail(user.email)
        const displayName = user.user_metadata?.full_name || user.email.split("@")[0]
        setName(displayName)
        setInitials(displayName[0].toUpperCase())
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
      <Link href="/">
        <Logo />
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-sidebar p-0">
          <div className="flex h-16 items-center border-b border-border px-6">
            <Logo />
          </div>

          <nav className="flex-1 p-4">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {name || "Loading..."}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {email || "..."}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
