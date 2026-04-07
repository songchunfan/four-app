import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container flex items-center gap-4 space-x-4 my-20">
      <div className="w-64 space-y-4">
        <Skeleton className="h-4 w-[150px] rounded-full" />
        <Skeleton className="h-4 w-[200px] rounded-full" />
        <Skeleton className="h-4 w-[200px] rounded-full" />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-4 w-full" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-48 rounded-md" />
          <Skeleton className="h-48 rounded-md" />
          <Skeleton className="h-48 rounded-md" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-48 rounded-md" />
          <Skeleton className="h-48 rounded-md" />
          <Skeleton className="h-48 rounded-md" />
        </div>
      </div>
    </div>
  )
}
