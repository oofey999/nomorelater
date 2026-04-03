"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            Based on Cognitive Behavioral Therapy principles
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Stop Procrastinating.{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              For Real This Time.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            NoMoLater uses behavioral science and smart scheduling to turn your
            to-do list into done. Finally, a productivity app that understands
            how your brain actually works.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="group relative h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
            >
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-8 border-border bg-transparent hover:bg-card"
            >
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          {/* Core Values */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">Science-Based</span>
              <span>Approaches</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">Privacy First</span>
              <span>Design</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">Seamless Sync</span>
              <span>Across Devices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
