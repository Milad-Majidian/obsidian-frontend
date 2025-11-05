/**
 * ProductCardSkeleton - Skeleton loader matching exact product card dimensions
 * 
 * Used for:
 * - Infinite scroll pagination (loading next page)
 * - Initial page load
 * - Optimistic UI during mutations
 * 
 * Design matches CategoryProductList card structure for seamless loading experience
 */
export function ProductCardSkeleton() {
  return (
    <li className="border rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton - matches aspect-square */}
      <div className="relative aspect-square bg-gray-200" />
      
      {/* Content skeleton - matches p-2.5 padding */}
      <div className="p-2.5 space-y-1">
        {/* Title skeleton - 2 lines matching line-clamp-2 */}
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>
        
        {/* Price skeleton */}
        <div className="h-4 bg-gray-200 rounded w-16 mt-1" />
        
        {/* Description skeleton - 1 line */}
        <div className="h-3 bg-gray-200 rounded w-full" />
      </div>
    </li>
  );
}

/**
 * ProductCardSkeletonGrid - Grid of skeleton cards for pagination loading
 * 
 * @param count - Number of skeleton cards to show (default: 4)
 */
interface ProductCardSkeletonGridProps {
  count?: number;
}

export function ProductCardSkeletonGrid({ count = 4 }: ProductCardSkeletonGridProps) {
  return (
    <ul className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </ul>
  );
}
