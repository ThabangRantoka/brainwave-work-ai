import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";

import { ToolPage } from "@/components/tool-page";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | ProductivityOS AI" },
      { name: "description", content: "Manage your workspace, team and AI assistant preferences." },
      { property: "og:title", content: "Settings | ProductivityOS AI" },
      { property: "og:description", content: "Manage your workspace, team and AI assistant preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ToolPage
      title="Settings"
      description="Configure workspace defaults, connected tools and how the assistant works for your team."
      icon={SettingsIcon}
      hints={["Workspace profile", "Integrations", "Data & privacy"]}
    />
  ),
});
