"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"

export function DashboardHeader() {
  const [name, setName] = useState("...")
  const [tasksRemaining, setTasksRemaining] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Find best display name
        const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
        
        // Capitalize first letter
        const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1)
        setName(capitalizedName)

        // Fetch remaining tasks for the user
        const { count } = await supabase
          .from("tasks")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("completed", false)

        setTasksRemaining(count || 0)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        Good morning, {name}
      </h1>
      <p className="mt-1 text-muted-foreground">
        Let&apos;s make today productive. You have {tasksRemaining} {tasksRemaining === 1 ? 'task' : 'tasks'} remaining.
      </p>
    </div>
  )
}
