import { CompletionChart } from "@/components/analytics/completion-chart"
import { HeatmapCalendar } from "@/components/analytics/heatmap-calendar"
import { CategoryChart } from "@/components/analytics/category-chart"
import { WeeklyReport } from "@/components/analytics/weekly-report"

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Analytics
        </h1>
        <p className="mt-1 text-muted-foreground">
          Track your productivity patterns and progress over time.
        </p>
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-8">
        <CompletionChart />

        <HeatmapCalendar />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <CategoryChart />
          <WeeklyReport />
        </div>
      </div>
    </div>
  )
}
