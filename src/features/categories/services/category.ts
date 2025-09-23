import { api } from "@/lib/axios";
import { Category } from "../types";
import { ConeIcon } from "lucide-react";

// export const getCategories = async (): Promise<Category[]> => {
//     const response = await api.get('/categories');
//     return response.data.data;
// }

export const getCategoryByName = async (slug: string): Promise<Category> => {
        
    const response = await api.get(`/products?category=${slug}`);
    return response.data.data;
}

// export const createCategory = async (data: Partial<Category>): Promise<Category> => {
//     const response = await api.post('/categories', data);
//     return response.data;
// }