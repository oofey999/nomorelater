"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
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

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              John Doe
            </p>
            <p className="truncate text-xs text-muted-foreground">
              john@example.com
            </p>
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
