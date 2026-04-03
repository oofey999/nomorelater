import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface ModuleCardProps {
  title: string
  description: string
  icon: LucideIcon
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  color: string
}

const difficultyColors = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
}

export function ModuleCard({
  title,
  description,
  icon: Icon,
  duration,
  difficulty,
  progress,
  color,
}: ModuleCardProps) {
  const isCompleted = progress === 100

  return (
    <Card className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {/* Top accent bar */}
      <div className={cn("h-1", color)} />

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              color.replace("bg-", "bg-opacity-20 bg-")
            )}
            style={{ backgroundColor: `${color.includes("primary") ? "#7C3AED" : color.includes("secondary") ? "#00D4AA" : color.includes("orange") ? "#F59E0B" : color.includes("pink") ? "#EC4899" : "#3B82F6"}20` }}
          >
            <Icon className="h-6 w-6" style={{ color: color.includes("primary") ? "#7C3AED" : color.includes("secondary") ? "#00D4AA" : color.includes("orange") ? "#F59E0B" : color.includes("pink") ? "#EC4899" : "#3B82F6" }} />
          </div>
          {isCompleted && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
            </div>
          )}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={cn("text-xs", difficultyColors[difficulty])}>
            {difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {duration}
          </div>
        </div>

        {progress > 0 && (
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-border" />
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className={cn(
            "w-full",
            isCompleted
              ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          {isCompleted ? (
            "Review Module"
          ) : progress > 0 ? (
            <>
              <Play className="mr-2 h-4 w-4" />
              Continue
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start Module
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
