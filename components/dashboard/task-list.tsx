"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Clock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase"
import { awardXP, getLevelTitle } from "@/lib/xp"
import { LevelUpModal } from "@/components/dashboard/level-up-modal"

type Priority = "high" | "medium" | "low"

interface Task {
  id: number
  title: string
  priority: Priority
  duration: string
  completed: boolean
  user_id: string
  created_at: string
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high:   { label: "High",   className: "bg-red-500/10 text-red-400 border-red-500/20" },
  medium: { label: "Medium", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  low:    { label: "Low",    className: "bg-green-500/10 text-green-400 border-green-500/20" },
}

const XP_BY_PRIORITY: Record<Priority, number> = {
  high:   50,
  medium: 30,
  low:    15,
}

function isOverdue(task: Task): boolean {
  const ageMs = Date.now() - new Date(task.created_at).getTime()
  return !task.completed && ageMs > 24 * 60 * 60 * 1000
}

interface TaskListProps {
  onXPChange?: () => void
}

export function TaskList({ onXPChange }: TaskListProps) {
  const [tasks, setTasks]           = useState<Task[]>([])
  const [newTask, setNewTask]       = useState("")
  const [newPriority, setNewPriority] = useState<Priority>("medium")
  const [showInput, setShowInput]   = useState(false)
  const [loading, setLoading]       = useState(true)
  const [levelUpData, setLevelUpData] = useState<{ level: number; title: string } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) setTasks(data)
    setLoading(false)
  }

  const addTask = async () => {
    if (!newTask.trim()) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("tasks")
      .insert({
        title: newTask,
        priority: newPriority,
        duration: "30m",
        completed: false,
        user_id: user.id,
      })
      .select()
      .single()

    if (data) {
      setTasks((prev) => [data, ...prev])
      setNewTask("")
      setNewPriority("medium")
      setShowInput(false)
    }
  }

  const toggleTask = async (id: number, completed: boolean) => {
    // Only award XP when completing (false → true)
    if (!completed) {
      const task = tasks.find((t) => t.id === id)
      if (task) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const xpAmount = XP_BY_PRIORITY[task.priority]
          const result = await awardXP(supabase, user.id, xpAmount)

          if (result.leveledUp) {
            setLevelUpData({ level: result.newLevel, title: getLevelTitle(result.newLevel) })
          }

          onXPChange?.()
        }
      }
    }

    await supabase.from("tasks").update({ completed: !completed }).eq("id", id)
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !completed } : task))
    )
  }

  const deleteTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id)

    if (task && isOverdue(task)) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await awardXP(supabase, user.id, -20)
        onXPChange?.()
      }
    }

    await supabase.from("tasks").delete().eq("id", id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <>
      {levelUpData && (
        <LevelUpModal
          level={levelUpData.level}
          onDismiss={() => setLevelUpData(null)}
        />
      )}

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-foreground">Today&apos;s Priority List</CardTitle>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={() => setShowInput(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </CardHeader>
        <CardContent>
          {showInput && (
            <div className="mb-4 flex gap-2">
              <Input
                placeholder="Task title..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="border-border bg-background"
                autoFocus
              />
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as Priority)}
                className="px-3 border border-border rounded-md bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <Button onClick={addTask} className="bg-primary hover:bg-primary/90">Add</Button>
              <Button variant="outline" onClick={() => setShowInput(false)}>Cancel</Button>
            </div>
          )}

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tasks yet. Add one above!</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg border border-border bg-background/50 p-3 transition-all",
                    task.completed && "opacity-60",
                    !task.completed && isOverdue(task) && "border-red-500/30 bg-red-500/5"
                  )}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id, task.completed)}
                    className="border-border data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm text-foreground",
                      task.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {task.title}
                    {!task.completed && isOverdue(task) && (
                      <span className="ml-2 text-xs text-red-400">overdue</span>
                    )}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", priorityConfig[task.priority].className)}
                  >
                    {priorityConfig[task.priority].label}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {task.duration}
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  )
}