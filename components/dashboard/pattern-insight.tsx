"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const productivityData = [
  { hour: "6am", value: 20 },
  { hour: "8am", value: 45 },
  { hour: "10am", value: 85 },
  { hour: "12pm", value: 60 },
  { hour: "2pm", value: 50 },
  { hour: "4pm", value: 70 },
  { hour: "6pm", value: 40 },
  { hour: "8pm", value: 25 },
]

export function PatternInsight() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Your Pattern Insight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productivityData}>
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "rgba(124, 58, 237, 0.1)" }}
                contentStyle={{
                  backgroundColor: "#1A1D2E",
                  border: "1px solid #2D3148",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#9CA3AF" }}
              />
              <Bar
                dataKey="value"
                fill="#7C3AED"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary/20 bg-secondary/5 p-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
            <Lightbulb className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Peak Performance Detected
            </p>
            <p className="text-sm text-muted-foreground">
              You&apos;re most focused between 9-11am. Schedule hard tasks then for best results.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
