import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse } from "../types";

export const loginService = async (data:LoginRequest): Promise <LoginResponse> =>{
    const response = await api.post('/auth/login',data)
    return response.data
}