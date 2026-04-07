import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.8fr_0.9fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>

          <div className="mt-6 space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="h-20 w-20 rounded-3xl bg-muted" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3 md:w-[340px] md:text-right">
                  <Skeleton className="h-10 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Skeleton className="h-8 w-24" />
          <div className="mt-6 space-y-4 rounded-3xl bg-slate-50 p-5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="mt-6 h-12 w-full rounded-2xl" />
          <Skeleton className="mt-3 h-4 w-48" />
        </aside>
      </div>
    </div>
  )
}
