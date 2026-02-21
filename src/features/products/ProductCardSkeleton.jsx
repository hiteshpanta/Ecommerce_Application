import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function ProductCardSkeleton() {
  return (
    <div>
      <div className="w-[300px]]">
              <Skeleton className="h-[200px]" />
            <div className="space-y-4 mt-4">
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>
    </div>
  )
}
