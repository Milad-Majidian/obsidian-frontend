import { api } from "@/lib/axios";
import { BrandsResponse } from "../types";

export async function getAllBrandsClient(): Promise<BrandsResponse>{
    const res = await api.get("/brands");
    return res.data
} 