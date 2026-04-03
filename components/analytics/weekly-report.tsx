"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { createClient } from "@/lib/supabase"

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
}

const trendColors = {
  up: "text-secondary",
  down: "text-red-400",
  neutral: "text-muted-foreground",
}

export function WeeklyReport() {
  const [reportData, setReportData] = useState<any[]>([])
  const [summaryText, setSummaryText] = useState("Loading...")
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: allTasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)

      if (allTasks) {
        const today = new Date()
        const oneWeekAgo = new Date(today)
        oneWeekAgo.setDate(today.getDate() - 7)
        
        const twoWeeksAgo = new Date(oneWeekAgo)
        twoWeeksAgo.setDate(oneWeekAgo.getDate() - 7)
        
        const thisWeekTasks = allTasks.filter((t: any) => new Date(t.created_at) >= oneWeekAgo)
        const lastWeekTasks = allTasks.filter((t: any) => {
          const tDate = new Date(t.created_at)
          return tDate >= twoWeeksAgo && tDate < oneWeekAgo
        })

        const thisWeekCompleted = thisWeekTasks.filter((t: any) => t.completed).length
        const lastWeekCompleted = lastWeekTasks.filter((t: any) => t.completed).length
        
        let completedChange = "0%"
        let completedTrend = "neutral"
        if (lastWeekCompleted > 0) {
          const diff = ((thisWeekCompleted - lastWeekCompleted) / lastWeekCompleted) * 100
          completedChange = `${diff > 0 ? '+' : ''}${Math.round(diff)}%`
          completedTrend = diff > 0 ? "up" : (diff < 0 ? "down" : "neutral")
        } else if (thisWeekCompleted > 0) {
          completedChange = "+100%"
          completedTrend = "up"
        }

        const data = [
          {
            metric: "Tasks Completed",
            value: String(thisWeekCompleted),
            change: completedChange,
            trend: completedTrend,
          },
          {
            metric: "Tasks Added",
            value: String(thisWeekTasks.length),
            change: "N/A",
            trend: "neutral",
          },
          {
            metric: "Recent Priority",
            value: thisWeekTasks.filter((t: any) => t.priority === 'high').length > 0 ? 'High' : 'Medium',
            change: "0%",
            trend: "neutral",
          },
          {
            metric: "Unfinished",
            value: String(thisWeekTasks.filter((t: any) => !t.completed).length),
            change: "0%",
            trend: "neutral",
          },
        ]
        
        setReportData(data)
        setSummaryText(`You completed ${thisWeekCompleted} tasks over the last 7 days. Keep it up and maintain your momentum!`)
      }
    }
    fetchData()
  }, [])

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-foreground">Weekly Report</CardTitle>
        <Button variant="outline" size="sm" className="border-border bg-transparent hover:bg-card">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </CardHeader>
      <CardContent>
        {reportData.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {reportData.map((item) => {
              const TrendIcon = trendIcons[item.trend as keyof typeof trendIcons]
              return (
                <div
                  key={item.metric}
                  className="rounded-lg border border-border bg-background/50 p-4"
                >
                  <p className="text-sm text-muted-foreground">{item.metric}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {item.value}
                  </p>
                  <div
                    className={`mt-2 flex items-center gap-1 text-sm ${
                      trendColors[item.trend as keyof typeof trendColors]
                    }`}
                  >
                    <TrendIcon className="h-4 w-4" />
                    {item.change}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            Loading report data...
          </div>
        )}

        <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <h4 className="font-medium text-foreground">Weekly Summary</h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {summaryText}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
