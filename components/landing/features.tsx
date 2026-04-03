import { Calendar, BarChart3, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Calendar,
    title: "Smart Task Planner",
    description:
      "AI-powered scheduling that learns your patterns and suggests the perfect time for each task. No more guessing when to tackle that big project.",
  },
  {
    icon: BarChart3,
    title: "Habit Analytics Dashboard",
    description:
      "Track your behavioral patterns with beautiful visualizations. Understand when you're most productive and identify your procrastination triggers.",
  },
  {
    icon: Brain,
    title: "CBT Micro-Modules",
    description:
      "Built-in psychological exercises based on Cognitive Behavioral Therapy. Break the avoidance loop with science-backed techniques.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need to beat procrastination
          </h2>
          <p className="text-lg text-muted-foreground">
            Three powerful tools working together to transform your productivity
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
