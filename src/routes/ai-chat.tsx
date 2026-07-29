import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";

import { ToolPage } from "@/components/tool-page";

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
  component: () => (
    <ToolPage
      title="AI Chat"
      description="A conversational workspace that remembers your projects, docs and preferences."
      icon={MessagesSquare}
      hints={["Project context", "File Q&A", "Thread history"]}
    />
  ),
});
