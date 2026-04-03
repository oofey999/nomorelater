"use client"

import { useEffect, useRef } from "react"
import { getLevelTitle } from "@/lib/xp"

interface LevelUpModalProps {
  level: number
  onDismiss: () => void
}

// ─── Web Audio chime ──────────────────────────────────────────────────────
function playChime() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.18)

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.18)
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + i * 0.18 + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.5)

      osc.start(ctx.currentTime + i * 0.18)
      osc.stop(ctx.currentTime + i * 0.18 + 0.55)
    })
  } catch {
    // AudioContext unavailable — silent fallback
  }
}

// ─── Confetti particle data ───────────────────────────────────────────────
const CONFETTI_COLORS = [
  "#6c63ff", "#ff6584", "#43e97b", "#f7971e",
  "#38f9d7", "#fa709a", "#fee140",
]
const PARTICLE_COUNT = 48

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: `${(Math.random() * 1.2).toFixed(2)}s`,
    duration: `${(2.4 + Math.random() * 1.6).toFixed(2)}s`,
    size: `${6 + Math.round(Math.random() * 8)}px`,
    rotate: `${Math.round(Math.random() * 360)}deg`,
  }))
}

export function LevelUpModal({ level, onDismiss }: LevelUpModalProps) {
  const title = getLevelTitle(level)
  const particles = useRef(generateParticles()).current

  useEffect(() => {
    playChime()
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <>
      {/* Confetti keyframes injected once */}
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes modal-pop {
          0%   { transform: scale(0.7) translateY(30px); opacity: 0; }
          60%  { transform: scale(1.06) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 24px 4px #6c63ff55; }
          50%       { box-shadow: 0 0 48px 12px #fa709a55; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onDismiss}
      >
        {/* Confetti particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none fixed top-0"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              transform: `rotate(${p.rotate})`,
              animation: `confetti-fall ${p.duration} ${p.delay} ease-in forwards`,
            }}
          />
        ))}

        {/* Modal card */}
        <div
          className="relative mx-4 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-card p-10 text-center shadow-2xl"
          style={{ animation: "modal-pop 0.5s cubic-bezier(.34,1.56,.64,1) both, glow-pulse 2s ease-in-out 0.5s infinite" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Badge */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-4xl shadow-lg">
            ⚡
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Level Up!
          </p>

          <h2 className="text-5xl font-extrabold text-foreground">
            Level {level}
          </h2>

          <p className="text-xl font-medium text-muted-foreground">
            You are now{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text font-bold text-transparent">
              {title}
            </span>
          </p>

          <p className="text-xs text-muted-foreground/60">
            Click anywhere or wait to continue
          </p>
        </div>
      </div>
    </>
  )
}
