import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, BookOpen, MessageCircleQuestion, ShieldCheck, Rocket } from "lucide-react";

import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Documentation | ProductivityOS AI" },
      { name: "description", content: "Guides, FAQs and best practices for using ProductivityOS AI at work." },
      { property: "og:title", content: "Help & Documentation | ProductivityOS AI" },
      { property: "og:description", content: "Guides, FAQs and best practices for using ProductivityOS AI at work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Help,
});

const guides = [
  { icon: Rocket, title: "Getting started", body: "Set up your workspace, invite teammates and run your first AI task in under five minutes." },
  { icon: BookOpen, title: "Tool guides", body: "Deep dives on the email generator, meeting summariser, task planner and research assistant." },
  { icon: ShieldCheck, title: "Trust & privacy", body: "How your workspace data is handled, retained and reviewed before anything leaves the platform." },
];

const faqs = [
  {
    q: "How accurate are the AI outputs?",
    a: "Outputs are drafts designed to save you time. Always review generated content before sending it externally — the disclaimer at the bottom of every page is there for a reason.",
  },
  {
    q: "Can I change the assistant's tone of voice?",
    a: "Yes. Each tool exposes tone and audience controls, and workspace-level defaults can be set from Settings so every draft starts on-brand.",
  },
  {
    q: "Does the assistant remember previous conversations?",
    a: "AI Chat keeps a running conversation history per thread so context carries across follow-up questions. Start a fresh thread with New Chat whenever you switch topics.",
  },
  {
    q: "How do I switch between light and dark themes?",
    a: "Use the theme toggle in the top navigation bar. Your preference is remembered on this device.",
  },
];

function Help() {
  return (
    <ToolLayout
      title="Help & Documentation"
      description="Guides, answers and best practices for getting the most out of your AI workspace."
      icon={LifeBuoy}
    >
      <section className="grid gap-4 sm:grid-cols-3">
        {guides.map((g, i) => (
          <Card
            key={g.title}
            className="card-interactive animate-rise glass-card gap-2 rounded-2xl p-5"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="gradient-primary flex size-10 items-center justify-center rounded-xl">
              <g.icon className="size-5 text-primary-foreground" />
            </span>
            <h2 className="mt-2 text-base font-bold">{g.title}</h2>
            <p className="text-sm text-muted-foreground">{g.body}</p>
          </Card>
        ))}
      </section>

      <Card className="animate-rise glass-card gap-3 rounded-2xl p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <MessageCircleQuestion className="size-4 text-primary" />
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </ToolLayout>
  );
}
