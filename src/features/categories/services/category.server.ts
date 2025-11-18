import { CategoryProductsResponse, ProductQuery } from "../types";

export const getCategoryProductsServer = async (
    params: ProductQuery
): Promise<CategoryProductsResponse> => {
    const query = new URLSearchParams();
    if (params.brand) query.append("brand", params.brand);
    if (params.minPrice) query.append("minPrice", params.minPrice.toString());
    if (params.maxPrice) query.append("maxPrice", params.maxPrice.toString());
    if (params.sort) query.append("sort", params.sort);
    if (params.inStock !== undefined) query.append("inStock", params.inStock.toString());
    if (params.page) query.append("page", params.page.toString());
    query.append("limit", (15).toString())

    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const fullUrl = `${baseUrl}/products?category=${params.slug}&${query.toString()}`;
    
     console.log('[Server] Fetching from backend:', fullUrl);
    
    const res = await fetch(fullUrl, {
        cache: 'no-store',
    });
    
     console.log('[Server] Response status:', res.status);
    
    if(!res.ok){
        const errorText = await res.text();
        console.error('[Server] Backend error:', errorText);
        throw new Error(`Failed to fetch category products: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    
    return data;
}