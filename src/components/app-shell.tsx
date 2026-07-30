import type { ReactNode } from "react";
import { Search } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { NotificationCenter } from "@/components/notification-center";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full gradient-surface">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-card/80 px-3 backdrop-blur-xl md:gap-3 md:px-6">
            <SidebarTrigger className="shrink-0" />

            <div className="relative hidden max-w-md flex-1 sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <label htmlFor="global-search" className="sr-only">
                Search
              </label>
              <Input
                id="global-search"
                type="search"
                placeholder="Search tasks, notes, emails…"
                className="h-10 rounded-xl border-border bg-muted/60 pl-9 transition-all focus-visible:bg-card"
              />
            </div>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <NotificationCenter />
              <UserMenu />
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
