import { api } from "@/lib/axios";
import { Category, CategoryProductsResponse, ProductQuery } from "../types";

export const getCategoryProductsClient = async ({
  slug,
  ...filters
}: ProductQuery): Promise<CategoryProductsResponse> => {
  const query = new URLSearchParams();
  if (filters.brand) query.append("brand", filters.brand);
  if (filters.minPrice) query.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) query.append("maxPrice", filters.maxPrice.toString());
  if (filters.inStock !== undefined)
    query.append("inStock", filters.inStock.toString());
  if (filters.page) query.append("page", filters.page.toString());

  const response = await api.get<CategoryProductsResponse>(
    `/products?category=${slug}&${query.toString()}`
  );
  return response.data;

};
