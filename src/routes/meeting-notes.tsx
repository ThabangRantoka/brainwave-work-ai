import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";

import { ToolPage } from "@/components/tool-page";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes | ProductivityOS AI" },
      { name: "description", content: "Turn meeting transcripts into decisions, owners and next steps." },
      { property: "og:title", content: "Meeting Notes | ProductivityOS AI" },
      { property: "og:description", content: "Turn meeting transcripts into decisions, owners and next steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ToolPage
      title="Meeting Notes"
      description="Paste a transcript and get a structured summary with decisions, action items and owners."
      icon={NotebookPen}
      hints={["Action item extraction", "Speaker attribution", "One-click sharing"]}
    />
  ),
});
