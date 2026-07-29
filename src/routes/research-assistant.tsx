import { createFileRoute } from "@tanstack/react-router";
import { Telescope } from "lucide-react";

import { ToolPage } from "@/components/tool-page";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "Research Assistant | ProductivityOS AI" },
      { name: "description", content: "Get sourced briefings on any topic, market or competitor." },
      { property: "og:title", content: "Research Assistant | ProductivityOS AI" },
      { property: "og:description", content: "Get sourced briefings on any topic, market or competitor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ToolPage
      title="Research Assistant"
      description="Ask a question and receive a concise, sourced briefing you can share with your team."
      icon={Telescope}
      hints={["Cited sources", "Competitor scans", "Export to notes"]}
    />
  ),
});
