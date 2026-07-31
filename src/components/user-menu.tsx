import { Link } from "@tanstack/react-router";
import { ChevronDown, LogOut, Settings, LifeBuoy, UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 pr-2 shadow-soft transition-all hover:shadow-lift sm:pl-2">
          <Avatar className="size-8">
            <AvatarFallback className="gradient-primary text-xs font-semibold text-primary-foreground">
              TR
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-left leading-tight md:block">
            <span className="block text-sm font-semibold">Thabang Rantoka</span>
            <span className="block text-[11px] text-muted-foreground">AI Productivity Specialist</span>
          </span>
          <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 rounded-2xl">
        <DropdownMenuLabel className="flex items-center gap-3 py-3">
          <Avatar className="size-9">
            <AvatarFallback className="gradient-primary text-xs font-semibold text-primary-foreground">
              TR
            </AvatarFallback>
          </Avatar>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">Thabang Rantoka</span>
            <span className="block text-xs font-normal text-muted-foreground">
              thabang@productivityos.ai
            </span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer">
            <UserRound className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer">
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/help" className="cursor-pointer">
            <LifeBuoy className="size-4" />
            Help &amp; Documentation
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
