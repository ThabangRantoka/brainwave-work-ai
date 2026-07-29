import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";

import { ToolPage } from "@/components/tool-page";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "Task Planner | ProductivityOS AI" },
      { name: "description", content: "Let AI prioritize your day and build an adaptive task schedule." },
      { property: "og:title", content: "Task Planner | ProductivityOS AI" },
      { property: "og:description", content: "Let AI prioritize your day and build an adaptive task schedule." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ToolPage
      title="Task Planner"
      description="Drop in your workload and get a prioritized plan that adapts as your day changes."
      icon={ListChecks}
      hints={["Smart prioritization", "Focus blocks", "Calendar aware"]}
    />
  ),
});
