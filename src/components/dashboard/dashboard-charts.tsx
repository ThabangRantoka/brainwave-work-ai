import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";
import { useHydrated } from "@/hooks/use-count-up";

const weekly = [
  { day: "Mon", score: 62, emails: 148, tasks: 32, meetings: 12 },
  { day: "Tue", score: 71, emails: 196, tasks: 41, meetings: 18 },
  { day: "Wed", score: 78, emails: 174, tasks: 38, meetings: 15 },
  { day: "Thu", score: 69, emails: 231, tasks: 47, meetings: 22 },
  { day: "Fri", score: 88, emails: 258, tasks: 54, meetings: 26 },
  { day: "Sat", score: 44, emails: 92, tasks: 18, meetings: 6 },
  { day: "Sun", score: 51, emails: 108, tasks: 21, meetings: 9 },
];

const axisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

function ChartShell({
  title,
  subtitle,
  className,
  children,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Card
      className={`card-interactive animate-rise glass-card gap-0 rounded-2xl p-5 md:p-6 ${className ?? ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-5">
        <h3 className="text-base font-bold md:text-lg">{title}</h3>
        <p className="text-xs text-muted-foreground md:text-sm">{subtitle}</p>
      </div>
      <div className="h-56 w-full">{children}</div>
    </Card>
  );
}

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "0.85rem",
    color: "var(--popover-foreground)",
    boxShadow: "var(--shadow-lift)",
    fontSize: 12,
  },
  cursor: { fill: "color-mix(in oklab, var(--primary) 8%, transparent)" },
};

export function DashboardCharts() {
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <section className="grid gap-5 lg:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="shimmer h-80 rounded-2xl bg-muted" />
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <ChartShell
        title="Weekly Productivity"
        subtitle="Composite productivity score across the last 7 days"
        className="lg:col-span-2"
        delay={40}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weekly} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 6" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#scoreFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Emails Generated" subtitle="Daily AI-drafted emails" delay={110}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekly} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 6" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="emails" fill="var(--chart-2)" radius={[8, 8, 4, 4]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Tasks Completed" subtitle="Closed tasks per day" delay={180}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekly} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 6" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="tasks" fill="var(--chart-3)" radius={[8, 8, 4, 4]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell
        title="Meetings Summarized"
        subtitle="Transcripts turned into action items"
        className="lg:col-span-2"
        delay={250}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weekly} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 6" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Line
              type="monotone"
              dataKey="meetings"
              stroke="var(--chart-5)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "var(--chart-5)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartShell>
    </section>
  );
}
