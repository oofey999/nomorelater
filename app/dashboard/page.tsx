import { StatCards } from "@/components/dashboard/stat-cards"
import { TaskList } from "@/components/dashboard/task-list"
import { PatternInsight } from "@/components/dashboard/pattern-insight"

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Good morning, John
        </h1>
        <p className="mt-1 text-muted-foreground">
          Let&apos;s make today productive. You have 5 tasks remaining.
        </p>
      </div>

      {/* Stats */}
      <StatCards />

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TaskList />
        </div>
        <div>
          <PatternInsight />
        </div>
      </div>
    </div>
  )
}
