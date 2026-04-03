"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { createClient } from "@/lib/supabase"

export function CompletionChart() {
  const [data, setData] = useState<any[]>([])
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
        const chartData = []
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          
          const nextDay = new Date(date)
          nextDay.setDate(date.getDate() + 1)

          const dayTasks = allTasks.filter((t: any) => {
             const tDate = new Date(t.created_at)
             return tDate >= date && tDate < nextDay
          })

          chartData.push({
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            completed: dayTasks.filter((t: any) => t.completed).length,
            total: dayTasks.length,
          })
        }
        setData(chartData)
      }
    }
    fetchData()
  }, [])

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Task Completion Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2D3148"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1D2E",
                  border: "1px solid #2D3148",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#9CA3AF" }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="#7C3AED"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#7C3AED" }}
              />
              <Line
                type="monotone"
                dataKey="total"
                name="Total Tasks"
                stroke="#00D4AA"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#00D4AA" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
