import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Sparkles, Copy, RefreshCw, Check, Loader2 } from "lucide-react";

import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Email Generator | ProductivityOS AI" },
      { name: "description", content: "Draft polished, on-brand work emails in seconds with AI." },
      { property: "og:title", content: "Email Generator | ProductivityOS AI" },
      { property: "og:description", content: "Draft polished, on-brand work emails in seconds with AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailGenerator,
});

const tones = ["Professional", "Friendly", "Concise", "Persuasive", "Apologetic"];
const audiences = ["Client", "Executive team", "Direct report", "Cross-functional peer", "Vendor"];

function buildEmail(prompt: string, tone: string, audience: string, variant: number) {
  const openings = [
    "Thanks for your patience while we lined this up.",
    "Hope your week is off to a strong start.",
    "Quick note to keep us moving on this.",
  ];
  const closings = [
    "Happy to jump on a short call if that's easier.",
    "Let me know if you'd like me to adjust anything.",
    "I'll follow up early next week unless I hear otherwise.",
  ];
  const topic = prompt.trim() || "our upcoming collaboration";

  return `Subject: ${topic.charAt(0).toUpperCase() + topic.slice(1).slice(0, 60)}

Hi there,

${openings[variant % openings.length]} I'm reaching out regarding ${topic}.

Here's where things stand:
• We've confirmed the scope and the key milestones on our side.
• The next deliverable is ready for your review this week.
• Any blockers can be routed directly to me so nothing stalls.

Given this is going to a ${audience.toLowerCase()}, I've kept the framing ${tone.toLowerCase()} and focused on the decisions that matter most to you.

${closings[variant % closings.length]}

Best regards,
Alex Rivera
Product Lead, ProductivityOS AI`;
}

function EmailGenerator() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState(tones[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [variant, setVariant] = useState(0);
  const [copied, setCopied] = useState(false);

  const generate = (next = variant) => {
    setLoading(true);
    setCopied(false);
    window.setTimeout(() => {
      setResult(buildEmail(prompt, tone, audience, next));
      setLoading(false);
    }, 900);
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ToolLayout
      title="Email Generator"
      description="Describe the intent and ProductivityOS AI writes a clear, professional email ready to send."
      icon={Mail}
    >
      <Card className="animate-rise glass-card gap-5 rounded-2xl p-6">
        <div className="space-y-2">
          <Label htmlFor="email-prompt">What should this email say?</Label>
          <Textarea
            id="email-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Follow up with Acme on the pilot results and propose a rollout date"
            className="min-h-32 rounded-xl bg-card/70"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone" className="w-full rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tones.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger id="audience" className="w-full rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {audiences.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={() => generate()}
          disabled={loading}
          className="gradient-primary h-11 w-full rounded-xl font-semibold shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto sm:self-start sm:px-6"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {loading ? "Generating…" : "Generate Email"}
        </Button>
      </Card>

      {loading && (
        <Card className="glass-card gap-3 rounded-2xl p-6">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-4 rounded-full" style={{ width: `${95 - i * 12}%` }} />
          ))}
        </Card>
      )}

      {!loading && result && (
        <Card className="animate-rise glass-card gap-4 rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Generated email</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg" onClick={copy}>
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => {
                  const next = variant + 1;
                  setVariant(next);
                  generate(next);
                }}
              >
                <RefreshCw className="size-4" />
                Regenerate
              </Button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-muted/50 p-4 font-sans text-sm leading-relaxed">
            {result}
          </pre>
        </Card>
      )}
    </ToolLayout>
  );
}
