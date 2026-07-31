# ProductivityOS AI

> **Enterprise AI Workplace Productivity Assistant**

A premium, enterprise-grade AI workspace that helps professionals draft emails, summarise meetings, plan tasks, run research and chat with an AI assistant — all from a single, polished dashboard.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Features](#features)
  - [Dashboard Overview](#dashboard-overview)
  - [AI Email Generator](#ai-email-generator)
  - [Meeting Notes Summarizer](#meeting-notes-summarizer)
  - [AI Task Planner](#ai-task-planner)
  - [Research Assistant](#research-assistant)
  - [AI Chat Assistant](#ai-chat-assistant)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Responsible AI Statement](#responsible-ai-statement)
- [Disclaimer](#disclaimer)
- [Author](#author)

---

## Project Overview

ProductivityOS AI is a modern SaaS-style web application that centralises the everyday knowledge-work tasks professionals repeat daily. Instead of switching between an email client, a note-taking app, a task board and a browser full of research tabs, users work inside one consistent AI workspace with a collapsible sidebar, light/dark theming, a notification centre and a personalised profile.

The interface is designed to enterprise standards comparable to Microsoft Copilot, Notion AI, Slack AI and Linear: gradient hero sections, glassmorphism cards, animated statistics, interactive charts and smooth loading states.

## Problem Statement

Knowledge workers lose a significant portion of every workday to repetitive, low-leverage tasks:

- Writing and rewriting routine emails in the right tone for the right audience.
- Turning long, unstructured meeting transcripts into decisions, owners and next steps.
- Re-prioritising an overloaded task list without a clear view of the day.
- Gathering and condensing research from scattered sources.
- Context-switching between many disconnected tools.

Existing AI tools solve these problems individually, but rarely in one coherent, enterprise-ready workspace with a consistent experience and shared context.

## Objectives

1. Provide a single workspace that consolidates the most common AI productivity workflows.
2. Deliver a premium, accessible and responsive enterprise UI (light and dark themes).
3. Make every AI tool interactive, with clear inputs, visible loading states and structured, copyable output.
4. Surface productivity insight through dashboard analytics, activity feeds and AI suggestions.
5. Keep the human in the loop: AI drafts, the professional decides.

## Features

### Dashboard Overview

- Time-aware greeting (Good Morning / Afternoon / Evening) personalised to the signed-in user.
- Gradient hero section with glassmorphism styling and entrance animations.
- Animated statistic counters: emails generated, tasks planned, meetings summarised, research sessions.
- Interactive charts (weekly productivity area chart, email and task bar charts, meetings line chart).
- Productivity score, recent activity feed, upcoming tasks and AI suggestion panels.
- Quick Actions grid linking straight into each AI tool.

### AI Email Generator

- Prompt-driven drafting with tone and audience selectors.
- Multiple draft variants per generation for comparison.
- One-click copy to clipboard and professional sign-off formatting.

### Meeting Notes Summarizer

- Paste a raw transcript and receive a structured summary.
- Sections for overview, key decisions and action items with owners and due dates.
- Designed for fast circulation after stand-ups, reviews and client calls.

### AI Task Planner

- Capture tasks and generate an AI-prioritised daily timeline.
- Priority badges and suggested time slots for focused execution.
- Adaptive re-planning as the task list changes.

### Research Assistant

- Topic-based briefings with an executive summary.
- Key insights list plus sourced citations for verification.
- Suited to market, competitor and technology scans.

### AI Chat Assistant

- Full conversational interface with message bubbles and typing animation.
- Suggested prompts to get started quickly.
- Conversation history within the session.

**Workspace-wide**

- Collapsible sidebar navigation with active-state highlighting.
- Light/dark theme toggle with persistence.
- Notification centre with productivity alerts.
- User profile menu (profile, settings, help, sign out).
- Help & Documentation page with FAQs and getting-started guidance.

## Technologies Used

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start (React 19, full-stack, SSR-capable) |
| Routing | TanStack Router (file-based routes) |
| Build tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first theme tokens) |
| UI components | shadcn/ui + Radix UI primitives |
| Icons | lucide-react |
| Charts | Recharts |
| Data/state | TanStack Query |
| Notifications | Sonner |
| Validation | Zod |
| Tooling | ESLint, Prettier |

## Project Structure

```text
.
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── app-shell.tsx        # Sidebar + top bar + content layout
│   │   ├── app-sidebar.tsx      # Workspace navigation
│   │   ├── notification-center.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── user-menu.tsx
│   │   ├── tool-layout.tsx      # Shared AI tool page frame
│   │   ├── tool-page.tsx
│   │   ├── dashboard/           # Counters, charts, panels, skeletons
│   │   └── ui/                  # shadcn/ui component library
│   ├── hooks/                   # use-count-up, use-mobile
│   ├── lib/                     # Utilities and error handling
│   ├── routes/
│   │   ├── __root.tsx           # Root layout, fonts, head metadata
│   │   ├── index.tsx            # Dashboard
│   │   ├── email-generator.tsx
│   │   ├── meeting-notes.tsx
│   │   ├── task-planner.tsx
│   │   ├── research-assistant.tsx
│   │   ├── ai-chat.tsx
│   │   ├── help.tsx
│   │   └── settings.tsx
│   ├── styles.css               # Theme tokens, gradients, animations
│   └── router.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Installation

**Prerequisites:** Node.js 20+ (or Bun 1.1+) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/productivityos-ai.git
cd productivityos-ai

# 2. Install dependencies
npm install
```

## Running the Project

```bash
# Start the development server (http://localhost:8080)
npm run dev

# Create a production build
npm run build

# Preview the production build locally
npm run preview

# Lint and format
npm run lint
npm run format
```

## Usage

1. Open the app and land on the **Dashboard** for a personalised overview of your productivity metrics.
2. Use **Quick Actions** or the sidebar to open a tool.
3. **Email Generator** — describe the email, pick tone and audience, generate, review variants and copy the best one.
4. **Meeting Notes** — paste a transcript and summarise it into overview, decisions and action items.
5. **Task Planner** — add tasks and generate a prioritised timeline for the day.
6. **Research Assistant** — enter a topic to receive a summary, insights and sources.
7. **AI Chat** — ask follow-up questions or chain tasks conversationally.
8. Toggle **light/dark mode**, check the **notification centre**, and manage your profile from the top bar.

## Screenshots

> Add your own captures to a `docs/screenshots/` folder and reference them below.

| View | Preview |
| --- | --- |
| Dashboard | `![Dashboard](docs/screenshots/dashboard.png)` |
| AI Email Generator | `![Email Generator](docs/screenshots/email-generator.png)` |
| Meeting Notes Summarizer | `![Meeting Notes](docs/screenshots/meeting-notes.png)` |
| AI Task Planner | `![Task Planner](docs/screenshots/task-planner.png)` |
| Research Assistant | `![Research Assistant](docs/screenshots/research-assistant.png)` |
| AI Chat Assistant | `![AI Chat](docs/screenshots/ai-chat.png)` |

## Future Enhancements

- Live LLM integration for all tools with streaming responses.
- User accounts, authentication and persistent workspace data.
- Calendar and email provider integrations (Google Workspace, Microsoft 365).
- Team workspaces with shared meeting summaries and task boards.
- Export to PDF, Markdown and Notion.
- Voice input and real-time meeting transcription.
- Usage analytics, audit logs and admin controls for enterprise deployments.
- Multi-language support and deeper accessibility auditing.

## Responsible AI Statement

ProductivityOS AI is built as an assistive tool, not an autonomous decision-maker. AI output is a starting point that supports human judgement rather than replacing it. The project is committed to:

- **Human oversight** — users review, edit and approve every AI-generated artefact before it is sent or acted upon.
- **Transparency** — AI-assisted areas of the product are clearly labelled.
- **Privacy** — sensitive or confidential content should not be submitted unless the deployment environment is approved for it.
- **Fairness** — prompts and outputs should be checked for bias, especially in people-related communication.
- **Accountability** — the human author remains responsible for any communication, decision or plan produced with the assistant's help.

## Disclaimer

> **AI-generated content may require human review.**

## Author

**Thabang Rantoka** — AI Productivity Specialist
