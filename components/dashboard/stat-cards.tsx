"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Target, Flame } from "lucide-react"
import { createClient } from "@/lib/supabase"

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
  const [completedToday, setCompletedToday] = useState(0)
  const [totalToday, setTotalToday] = useState(0)
  const [focusScore, setFocusScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { data: allTasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)

      if (allTasks) {
        // Today's tasks
        const todaysTasks = allTasks.filter((t: any) => new Date(t.created_at) >= today)
        const completedTodays = todaysTasks.filter((t: any) => t.completed)
        
        setCompletedToday(completedTodays.length)
        setTotalToday(todaysTasks.length)

        // Focus Score
        const totalCompleted = allTasks.filter((t: any) => t.completed).length
        const score = allTasks.length > 0 ? Math.round((totalCompleted / allTasks.length) * 100) : 0
        setFocusScore(score)

        // Streak
        const completedDates = allTasks
          .filter((t: any) => t.completed)
          .map((t: any) => new Date(t.created_at).toDateString())
        
        const uniqueDates = [...new Set(completedDates)]
          .map(d => new Date(d))
          .sort((a, b) => b.getTime() - a.getTime())

        let currentStreak = 0
        let dateToCheck = new Date()
        dateToCheck.setHours(0, 0, 0, 0)

        if (uniqueDates.length > 0) {
          const latestDay = new Date(uniqueDates[0])
          latestDay.setHours(0, 0, 0, 0)
          
          const diffInDays = Math.floor((dateToCheck.getTime() - latestDay.getTime()) / (1000 * 60 * 60 * 24))
          
          if (diffInDays <= 1) {
            currentStreak = 1
            dateToCheck = latestDay
            
            for (let i = 1; i < uniqueDates.length; i++) {
              dateToCheck.setDate(dateToCheck.getDate() - 1)
              const testDate = new Date(uniqueDates[i])
              testDate.setHours(0, 0, 0, 0)
              if (testDate.getTime() === dateToCheck.getTime()) {
                currentStreak++
              } else {
                break
              }
            }
          }
        }
        setStreak(currentStreak)
      }
      setLoading(false)
    }
    
    fetchStats()
  }, [])

  const statsList = [
    {
      title: "Tasks Completed Today",
      value: loading ? "-" : String(completedToday),
      subtitle: `out of ${totalToday} tasks`,
      icon: CheckCircle2,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Focus Score",
      value: loading ? "-" : `${focusScore}%`,
      subtitle: "all-time completion rate",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
      ring: true,
      ringValue: focusScore,
    },
    {
      title: "Streak",
      value: loading ? "-" : String(streak),
      subtitle: "days in a row",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {statsList.map((stat) => (
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
                  <ProgressRing percentage={stat.ringValue || 0} />
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
