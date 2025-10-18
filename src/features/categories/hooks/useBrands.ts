// features/brands/hooks/useBrands.ts
import { useQuery } from "@tanstack/react-query";
import { getAllBrandsClient } from "../services/brand.client.ts";

export function useBrands(category: string , enabled:boolean = true) {
  return useQuery({
    queryKey: ["brands", category],
    queryFn: () => getAllBrandsClient(category),
    enabled,          // Only fetch when enabled === true
    staleTime: 1000 * 60 * 10, // Cache for 10 min
  });
}
