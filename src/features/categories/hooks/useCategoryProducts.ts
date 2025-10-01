import { useQuery } from "@tanstack/react-query";
import { getCategoryProducts } from "../services/category";
import { useSearchParams } from "next/navigation";

/**
 * useCategoryProducts - Fetches products for a specific category.
 *
 * @param {string} slug - The category slug.
 * @param {number} [page=1] - The page number for pagination.
 * @returns {object} - The query result object from React Query.
 */

export const useCategoryProducts = (slug: string, page: number = 1) => {
  const searchParams = useSearchParams();
  
  const brand =  searchParams.get("brand") || undefined;
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const inStock = searchParams.get("inStock") === "true";
  // Fetch products with filters from URL and pagination 
  return useQuery({
    queryKey: ["categoryProducts", slug, searchParams.toString()],
    queryFn: () =>
      getCategoryProducts({
        slug,
        brand: brand,
        minPrice: minPrice,
        maxPrice: maxPrice,
        inStock: inStock,
        page,
      }), // Fetch products for the given category slug
    retry: 2, // retry twice if network error
    staleTime: 1000 * 60, // cache for 1 min
  });
};
