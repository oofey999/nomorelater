import { ModuleCard } from "@/components/modules/module-card"
import {
  Wind,
  RotateCcw,
  Gift,
  Target,
  Brain,
  Heart,
  Zap,
  Sparkles,
} from "lucide-react"

const modules = [
  {
    title: "5-Minute Mindfulness Reset",
    description:
      "A quick breathing exercise to reset your focus and reduce anxiety when you feel overwhelmed.",
    icon: Wind,
    duration: "5 min",
    difficulty: "Beginner" as const,
    progress: 100,
    color: "bg-secondary",
  },
  {
    title: "Breaking the Avoidance Loop",
    description:
      "Understand why you avoid tasks and learn practical techniques to break the cycle.",
    icon: RotateCcw,
    duration: "15 min",
    difficulty: "Intermediate" as const,
    progress: 65,
    color: "bg-primary",
  },
  {
    title: "Reward Yourself Right",
    description:
      "Learn the science of intrinsic vs extrinsic motivation and how to reward progress effectively.",
    icon: Gift,
    duration: "12 min",
    difficulty: "Beginner" as const,
    progress: 30,
    color: "bg-orange-500",
  },
  {
    title: "Goal Setting That Works",
    description:
      "Move beyond SMART goals with cognitive strategies that actually drive action.",
    icon: Target,
    duration: "20 min",
    difficulty: "Intermediate" as const,
    progress: 0,
    color: "bg-pink-500",
  },
  {
    title: "Defeating Perfectionism",
    description:
      "Challenge all-or-nothing thinking and learn to embrace good enough.",
    icon: Brain,
    duration: "18 min",
    difficulty: "Advanced" as const,
    progress: 0,
    color: "bg-blue-500",
  },
  {
    title: "Self-Compassion Practice",
    description:
      "Replace self-criticism with self-compassion to build lasting motivation.",
    icon: Heart,
    duration: "10 min",
    difficulty: "Beginner" as const,
    progress: 0,
    color: "bg-secondary",
  },
  {
    title: "Energy Management",
    description:
      "Align your tasks with your natural energy rhythms for peak performance.",
    icon: Zap,
    duration: "15 min",
    difficulty: "Intermediate" as const,
    progress: 0,
    color: "bg-primary",
  },
  {
    title: "Cognitive Restructuring",
    description:
      "Advanced techniques to identify and challenge unhelpful thought patterns.",
    icon: Sparkles,
    duration: "25 min",
    difficulty: "Advanced" as const,
    progress: 0,
    color: "bg-orange-500",
  },
]

export default function ModulesPage() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          CBT Modules
        </h1>
        <p className="mt-1 text-muted-foreground">
          Science-backed exercises to build better productivity habits.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-foreground">1</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-bold text-foreground">2</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Not Started</p>
          <p className="text-2xl font-bold text-foreground">5</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Time</p>
          <p className="text-2xl font-bold text-foreground">2h</p>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((module) => (
          <ModuleCard key={module.title} {...module} />
        ))}
      </div>
    </div>
  )
}
