import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, Minus } from "lucide-react"

const reportData = [
  {
    metric: "Tasks Completed",
    value: "47",
    change: "+12%",
    trend: "up",
  },
  {
    metric: "Average Focus Time",
    value: "4.2h",
    change: "+8%",
    trend: "up",
  },
  {
    metric: "Procrastination Events",
    value: "6",
    change: "-23%",
    trend: "down",
  },
  {
    metric: "Streak Days",
    value: "14",
    change: "0%",
    trend: "neutral",
  },
]

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
}

const trendColors = {
  up: "text-secondary",
  down: "text-secondary",
  neutral: "text-muted-foreground",
}

export function WeeklyReport() {
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

        <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <h4 className="font-medium text-foreground">Weekly Summary</h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Great progress this week! You completed 12% more tasks than last
            week and reduced procrastination events by 23%. Your most productive
            day was Wednesday with 9 tasks completed. Keep building on this
            momentum!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
