import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { ToolPage } from "@/components/tool-page";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Email Generator | ProductivityOS AI" },
      { name: "description", content: "Draft polished, on-brand work emails in seconds with AI." },
      { property: "og:title", content: "Email Generator | ProductivityOS AI" },
      { property: "og:description", content: "Draft polished, on-brand work emails in seconds with AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ToolPage
      title="Email Generator"
      description="Describe the intent and ProductivityOS AI writes a clear, professional email ready to send."
      icon={Mail}
      hints={["Tone presets", "Reply threading", "Brand voice memory"]}
    />
  ),
});
