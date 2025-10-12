import { api } from "@/lib/axios";
import { Brand } from "../types";

export async function getAllBrandsClient(): Promise<Brand[]>{
    const res = await api.get("/brands");
    return res.data
} 