"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Work Projects", value: 35, color: "#7C3AED" },
  { name: "Personal Tasks", value: 25, color: "#00D4AA" },
  { name: "Learning", value: 20, color: "#F59E0B" },
  { name: "Health & Fitness", value: 12, color: "#EC4899" },
  { name: "Other", value: 8, color: "#3B82F6" },
]

export function CategoryChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Time by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
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
                formatter={(value: number) => [`${value}%`, "Time Spent"]}
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
        </div>
      </CardContent>
    </Card>
  )
}
