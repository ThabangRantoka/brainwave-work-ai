import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  ListChecks,
  NotebookPen,
  Telescope,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | ProductivityOS AI" },
      {
        name: "description",
        content:
          "ProductivityOS AI is your intelligent workplace assistant for emails, meeting notes, task planning and research.",
      },
      { property: "og:title", content: "Dashboard | ProductivityOS AI" },
      {
        property: "og:description",
        content:
          "Automate daily work with an AI workplace assistant: emails, meeting summaries, task plans and research.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

type Stat = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { label: "Emails Generated", value: "1,284", delta: "+12.4% this week", icon: Mail },
  { label: "Tasks Planned", value: "376", delta: "+8.1% this week", icon: ListChecks },
  { label: "Meetings Summarized", value: "142", delta: "+21.7% this week", icon: NotebookPen },
  { label: "Research Sessions", value: "89", delta: "+5.3% this week", icon: Telescope },
];

const quickActions = [
  {
    title: "Generate Email",
    description: "Draft polished, on-brand emails in seconds from a short prompt.",
    icon: Mail,
    to: "/email-generator",
  },
  {
    title: "Summarize Meeting",
    description: "Turn raw transcripts into decisions, owners and next steps.",
    icon: NotebookPen,
    to: "/meeting-notes",
  },
  {
    title: "Plan My Tasks",
    description: "Prioritize your day with an AI-built schedule that adapts.",
    icon: ListChecks,
    to: "/task-planner",
  },
  {
    title: "Research Anything",
    description: "Get sourced briefings on any topic, market or competitor.",
    icon: Telescope,
    to: "/research-assistant",
  },
] as const;

function Dashboard() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <section className="animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-soft">
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Welcome back</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold md:text-5xl">
            <span className="text-gradient">ProductivityOS AI</span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
            Your intelligent workplace assistant.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <Card
              key={stat.label}
              className="card-interactive animate-rise gap-0 rounded-2xl border-border bg-card p-5 shadow-soft"
              style={{ animationDelay: `${80 + i * 70}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="gradient-primary flex size-11 items-center justify-center rounded-xl shadow-glow">
                  <stat.icon className="size-5 text-primary-foreground" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                  <TrendingUp className="size-3 text-success" />
                  {stat.delta}
                </span>
              </div>
              <p className="mt-5 text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">Quick Actions</h2>
              <p className="text-sm text-muted-foreground">
                Jump straight into your most-used AI workflows.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {quickActions.map((action, i) => (
              <Card
                key={action.title}
                className="card-interactive animate-rise group gap-0 rounded-2xl border-border bg-card p-6 shadow-soft"
                style={{ animationDelay: `${160 + i * 70}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                    <action.icon className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold">{action.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {action.description}
                    </p>
                    <Button
                      asChild
                      variant="ghost"
                      className="mt-3 h-8 px-0 text-sm font-semibold text-primary hover:bg-transparent hover:text-primary"
                    >
                      <a href={action.to}>
                        Open
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
