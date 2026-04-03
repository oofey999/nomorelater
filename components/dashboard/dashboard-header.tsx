"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { awardDailyLoginXP } from "@/lib/xp"

interface DashboardHeaderProps {
  onXPChange?: () => void
}

export function DashboardHeader({ onXPChange }: DashboardHeaderProps) {
  const [name, setName] = useState("...")
  const [tasksRemaining, setTasksRemaining] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Display name
      const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
      const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1)
      setName(capitalizedName)

      // Remaining tasks count
      const { count } = await supabase
        .from("tasks")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", false)

      setTasksRemaining(count || 0)

      // Daily login XP — safe to call every mount; no-ops if already awarded today
      const result = await awardDailyLoginXP(supabase, user.id)
      if (result !== null) {
        // XP was awarded (first login today) — refresh stat cards
        onXPChange?.()
      }
    }

    fetchData()
  }, [])

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {greeting}, {name}
      </h1>
      <p className="mt-1 text-muted-foreground">
        Let&apos;s make today productive. You have {tasksRemaining}{" "}
        {tasksRemaining === 1 ? "task" : "tasks"} remaining.
      </p>
    </div>
  )
}
