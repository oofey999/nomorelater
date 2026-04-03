"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase"

const scoreColors: Record<number, string> = {
  0: "bg-border/50",
  1: "bg-red-500/60",
  2: "bg-yellow-500/60",
  3: "bg-secondary/60",
  4: "bg-secondary",
}

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function HeatmapCalendar() {
  const [heatmapData, setHeatmapData] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: allTasks } = await supabase
        .from("tasks")
        .select("created_at, completed")
        .eq("user_id", user.id)

      const generateHeatmapData = () => {
        const data = []
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        for (let week = 0; week < 52; week++) {
          const weekData = []
          for (let day = 0; day < 7; day++) {
            const date = new Date(today)
            date.setDate(date.getDate() - (52 - week) * 7 - (6 - day))
            
            const nextDay = new Date(date)
            nextDay.setDate(date.getDate() + 1)
            
            let completions = 0
            if (allTasks) {
              completions = allTasks.filter((t: any) => {
                 const tDate = new Date(t.created_at)
                 return tDate >= date && tDate < nextDay && t.completed
              }).length
            }

            let score = 0
            if (completions > 4) score = 4
            else if (completions > 2) score = 3
            else if (completions > 0) score = 2
            else if (allTasks && allTasks.filter((t:any) => {
                 const tDate = new Date(t.created_at)
                 return tDate >= date && tDate < nextDay
              }).length > 0) score = 1
              
            weekData.push({ date, score })
          }
          data.push(weekData)
        }
        return data
      }

      setHeatmapData(generateHeatmapData())
    }
    fetchData()
  }, [])

  if (!heatmapData.length) return null

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Productivity Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Month labels */}
            <div className="mb-2 flex pl-8">
              {monthLabels.map((month) => (
                <div
                  key={month}
                  className="text-xs text-muted-foreground"
                  style={{ width: `${100 / 12}%` }}
                >
                  {month}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              {/* Day labels */}
              <div className="flex w-6 flex-col gap-1">
                {dayLabels.map((day, i) => (
                  <div
                    key={day}
                    className="flex h-3 items-center text-xs text-muted-foreground"
                  >
                    {i % 2 === 1 ? day : ""}
                  </div>
                ))}
              </div>

              {/* Heatmap grid */}
              <div className="flex flex-1 gap-0.5">
                {heatmapData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-0.5">
                    {week.map((day: any, dayIndex: number) => (
                      <div
                        key={dayIndex}
                        className={cn(
                          "h-3 w-3 rounded-sm transition-colors",
                          scoreColors[day.score]
                        )}
                        title={`${day.date.toLocaleDateString()}: ${
                          day.score === 0
                            ? "No data"
                            : day.score === 4
                            ? "Highly productive"
                            : day.score === 3
                            ? "Productive"
                            : day.score === 2
                            ? "Moderate"
                            : "Low productivity"
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <span className="text-xs text-muted-foreground">Less</span>
              {[0, 1, 2, 3, 4].map((score) => (
                <div
                  key={score}
                  className={cn("h-3 w-3 rounded-sm", scoreColors[score])}
                />
              ))}
              <span className="text-xs text-muted-foreground">More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
