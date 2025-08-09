import { useMutation } from '@tanstack/react-query';
import { loginService } from '../services/auth-service';
import { LoginRequest, LoginResponse } from '../types';
import { useToastMessage } from '@/hooks/useToastMessage';

 export const useLoginMutation = () => {
   const {showError,showSuccess } = useToastMessage() 
   return useMutation<LoginResponse, Error, LoginRequest>({
     mutationFn: loginService,
     // Form-specific or mutation-specific errors 
      onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong. Please try again.';
        showError(message)
    },
     onSuccess: () =>{
      showSuccess('Login successful');
     }
   });
 }
