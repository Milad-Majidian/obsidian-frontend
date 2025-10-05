import { Product } from "@/features/products/types";

export interface FilterParams {
  brand?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  inStock?: boolean;
  sortBy?: string;
  order?: string;
  page?: number;
}

export interface ProductQuery extends FilterParams {
    slug: string;
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
