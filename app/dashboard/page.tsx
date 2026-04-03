"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatCards } from "@/components/dashboard/stat-cards"
import { TaskList } from "@/components/dashboard/task-list"
import { PatternInsight } from "@/components/dashboard/pattern-insight"

export default function DashboardPage() {
  const [xpRefreshKey, setXpRefreshKey] = useState(0)

  const refreshXP = () => setXpRefreshKey((k) => k + 1)

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardHeader onXPChange={refreshXP} />

      {/* Stats */}
      <StatCards xpRefreshKey={xpRefreshKey} />

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TaskList onXPChange={refreshXP} />
        </div>
        <div>
          <PatternInsight />
        </div>
      </div>
    </div>
  )
}
