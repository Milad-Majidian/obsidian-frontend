import { api } from "@/lib/axios";
import { BrandsResponse } from "../types";

export async function getAllBrandsClient(category:string): Promise<BrandsResponse>{
    const res = await api.get(`/brands?category=${category}`);
    return res.data
} 