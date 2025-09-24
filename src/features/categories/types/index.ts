import { Product } from "@/features/products/types";

export interface ProductQuery {
    slug: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    inStock?: boolean;
}
export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

 export interface CategoryProductsResponse {
  success: boolean;
  data: Product[];
  pagination: Pagination;
 }

export interface CategoryRequest {
    name: string;
    description: string;
    image: string;
}
