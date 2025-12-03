import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { CategoryProductsResponse, FilterParams } from "../types";
import { getCategoryProductsClient } from "../services/category.client";
import { file } from "zod";

/**
 * useCategoryProducts - Infinite scroll query for category products
 *
 * Features:
 * - Server-side pagination with infinite scroll
 * - Optimistic initial data from SSR
 * - Smart caching (5min stale time)
 * - Deduplication via stable query keys
 *
 * @param slug - Category identifier
 * @param initialData - SSR/SSG hydration data for first page
 * @param filter - Active filters (brand, price, stock, etc.)
 * @returns InfiniteQuery result with fetchNextPage, hasNextPage, etc.
 */
export function useCategoryProducts(
  slug: string,
  initialData: CategoryProductsResponse,
  filter: FilterParams
) {
  const initialFiltersToArray = JSON.stringify(filter);

  return useInfiniteQuery<CategoryProductsResponse>({
    queryKey: ["categoryProducts", slug, initialFiltersToArray],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getCategoryProductsClient({ slug, ...filter,page: pageParam}),

    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.pagination) return undefined;
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },

    // Hydrate with SSR data for instant first render
    initialData: () => ({
      pages: [initialData],
      pageParams: [1],
    }),

    // Performance optimizations
    staleTime: 1000 * 60 * 5, // 5min cache
    gcTime: 1000 * 60 * 10, // 10min garbage collection (formerly cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    // Retry strategy for network failures
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}
