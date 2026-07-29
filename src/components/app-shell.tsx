import type { ReactNode } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full gradient-surface">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-3 backdrop-blur-xl md:px-6">
            <SidebarTrigger className="shrink-0" />

            <div className="relative hidden max-w-md flex-1 sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks, notes, emails…"
                className="h-10 rounded-xl border-border bg-muted/60 pl-9 transition-all focus-visible:bg-card"
              />
            </div>

            <div className="ml-auto flex items-center gap-1 sm:gap-3">
              <button
                aria-label="Notifications"
                className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Bell className="size-5" />
                <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
              </button>

              <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 pr-2 shadow-soft transition-all hover:shadow-lift sm:pl-2">
                <Avatar className="size-8">
                  <AvatarFallback className="gradient-primary text-xs font-semibold text-primary-foreground">
                    AR
                  </AvatarFallback>
                </Avatar>
                <div className="hidden leading-tight md:block">
                  <p className="text-sm font-semibold">Alex Rivera</p>
                  <p className="text-[11px] text-muted-foreground">Product Lead</p>
                </div>
                <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</main>

          <footer className="border-t border-border px-4 py-5 text-center md:px-8">
            <p className="text-xs text-muted-foreground">
              AI-generated content may require human review.
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
