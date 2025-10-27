import { useInfiniteQuery } from "@tanstack/react-query";
import { CategoryProductsResponse, FilterParams } from "../types";
import { getCategoryProductsClient } from "../services/category.client";

/**
 * useCategoryProducts - Fetches products for a specific category.
 *
 * @param {string} slug - The category slug.
 * @param {CategoryProductsResponse} initialData - Initial data for the category products.
 * @param {FilterParams} filterParams - Initial filter settings for the products.
 * @returns {object} - The query result object from React Query.
 */

export function useCategoryProducts(
  slug: string,
  initialData: CategoryProductsResponse,
  filter: FilterParams
) {
  // Infinite query under the hood, but select the latest page so consumers can keep using data?.data
  return useInfiniteQuery<CategoryProductsResponse>({
    queryKey: ["categoryProducts", slug, JSON.stringify(filter)],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
    getCategoryProductsClient({ slug, page: pageParam, ...filter }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.page 
      const totalPages = lastPage.pagination.totalPages 
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },

    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    // Keep data fresh for 5 minutes
    staleTime: 1000 * 60 * 5,
    // Avoid unnecessary re-fetching on mount/focus/reconnect
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
