import { Card } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div className="shimmer h-48 rounded-3xl bg-muted md:h-56" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} className="gap-0 rounded-2xl border-border p-5 shadow-soft">
            <div className="shimmer size-11 rounded-xl bg-muted" />
            <div className="shimmer mt-5 h-7 w-24 rounded-lg bg-muted" />
            <div className="shimmer mt-2 h-4 w-32 rounded-lg bg-muted" />
          </Card>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="shimmer h-80 rounded-2xl bg-muted lg:col-span-2" />
        <div className="shimmer h-80 rounded-2xl bg-muted" />
      </div>
    </div>
  );
}
