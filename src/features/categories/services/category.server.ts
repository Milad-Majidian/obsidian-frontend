import { CategoryProductsResponse, ProductQuery } from "../types";

export const getCategoryProductsServer = async (
    params: ProductQuery
): Promise<CategoryProductsResponse> => {
    const query = new URLSearchParams();
    if (params.brand) query.append("brand", params.brand);
    if (params.minPrice) query.append("minPrice", params.minPrice.toString());
    if (params.maxPrice) query.append("maxPrice", params.maxPrice.toString());
    if (params.inStock !== undefined) query.append("inStock", params.inStock.toString());
    if (params.page) query.append("page", params.page.toString());
     query.append("limit", (15).toString())
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${baseUrl}/products?category=${params.slug}&${query.toString()}`, {
        cache: 'no-store',
    });
    if(!res.ok){
        throw new Error('Failed to fetch category products');
    }

    return res.json();
}