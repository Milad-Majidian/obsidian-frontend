// features/brands/hooks/useBrands.ts
import { useQuery } from "@tanstack/react-query";
import { getAllBrandsClient } from "../services/brand.client";

export function useBrands(category: string , enabled:boolean = true) {
  return useQuery({
    queryKey: ["brands", category],
    queryFn: () => getAllBrandsClient(category),
    enabled,          // Only fetch when enabled === true
    staleTime: 1000 * 60 * 10, // Cache for 10 min
  });
}

export function useBrandsByCategory(category: string, enabled:boolean = true) {
  return useQuery({
    queryKey: ["brandsByCategory", category],
    queryFn: () => getAllBrandsClient(category),
    enabled,          // Only fetch when enabled === true
    staleTime: 1000 * 60 * 10, // Cache for 10 min
  });
}

export function useBrandsByCategoryAndSubcategory(category: string, subcategory: string, enabled:boolean = true) {  
  return useQuery({
    queryKey: ["brandsByCategoryAndSubcategory", category, subcategory],
    queryFn: () => getAllBrandsClient(category, subcategory),
    enabled,          // Only fetch when enabled === true
    staleTime: 1000 * 60 * 10, // Cache for 10 min
  });
}

export function useBrandsByCategoryAndSubcategoryAndSubsubcategory(category: string, subcategory: string, subsubcategory: string, enabled:boolean = true) {
  return useQuery({
    queryKey: ["brandsByCategoryAndSubcategoryAndSubsubcategory", category, subcategory, subsubcategory],
    queryFn: () => getAllBrandsClient(category, subcategory, subsubcategory),
    enabled,          // Only fetch when enabled === true
    staleTime: 1000 * 60 * 10, // Cache for 10 min
  });
}
