import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Telescope, Sparkles, Loader2, Copy, Check, Lightbulb, Link2, Target } from "lucide-react";

import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "Research Assistant | ProductivityOS AI" },
      { name: "description", content: "Get sourced briefings on any topic, market or competitor." },
      { property: "og:title", content: "Research Assistant | ProductivityOS AI" },
      { property: "og:description", content: "Get sourced briefings on any topic, market or competitor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchAssistant,
});

type Brief = {
  summary: string;
  insights: string[];
  actions: string[];
  sources: { title: string; publisher: string }[];
};

function buildBrief(topic: string): Brief {
  const t = topic.trim() || "the requested topic";
  return {
    summary: `Interest in ${t} has accelerated over the last four quarters, driven by buyers consolidating point tools into fewer platforms. Budget holders are increasingly willing to pay a premium for measurable time savings, but they expect transparent controls and human review of automated output before it reaches customers.`,
    insights: [
      `Adoption of ${t} is strongest in mid-market teams of 50–500 people, where tooling sprawl is highest.`,
      "Time-to-first-value under one week is the single strongest predictor of retention.",
      "Security review and data residency are now the most common late-stage blockers.",
      "Pricing is shifting from per-seat to blended seat plus usage models.",
    ],
    actions: [
      "Publish a one-week onboarding path with a measurable first outcome.",
      "Prepare a security and data-handling brief for procurement conversations.",
      "Pilot a blended pricing tier with three design partners this quarter.",
      "Instrument activation events so time-to-value is tracked per account.",
    ],
    sources: [
      { title: `${t.charAt(0).toUpperCase() + t.slice(1)}: market outlook`, publisher: "Industry Review Quarterly" },
      { title: "Enterprise buyer sentiment survey", publisher: "Workplace Insights Lab" },
      { title: "Pricing models in modern SaaS", publisher: "SaaS Benchmarks Report" },
      { title: "Procurement blockers in AI tooling", publisher: "Enterprise Tech Digest" },
    ],
  };
}

function ResearchAssistant() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [copied, setCopied] = useState(false);

  const run = () => {
    setLoading(true);
    setCopied(false);
    window.setTimeout(() => {
      setBrief(buildBrief(topic));
      setLoading(false);
    }, 1100);
  };

  const copy = async () => {
    if (!brief) return;
    const text = [
      "Executive summary",
      brief.summary,
      "",
      "Key insights",
      ...brief.insights.map((i) => `• ${i}`),
      "",
      "Recommended actions",
      ...brief.actions.map((a) => `• ${a}`),
      "",
      "Sources",
      ...brief.sources.map((s) => `• ${s.title} — ${s.publisher}`),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ToolLayout
      title="Research Assistant"
      description="Ask a question and receive a concise, sourced briefing you can share with your team."
      icon={Telescope}
    >
      <Card className="animate-rise glass-card gap-5 rounded-2xl p-6">
        <div className="space-y-2">
          <Label htmlFor="topic">Research topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="e.g. AI productivity tools for mid-market teams"
            className="h-11 rounded-xl bg-card/70"
          />
        </div>
        <Button
          onClick={run}
          disabled={loading}
          className="gradient-primary h-11 w-full rounded-xl font-semibold shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto sm:self-start sm:px-6"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {loading ? "Researching…" : "Run research"}
        </Button>
      </Card>

      {loading && (
        <Card className="glass-card gap-3 rounded-2xl p-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 rounded-full" style={{ width: `${97 - i * 10}%` }} />
          ))}
        </Card>
      )}

      {!loading && brief && (
        <div className="space-y-6">
          <Card className="animate-rise glass-card gap-3 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Executive summary</h2>
              <Button variant="outline" size="sm" className="rounded-lg" onClick={copy}>
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy results"}
              </Button>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{brief.summary}</p>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="animate-rise glass-card gap-3 rounded-2xl p-6" style={{ animationDelay: "80ms" }}>
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Lightbulb className="size-4 text-primary" />
                Key insights
              </h2>
              <ul className="space-y-2">
                {brief.insights.map((i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="animate-rise glass-card gap-3 rounded-2xl p-6" style={{ animationDelay: "160ms" }}>
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Target className="size-4 text-primary" />
                Recommended actions
              </h2>
              <ul className="space-y-2">
                {brief.actions.map((a) => (
                  <li key={a} className="flex gap-2 text-sm">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-glow" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="animate-rise glass-card gap-3 rounded-2xl p-6" style={{ animationDelay: "240ms" }}>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Link2 className="size-4 text-primary" />
              Sources
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {brief.sources.map((s) => (
                <li
                  key={s.title}
                  className="card-interactive rounded-xl border border-border bg-card/60 p-4"
                >
                  <p className="text-sm font-medium">{s.title}</p>
                  <Badge variant="secondary" className="mt-2 rounded-full text-[11px]">
                    {s.publisher}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </ToolLayout>
  );
}
