import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container flex py-6">
      <div className="w-64">
        <Skeleton className="h-8 w-full rounded-xl mt-8 mb-8" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className="w-80 py-12 bg-white rounded-lg shadow-md px-2">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
