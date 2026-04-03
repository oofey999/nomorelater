"use client"

import { BookOpen, Target, Infinity } from "lucide-react"

const stats = [
  { title: "Organize Wisely", desc: "Prioritize what matters most", icon: Target },
  { title: "CBT Methods", desc: "Built on cognitive behavioral therapy", icon: BookOpen },
  { title: "Track Progress", desc: "Analyze your habits over time", icon: Infinity },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{stat.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
