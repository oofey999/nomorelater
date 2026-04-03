import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student",
    initials: "SC",
    content:
      "I went from submitting assignments at 11:59 PM to finishing them days early. The CBT modules actually helped me understand why I was procrastinating.",
  },
  {
    name: "Marcus Johnson",
    role: "Marketing Manager",
    initials: "MJ",
    content:
      "The analytics dashboard was a game-changer. I had no idea I was most productive in the morning. Now I schedule my important work accordingly.",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    initials: "ER",
    content:
      "As someone who works from home, I struggled with structure. NoMoLater gave me the framework I needed without feeling restrictive.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Loved by procrastinators (reformed)
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands who have transformed their productivity
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-foreground leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
