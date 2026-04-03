import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Your future self will thank you.
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Stop waiting. Start now. Join thousands of users who have already
            transformed their productivity.
          </p>
          <Button
            size="lg"
            asChild
            className="group h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            <Link href="/signup">
              Start Free Today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. Free forever for basic features.
          </p>
        </div>
      </div>
    </section>
  )
}
