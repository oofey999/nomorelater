"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { createClient } from "@/lib/supabase"

export function CategoryChart() {
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
        const priorities = [
          { name: "High Priority", value: 0, color: "#EF4444" },
          { name: "Medium Priority", value: 0, color: "#EAB308" },
          { name: "Low Priority", value: 0, color: "#22C55E" },
        ]

        allTasks.forEach((task: any) => {
          if (task.priority === "high") priorities[0].value++
          else if (task.priority === "medium") priorities[1].value++
          else if (task.priority === "low") priorities[2].value++
        })

        setData(priorities.filter(p => p.value > 0)) // Only show ones with data
      }
    }
    fetchData()
  }, [])

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Tasks by Priority
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1D2E",
                    border: "1px solid #2D3148",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => [value, "Tasks"]}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => (
                    <span className="text-sm text-muted-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No tasks to display
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
