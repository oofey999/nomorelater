import { ListTodo, Sparkles, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: ListTodo,
    step: "01",
    title: "Add your tasks",
    description: "Dump all your to-dos into NoMoLater. Don't worry about organizing — we'll help with that.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Let NoMoLater analyze your patterns",
    description: "Our AI learns when you work best, what causes delays, and how to optimize your schedule.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Build better habits day by day",
    description: "Follow personalized recommendations and watch your productivity soar as you build lasting habits.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to transform your productivity
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step indicator */}
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
