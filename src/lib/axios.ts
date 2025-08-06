import axios from 'axios'
import { promise } from 'zod';


// process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials : true
}) 

api.interceptors.request.use(
    (res) => res,
    (err) => {
        const error = err?.response?.data || { message: 'Unknown error occurred' };
          return  Promise.reject(error)
    }
);
