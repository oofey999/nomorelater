"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Target, Flame } from "lucide-react"

const stats = [
  {
    title: "Tasks Completed Today",
    value: "7",
    subtitle: "out of 12 tasks",
    icon: CheckCircle2,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Focus Score",
    value: "82%",
    subtitle: "+5% from yesterday",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
    ring: true,
  },
  {
    title: "Streak",
    value: "14",
    subtitle: "days in a row",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg className="h-16 w-16 -rotate-90" viewBox="0 0 80 80">
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        className="text-border"
      />
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-primary transition-all duration-1000"
      />
    </svg>
  )
}

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {stat.ring ? (
                <div className="relative">
                  <ProgressRing percentage={82} />
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold text-foreground">
                  {stat.value}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
