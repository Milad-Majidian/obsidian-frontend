 import { api } from "@/lib/axios";
import { RegisteredResponse, RegisterRequest } from "../types";

export const registerService = async (data:RegisterRequest): Promise <RegisteredResponse> =>{
    const response = await api.post('/auth/register',data)
    return response.data
}