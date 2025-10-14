import { useQuery } from "@tanstack/react-query";
import { CategoryProductsResponse, FilterParams,  } from "../types";
import { getCategoryProductsClient } from "../services/category.client";

/**
 * useCategoryProducts - Fetches products for a specific category.
 *
 * @param {string} slug - The category slug.
 * @param {CategoryProductsResponse} initialData - Initial data for the category products.
 * @param {FilterParams} filterParams - Initial filter settings for the products.
 * @returns {object} - The query result object from React Query.
 */


export function useCategoryProducts (slug:string, initialData: CategoryProductsResponse, filter:FilterParams) {
  // Fetch products with filters from URL and pagination 
  return useQuery({
    queryKey: ["categoryProducts", slug, filter],
    queryFn: () => getCategoryProductsClient({slug, ...filter}),
    initialData,
    staleTime: 1000 * 60 * 5, // cache for 5 min
    refetchOnMount : false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
