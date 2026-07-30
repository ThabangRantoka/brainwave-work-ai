import { useState } from "react";
import { Bell, CheckCheck, Mail, ListChecks, Telescope, NotebookPen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Notification = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  time: string;
};

const initial: Notification[] = [
  {
    id: "1",
    icon: Mail,
    title: "Email draft ready",
    body: "Your follow-up to the Acme pilot team was generated.",
    time: "2m ago",
  },
  {
    id: "2",
    icon: NotebookPen,
    title: "Meeting summarized",
    body: "Q3 roadmap sync — 4 decisions, 6 action items captured.",
    time: "38m ago",
  },
  {
    id: "3",
    icon: ListChecks,
    title: "Schedule rebalanced",
    body: "Two focus blocks moved to protect deep work this afternoon.",
    time: "1h ago",
  },
  {
    id: "4",
    icon: Telescope,
    title: "Research briefing",
    body: "Competitor pricing scan finished with 7 sources.",
    time: "Yesterday",
  },
];

export function NotificationCenter() {
  const [items, setItems] = useState(initial);
  const [read, setRead] = useState(false);
  const unread = read ? 0 : items.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
          className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground ring-2 ring-card">
              {unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={() => setRead(true)}
          >
            <CheckCheck className="size-3.5" />
            Mark all read
          </Button>
        </div>
        <ScrollArea className="max-h-80">
          <ul className="divide-y divide-border">
            {items.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => setItems((prev) => prev.filter((i) => i.id !== n.id))}
                  className="flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/60"
                >
                  <span className="gradient-primary mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <n.icon className="size-4 text-primary-foreground" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{n.title}</span>
                    <span className="block text-xs text-muted-foreground">{n.body}</span>
                    <span className="mt-1 block text-[11px] text-muted-foreground">{n.time}</span>
                  </span>
                </button>
              </li>
            ))}
            {items.length === 0 && (
              <li className="px-4 py-10 text-center text-sm text-muted-foreground">
                You're all caught up.
              </li>
            )}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
