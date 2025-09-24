import { api } from "@/lib/axios";
import { Category, CategoryProductsResponse, ProductQuery } from "../types";

export const getCategoryProducts = async ({
  slug,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
  brand,
  minPrice,
  maxPrice,
  rating,
  inStock,
}: ProductQuery): Promise<CategoryProductsResponse> => {
    console.log('slug',slug)
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    params.append('sortBy', sortBy)
    params.append('order', order)
    if(brand) params.append('brand', brand)
    if(minPrice) params.append('minPrice', minPrice.toString())
    if(maxPrice) params.append('maxPrice', maxPrice.toString())
    if(rating) params.append('rating', rating.toString())
    if(inStock !== undefined) params.append('inStock', inStock.toString())
    const response = await api.get(`/products?category=${slug}&${params.toString()}`)
    return response.data 
    // as CategoryProductsResponse
};
