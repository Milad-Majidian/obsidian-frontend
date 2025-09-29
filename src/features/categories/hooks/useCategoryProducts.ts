import { useQuery } from "@tanstack/react-query";
import { getCategoryProducts } from "../services/category";

export const useCategoryProducts = (slug: string, page: number = 1) => {
  return useQuery({
    queryKey: ["categoryProducts", slug, page],
    queryFn: () => getCategoryProducts({ slug, page }),
    retry: 2, // retry twice if network error
    staleTime: 1000 * 60, // cache for 1 min
  });
};
