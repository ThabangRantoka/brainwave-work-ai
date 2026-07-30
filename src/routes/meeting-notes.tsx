import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NotebookPen, Sparkles, Loader2, Gavel, ListChecks, CalendarClock, Copy, Check } from "lucide-react";

import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes | ProductivityOS AI" },
      { name: "description", content: "Turn meeting transcripts into decisions, owners and next steps." },
      { property: "og:title", content: "Meeting Notes | ProductivityOS AI" },
      { property: "og:description", content: "Turn meeting transcripts into decisions, owners and next steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingNotes;
});

type Summary = {
  overview: string;
  decisions: string[];
  actions: { task: string; owner: string; due: string }[];
};

const mockSummary: Summary = {
  overview:
    "The team aligned on the Q3 rollout plan, agreed to prioritise the onboarding revamp over the reporting refresh, and confirmed that the pilot cohort will expand to twelve accounts once the new activation flow ships.",
  decisions: [
    "Onboarding revamp moves ahead of the reporting refresh for Q3.",
    "Pilot cohort expands from five to twelve accounts after the activation flow ships.",
    "Weekly design reviews move to Tuesday mornings to unblock engineering earlier.",
    "Legal sign-off is required before any customer-facing AI copy goes live.",
  ],
  actions: [
    { task: "Finalise the activation flow spec", owner: "Alex Rivera", due: "Fri, Aug 8" },
    { task: "Prepare pilot expansion comms", owner: "Priya Nair", due: "Mon, Aug 11" },
    { task: "Run performance pass on the summariser", owner: "Daniel Cho", due: "Wed, Aug 13" },
    { task: "Collect legal review on AI disclaimers", owner: "Marta Silva", due: "Thu, Aug 14" },
  ],
};

function MeetingNotes() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [copied, setCopied] = useState(false);

  const summarize = () => {
    setLoading(true);
    setCopied(false);
    window.setTimeout(() => {
      setSummary(mockSummary);
      setLoading(false);
    }, 1000);
  };

  const copy = async () => {
    if (!summary) return;
    const text = [
      "Summary",
      summary.overview,
      "",
      "Key decisions",
      ...summary.decisions.map((d) => `• ${d}`),
      "",
      "Action items",
      ...summary.actions.map((a) => `• ${a.task} — ${a.owner} (due ${a.due})`),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ToolLayout
      title="Meeting Notes"
      description="Paste a transcript and get a structured summary with decisions, action items and owners."
      icon={NotebookPen}
    >
      <Card className="animate-rise glass-card gap-5 rounded-2xl p-6">
        <div className="space-y-2">
          <Label htmlFor="transcript">Meeting transcript</Label>
          <Textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your raw transcript or rough notes here…"
            className="min-h-44 rounded-xl bg-card/70"
          />
        </div>
        <Button
          onClick={summarize}
          disabled={loading}
          className="gradient-primary h-11 w-full rounded-xl font-semibold shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto sm:self-start sm:px-6"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {loading ? "Summarizing…" : "Summarize"}
        </Button>
      </Card>

      {loading && (
        <Card className="glass-card gap-3 rounded-2xl p-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 rounded-full" style={{ width: `${96 - i * 11}%` }} />
          ))}
        </Card>
      )}

      {!loading && summary && (
        <div className="space-y-6">
          <Card className="animate-rise glass-card gap-3 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Summary</h2>
              <Button variant="outline" size="sm" className="rounded-lg" onClick={copy}>
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy notes"}
              </Button>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{summary.overview}</p>
          </Card>

          <Card
            className="animate-rise glass-card gap-3 rounded-2xl p-6"
            style={{ animationDelay: "80ms" }}
          >
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Gavel className="size-4 text-primary" />
              Key decisions
            </h2>
            <ul className="space-y-2">
              {summary.decisions.map((d) => (
                <li key={d} className="flex gap-2 text-sm">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            className="animate-rise glass-card gap-3 rounded-2xl p-6"
            style={{ animationDelay: "160ms" }}
          >
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ListChecks className="size-4 text-primary" />
              Action items
            </h2>
            <ul className="space-y-3">
              {summary.actions.map((a) => (
                <li
                  key={a.task}
                  className="card-interactive flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/60 p-4"
                >
                  <span className="min-w-0 text-sm font-medium">{a.task}</span>
                  <span className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      {a.owner}
                    </Badge>
                    <Badge variant="outline" className="gap-1 rounded-full">
                      <CalendarClock className="size-3" />
                      {a.due}
                    </Badge>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </ToolLayout>
  );
}
