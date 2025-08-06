import { useMutation } from '@tanstack/react-query';
import { loginService } from '../services/auth-service';
import { LoginRequest, LoginResponse } from '../types';


 export const useLoginMutation = () => {
   return useMutation<LoginResponse, Error, LoginRequest>({
     mutationFn: loginService,
    //  onSuccess: () => {
    //    toast.success('Login successful');
    //  },
    //  onError: () => {
    //    toast.error('Login failed');
    //  },
   });
 }
