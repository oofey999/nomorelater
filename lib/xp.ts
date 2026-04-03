import type { SupabaseClient } from "@supabase/supabase-js"

// ─── Level / Title helpers ─────────────────────────────────────────────────

export function getLevelTitle(level: number): string {
  if (level >= 40) return "Unstoppable"
  if (level >= 20) return "Sharp"
  if (level >= 10) return "Focused"
  if (level >= 5) return "Awake"
  return "Sleepy"
}

/** XP needed to advance FROM this level to the next (level × 100) */
export function getXPForNextLevel(level: number): number {
  return level * 100
}

// ─── DB helpers ───────────────────────────────────────────────────────────

export interface XPRow {
  xp: number
  level: number
  streak: number
  updated_at: string
}

export async function getUserXP(
  supabase: SupabaseClient,
  userId: string
): Promise<XPRow> {
  const { data, error } = await supabase
    .from("user_xp")
    .select("xp, level, streak, updated_at")
    .eq("user_id", userId)
    .single()

  if (error || !data) {
    return { xp: 0, level: 1, streak: 0, updated_at: new Date().toISOString() }
  }

  return data as XPRow
}

export interface AwardXPResult {
  xp: number
  newLevel: number
  leveledUp: boolean
  streak: number
}

/**
 * Add (or subtract) XP for a user.
 * Handles:
 *  - Creating the row on first use (upsert)
 *  - Auto leveling up when XP crosses the threshold
 *  - Clamping XP to 0 minimum
 */
export async function awardXP(
  supabase: SupabaseClient,
  userId: string,
  amount: number
): Promise<AwardXPResult> {
  // Fetch current state (defaults if first time)
  const current = await getUserXP(supabase, userId)

  let { xp, level, streak } = current
  const oldLevel = level

  // Apply XP delta, floor at 0
  xp = Math.max(0, xp + amount)

  // Level-up loop: if xp >= threshold for this level, advance
  while (xp >= getXPForNextLevel(level)) {
    xp -= getXPForNextLevel(level)
    level++
  }

  // Upsert back to Supabase
  await supabase.from("user_xp").upsert(
    {
      user_id: userId,
      xp,
      level,
      streak,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  )

  return {
    xp,
    newLevel: level,
    leveledUp: level > oldLevel,
    streak,
  }
}

/**
 * Award daily login XP (+20) + streak bonus (+10 per consecutive day).
 * Safe to call on every page load — checks updated_at to avoid duplicates.
 * Requires `streak` column on user_xp.
 */
export async function awardDailyLoginXP(
  supabase: SupabaseClient,
  userId: string
): Promise<AwardXPResult | null> {
  const current = await getUserXP(supabase, userId)

  const lastUpdated = new Date(current.updated_at)
  const today = new Date()

  // Normalise to calendar day (local)
  const toDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()

  const lastDay = toDay(lastUpdated)
  const todayDay = toDay(today)
  const oneDayMs = 86_400_000

  // Already awarded today
  if (lastDay === todayDay) return null

  const isConsecutive = todayDay - lastDay === oneDayMs
  const newStreak = isConsecutive ? current.streak + 1 : 1
  const loginBonus = 20
  const streakBonus = (newStreak - 1) * 10 // 0 on day 1, +10 on day 2, etc.
  const totalBonus = loginBonus + streakBonus

  const { xp: currentXP, level: currentLevel } = current
  let xp = Math.max(0, currentXP + totalBonus)
  let level = currentLevel
  const oldLevel = level

  while (xp >= getXPForNextLevel(level)) {
    xp -= getXPForNextLevel(level)
    level++
  }

  await supabase.from("user_xp").upsert(
    {
      user_id: userId,
      xp,
      level,
      streak: newStreak,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  )

  return {
    xp,
    newLevel: level,
    leveledUp: level > oldLevel,
    streak: newStreak,
  }
}
