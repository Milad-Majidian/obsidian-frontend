import { Product } from "@/features/products/types";


export interface Brand {
    _id: string;
    name: string;
    description?: string;
    image :string;
    createdAt: Date;
    updatedAt: Date;
}
export interface FilterParams {
  brand?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  inStock?: boolean;
  sort?: string;
  order: string;
  limit?: number;
  page?: number | unknown;
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
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
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

export interface BrandsResponse {
  sucess: boolean;
  data: Brand[];
}
