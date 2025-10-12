
'use client'

import { Skeleton } from "@/components/ui/skeleton";

export function FiltersSkeleton() {
  return (
    // <div className="space-y-4 p-4">
    //   <Skeleton className="h-6 w-1/2" /> {/* Filter title */}
    //   {[...Array(6)].map((_, i) => (
    //     <Skeleton key={i} className="h-5 w-full rounded-md" /> // filter options
    //   ))}
    // </div>
     <Skeleton className="h-40 w-full rounded-lg" />
  );
}
