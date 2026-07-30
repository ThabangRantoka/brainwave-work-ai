import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Sparkles, Loader2, Clock, Plus, Trash2 } from "lucide-react";

import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "Task Planner | ProductivityOS AI" },
      { name: "description", content: "Let AI prioritize your day and build an adaptive task schedule." },
      { property: "og:title", content: "Task Planner | ProductivityOS AI" },
      { property: "og:description", content: "Let AI prioritize your day and build an adaptive task schedule." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TaskPlanner,
});

type Priority = "High" | "Medium" | "Low";
type Task = { id: string; title: string; priority: Priority; due: string };
type Slot = Task & { time: string; block: string };

const priorityRank: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };

const priorityStyles: Record<Priority, string> = {
  High: "bg-destructive/12 text-destructive border-destructive/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Low: "bg-success/15 text-success border-success/30",
};

const startTimes = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];
const blocks = ["Deep focus", "Collaboration", "Admin", "Review"];

function TaskPlanner() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("High");
  const [due, setDue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<Slot[] | null>(null);

  const addTask = () => {
    if (!title.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: title.trim(), priority, due: due || "No date" },
    ]);
    setTitle("");
    setDue("");
  };

  const plan = () => {
    if (tasks.length === 0) return;
    setLoading(true);
    window.setTimeout(() => {
      const ordered = [...tasks].sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
      setSchedule(
        ordered.map((t, i) => ({
          ...t,
          time: startTimes[i % startTimes.length],
          block: blocks[i % blocks.length],
        })),
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <ToolLayout
      title="Task Planner"
      description="Drop in your workload and get a prioritized plan that adapts as your day changes."
      icon={ListChecks}
    >
      <Card className="animate-rise glass-card gap-5 rounded-2xl p-6">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-2">
            <Label htmlFor="task-title">Task</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="e.g. Draft the pilot expansion brief"
              className="h-11 rounded-xl bg-card/70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-priority">Priority</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
              <SelectTrigger id="task-priority" className="h-11 w-full rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["High", "Medium", "Low"] as Priority[]).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-due">Due date</Label>
            <Input
              id="task-due"
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="h-11 rounded-xl bg-card/70"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-xl" onClick={addTask}>
            <Plus className="size-4" />
            Add task
          </Button>
          <Button
            onClick={plan}
            disabled={loading || tasks.length === 0}
            className="gradient-primary rounded-xl font-semibold shadow-glow transition-transform hover:-translate-y-0.5"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Scheduling…" : "AI Schedule"}
          </Button>
        </div>

        {tasks.length > 0 && (
          <ul className="space-y-2">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/60 px-4 py-3"
              >
                <span className="min-w-0 truncate text-sm font-medium">{t.title}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <Badge variant="outline" className={`rounded-full ${priorityStyles[t.priority]}`}>
                    {t.priority}
                  </Badge>
                  <span className="hidden text-xs text-muted-foreground sm:inline">{t.due}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${t.title}`}
                    className="size-8 rounded-lg text-muted-foreground hover:text-destructive"
                    onClick={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {loading && (
        <Card className="glass-card gap-3 rounded-2xl p-6">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-12 rounded-xl" />
          ))}
        </Card>
      )}

      {!loading && schedule && (
        <Card className="animate-rise glass-card gap-4 rounded-2xl p-6">
          <h2 className="text-lg font-bold">Today's timeline</h2>
          <ol className="relative space-y-4 border-l border-border pl-6">
            {schedule.map((s, i) => (
              <li key={s.id} className="animate-rise relative" style={{ animationDelay: `${i * 70}ms` }}>
                <span className="gradient-primary absolute -left-[31px] top-1.5 size-3 rounded-full ring-4 ring-background" />
                <div className="card-interactive rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-sm font-semibold">
                      <Clock className="size-3.5 text-primary" />
                      {s.time}
                    </span>
                    <Badge variant="outline" className={`rounded-full ${priorityStyles[s.priority]}`}>
                      {s.priority}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full">
                      {s.block}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">Due {s.due}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </ToolLayout>
  );
}
