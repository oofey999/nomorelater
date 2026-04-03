import { Zap } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-50" />
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
          <Zap className="h-5 w-5 text-white" fill="currentColor" />
        </div>
      </div>
      <span className="text-xl font-bold text-foreground">NoMoLater</span>
    </div>
  )
}
