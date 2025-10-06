// features/categories/utils/parseCategoryFilters.ts
import { ProductQuery } from "../types";

export function parseCategoryFilters(query: Record<string, string | string[] | undefined>): Omit<ProductQuery, "slug"> {
  return {
    brand: typeof query.brand === "string" ? query.brand : undefined,
    minPrice: query.minPrice ? Number(query.minPrice) : undefined,
    maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    inStock:
      query.inStock === "true"
        ? true
        : query.inStock === "false"
        ? false
        : undefined,
    sortBy: typeof query.sortBy === "string" ? query.sortBy : "createdAt",
    order: query.order === "asc" || query.order === "desc" ? query.order : "desc",
    page: query.page ? Number(query.page) : 1,
  };
}
