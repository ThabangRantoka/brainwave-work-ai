import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";

export function ToolPage({
  title,
  description,
  icon: Icon,
  hints,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  hints: string[];
}) {
  return (
    <AppShell>
      <div className="page-enter mx-auto w-full max-w-4xl space-y-8">
        <header className="animate-rise flex items-start gap-4">
          <span className="gradient-primary flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-glow">
            <Icon className="size-6 text-primary-foreground" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
          </div>
        </header>

        <Card className="animate-rise glass-card gap-0 rounded-2xl p-6">
          <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
            <Loader2 className="size-4 animate-spin text-primary" />
            Preparing your AI workspace…
          </div>
          <div className="mt-6 space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="shimmer h-4 rounded-full bg-muted" style={{ width: `${100 - i * 18}%` }} />
            ))}
          </div>
        </Card>

        <section className="grid gap-4 sm:grid-cols-3">
          {hints.map((hint, i) => (
            <Card
              key={hint}
              className="card-interactive animate-rise glass-card gap-0 rounded-2xl p-5 text-sm text-muted-foreground"
              style={{ animationDelay: `${100 + i * 70}ms` }}
            >
              {hint}
            </Card>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
