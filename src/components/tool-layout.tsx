import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { AppShell } from "@/components/app-shell";

export function ToolLayout({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <AppShell>
      <div className="page-enter mx-auto w-full max-w-5xl space-y-8">
        <header className="animate-rise flex items-start gap-4">
          <span className="gradient-primary flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-glow">
            <Icon className="size-6 text-primary-foreground" />
          </span>
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
          </div>
        </header>
        {children}
      </div>
    </AppShell>
  );
}
