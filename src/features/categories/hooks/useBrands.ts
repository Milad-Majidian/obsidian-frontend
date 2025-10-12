// features/brands/hooks/useBrands.ts
import { useQuery } from "@tanstack/react-query";
import { getAllBrandsClient } from "../services/brand.client.ts";

export function useBrands(enabled: boolean) {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrandsClient,
    enabled,          // 🔑 Only fetch when enabled === true
    staleTime: 1000 * 60 * 10, // Cache for 10 min
  });
}
