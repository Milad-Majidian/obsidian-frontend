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
    sort: typeof query.sort === "string" ? query.sort : "newest",
    order: query.order === "asc" || query.order === "desc" ? query.order : "desc",
    page: query.page ? Number(query.page) : 1,
  };
}

export function buildCategoryQueryString(filters: Omit<ProductQuery, "slug">): string {
  const params = new URLSearchParams(); 
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.minPrice !== undefined) params.set("minPrice", filters.minPrice.toString());
  if (filters.maxPrice !== undefined) params.set("maxPrice", filters.maxPrice.toString());
  if (filters.inStock !== undefined) params.set("inStock", filters.inStock.toString());
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.order) params.set("order", filters.order);
  if (filters.page !== 1) params.set("page", filters.page.toString());

  return params.toString();
}

export function buildCategoryQueryObject(filters: Omit<ProductQuery, "slug">): Record<string, string> {
  const queryObject: Record<string, string> = {};
  if (filters.brand) queryObject.brand = filters.brand;
  if (filters.minPrice !== undefined) queryObject.minPrice = filters.minPrice.toString();
  if (filters.maxPrice !== undefined) queryObject.maxPrice = filters.maxPrice.toString();
  if (filters.inStock !== undefined) queryObject.inStock = filters.inStock.toString();
  if (filters.sort) queryObject.sort = filters.sort;
  if (filters.order) queryObject.order = filters.order;
  if (filters.page !== 1) queryObject.page = filters.page.toString();

  return queryObject;
}
