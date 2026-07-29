import {
  Mail,
  NotebookPen,
  ListChecks,
  Telescope,
  Sparkles,
  Clock,
  CircleCheck,
  CircleAlert,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";

type Activity = { icon: LucideIcon; title: string; meta: string; time: string };

const activity: Activity[] = [
  { icon: Mail, title: "Drafted follow-up to Acme Corp", meta: "Email Generator", time: "4m ago" },
  { icon: NotebookPen, title: "Summarized Q3 roadmap sync", meta: "Meeting Notes", time: "38m ago" },
  { icon: ListChecks, title: "Rebuilt today's task schedule", meta: "Task Planner", time: "1h ago" },
  { icon: Telescope, title: "Competitor briefing: Northwind", meta: "Research", time: "3h ago" },
];

const tasks = [
  { title: "Review pricing proposal", due: "Today · 2:30 PM", priority: "High" },
  { title: "Design review with platform team", due: "Today · 4:00 PM", priority: "Medium" },
  { title: "Send investor update draft", due: "Tomorrow · 9:00 AM", priority: "High" },
  { title: "Finalize onboarding checklist", due: "Thu · 11:00 AM", priority: "Low" },
];

const suggestions = [
  {
    icon: CircleAlert,
    title: "3 emails are waiting over 24h",
    body: "Generate polite follow-ups in one batch to clear your inbox.",
  },
  {
    icon: Clock,
    title: "Your focus block is fragmented",
    body: "Merge two 25-min gaps into a 90-min deep work block this afternoon.",
  },
  {
    icon: CircleCheck,
    title: "Meeting notes ready to share",
    body: "Two summaries have unassigned owners — assign and publish.",
  },
];

const priorityTone: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-success/15 text-success",
};

export function ProductivityScore() {
  return (
    <Card className="card-interactive animate-rise glass-card gap-0 rounded-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold md:text-lg">Today&apos;s Productivity Score</h3>
          <p className="text-xs text-muted-foreground">Based on focus, output and follow-through</p>
        </div>
        <span className="gradient-primary flex size-10 shrink-0 items-center justify-center rounded-xl shadow-glow">
          <Sparkles className="size-5 text-primary-foreground" />
        </span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <p className="text-5xl font-extrabold tracking-tight">
          <AnimatedCounter value={87} />
        </p>
        <span className="pb-2 text-sm text-muted-foreground">/ 100</span>
      </div>
      <Progress value={87} className="mt-4 h-2" />

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Focus", value: 92 },
          { label: "Output", value: 84 },
          { label: "Follow-up", value: 79 },
        ].map((m) => (
          <div key={m.label} className="rounded-xl bg-muted/60 p-3">
            <p className="text-lg font-bold">
              <AnimatedCounter value={m.value} />
            </p>
            <p className="text-[11px] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function RecentActivity() {
  return (
    <Card className="card-interactive animate-rise glass-card gap-0 rounded-2xl p-6">
      <h3 className="text-base font-bold md:text-lg">Recent Activity</h3>
      <p className="text-xs text-muted-foreground">What your assistant handled lately</p>

      <ul className="mt-5 space-y-1">
        {activity.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/60"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <item.icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.meta}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function UpcomingTasks() {
  return (
    <Card className="card-interactive animate-rise glass-card gap-0 rounded-2xl p-6">
      <h3 className="text-base font-bold md:text-lg">Upcoming Tasks</h3>
      <p className="text-xs text-muted-foreground">Next up on your schedule</p>

      <ul className="mt-5 space-y-2">
        {tasks.map((task) => (
          <li
            key={task.title}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-card/50 p-3 transition-all hover:border-primary/35 hover:shadow-soft"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{task.title}</p>
              <p className="text-xs text-muted-foreground">{task.due}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityTone[task.priority]}`}
            >
              {task.priority}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function AiSuggestions() {
  return (
    <Card className="card-interactive animate-rise glass-card gap-0 rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <h3 className="text-base font-bold md:text-lg">AI Suggestions</h3>
      </div>
      <p className="text-xs text-muted-foreground">Smart recommendations for the next hour</p>

      <ul className="mt-5 space-y-3">
        {suggestions.map((s) => (
          <li
            key={s.title}
            className="group flex gap-3 rounded-xl bg-muted/50 p-3.5 transition-all hover:bg-accent/70"
          >
            <s.icon className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
            <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
