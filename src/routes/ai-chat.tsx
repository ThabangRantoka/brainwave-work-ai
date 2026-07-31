import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessagesSquare, Send, Plus, Bot, User } from "lucide-react";

import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({
    meta: [
      { title: "AI Chat | ProductivityOS AI" },
      { name: "description", content: "Chat with your workplace assistant about any task or document." },
      { property: "og:title", content: "AI Chat | ProductivityOS AI" },
      { property: "og:description", content: "Chat with your workplace assistant about any task or document." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiChat,
});

type Message = { id: string; role: "user" | "assistant"; text: string };

const suggestions = [
  "Summarise my week so far",
  "Draft a status update for leadership",
  "What should I focus on today?",
  "Turn my notes into action items",
];

const history = [
  { id: "h1", title: "Q3 roadmap sync", time: "Today" },
  { id: "h2", title: "Acme pilot follow-up", time: "Yesterday" },
  { id: "h3", title: "Hiring plan review", time: "Mon" },
  { id: "h4", title: "Pricing experiment ideas", time: "Last week" },
];

const greeting: Message = {
  id: "intro",
  role: "assistant",
  text: "Hi Thabang — I'm your ProductivityOS assistant. I can summarise meetings, draft emails, reshuffle your schedule or pull together a quick briefing. What would you like to start with?",
};

function reply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("focus") || p.includes("today")) {
    return "Based on your calendar, protect 09:00–11:00 for the activation flow spec — it's the only high-priority item with a hard deadline this week. Everything else can slide to the afternoon collaboration block.";
  }
  if (p.includes("email") || p.includes("draft")) {
    return "Here's a starting point:\n\n\"Quick update ahead of Friday — the pilot results are in and tracking above target on activation. I'll share the full breakdown Thursday, and propose we lock a rollout date next week.\"\n\nWant me to adjust the tone or shorten it?";
  }
  if (p.includes("summar")) {
    return "This week so far: 12 emails drafted, 4 meetings summarised, and 18 tasks completed. Your biggest open thread is the pilot expansion — legal sign-off is still pending and blocks the customer-facing copy.";
  }
  if (p.includes("action")) {
    return "I pulled four action items out of your notes:\n1. Finalise the activation flow spec — you, Friday\n2. Prepare pilot expansion comms — Priya, Monday\n3. Performance pass on the summariser — Daniel, Wednesday\n4. Legal review of AI disclaimers — Marta, Thursday";
  }
  return `Got it — here's how I'd approach "${prompt.trim()}":\n\n• Start by narrowing the scope to the single outcome that matters this week.\n• Pull the relevant context from your recent notes and threads.\n• Draft a first pass, then review it before anything goes external.\n\nWant me to take the first pass?`;
}

function AiChat() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: value }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: reply(value) },
      ]);
      setTyping(false);
      inputRef.current?.focus();
    }, 1200);
  };

  return (
    <ToolLayout
      title="AI Chat"
      description="A conversational workspace that remembers your projects, docs and preferences."
      icon={MessagesSquare}
    >
      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <Card className="animate-rise glass-card hidden gap-3 self-start rounded-2xl p-4 lg:flex">
          <Button
            className="gradient-primary w-full rounded-xl font-semibold shadow-glow"
            onClick={() => {
              setMessages([greeting]);
              setTyping(false);
              inputRef.current?.focus();
            }}
          >
            <Plus className="size-4" />
            New chat
          </Button>
          <p className="px-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Conversation history
          </p>
          <ul className="space-y-1">
            {history.map((h) => (
              <li key={h.id}>
                <button className="w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent">
                  <span className="block truncate text-sm font-medium">{h.title}</span>
                  <span className="block text-[11px] text-muted-foreground">{h.time}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="animate-rise glass-card gap-0 overflow-hidden rounded-2xl p-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">Assistant</p>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg lg:hidden"
              onClick={() => setMessages([greeting])}
            >
              <Plus className="size-4" />
              New chat
            </Button>
          </div>

          <div ref={scrollRef} className="h-[26rem] overflow-y-auto">
            <div className="space-y-4 p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`animate-rise flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "assistant" && (
                    <span className="gradient-primary mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl">
                      <Bot className="size-4 text-primary-foreground" />
                    </span>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground"
                        : "max-w-[80%] whitespace-pre-wrap text-sm leading-relaxed text-foreground"
                    }
                  >
                    {m.text}
                  </div>
                  {m.role === "user" && (
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <User className="size-4 text-muted-foreground" />
                    </span>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex gap-3">
                  <span className="gradient-primary mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl">
                    <Bot className="size-4 text-primary-foreground" />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl bg-muted/60 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-2 animate-bounce rounded-full bg-muted-foreground/70"
                        style={{ animationDelay: `${i * 140}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="flex items-end gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Message the assistant
              </label>
              <Textarea
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything about your work…"
                className="max-h-32 min-h-11 flex-1 resize-none rounded-xl bg-card/70"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={typing || !input.trim()}
                className="gradient-primary size-11 shrink-0 rounded-xl shadow-glow"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
